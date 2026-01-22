# Employee Evaluation System

A full-stack web application for managing employee evaluations based on the UIPA-QA-R-ADM-4-024 Employee Evaluation Form.

## Features

- **Create Evaluations**: Supervisors can create employee evaluations with performance ratings and comments
- **Employee Review**: Employees receive secure email links to view and acknowledge their evaluations
- **Admin Dashboard**: View all evaluations, search by various criteria, and download PDFs (password: 0000)
- **PDF Generation**: Download evaluations as PDFs matching the original form layout with company logo
- **Email Notifications**: Automatic email sending via SMTP
- **Star Ratings**: Interactive star rating system for performance evaluation
- **Mobile Responsive**: Fully responsive design for all devices

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Frontend**: React + Tailwind CSS
- **PDF Generation**: @react-pdf/renderer (client-side)
- **Email**: nodemailer with SMTP

## Quick Start

### Development

```bash
# Install all dependencies
npm run install-all

# Start development server (runs both backend and frontend)
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

```bash
# Build frontend
npm run build:prod

# Start production server
npm run start:prod
```

## CI/CD

This project includes GitHub Actions workflows for automated building and testing:

- **build.yml**: Builds and tests on every push/PR
- **ci-cd.yml**: Comprehensive CI/CD pipeline
- **deploy.yml**: Production deployment workflow

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── utils/         # Utilities (PDF generation)
│   │   └── assets/        # Assets (logo, etc.)
│   └── build/             # Production build output
├── routes/                # API routes
├── models/                # MongoDB models
├── utils/                 # Server utilities
├── server.js             # Express server
└── package.json          # Backend dependencies
```

## API Endpoints

### Evaluations
- `POST /api/evaluations/create` - Create evaluation
- `GET /api/evaluations/token/:token` - Get evaluation by token
- `POST /api/evaluations/acknowledge/:token` - Acknowledge evaluation

### Admin
- `GET /api/admin/evaluations` - List all evaluations (with search)
- `GET /api/admin/evaluations/:id` - Get single evaluation
- `GET /api/admin/evaluations/:id/pdf` - Download PDF (deprecated - now client-side)

## Environment Variables

Create a `.env` file:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-evaluation
OFFICE365_EMAIL=your-email@domain.com
OFFICE365_PASSWORD=your-password
OFFICE365_HOST=smtp.office365.com
OFFICE365_PORT=587
FRONTEND_URL=http://localhost:3000
```

## License

ISC
