import nodemailer from 'nodemailer';

const sendMailByGmail = async ({ receiverEmail, subject, text, html }) => {
  var transporter = nodemailer.createTransport({
    // config mail server
    service: 'Gmail',
    auth: {
      user: process.env.CUSTOMER_EMAIL_ACCOUNT,
      pass: process.env.CUSTOMER_EMAIL_PASSWORD,
    },
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: `"Khoa & Hoang classroom"<${process.env.CUSTOMER_EMAIL_ACCOUNT}>`,
    to: receiverEmail,
    subject,
    text,
    html,
  };
  try {
    const info = await transporter.sendMail(mainOptions);
    return info;
  } catch (error) {
    throw new Error(error.message);
  }
  // transporter.sendMail(mainOptions, function (err, info) {
  //   if (err) {
  //     console.log(err);
  //     res.redirect('/');
  //   } else {
  //     console.log('Message sent: ' + info.response);
  //     res.redirect('/');
  //   }
  // });
};

export default sendMailByGmail;
