const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../../Emails/Contactus/util/Config');

const Mailgen = require('mailgen');

const Notify= async (req, res) => {
  const { buyer,products } = req.body;
  console.log(products);
  console.log(typeof products);
  const promises = products && products.map(async (product) => {
  
    if (product) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:EMAIL, // replace with your own email address
          pass: PASSWORD// replace with your own email password
        }
      });

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'ComradeBiz',
    link: 'https://www.comradesbiz.live',
    // Add your product image here
    // The image should be hosted on a public URL
    // You can use the product.image[0] property if it contains the image URL
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
  },
});

// Generate an HTML email using Mailgen
const email = {
  body: {
    name: product.user,
    intro: 'A client has inquired about your Product: ',

    table: {
      data: [
        {
              Name: `${buyer.name}`,
    Phone: `${buyer.phone}`,
    Email: `${buyer.email}`,
    Message: `${buyer.message}`,
          item: `${product.name}`,
           Price: `${product.price}`,


         
        },

      ],
      columns: {
        customWidth: {
          item: '20%',
          description: '80%',
        },
        customAlignment: {
          item: 'left',
          description: 'left',
        },
      },
    },
    outro: 'Please contact the buyer to arrange the details of the transaction.',
  productImage: {
      link: product.image,
      alt: 'Product image'
    }
  },
};

const emailBody = mailGenerator.generate(email);


const mailOptions = {
  from: buyer.email,
  to:EMAIL,
  subject: 'New order from a client',
  html: emailBody,
  
};

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
           
            reject(error);
          } else {
            console.log('Email sent: ' + info.response);
            
            resolve(info);
          }
        });
      });
    } else {
      return Promise.reject(new Error(`No seller email found`));
    }
  });

  try {
    const results = await Promise.all(promises);
    console.log(results);
    res.status(200).json({ message: 'Notification emails sent successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while sending the notification emails.' });
  }
}

module.exports = Notify;
