# Email Sending Logic

## Overview

The system uses **nodemailer** with **Office 365 SMTP** to send secure evaluation links to employees when an evaluation is created.

## Configuration

Email settings are configured via environment variables in `.env`:

```env
OFFICE365_EMAIL=your-email@domain.com
OFFICE365_PASSWORD=your-password
OFFICE365_HOST=smtp.office365.com
OFFICE365_PORT=587
FRONTEND_URL=http://localhost:3000
```

## Implementation

### Email Service (`utils/emailService.js`)

The email service creates a nodemailer transporter configured for Office 365 SMTP:

```javascript
const transporter = nodemailer.createTransport({
  host: process.env.OFFICE365_HOST || 'smtp.office365.com',
  port: parseInt(process.env.OFFICE365_PORT || '587'),
  secure: false, // TLS on port 587
  auth: {
    user: process.env.OFFICE365_EMAIL,
    pass: process.env.OFFICE365_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});
```

### Email Sending Flow

1. **Evaluation Creation** (`routes/evaluations.js`):
   - When a supervisor creates an evaluation, a unique secure token is generated
   - The evaluation is saved to MongoDB
   - `sendEvaluationEmail()` is called with:
     - Employee email address
     - Secure evaluation link (format: `${FRONTEND_URL}/evaluation/${token}`)
     - Reference number

2. **Email Content**:
   - **Subject**: "Employee Evaluation - Action Required"
   - **HTML Body**: Professional email template with:
     - Header with system name
     - Reference number display
     - Call-to-action button linking to the evaluation
     - Security notice about the unique link
   - **Plain Text**: Fallback text version for email clients that don't support HTML

3. **Error Handling**:
   - If email sending fails, the error is logged but the evaluation creation still succeeds
   - This ensures evaluations are saved even if email delivery fails
   - The supervisor can manually share the link if needed

### Email Template Structure

The email includes:
- **Header**: Branded header with "Employee Evaluation" title
- **Content**: 
  - Greeting
  - Notification that evaluation is ready
  - Reference number for tracking
  - Secure link button
  - Security notice
- **Footer**: Automated message disclaimer

### Secure Link Format

The secure link is generated as:
```
${FRONTEND_URL}/evaluation/${token}
```

Example:
```
http://localhost:3000/evaluation/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

The token is a cryptographically secure random 64-character hexadecimal string generated using Node.js `crypto.randomBytes()`.

## Office 365 SMTP Setup

### Prerequisites

1. **Office 365 Account**: You need an Office 365 account with email sending permissions
2. **App Password** (if MFA enabled): If multi-factor authentication is enabled, you'll need to create an app-specific password
3. **SMTP Access**: Ensure SMTP is enabled for your Office 365 account

### Getting Office 365 Credentials

1. **Without MFA**:
   - Use your regular Office 365 email and password

2. **With MFA** (Recommended):
   - Go to Office 365 Security Settings
   - Create an "App Password" for mail applications
   - Use this app password instead of your regular password

### Testing Email Configuration

You can test the email configuration by:

1. Creating a test evaluation through the web interface
2. Checking the server logs for email sending status
3. Verifying the email arrives in the employee's inbox

### Troubleshooting

**Common Issues:**

1. **Authentication Failed**:
   - Verify email and password are correct
   - If MFA is enabled, use an app password
   - Check if account is locked or requires password reset

2. **Connection Timeout**:
   - Verify SMTP host and port are correct
   - Check firewall settings
   - Ensure Office 365 SMTP is not blocked

3. **Email Not Received**:
   - Check spam/junk folder
   - Verify employee email address is correct
   - Check server logs for delivery errors
   - Verify Office 365 account has sending permissions

## Security Considerations

1. **Token Security**: 
   - Tokens are cryptographically secure (32 bytes = 64 hex characters)
   - Tokens are unique and non-guessable
   - Tokens are stored securely in the database

2. **Email Security**:
   - Links are unique per evaluation
   - Tokens cannot be reused once evaluation is acknowledged
   - No sensitive information is included in email body

3. **Environment Variables**:
   - Never commit `.env` file to version control
   - Use secure password management for production
   - Rotate credentials regularly

## Production Considerations

For production deployment:

1. **Use Environment-Specific Configuration**:
   - Different email accounts for dev/staging/production
   - Secure credential management (e.g., AWS Secrets Manager, Azure Key Vault)

2. **Email Queue** (Optional):
   - Consider implementing a queue system (e.g., Bull, RabbitMQ) for reliable email delivery
   - Retry failed email sends
   - Track email delivery status

3. **Email Templates**:
   - Consider using a templating engine (e.g., Handlebars, EJS) for more complex templates
   - Support multiple languages if needed

4. **Monitoring**:
   - Log all email sending attempts
   - Monitor email delivery rates
   - Set up alerts for email failures

