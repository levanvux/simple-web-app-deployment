# Simple Web App Deployment

A simple deployment environment for an Express.js web application using Docker, Docker Compose, Nginx, and GitHub Actions.

## Requirements
- Docker
- Docker Compose
- Git

## Install and Run
Clone the repository:
```bash
git clone https://github.com/levanvux/simple-web-app-deployment.git
cd simple-web-app-deployment
```

Create the environment file:
```bash
cp .env.example .env
```

Build and start the services:
```bash
docker compose up -d --build
```

The application is accessible through Nginx on port 80.
Health check:
```bash
curl http://localhost/api/v1/health
```

Expected response:
```JSON
{
  "status": "ok"
}
```

## Start and Stop the services
```bash
docker compose up -d
```

```bash
docker compose stop
```

## Check logs
All services:
```bash
docker compose logs
```

App logs:
```bash
docker compose logs app
```

NGINX logs:
```bash
docker compose logs nginx
```

## Troubleshooting

### Check Service Status

```bash
docker compose ps
```

All services should be running.

### Check Application Health

```bash
curl http://localhost/api/v1/health
```

Expected:

```json
{
  "status": "ok"
}
```

### Nginx Cannot Connect to the Application

Check logs:

```bash
docker compose logs app
docker compose logs nginx
```

Make sure Nginx uses the Compose service name:

```nginx
proxy_pass http://app:3000;
```

Both services must be on the same Docker network.

Check networks:

```bash
docker network ls
docker network inspect simple-web-app-deployment_default
```

### Port 80 Is Already in Use

Check what is using port 80:

```bash
sudo lsof -i :80
```

Or:

```bash
sudo ss -ltnp | grep ':80'
```

Stop the conflicting service or change the port:

```yaml
ports:
  - "8080:80"
```

Then access the application at:

```text
http://localhost:8080
```

### Recreate the Environment

```bash
docker compose down
docker compose up -d --build
```

## CI Pipeline

The project uses GitHub Actions for Continuous Integration.

Workflow:

```text
.github/workflows/ci.yml
```

### CI Steps

1. Checkout - Gets the source code.
2. Setup Node.js - Sets up Node.js.
3. Install dependencies - Runs `npm ci`.
4. Run tests - Runs automated tests.

The CI pipeline does not deploy the application. Deployment is part of Continuous Delivery or Continuous Deployment.

