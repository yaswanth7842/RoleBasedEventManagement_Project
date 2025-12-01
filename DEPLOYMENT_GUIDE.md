# Role-Based Event Management System - Deployment Guide

## Quick Deployment Summary

This guide helps you deploy your full-stack Spring Boot + HTML/CSS/JavaScript application on Render.

**Your Project Stack:**
- Backend: Spring Boot 3.5.7, Java 21, Maven
- Frontend: HTML, CSS, JavaScript
- Database: MySQL
- Containerization: Docker

## Deployment Status

✅ **Completed:**
- Dockerfile for backend created
- .dockerignore file added
- GitHub repository linked to Render
- Auto-deploy configured

## Next Steps - Set Up MySQL Database

Your backend requires a MySQL database. Follow these steps:

### Option 1: Use Render PostgreSQL (Recommended for Free Tier)

Render doesn't offer free MySQL, but you can use:
1. **Render PostgreSQL** - Update your pom.xml to use PostgreSQL driver
2. **Aiven MySQL** - Free tier available at aiven.io
3. **Railway** - MySQL free tier at railway.app
4. **Local MySQL** - Connect from your machine (not recommended for production)

### Option 2: Use Aiven for Free MySQL (Recommended)

1. Go to https://aiven.io
2. Sign up for free account
3. Create new MySQL service
4. Get connection string (format: `mysql://user:password@host:port/dbname`)
5. Copy the connection details

## Configure Environment Variables on Render

1. Go to your Render service dashboard
2. Click "Environment" in the left sidebar
3. Add these variables:

```
SPRING_DATASOURCE_URL=jdbc:mysql://your-host:3306/your-database
SPRING_DATASOURCE_USERNAME=your-username
SPRING_DATASOURCE_PASSWORD=your-password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_PROFILES_ACTIVE=prod
PORT=8085
```

4. Click "Save, rebuild, and deploy"

## Verify Build Success

1. Go to Render dashboard
2. Click on your service
3. Check "Logs" tab for build output
4. Look for: "Successfully built Docker image"

## Frontend Deployment

For your static frontend files:
1. Create a new Static Site service on Render
2. Point to your `/Event_Management_Project/frontend` folder
3. Build command: (leave empty for static files)
4. Publish directory: `./`

## Troubleshooting

**Build fails with "port already in use":**
- The PORT environment variable is set to 8085
- Render will assign a random port, ensure your app listens on PORT env variable

**Database connection fails:**
- Verify DATABASE_URL is correct
- Check username/password
- Allow Render IP in database firewall

**Application crashes on startup:**
- Check Logs tab in Render dashboard
- Common issue: Missing database tables - use `spring.jpa.hibernate.ddl-auto=update`

## Important Notes

⚠️ **Current Configuration:**
- The backend will try to build from: `Event_Management_Project/backend/RoleBasedEventManagement`
- Ensure this path matches your repository structure
- Docker build needs pom.xml in this directory ✅

## Your Deployment URLs

Once deployed successfully:
- Backend API: https://rolebasedeventmanagement-project-1.onrender.com
- Frontend: https://your-frontend-service.onrender.com

## Support

For issues:
1. Check Render Logs
2. Review application.properties configuration
3. Verify environment variables are set
4. Check database connectivity
