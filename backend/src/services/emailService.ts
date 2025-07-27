import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'localhost',
  port: parseInt(process.env.EMAIL_PORT || '1025'),
  secure: false,
  auth: process.env.EMAIL_USER ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  } : undefined
})

export const sendWelcomeEmail = async (email: string, username: string) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@cryptobloom.com',
    to: email,
    subject: 'Welcome to CryptoBloom! 🌸',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Welcome to CryptoBloom!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Where crypto meets flowers</p>
        </div>
        
        <div style="padding: 40px; background: #f9fafb;">
          <h2 style="color: #374151; margin-bottom: 20px;">Hi ${username}! 👋</h2>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining CryptoBloom! You're now part of an exclusive community that combines 
            the excitement of cryptocurrency trading with the beauty of premium flower delivery.
          </p>
          
          <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #374151; margin-top: 0;">What you can do now:</h3>
            <ul style="color: #6b7280; line-height: 1.8;">
              <li>🚀 Start trading Bitcoin, Ethereum, and other cryptocurrencies</li>
              <li>🌸 Browse our premium flower collection</li>
              <li>💰 Use your trading profits to send beautiful flowers</li>
              <li>📊 Track your portfolio with real-time analytics</li>
              <li>🎁 Earn rewards through our loyalty program</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
            Need help? Reply to this email or visit our support center.
          </p>
        </div>
        
        <div style="background: #374151; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 CryptoBloom. All rights reserved.
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Welcome email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    throw error
  }
}

export const sendOrderConfirmation = async (email: string, orderDetails: any) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@cryptobloom.com',
    to: email,
    subject: `Order Confirmation - #${orderDetails.orderId} 🌸`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Order Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your flowers are on their way</p>
        </div>
        
        <div style="padding: 40px; background: #f9fafb;">
          <h2 style="color: #374151; margin-bottom: 20px;">Thank you for your order!</h2>
          
          <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #374151; margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> #${orderDetails.orderId}</p>
            <p><strong>Total:</strong> $${orderDetails.total}</p>
            <p><strong>Status:</strong> ${orderDetails.status}</p>
            ${orderDetails.trackingNumber ? `<p><strong>Tracking:</strong> ${orderDetails.trackingNumber}</p>` : ''}
          </div>
          
          <p style="color: #6b7280; line-height: 1.6;">
            We'll send you updates as your order progresses. Expected delivery is within 2-3 business days.
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Order confirmation sent to ${email}`)
  } catch (error) {
    console.error('Failed to send order confirmation:', error)
    throw error
  }
}