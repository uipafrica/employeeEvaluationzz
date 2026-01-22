const nodemailer = require('nodemailer');

// Create transporter for SMTP
const createTransporter = () => {
  // Try port 465 with SSL first (most common for custom mail servers)
  // If this doesn't work, try the alternative configuration below with port 587
  return nodemailer.createTransport({
    host: "mail.uipafrica.com",
    port: 465,
    secure: true, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: "notifications@uipafrica.com",
      pass: "@Test1234ps",
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates if needed
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000 // 10 seconds
  });

  // Alternative configuration if port 465 doesn't work - uncomment and comment out above:
  /*
  return nodemailer.createTransport({
    host: "mail.uipafrica.com",
    port: 587,
    secure: false, // false for 587 (TLS)
    auth: {
      user: "notifications@uipafrica.com",
      pass: "@Test1234ps",
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
  */
};

// Send evaluation email to employee
async function sendEvaluationEmail(employeeEmail, evaluationLink, referenceNumber) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: "notifications@uipafrica.com",

      to: employeeEmail,
      subject: 'Employee Evaluation - Action Required',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4a5568; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f7fafc; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3182ce; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #718096; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Employee Evaluation</h1>
            </div>
            <div class="content">
              <p>Dear Employee,</p>
              <p>Your performance evaluation has been completed. Please review your evaluation and provide your acknowledgment.</p>
              <p><strong>Reference Number:</strong> ${referenceNumber}</p>
              <p>Click the button below to view and acknowledge your evaluation:</p>
              <div style="text-align: center;">
                <a href="${evaluationLink}" class="button">View Evaluation</a>
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #718096;">
                <strong>Note:</strong> This link is secure and unique to your evaluation. Please do not share it with others.
              </p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Employee Evaluation - Action Required
        
        Your performance evaluation has been completed.
        Reference Number: ${referenceNumber}
        
        Please review your evaluation at: ${evaluationLink}
        
        This link is secure and unique to your evaluation.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEvaluationEmail };

