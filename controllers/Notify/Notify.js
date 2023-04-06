const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../../Emails/Contactus/util/Config");

const Notify = async (req, res) => {
  const { buyer, products } = req.body;

  const promises = products.map(async (product) => {
    if (product.user) {
      console.log("user", product.user);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "ComradeBiz",
          link: "https://www.comradesbiz.live",
          logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
        },
      });

      try {
        const emailBody = mailGenerator.generate({
          body: {
            name: buyer.name,
            intro: `A new client has requested your product!`,
            table: {
              data: [
                {
                  Name: `${buyer.name}`,
                  Phone: `${buyer.phone}`,
                  Email: `${buyer.email}`,
                  Message: `${buyer.message}`,
                  Item: `${product.name}`,
                  Price: `${product.price}`,
                  Image: {
                    img: product.image,
                    alt: "product image",
                  },
                },
              ],
              columns: {
                customWidth: {
                  Name: "10%",
                  Phone: "10%",
                  Email: "20%",
                  Message: "20%",
                  Item: "10%",
                  Price: "10%",
                  Image: "20%",
                },
                customAlignment: {
                  Price: "right",
                },
              },
            },
            action: {
              instructions:
                "Please contact the buyer to arrange the details of the transaction.",
              button: {
                color: "#33b5e5",
                text: "Contact Buyer",
                link: "mailto:" + buyer.email,
              },
            },
            outro: "Thank you for using our service!",
            signature: "Best regards,\nComradesBiz",
          },
        });

        const mailOptions = {
          from: buyer.email,
          to: product.user,
          subject: "New order from a client",
          html: emailBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
      } catch (error) {
        console.log(error);
        throw new Error("Error generating email");
      }
    } else {
      throw new Error(`No seller email found for product ${product.name}`);
    }
  });
  try {
    const results = await Promise.all(promises);

    console.log("All emails sent", results);
    res.status(200).json({ message: "All emails sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending emails" });
  }
};
module.exports = Notify;
