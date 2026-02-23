# Employee Management System - Assignment 1

This is a GraphQL API built with Node.js, Express, and MongoDB for managing employee records and user authentication.

## Student Information
- **Name:** Idrish Yusuf Kaidawala
- **Student ID:** 101498470
- **Assignment:** Assignment 1
- **Course:** COMP 3133 - Full Stack Development II

## Features
- **User Authentication:** Signup and Login with JWT security.
- **Employee Management:** Full CRUD operations for employees.
- **Search Functionality:** Search employees by designation or department.
- **Image Storage:** Employee profile pictures are stored on Cloudinary.
- **Validation:** Data validation using Mongoose schemas.

## Tech Stack
- **Backend:** Node.js, Express
- **API:** GraphQL (Apollo Server)
- **Database:** MongoDB (Mongoose)
- **Encryption:** Bcrypt.js
- **Security:** JWT (JSON Web Tokens)
- **Image Hosting:** Cloudinary

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (Running locally or on MongoDB Atlas)
- Cloudinary Account (For image storage)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd COMP3133_Assignment1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.y8whhcf.mongodb.net/Comp3133_101498470_Assignment1
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server:**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## GraphQL Operations

### 1. Signup (Mutation)
```graphql
mutation {
  signup(username: "johndoe", email: "john@example.com", password: "password123") {
    id
    username
    email
  }
}
```

### 2. Login (Query)
```graphql
query {
  login(usernameOrEmail: "johndoe", password: "password123") {
    token
    user {
      id
      username
    }
  }
}
```

### 3. Add New Employee (Mutation)
```graphql
mutation {
  addEmployee(
    first_name: "Jane"
    last_name: "Smith"
    email: "jane.smith@example.com"
    gender: "Female"
    designation: "Software Engineer"
    salary: 5500
    date_of_joining: "2023-01-15"
    department: "IT"
    employee_photo: "data:image/png;base64,..." # Optional Base64 string
  ) {
    id
    first_name
    designation
  }
}
```

### 4. Get All Employees (Query)
```graphql
query {
  getAllEmployees {
    id
    first_name
    last_name
    designation
    department
  }
}
```

### 5. Search Employee by ID (Query)
```graphql
query {
  getEmployeeById(eid: "65d...abc") {
    id
    first_name
    email
    designation
  }
}
```

### 6. Update Employee (Mutation)
```graphql
mutation {
  updateEmployee(
    eid: "65d...abc",
    salary: 6000,
    designation: "Senior Software Engineer"
  ) {
    id
    salary
    designation
  }
}
```

### 7. Delete Employee (Mutation)
```graphql
mutation {
  deleteEmployee(eid: "65d...abc")
}
```

### 8. Search Employee by Designation or Department (Query)
```graphql
query {
  searchEmployee(department: "IT") {
    id
    first_name
    designation
  }
}
```

## Testing with Postman
1. Open Postman.
2. Set the method to `POST`.
3. Enter the URL: `http://localhost:4000/graphql`.
4. Select `Body` -> `GraphQL`.
5. Enter your query/mutation.
6. For protected routes (optional JWT implementation), add the `Authorization` header: `Bearer <token>`.

## License
ISC
