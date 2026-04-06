# Finance Tracker

<Callout type="info">
  This project is a comprehensive full-stack financial management application built with the MERN stack. It allows users to securely track income and expenses, analyze financial data through aggregated dashboards, and enforces access restrictions based on user roles. The system features a responsive React frontend paired with a robust Node.js backend using MongoDB for data persistence.
</Callout>

## Tech Stack

<Grid columns={2} gap="4">
  <Card title="Frontend">
    <div className="flex flex-wrap gap-2">
      <Badge color="blue">React.js</Badge>
      <Badge color="blue">React Router DOM</Badge>
      <Badge color="cyan">Tailwind CSS</Badge>
      <Badge color="purple">Axios</Badge>
    </div>
  </Card>
  
  <Card title="Backend">
    <div className="flex flex-wrap gap-2">
      <Badge color="green">Node.js</Badge>
      <Badge color="gray">Express.js</Badge>
      <Badge color="green">MongoDB</Badge>
      <Badge color="red">Mongoose</Badge>
      <Badge color="yellow">JWT Authentication</Badge>
      <Badge color="gray">Express Validator</Badge>
      <Badge color="gray">Express Rate Limit</Badge>
    </div>
  </Card>
</Grid>

## Core Features

### Security & Authentication
* Secure user registration and login workflows using JSON Web Tokens.
* Password hashing implemented via bcrypt.
* Protected API routes and React components restricted by user roles.
* API rate limiting to prevent abuse.

### Dashboard & Analytics
* High-level financial summary displaying total income, total expense, and dynamically calculated net balance.
* Category-wise breakdown to quickly identify spending patterns.
* Quick-access feed of recent transactions.
* Data aggregated using MongoDB aggregation pipelines for optimal performance.
* Monthly trends visualization support.

### Records Management
* Streamlined data entry for adding income or expense records.
* Comprehensive data table for viewing historical records.
* Server-side and client-side pagination for handling large datasets.
* Advanced search by notes, transaction types, and categories.
* Custom date range filtering capabilities.
* Soft delete support for maintaining data integrity.

### Administrative Controls
* Dedicated user management interface.
* Real-time role assignment capabilities.
* Account status toggling to instantly activate or deactivate user accounts.

## Role-Based Access Control

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Permissions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Admin</strong></td>
      <td>Full access to users, records, and dashboard functionalities.</td>
    </tr>
    <tr>
      <td><strong>Analyst</strong></td>
      <td>Can create and view financial records and access the dashboard.</td>
    </tr>
    <tr>
      <td><strong>Viewer</strong></td>
      <td>Restricted to read-only access for viewing records and dashboard data.</td>
    </tr>
  </tbody>
</table>

## API Endpoints

<Grid columns={2} gap="6">
  <div>
    ### Authentication
    * `POST /api/auth/register`
    * `POST /api/auth/login`
  </div>
  
  <div>
    ### Records
    * `GET /api/records`
    * `POST /api/records`
    * `DELETE /api/records/:id`
  </div>
  
  <div>
    ### Dashboard
    * `GET /api/dashboard`
    * `GET /api/dashboard/trends`
  </div>
  
  <div>
    ### Users & System
    * `GET /api/users`
    * `PUT /api/users/:id/role`
    * `PUT /api/users/:id/status`
    * `GET /api/health`
  </div>
</Grid>

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd <project-directory>
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

### Testing
Use Postman or a similar tool to test backend APIs. Ensure the Authorization header is set with your active token for protected routes:

```
Authorization: Bearer <token>
```
