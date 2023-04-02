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

      const mailOptions = {
        from: buyer.email,
        to: foundProduct.sellerEmail,
        subject: 'New order from a buyer',
        text: `
          Hello,

          You have a new order from ${buyer.name} (${buyer.email}, ${buyer.contact}) for the following product:

          ${product.product_id} - ${product.seller_email}

          Please contact the buyer to arrange the details of the transaction.

          Thank you.
        `
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
