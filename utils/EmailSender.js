// Looking to send emails in production? Check out our Email API/SMTP product!
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

async function AdminLogin(userData, ip, header) {

  console.log("Email Body", userData);
  console.log("Email Body", ip);
  console.log("Email Body", header);
  const htmlbody = generateLoginAlertHTML(userData, header, ip);
  const transporter = Nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Admin Login : " adsststjntun@gmail.com',
    to: `${userData.email} , adsststjntun@gmail.com`,
    subject: "Your Invoice",
    html: htmlbody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

async function sendEmail(orderData) {
  const htmlbody = generateInvoiceHTML(orderData);

  console.log("Email Body");

  const transporter = Nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Twan Shop : " adsststjntun@gmail.com',
    to: `${orderData.userId.email} , adsststjntun@gmail.com`,
    subject: "Your Invoice",
    html: htmlbody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
// async function sendEmail(userData) {

//   var transport = Nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "1fb3ca58c7c597",
//       pass: "e81fc32c9e3df7",
//     },
//   });

//   const recipients = ["hassanalihassan1203@gmail.com", "admin@gmail.com"];

//   const message = {
//     from:"hassanalihassan1203@gmail.com",
//     to: recipients,
//     subject: "Test Email",
//     text: "Hello from Mailtrap",
//     html: "<p>Hello from Mailtrap</p>",
//   };
//   try {
//     const info = await transport.sendMail(message);
//     if (info) {
//       console.log(info);

//       return true;
//     }

//     console.log(info);
//     return false;
//   } catch (error) {

//     console.log(error);
//     return false;
//   }
// }

// Looking to send emails in production? Check out our Email API/SMTP product!

// async function sendEmail(orderData) {
//   console.log("sendEmail", orderData);
//   const htmlbody = generateInvoiceHTML(orderData);
//   const TOKEN = "e519d960048313532eeded93865a59ca";

//   const transport = Nodemailer.createTransport(
//     MailtrapTransport({
//       token: TOKEN,
//       testInboxId: 3388894,
//     })
//   );

//   const sender = {
//     address: "hello@example.com",
//     name: "Mailtrap Test",
//   };
//   const recipients = [
//     "adsststjntun@gmail.com",
//     "hassanalihassan1203@gmail.com",
//   ];

//   transport
//     .sendMail({
//       from: sender,
//       to: recipients,
//       subject: "You are awesome!",
//       html: htmlbody,
//       category: "Integration Test",
//       sandbox: true
//     })
//     .then(response => {
//       console.log(response);
//       return true;
//     }, error => {
//       console.log(error);
//       return false;
//     });
// }

const generateInvoiceHTML = (order) => {
  const { userId, products, totalPrice, status, createdAt, transactionId } = order;

  const invoiceHTML = `
    <div style="max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
      <h2 style="text-align: center; color: #333; margin-bottom: 20px; font-size: 28px;">Invoice</h2>

      <!-- Customer Information -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Customer Information</h3>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Name:</strong> ${userId.username}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Email:</strong> ${userId.email}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Phone:</strong> ${userId.phone}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Address:</strong> ${userId.address.streetName}, ${userId.address.city}, ${userId.address.country}</p>
      </div>

      <!-- Order Details -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Order Details</h3>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Order ID:</strong> ${order._id}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Status:</strong> ${status}</p>
      </div>

      <!-- Products -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Products</h3>
        ${products
      .map(
        (product, index) => `
          <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #e0e0e0;">
            <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Product ${index + 1}:</strong> ${product.productId.name}</p>
            <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Quantity:</strong> ${product.quantity}</p>
            <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Price:</strong> ${product.productId.price} SAR</p>
          </div>
        `
      )
      .join("")}
      </div>

      <!-- Transaction Details -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Transaction Details</h3>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Transaction ID:</strong> ${transactionId._id}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Payment Status:</strong> ${transactionId.body.status}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Payment Date:</strong> ${new Date(transactionId.body.date).toLocaleString()}</p>
        <p style="margin: 5px 0; color: #666; font-size: 16px;"><strong>Reason:</strong> ${transactionId.body.reason || "N/A"}</p>
      </div>

      <!-- Total Price -->
      <div style="text-align: right; margin-top: 20px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-bottom: 10px; font-size: 20px;">Total Amount</h3>
        <p style="margin: 5px 0; color: #333; font-size: 24px; font-weight: bold;">${totalPrice} SAR</p>
      </div>
    </div>
  `;

  return invoiceHTML;
};
const generateLoginAlertHTML = (userData, deviceInfo, ipAddress) => {
  return `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; font-family: Arial, sans-serif; color: #333;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4A90E2; font-size: 24px; margin: 0;">New Login Alert</h2>
      </div>

      <!-- User Information -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
        <h3 style="color: #555; font-size: 18px; margin-bottom: 10px;">👤 User Information</h3>
        <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Username:</strong> ${userData.username}</p>
        <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Email:</strong> ${userData.email}</p>
        <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Phone:</strong> ${userData.phone}</p>
        <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>IP Address:</strong> ${ipAddress}</p>
        <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Device:</strong> ${deviceInfo}</p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
        <p>This is an automated message. Please do not reply.</p>
      </div>
    </div>
  `;
};

module.exports = { sendEmail, AdminLogin };
