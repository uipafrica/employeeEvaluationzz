# Employee Evaluation System

A full-stack web application for managing employee evaluations based on the UIPA-QA-R-ADM-4-024 Employee Evaluation Form.

## Features

- **Create Evaluations**: Supervisors can create employee evaluations with performance ratings and comments
- **Employee Review**: Employees receive secure email links to view and acknowledge their evaluations
- **Admin Dashboard**: View all evaluations, search by various criteria, and download PDFs
- **PDF Generation**: Download evaluations as PDFs matching the original form layout
- **Email Notifications**: Automatic email sending via Office 365 SMTP

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Frontend**: React + Tailwind CSS
- **PDF Generation**: pdf-lib
- **Email**: nodemailer with Office 365 SMTP

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/employee-evaluation
   OFFICE365_EMAIL=your-email@domain.com
   OFFICE365_PASSWORD=your-password
   OFFICE365_HOST=smtp.office365.com
   OFFICE365_PORT=587
   FRONTEND_URL=http://localhost:3000
   ```

5. Make sure MongoDB is running on your system

## Running the Application

### Development Mode (runs both server and client)

```bash
npm run dev
```

### Run Server Only

```bash
npm run server
```

### Run Client Only

```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Evaluations

- `POST /api/evaluations/create` - Create a new evaluation
- `GET /api/evaluations/token/:token` - Get evaluation by secure token
- `POST /api/evaluations/acknowledge/:token` - Acknowledge evaluation

### Admin

- `GET /api/admin/evaluations` - Get all evaluations (with optional search parameters)
- `GET /api/admin/evaluations/:id` - Get single evaluation by ID
- `GET /api/admin/evaluations/:id/pdf` - Download evaluation as PDF

## Database Schema

The Evaluation model includes:
- Reference number (unique)
- Secure token (unique)
- Employee information (name, job title, department, email)
- Supervisor information
- Review period (from/to dates)
- Performance ratings (1-5 scale for 11 criteria)
- Comments (overall performance, supervisor, employee)
- Acknowledgment status and signature

## Usage

1. **Create Evaluation**: Navigate to `/create` and fill out the evaluation form
2. **Employee Review**: Employee receives email with secure link to view and acknowledge
3. **Admin Dashboard**: Navigate to `/admin` to view, search, and download evaluations

## Notes

- No authentication is required (as per requirements)
- Each evaluation gets a unique reference number and secure token
- Once acknowledged, evaluations are locked and cannot be modified
- PDFs are generated on-demand and match the original form layout

