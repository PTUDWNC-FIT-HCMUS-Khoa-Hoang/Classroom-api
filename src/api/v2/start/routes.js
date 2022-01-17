import assignmentRoutes from '../components/assignments/routes';
import classroomRoutes from '../components/classrooms/routes';
import invitationRoutes from '../components/invitation/routes';
import userRoutes from '../components/users/routes';
import joinClassroomRoutes from '../components/user_classroom/routes';
import gradeDetailRouter from '../components/grade_detail/routes';
import notificationRoutes from '../components/notifications/routes';

const startRoutes = (app) => {
  app.use('/users', userRoutes);
  app.use('/classrooms', classroomRoutes);
  app.use('/join-classroom', joinClassroomRoutes);
  app.use('/invitation', invitationRoutes);
  app.use('/assignments', assignmentRoutes);
  app.use('/grade-detail', gradeDetailRouter);
  app.use('/notifications', notificationRoutes);

  //404
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  //500 - Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      status: err.status || 500,
    });
  });
};

export default startRoutes;
