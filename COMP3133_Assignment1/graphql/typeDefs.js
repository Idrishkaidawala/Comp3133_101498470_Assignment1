const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    created_at: Date
    updated_at: Date
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
    created_at: Date
    updated_at: Date
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthResponse
    getAllEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
    searchEmployee(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      designation: String!
      salary: Float!
      date_of_joining: Date!
      department: String!
      employee_photo: String
    ): Employee
    updateEmployee(
      eid: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Float
      date_of_joining: Date
      department: String
      employee_photo: String
    ): Employee
    deleteEmployee(eid: ID!): String
  }
`;

module.exports = typeDefs;
