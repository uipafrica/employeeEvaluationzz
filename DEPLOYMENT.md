# Deployment Guide

## Building for Production

### Step 1: Install Dependencies

```bash
npm run install-all
```

This will install both backend and frontend dependencies.

### Step 2: Build Frontend

```bash
npm run build:prod
```

This builds the React app and places it in `client/build` folder.

### Step 3: Set Environment Variables

Create a `.env` file in the root directory with:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OFFICE365_EMAIL=your-email@domain.com
OFFICE365_PASSWORD=your-password
OFFICE365_HOST=smtp.office365.com
OFFICE365_PORT=587
FRONTEND_URL=https://your-domain.com
```

### Step 4: Start Production Server

```bash
npm run start:prod
```

Or simply:

```bash
npm start
```

The server will:
- Serve the built React app from `client/build` folder
- Handle all API routes at `/api/*`
- Serve the React app for all other routes (SPA routing)

## Production Scripts

- `npm run build:prod` - Build the frontend for production
- `npm start` - Start the server (development mode)
- `npm run start:prod` - Start the server in production mode
- `npm run dev` - Start both server and client in development mode

## Important Notes

1. **Environment Variables**: Make sure all environment variables are set before starting production
2. **MongoDB**: Ensure MongoDB is accessible from your production server
3. **Email Configuration**: Verify Office 365 SMTP settings work in production
4. **Port**: The server will use `PORT` environment variable or default to 5000
5. **Static Files**: All static files (including the React app) are served from `client/build` in production

## Deployment Checklist

- [ ] Install all dependencies (`npm run install-all`)
- [ ] Build frontend (`npm run build:prod`)
- [ ] Set all environment variables in `.env`
- [ ] Test MongoDB connection
- [ ] Test email sending
- [ ] Start production server (`npm run start:prod`)
- [ ] Verify API endpoints are working
- [ ] Verify frontend is being served correctly
- [ ] Test all routes (including React Router routes)

## Server Configuration

The server automatically:
- Serves static files from `client/build` in production mode
- Handles React Router routes by serving `index.html` for all non-API routes
- Serves API routes at `/api/*`
- Uses CORS for cross-origin requests

