# Job Portal Backend

A REST API backend for a Job Portal built with Node.js, Express.js, MongoDB and JWT Authentication.

## Features
- User registration and login with JWT & Cookie-based authentication
- Three roles: Admin, Recruiter, and Student
- Company registration and management
- Job posting by recruiters
- Job search and filtering for students
- Job application system
- Applicant tracking for recruiters
- Application status updates

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Cookie-Parser
- bcryptjs

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register new user |
| POST | /login | Login user |
| POST | /update | Update user profile |
| GET | /logout | Logout user |

### Company
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /registerCompany | Register new company |
| PUT | /UpdateCompany | Update company details |
| GET | /getCompanyById | Get company by ID |
| GET | /getAllCompanies | Get all companies |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /postJob | Post a new job |
| GET | /GetJobs | Get all jobs |
| GET | /GetJobById | Get job by ID |
| GET | /getAdminJobs | Get admin jobs |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /applyJob | Apply for a job |
| GET | /getAppliedJobs | Get applied jobs |
| GET | /applicants | Get all applicants |
| POST | /statusUpdate | Update application status |

## Installation

```bash
# Clone the repository
git clone https://github.com/RahulSAxena2628/job-portal-backend.git

# Go to project directory
cd job-portal-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run the server
npm start
```

## Environment Variables
Create a `.env` file with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```
