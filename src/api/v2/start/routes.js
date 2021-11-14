import classroomRoutes from '../components/classrooms/routes';
import userRoutes from '../components/users/routes';
import joinClassroomRoutes from '../components/user_classroom/routes';

const startRoutes = (app) => {
  app.use('/users', userRoutes);
  app.use('/classrooms', classroomRoutes);
  app.use('/join-classroom', joinClassroomRoutes);

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
