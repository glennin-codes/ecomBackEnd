import nodemailer from "nodemailer";
import { config } from "./Config.js";
import { google } from "googleapis";
import dotenv from 'dotenv'
dotenv.config();




const Email = async (options) => {
  const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(
  config.clientId,
 config.clientSecret,
  config.clientUrl
);

// // const mAccessToken = await new Promise((resolve, reject) => {
// //   OAuth2_client.getAccessToken((err, token) => {
// //     if (err) {
// //       reject();
// //     }
// //     resolve(token);
// //   });
// // });
  try{
  
  OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
  const myAccessToken= await OAuth2_client.getAccessToken()
  let transpoter = nodemailer.createTransport({
    service: "gmail", //i use outlook
    auth: {
      type: 'OAuth2',
      user: config.user,
      clientId:config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken:myAccessToken
    },
  });
   transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}catch(err){
  console.error(err);
}

};

// send email
const EmailSender = ({ FirstName, LastName, email, number, message }) => {
  const options = {
    from: `MilesMotors <${config.user}>`,
    to: "ayiendaglen@gmail.com ,kevinmbui@gmail.com,info@amschel.tech",
    subject: "Message From MILES MOTORS",
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color:  #bd0548; padding: 20px 0">
          <a href="milemotors.vercel.app" ><img
              src="https://www.pngall.com/wp-content/uploads/5/Range-Rover-PNG-Image-File.png"
              style="width: 100%; height: 70px; object-fit: contain"
            /></a> 
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
            From MilesMotors
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${FirstName} ${LastName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Phone: <b>${number}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options);
};

export default EmailSender;