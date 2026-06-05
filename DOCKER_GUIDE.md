# Docker Setup Guide for Daily Questions Backend

## What is Docker?

Docker is a containerization tool that packages your application and its dependencies into isolated containers. Think of it as a lightweight virtual machine that ensures your app runs the same way everywhere.

**Key concepts:**

- **Image**: A blueprint/template for your container (like a recipe)
- **Container**: A running instance of an image (like a cooked meal)
- **docker-compose**: Allows you to run multiple containers together (backend + database)

## Prerequisites

1. **Install Docker Desktop** from https://www.docker.com/products/docker-desktop
2. **Verify installation** - Open PowerShell and run:
   ```powershell
   docker --version
   docker-compose --version
   ```

## File Breakdown

### `docker-compose.yml`

Defines two services:

- **mysql**: Database container running MySQL 8.0
- **backend**: Your Node.js application

Environment variables are set here, so the backend can connect to MySQL.

### `Dockerfile`

Instructions to build your Node.js application image:

1. Start with Node.js 18 (alpine = lightweight version)
2. Set working directory to `/app`
3. Copy and install dependencies
4. Copy your code
5. Expose port 3001
6. Start the app with `npm start`

### `db.js`

Database connection file - import this in your services to query the database.

## Step 1: Update package.json

Add the MySQL driver to your dependencies. Open PowerShell in your project folder and run:

```powershell
npm install mysql2
```

Or manually add `"mysql2": "^3.0.0"` to package.json's dependencies and run `npm install`.

## Step 2: Update server.js to include npm start script

Make sure your package.json has this script:

```json
"scripts": {
  "start": "node server.js",
  "test": "jest"
}
```

## Step 3: Start Everything with Docker

Open PowerShell, navigate to your project folder, and run:

```powershell
docker-compose up
```

This will:

1. Download MySQL and Node images (first time only)
2. Create containers and volumes
3. Start both MySQL and your backend
4. Your backend will be available at http://localhost:3001

**To run in background:**

```powershell
docker-compose up -d
```

## Step 4: Test the Connection

```powershell
# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f mysql

# Stop everything
docker-compose down

# Remove everything including data
docker-compose down -v
```

## How to Use the Database in Your Code

Example in your service file:

```javascript
const pool = require('../db');

async function getAllGroups() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM groups');
    return rows;
  } finally {
    connection.release();
  }
}

module.exports = { getAllGroups };
```

## Database Credentials

When running in Docker:

- **Host**: `mysql` (docker-compose automatically resolves this)
- **Port**: `3306`
- **User**: `devuser`
- **Password**: `devuser_password_123`
- **Database**: `dailyquestions_db`

## Common Commands

```powershell
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f mysql

# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove everything including volumes (data)
docker-compose down -v

# Rebuild images after code changes (major changes)
docker-compose up --build

# Execute command in running container
docker-compose exec backend bash
docker-compose exec mysql mysql -u devuser -p dailyquestions_db
```

## Troubleshooting

### "Connection refused"

- Wait a few seconds for MySQL to start
- Check `docker-compose logs mysql` to see errors

### "Cannot find module 'mysql2'"

- Run `npm install mysql2` in your project
- Rebuild: `docker-compose up --build`

### Ports already in use

- Change ports in docker-compose.yml (e.g., `3307:3306` for MySQL)
- Or kill existing containers: `docker-compose down`

### Want to access MySQL directly?

```powershell
docker-compose exec mysql mysql -u devuser -p -e "use dailyquestions_db; SHOW TABLES;"
# Enter password: devuser_password_123
```

## Next Steps

1. Update your service files to use the `db.js` pool
2. Create database tables (you can do this with SQL files in docker-compose)
3. Test API endpoints
4. For production, change the environment variables to secure values

## Production Considerations

Before deploying:

- Use environment file: Create `.env` and use `env_file: .env` in docker-compose
- Use strong passwords
- Don't commit `.env` to git
- Use Docker registries like Docker Hub or Docker Compose services
