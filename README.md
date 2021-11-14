# advanced-web-classroom-server

## Description

This is a web application for my Web Development course on my university.

## Version 1

## Version 2

### Stacks

- NodeJS
- ExpressJS
- MongoDB (mongoose.js ORM)

### API endpoints

#### Classrooms

1.  Get all related classrooms
    - **Method**: GET
    - **Route**: /classrooms/
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
2.  Get one by id
    - **Method**: GET
    - **Route**: /classrooms/:id
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
3.  Post one

    - **Method**: POST
    - **Route**: /classrooms
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:

    ```javascript
    title: {
      type: String,
      required: true,
    },
    gradings: [
      {
        title: {
          type: String,
          required: true,
        },
        ratio: {
          type: Number,
          required: true,
          min: 0,
          max: 1,
        },
      },
    ]
    ```

#### Users

1. Login

   - **Method**: POST
   - **Route**: /users/login
   - **Body**:

   ```javascript
   {
       email: String,
       password: String
   }
   ```

2. Register

   - **Method**: POST
   - **Route**: /users/register
   - **Body**:

   ```javascript
   {
       email: String,
       password: String
   }
   ```

3. Update profile

   - **Method**: PUT
   - **Route**: /users/me
   - **Body**:

   ```javascript
   {
       email: String,
       password: String,
       fullname: String,
       studentId: String
   }
   ```

   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
