const nodemailer = require('nodemailer');

// In-memory queue
const emailQueue = [];

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Function to process the queue
async function processQueue() {
    if (emailQueue.length === 0) {
        return; // No emails to process
    }

    const job = emailQueue.shift(); // Get the first job in the queue
    console.log('Processing job:', job);

    const { to, subject, text } = job;

    const mailOptions = {
        from: `Project II Vexere <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        // Re-add the job to the queue for retry
        emailQueue.push(job);
    }
}

// Function to add email to the queue
function addEmailToQueue(to, subject, text) {
    console.log(`Adding email to queue: to=${to}, subject=${subject}`);
    emailQueue.push({ to, subject, text });
    if (emailQueue.length === 1) {
        // Start processing if the queue was empty
        setTimeout(processQueue, 0);
    }
}

// Periodically process the queue
setInterval(processQueue, 5000); // Check and process the queue every 5 seconds

module.exports = addEmailToQueue;