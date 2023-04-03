// const {google} =require('googleapis');
const nodemailer=require ('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('./util/Config')

const sendMail= (options) => {

  let config = {
    service : 'gmail',
    auth : {
        user: EMAIL,
        pass: PASSWORD
    }
}

let transporter = nodemailer.createTransport(config);


  transporter.sendMail(options).then((error,info) => {
if (info && info.response){
  console.log('Email sent: ' + info.response);

}
if (error) {
  console.log(error);
} else {
  console.log('Email sent');
}

    
      
  }).catch(error => {
      console.error(error);
  })


}

const  VerifyEmail=({email,code,name})=>{

  

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'ComradesBiz Association',
    link: 'https://www.comradesbiz.live',
    logo: 'https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp'
  }
})
// generate the email body with verification URL link

const verificationLink = `https://www.comradesbiz.live/verifyCode?email=${email}&code=${code} `; 
let response = {
  body: {
    name: `${name}`,
    intro: `Dear ${name},\n\nThank you for registering for our website! Before you can start using your account, we need to verify your email address. Please click on the following link to complete the verification process:`,
    action: {
      instructions: 'Verification Link:',
      button: {
        color: '#22BC66',
        text: 'Verify Email Address',
        link: verificationLink
      }
    },
    outro: 'Please note that this link is only valid for the next 24 hours. After that, you will need to request a new verification email.\n\nThank you for your cooperation.'
  }
}

let mail = MailGenerator.generate(response)

const options= {
   
    from: `ComradesBizna <${EMAIL}>`,
    to: `${email}`,
    subject: `Message From  ComradesBiz Email verification`,
    html:mail

}
sendMail(options)
}

const contactUs=({name,email,phone,message})=>{
  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'ComradesBiz Association',
      link: 'https://www.comradesbiz.live',
      logo: 'https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp'
    }
  })
  let response={
  body: {
    name: name,
    intro: 'A new customer has inquired about your products:',
    table: {
      data: [
        { key: 'Name', value: name },
        { key: 'Email', value: email },
        { key: 'Phone', value: phone },
        { key: 'Message', value: message }
      ],
      columns: {
        customWidth: {
          key: '20%',
          value: '80%'
        },
        fill: {
          type: 'fill',
          color: '#E5E5E5'
        },
        textColor: {
          type: 'textColor',
          color: '#333333'
        },
        paddingLeft: {
          type: 'padding',
          value: '16px 24px 16px 0'
        },
        paddingRight: {
          type: 'padding',
          value: '16px 0 16px 24px'
        },
        heading: {
          type: 'textStyle',
          bold: true,
          color: '#333333'
        }
      }
    },
    outro: 'comradesBiz association'
  }
}
let mail = MailGenerator.generate(response);
const options = {
   
  from: `ComradesBizna <${email}>`,
  to: `${EMAIL}`,
  subject: `Message From  ComradesBiz ..a customer Enquiry`,
  html:mail

}
sendMail(options)
}


module.exports={ VerifyEmail,contactUs }




// const Email = async (options) => {
//   const OAuth2 = google.auth.OAuth2;
// const OAuth2_client = new OAuth2(
//   config.clientId,
//  config.clientSecret,
//   config.clientUrl
// );

// // // const mAccessToken = await new Promise((resolve, reject) => {
// // //   OAuth2_client.getAccessToken((err, token) => {
// // //     if (err) {
// // //       reject();
// // //     }
// // //     resolve(token);
// // //   });
// // // });
//   try{
  
//   OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
//   const myAccessToken= await OAuth2_client.getAccessToken()
//   let transpoter = nodemailer.createTransport({
//     service: "gmail", 
//     auth: {
//       type: 'OAuth2',
//       user: config.user,
//       clientId:config.clientId,
//       clientSecret: config.clientSecret,
//       refreshToken: config.refreshToken,
//       accessToken:myAccessToken
//     },
//   });
//    transpoter.sendMail(options, (err, info) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   });
// }catch(err){
//   console.error(err);
// }

// };
// const VerifyEmail=({email,name,code})=>{
//     const  options = {
//       from: `ComradesBizna <${config.user}>`,
//       to: `${email}`,
//       subject: `Message From  ComradesBiz Email verification`,
//       html: `
//           <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
//           <div style="max-width: 700px; background-color: white; margin: 0 auto">
//             <div style="width: 100%; background-color:  #bd0548; padding: 20px 0">
//             <a href="shopify-omega-green.vercel.app" ><img
//                 src="https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp"
//                 style="width: 100%; height: 70px; object-fit: contain"
//               /></a> 
            
//             </div>
//             <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
//               <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
//                Enquiry From ComradesBiz 
//               </p>
//               <div style="font-size: .8rem; margin: 0 30px">
//               <p>Dear ${name},

//               Thank you for registering for our website! Before you can start using your account, we need to verify your email address. Please click on the following link to complete the verification process:
              
//               <a href='https://shopify-admin-three.vercel.app/verifyCode?email=${email}&code=${code} '>https://shopify-admin-three.vercel.app/verifyCode?email=${email}&code=${code}  </a>
              
//               If you are unable to click on the link above, please copy and paste the following URL into your web browser:
              
//               https://shopify-admin-three.vercel.app/verifyCode?email=${email}&code=${code} 
              
//               Please note that this link is only valid for the next 24 hours. After that, you will need to request a new verification email.
              
//               Thank you for your cooperation.
              
//               Best regards,
//               <a href="shopify-omega-green.vercel.app" >
//               comrazeBizna.com
//               </a>
//               </p>
                
//               </div>
//             </div>
//           </div>
//         </div>
//           `,
//         }
//         Email(options)
// }

// // send email
// const EmailSender = ({ FirstName, LastName, email, number, message }) => {
//   const  options = {
//     from: `ComradesBizna <${FirstName} ${LastName}>`,
//     to: "ayiendaglen@gmail.com ",
//     subject: `Message From  ComradesBiz ..a customer Enquiry`,
//     html: `
//         <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
//         <div style="max-width: 700px; background-color: white; margin: 0 auto">
//           <div style="width: 100%; background-color:  #bd0548; padding: 20px 0">
//           <a href="shopify-omega-green.vercel.app" ><img
//               src="https://www.pngall.com/wp-content/uploads/5/Range-Rover-PNG-Image-File.png"
//               style="width: 100%; height: 70px; object-fit: contain"
//             /></a> 
          
//           </div>
//           <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
//             <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
//              Enquiry From ComradesBiz 
//             </p>
//             <div style="font-size: .8rem; margin: 0 30px">
//               <p>FullName: <b>${FirstName} ${LastName}</b></p>
//               <p>Email: <b>${email}</b></p>
//               <p>Phone: <b>${number}</b></p>
//               <p>Message: <i>${message}</i></p>
//             </div>
//           </div>
//         </div>
//       </div>
//         `,

  
//   };

//   Email(options);
// };

// module.exports={ EmailSender,VerifyEmail };