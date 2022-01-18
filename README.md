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
      title: String,
      subTitle?: String,
      gradeStructure: [
        {
          title: String,
          grade: Number,
          isFinalized: Boolean
        },
      ],
      studentList: [
        {
          studentId: String,
          studentName: String
        }
      ]
      ```

4.  Update one by id (teacher, owner only)

    - **Method**: PUT
    - **Route**: /classrooms/:id
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:
      ```javascript
      title?: String,
      subTitle?: String,
      invitationCode?: String,
      gradeStructure?: [
        {
          title: String,
          grade: Number,
          isFinalized?: Boolean,
          _id?: String
        },
      ]
      ```

5.  Update student list (owner only)
    - **Method**: PUT
    - **Route**: /classrooms/student-list/csv/:classroomId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:
      ```javascript
      FormData({
        files: {
          csv: //csv file here
        }
      })
      ```
6.  Get student list in csv format (owner only)
    - **Method**: GET
    - **Route**: /classrooms/student-list/csv/:classroomId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```

#### Grade Detail

1.  Post one

    - **Method**: POST
    - **Route**: /grade-detail
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
    - **Body**:
      ```javascript
      classroomId: String,
      studentId: String,
      gradeId: String,
      grade?: Number (0 - 100),
      ```

2.  Post csv for 1 type of grade

    - **Method**: POST
    - **Route**: /grade-detail/csv/:classroomId/:gradeId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data'
      }
      ```
    - **Body**:
      ```javascript
      FormData: {
        files: {
          csv: //csv file here
        }
      }
      ```

3.  Get data in csv format by grade

    - **Method**: GET
    - **Route**: /grade-detail/csv/:classroomId/:gradeId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```

4.  Get data in csv format by classroom
    - **Method**: GET
    - **Route**: /grade-detail/csv/:classroomId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
      ```
5.  Get grade board by classroomId
    - **Method**: GET
    - **Route**: /grade-detail/:classroomId
    - **Header**:
      ```javascript
      {
        Authorization: `Bearer ${token}`;
      }
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
3.  Update multiple assignments
    - **Method**: PUT
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
        assignments: [
          {
            _id: String,
            title: String,
            grade: Number,
            displayOrder: Number,
          },
        ];
      }
      ```
4.  Delete an assignment
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

4. Get One By Student Id

   - **Method**: GET
   - **Route**: /users/student/:studentId

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

#### Notifications

1. Get mine
   - **Method**: GET
   - **Route**: /notifications/mine
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
2. Put one
   - **Method**: PUT
   - **Route**: /notifications/:id
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
   - **Body**:
     ```javascript
     {
       isRead: Boolean;
     }
     ```

#### Grade Review

1. Post One (by student)
   - **Method**: POST
   - **Route**: /grade-reviews
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
   - **Body**:
     ```javascript
      {
        gradeDetail: ObjectId,
        studentExpectation: Number,
        studentExplanation: String
      }
     ```
2. Get One By ClassroomId (teacher & owner)
   - **Method**: GET
   - **Route**: /grade-reviews/by-classroom-id/:classroomId
   - **Header**:
     ```javascript
     {
       Authorization: `Bearer ${token}`;
     }
     ```
