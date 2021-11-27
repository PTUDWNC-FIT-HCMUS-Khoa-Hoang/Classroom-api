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
      subTitle: {
        type: String
      },
      gradeStructure: [
        {
          title: String,
          grade: Number,
        },
      ]
      ```

#### Assignments

1.  Create an assignment
    - **Method**: POST
    - **Route**: /assignments/
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:
      ```javascript
      {
        title: String,
        grade: Number,
        classroomId: String
      }
      ```
2.  Update an assignment
    - **Method**: PUT
    - **Route**: /assignments/:id
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:
      ```javascript
      {
        title: String,
        grade: Number
      }
      ```
3.  Delete an assignment
    - **Method**: DELETE
    - **Route**: /assignments/:id
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```

#### Users

1. Login

   a. Email

   - **Method**: POST
   - **Route**: /users/login
   - **Body**:
     ```javascript
     {
         email: String,
         password: String
     }
     ```

   b. Google

   - **Method**: POST
   - **Route**: /users/login/google
   - **Body**:
     ```javascript
     {
       tokenId: String; //tokenId retrieved from Google
     }
     ```

2. Register

   a. Email

   - **Method**: POST
   - **Route**: /users/register
   - **Body**:
     ```javascript
     {
         email: String,
         password: String
     }
     ```

   b. Google

   - **Method**: POST
   - **Route**: /users/register/google
   - **Body**:
     ```javascript
     {
       tokenId: String; //tokenId retrieved from Google
     }
     ```

3. Update profile

   - **Method**: PUT
   - **Route**: /users/me
   - **Body**:

     ```javascript
      {
          currentPassword: String,
          password?: String,
          fullname?: String,
          studentId?: String
      }
     ```

   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```

#### User Classroom (Join classroom)

1. Check participation

   - **Method**: GET
   - **Route**: /join-classroom/check/:classroomId
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```

2. Get by invitation code (join classroom by invitation code)
   - **Method**: GET
   - **Route**: /join-classroom/code/:invitationCode
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```

#### Invitation

1. Accept classroom invitation (get accept classroom)
   - **Method**: GET
   - **Route**: /invitation/classroom/accept/:invitationId
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
2. Create classroom invitation (post classroom)

   - **Method**: POST
   - **Route**: /invitation/classroom
   - **Header**:

     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```

   - **Body**:
     ```javascript
     {
         userEmail: String,
         classroomId: String,
         role: 'teacher' | 'student'
     }
     ```
