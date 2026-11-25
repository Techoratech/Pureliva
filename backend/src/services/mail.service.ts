import { Resend } from "resend";
import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";
import {
  OrderEmailData,
  StatusUpdateEmailData,
  ContactNotificationData,
  BulkEnquiryNotificationData,
  renderCustomerOrderConfirmation,
  renderAdminOrderNotification,
  renderOrderStatusUpdateEmail,
  renderContactNotifications,
  renderBulkEnquiryNotifications,
} from "../emails/templates.js";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

class MailService {
  private resendClient: Resend | null = null;
  private smtpTransporter: nodemailer.Transporter | null = null;

  constructor() {
    // Initialize Resend if key exists
    if (env.RESEND_API_KEY && env.RESEND_API_KEY.trim().length > 0) {
      try {
        this.resendClient = new Resend(env.RESEND_API_KEY);
      } catch (err) {
        logger.warn("Failed to initialize Resend client:", err);
      }
    }

    // Initialize Hostinger SMTP transporter if user/pass exists
    if (env.SMTP_USER && env.SMTP_PASS) {
      try {
        this.smtpTransporter = nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: env.SMTP_PORT,
          secure: env.SMTP_SECURE,
          auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          },
        });
      } catch (err) {
        logger.warn("Failed to initialize SMTP transporter:", err);
      }
    }
  }

  /**
   * Primary sender with automatic fallback to Hostinger SMTP
   */
  async sendMail(options: SendMailOptions): Promise<boolean> {
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    let sent = false;

    // 1. Try Resend first if available
    if (this.resendClient && env.RESEND_API_KEY) {
      try {
        const { error } = await this.resendClient.emails.send({
          from: env.MAIL_FROM,
          to: recipients,
          subject: options.subject,
          html: options.html,
        });

        if (!error) {
          logger.info(`Email sent via Resend to ${recipients.join(", ")}`);
          return true;
        }
        logger.warn(`Resend returned error, attempting SMTP fallback: ${error.message}`);
      } catch (resendError: any) {
        logger.warn(`Resend failed with exception, attempting SMTP fallback: ${resendError.message}`);
      }
    }

    // 2. Fallback to Hostinger SMTP
    if (this.smtpTransporter) {
      try {
        await this.smtpTransporter.sendMail({
          from: env.MAIL_FROM,
          to: recipients.join(", "),
          subject: options.subject,
          html: options.html,
        });
        logger.info(`Email sent via Hostinger SMTP fallback to ${recipients.join(", ")}`);
        return true;
      } catch (smtpError: any) {
        logger.error(`SMTP fallback also failed: ${smtpError.message}`);
      }
    } else {
      logger.warn(`No SMTP transporter configured as fallback for email to: ${recipients.join(", ")}`);
    }

    return sent;
  }

  /**
   * Asynchronous non-blocking order notifications
   */
  sendOrderEmailsAsync(orderData: OrderEmailData): void {
    setImmediate(async () => {
      try {
        // 1. Customer confirmation if email is present
        if (orderData.customerEmail && orderData.customerEmail.includes("@")) {
          const { subject, html } = renderCustomerOrderConfirmation(orderData);
          await this.sendMail({
            to: orderData.customerEmail,
            subject,
            html,
          });
        }

        // 2. Admin notification
        const adminEmail = env.ADMIN_NOTIFY_EMAIL || env.ADMIN_EMAIL;
        if (adminEmail) {
          const { subject, html } = renderAdminOrderNotification(orderData);
          await this.sendMail({
            to: adminEmail,
            subject,
            html,
          });
        }
      } catch (err: any) {
        logger.error(`Error in sendOrderEmailsAsync for ${orderData.orderNumber}:`, err.message);
      }
    });
  }

  /**
   * Asynchronous order status update notification
   */
  sendOrderStatusUpdateAsync(data: StatusUpdateEmailData, customerEmail?: string): void {
    if (!customerEmail || !customerEmail.includes("@")) return;

    setImmediate(async () => {
      try {
        const { subject, html } = renderOrderStatusUpdateEmail(data);
        await this.sendMail({
          to: customerEmail,
          subject,
          html,
        });
      } catch (err: any) {
        logger.error(`Error in sendOrderStatusUpdateAsync for ${data.orderNumber}:`, err.message);
      }
    });
  }

  /**
   * Asynchronous contact form notifications
   */
  sendContactFormEmailsAsync(data: ContactNotificationData): void {
    setImmediate(async () => {
      try {
        const { adminSubject, adminHtml, senderSubject, senderHtml } = renderContactNotifications(data);
        
        // Notify admin
        const adminEmail = env.ADMIN_NOTIFY_EMAIL || env.ADMIN_EMAIL;
        if (adminEmail) {
          await this.sendMail({
            to: adminEmail,
            subject: adminSubject,
            html: adminHtml,
          });
        }

        // Acknowledge sender
        if (data.email && data.email.includes("@")) {
          await this.sendMail({
            to: data.email,
            subject: senderSubject,
            html: senderHtml,
          });
        }
      } catch (err: any) {
        logger.error("Error in sendContactFormEmailsAsync:", err.message);
      }
    });
  }

  /**
   * Asynchronous bulk enquiry notifications
   */
  sendBulkEnquiryEmailsAsync(data: BulkEnquiryNotificationData): void {
    setImmediate(async () => {
      try {
        const { adminSubject, adminHtml, senderSubject, senderHtml } = renderBulkEnquiryNotifications(data);

        // Notify admin
        const adminEmail = env.ADMIN_NOTIFY_EMAIL || env.ADMIN_EMAIL;
        if (adminEmail) {
          await this.sendMail({
            to: adminEmail,
            subject: adminSubject,
            html: adminHtml,
          });
        }

        // Acknowledge sender
        if (data.email && data.email.includes("@")) {
          await this.sendMail({
            to: data.email,
            subject: senderSubject,
            html: senderHtml,
          });
        }
      } catch (err: any) {
        logger.error("Error in sendBulkEnquiryEmailsAsync:", err.message);
      }
    });
  }
}

export const mailService = new MailService();
