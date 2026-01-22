# Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- Office 365 email account (for sending emails)

## Installation Steps

1. **Install Backend Dependencies**
   ```bash
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/employee-evaluation
   OFFICE365_EMAIL=your-email@domain.com
   OFFICE365_PASSWORD=your-password
   OFFICE365_HOST=smtp.office365.com
   OFFICE365_PORT=587
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using a local installation:
   ```bash
   # On Windows (if installed as service, it should start automatically)
   # On macOS/Linux
   mongod
   ```

5. **Run the Application**

   **Option 1: Run both server and client together**
   ```bash
   npm run dev
   ```

   **Option 2: Run separately**
   
   Terminal 1 (Backend):
   ```bash
   npm run server
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run client
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## First Steps

1. **Create an Evaluation**
   - Navigate to http://localhost:3000/create
   - Fill out the employee evaluation form
   - Submit the form
   - The employee will receive an email with a secure link

2. **View as Employee**
   - Check the email sent to the employee
   - Click the secure link
   - Review the evaluation
   - Add comments (optional)
   - Type your name and acknowledge

3. **Admin Dashboard**
   - Navigate to http://localhost:3000/admin
   - View all evaluations
   - Use search filters to find specific evaluations
   - Download PDFs of evaluations

## Testing Without Email

If you want to test without setting up email:

1. Create an evaluation
2. Check the server console logs for the evaluation token
3. Manually construct the URL: `http://localhost:3000/evaluation/{token}`
4. Access the evaluation directly

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify MongoDB port (default: 27017)

### Email Not Sending
- Verify Office 365 credentials in `.env`
- Check if MFA is enabled (use app password if so)
- Check server logs for error messages
- See `EMAIL_SETUP.md` for detailed troubleshooting

### Frontend Not Loading
- Ensure both server and client are running
- Check that port 3000 is not in use
- Clear browser cache

### Port Already in Use
- Change `PORT` in `.env` for backend
- Change port in `client/package.json` scripts for frontend

## Next Steps

- Review `README.md` for detailed documentation
- Check `API_ENDPOINTS.md` for API reference
- See `DATABASE_SCHEMA.md` for database structure
- Read `EMAIL_SETUP.md` for email configuration details

