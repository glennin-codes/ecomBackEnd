const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Product } = require('../models/product');

router.post('/notify-seller', async (req, res) => {
  const { products, buyer } = req.body;

  const promises = products.map(async (product) => {
    const foundProduct = await Product.findById(product.product_id);
    if (foundProduct) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com', // replace with your own email address
          pass: 'your_email_password' // replace with your own email password
        }
      });

const Mailgen = require('mailgen');
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'ComradeBiz',
    link: 'https://comradeBiz.live/',
    // Add your product image here
    // The image should be hosted on a public URL
    // You can use the product.image[0] property if it contains the image URL
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
  },
});

// Generate an HTML email using Mailgen
const email = {
  body: {
    name: foundProduct.sellerName,
    intro: 'A client has inquired about your Product:',
    table: {
      data: [
        {
          item: product.name,
          description: product.category,
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
      link: product.image[0],
      alt: 'Product image'
    }
  },
};

const emailBody = mailGenerator.generate(email);


const mailOptions = {
  from: buyer.email,
  to: foundProduct.sellerEmail,
  subject: 'New order from a buyer',
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
      return Promise.reject(new Error(`No seller email found for product ${product.product_id}.`));
    }
  });

  try {
    const results = await Promise.all(promises);
    res.status(200).json({ message: 'Notification emails sent successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while sending the notification emails.' });
  }
});

module.exports = router;
