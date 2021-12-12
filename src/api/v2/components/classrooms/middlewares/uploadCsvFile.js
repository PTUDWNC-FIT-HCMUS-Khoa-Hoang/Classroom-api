import upload from 'express-fileupload';

const uploadCsvFile = upload({
  useTempFiles: true,
  tempFileDir: process.cwd() + '/public/csv/classroom',
});

export default uploadCsvFile;
