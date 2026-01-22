# API Endpoints Documentation

Base URL: `http://localhost:5000/api`

## Evaluation Endpoints

### Create Evaluation

**POST** `/evaluations/create`

Creates a new employee evaluation and sends an email to the employee.

**Request Body:**
```json
{
  "employeeName": "John Doe",
  "jobTitle": "Software Engineer",
  "department": "IT",
  "supervisorName": "Jane Smith",
  "reviewPeriodFrom": "2024-01-01",
  "reviewPeriodTo": "2024-12-31",
  "employeeEmail": "john.doe@company.com",
  "performanceRatings": {
    "qualityOfWork": 4,
    "attendancePunctuality": 5,
    "reliability": 4,
    "communicationSkills": 4,
    "decisionMaking": 3,
    "initiativeFlexibility": 4,
    "cooperationTeamwork": 5,
    "knowledgeOfPosition": 4,
    "technicalSkills": 5,
    "innovation": 3,
    "trainingDevelopment": 4
  },
  "overallPerformanceComments": "Excellent performance throughout the year.",
  "supervisorComments": "John has shown great improvement in technical skills."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Evaluation created successfully",
  "data": {
    "referenceNumber": "EVAL-LXK9M2-A3B7",
    "id": "507f1f77bcf86cd799439011"
  }
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "msg": "Employee name is required",
      "param": "employeeName",
      "location": "body"
    }
  ]
}
```

---

### Get Evaluation by Token

**GET** `/evaluations/token/:token`

Retrieves an evaluation using the secure token (for employee access).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "referenceNumber": "EVAL-LXK9M2-A3B7",
    "employeeName": "John Doe",
    "jobTitle": "Software Engineer",
    "department": "IT",
    "supervisorName": "Jane Smith",
    "reviewPeriodFrom": "2024-01-01T00:00:00.000Z",
    "reviewPeriodTo": "2024-12-31T23:59:59.999Z",
    "employeeEmail": "john.doe@company.com",
    "performanceRatings": { ... },
    "overallPerformanceComments": "...",
    "supervisorComments": "...",
    "employeeComments": "",
    "acknowledged": false,
    "signatureName": "",
    "signatureTimestamp": null,
    "createdAt": "2024-12-10T08:00:00.000Z",
    "updatedAt": "2024-12-10T08:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Evaluation not found"
}
```

---

### Acknowledge Evaluation

**POST** `/evaluations/acknowledge/:token`

Allows an employee to acknowledge their evaluation by providing comments and signature.

**Request Body:**
```json
{
  "employeeComments": "Thank you for the feedback. I will continue to improve.",
  "signatureName": "John Doe"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Evaluation acknowledged successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "acknowledged": true,
    "signatureName": "John Doe",
    "signatureTimestamp": "2024-12-15T10:30:00.000Z",
    "employeeComments": "Thank you for the feedback. I will continue to improve.",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Evaluation has already been acknowledged"
}
```

---

## Admin Endpoints

### Get All Evaluations

**GET** `/admin/evaluations`

Retrieves all evaluations with optional search/filter parameters.

**Query Parameters:**
- `employeeName` (optional): Filter by employee name (case-insensitive partial match)
- `department` (optional): Filter by department (case-insensitive partial match)
- `reviewPeriodFrom` (optional): Filter by review period start date (ISO format)
- `reviewPeriodTo` (optional): Filter by review period end date (ISO format)
- `search` (optional): General search across name, department, and reference number

**Example:**
```
GET /admin/evaluations?employeeName=John&department=IT&search=EVAL
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "referenceNumber": "EVAL-LXK9M2-A3B7",
      "employeeName": "John Doe",
      "jobTitle": "Software Engineer",
      "department": "IT",
      "supervisorName": "Jane Smith",
      "reviewPeriodFrom": "2024-01-01T00:00:00.000Z",
      "reviewPeriodTo": "2024-12-31T23:59:59.999Z",
      "employeeEmail": "john.doe@company.com",
      "performanceRatings": { ... },
      "acknowledged": true,
      "signatureName": "John Doe",
      "signatureTimestamp": "2024-12-15T10:30:00.000Z",
      "createdAt": "2024-12-10T08:00:00.000Z",
      "updatedAt": "2024-12-15T10:30:00.000Z"
    }
  ]
}
```

**Note:** The `token` field is excluded from admin responses for security.

---

### Get Single Evaluation

**GET** `/admin/evaluations/:id`

Retrieves a single evaluation by MongoDB ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "referenceNumber": "EVAL-LXK9M2-A3B7",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Evaluation not found"
}
```

---

### Download Evaluation PDF

**GET** `/admin/evaluations/:id/pdf`

Downloads an evaluation as a PDF file matching the original form layout.

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="evaluation-EVAL-LXK9M2-A3B7.pdf"`
- Body: PDF binary data

**Error Response (404):**
```json
{
  "success": false,
  "message": "Evaluation not found"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Error generating PDF",
  "error": "Error message details"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

