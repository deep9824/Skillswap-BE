import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "archedevs@gmail.com",
    pass: "wdstplrvysdskpxp",
  },
});

const sendEmails = async (recipient: any, html: any) => {
  console.log(html);

  const mailOptions = {
    from: "archedevs@gmail.com",
    to: recipient,
    subject: "THIS IS TEMPLATE FOR EMAIL",
    text: `Hello  ${recipient}`,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
  }
};

export const Template = async (to: any, destination: any) => {
  try {
    let htmlData = await ejs.renderFile(path.join(__dirname, destination),{email:to});

    const response = await sendEmails(to, htmlData);
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
