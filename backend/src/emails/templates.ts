export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  shippingCharge: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

export interface StatusUpdateEmailData {
  orderNumber: string;
  customerName: string;
  status: string;
  note?: string;
  updatedAt: Date;
}

export interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: Date;
}

export interface BulkEnquiryNotificationData {
  name: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message?: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1F2937;
  background-color: #F9FAFB;
  margin: 0;
  padding: 24px;
`;

const headerHtml = `
  <div style="background-color: #1B4332; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">PURELIVA FOODS</h1>
    <p style="color: #D8F3DC; margin: 4px 0 0; font-size: 13px; font-weight: 400;">Natural Seeds & Everyday Wellness • Khandwa, MP</p>
  </div>
`;

const footerHtml = `
  <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 12px; line-height: 1.6;">
    <p style="margin: 0; font-weight: 600; color: #374151;">Pureliva Foods by Patidar Enterprises</p>
    <p style="margin: 2px 0;">31, Vaikunth Nagar, Khandwa, Madhya Pradesh – 450001, India</p>
    <p style="margin: 2px 0;">FSSAI Lic. No: <strong>21426950001159</strong> | WhatsApp: +91 97531 64155</p>
    <p style="margin: 8px 0 0; color: #9CA3AF;">© 2026 Pureliva Foods. All rights reserved.</p>
  </div>
`;

export function renderCustomerOrderConfirmation(data: OrderEmailData): { subject: string; html: string } {
  const subject = `Order Confirmed: ${data.orderNumber} - Pureliva Foods`;
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB;">
          <strong style="color: #111827;">${item.title}</strong><br/>
          <span style="color: #6B7280; font-size: 13px;">Qty: ${item.quantity}</span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E5E7EB; text-align: right; color: #111827; font-weight: 600;">
          ₹${item.unitPrice * item.quantity}
        </td>
      </tr>
    `
    )
    .join("");

  const html = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        ${headerHtml}
        <div style="padding: 32px 24px;">
          <h2 style="color: #1B4332; margin: 0 0 12px; font-size: 20px;">Thank You for Your Order, ${data.customerName}!</h2>
          <p style="color: #4B5563; line-height: 1.6; margin: 0 0 24px;">
            We have received your order <strong>${data.orderNumber}</strong>. Our team is carefully reviewing and packing your fresh, natural seeds.
          </p>

          <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              <strong>Order Status:</strong> Received (${data.status.toUpperCase()})<br/>
              <strong>Payment Method:</strong> ${data.paymentMethod}
            </p>
          </div>

          <h3 style="color: #1F2937; margin: 0 0 12px; font-size: 16px; border-bottom: 2px solid #1B4332; padding-bottom: 6px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="color: #6B7280; font-size: 12px; text-transform: uppercase;">
                <th style="text-align: left; padding-bottom: 8px;">Product</th>
                <th style="text-align: right; padding-bottom: 8px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding-top: 12px; color: #4B5563;">Subtotal</td>
                <td style="padding-top: 12px; text-align: right; color: #111827; font-weight: 500;">₹${data.subtotal}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #4B5563;">Shipping</td>
                <td style="padding: 4px 0; text-align: right; color: #166534; font-weight: 500;">${data.shippingCharge === 0 ? "FREE" : "₹" + data.shippingCharge}</td>
              </tr>
              <tr>
                <td style="padding-top: 8px; font-size: 18px; font-weight: 700; color: #1B4332;">Total</td>
                <td style="padding-top: 8px; font-size: 18px; font-weight: 700; color: #1B4332; text-align: right;">₹${data.total}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px; color: #374151; font-size: 14px;">Delivery Address</h4>
            <p style="margin: 0; color: #4B5563; font-size: 14px; line-height: 1.5;">
              ${data.customerName}<br/>
              ${data.address.line1}<br/>
              ${data.address.city}, ${data.address.state} – ${data.address.pincode}<br/>
              Phone: ${data.customerPhone}
            </p>
          </div>

          <p style="color: #6B7280; font-size: 13px; line-height: 1.5; margin: 0 0 16px;">
            Have questions or need to make changes? Reach us on WhatsApp at <strong>+91 97531 64155</strong>.
          </p>

          ${footerHtml}
        </div>
      </div>
    </div>
  `;
  return { subject, html };
}

export function renderAdminOrderNotification(data: OrderEmailData): { subject: string; html: string } {
  const subject = `[New Order] ${data.orderNumber} - ₹${data.total} by ${data.customerName}`;
  const waCleanPhone = data.customerPhone.replace(/\D/g, "");
  const waLink = `https://wa.me/${waCleanPhone.startsWith("91") ? waCleanPhone : "91" + waCleanPhone}?text=${encodeURIComponent(`Hello ${data.customerName}, regarding your Pureliva Foods order #${data.orderNumber}...`)}`;

  const itemsList = data.items.map((i) => `<li>${i.quantity}x <strong>${i.title}</strong> @ ₹${i.unitPrice}</li>`).join("");

  const html = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px;">
        <h2 style="color: #1B4332; margin-top: 0;">🎉 New Order Received!</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Order Number: <strong>${data.orderNumber}</strong><br/>
          Total Amount: <strong style="color: #1B4332; font-size: 18px;">₹${data.total}</strong><br/>
          Payment Method: <strong>${data.paymentMethod}</strong>
        </p>

        <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; font-size: 15px; color: #111827;">Customer Details:</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.6;">
            <strong>Name:</strong> ${data.customerName}<br/>
            <strong>Phone:</strong> ${data.customerPhone}<br/>
            <strong>Email:</strong> ${data.customerEmail || "N/A"}<br/>
            <strong>Address:</strong> ${data.address.line1}, ${data.address.city}, ${data.address.state} - ${data.address.pincode}
          </p>
          <div style="margin-top: 14px;">
            <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px;">Chat on WhatsApp with Customer</a>
          </div>
        </div>

        <h3 style="font-size: 15px; color: #111827; margin-bottom: 8px;">Items Ordered:</h3>
        <ul style="padding-left: 20px; line-height: 1.6; color: #374151;">
          ${itemsList}
        </ul>

        ${footerHtml}
      </div>
    </div>
  `;
  return { subject, html };
}

export function renderOrderStatusUpdateEmail(data: StatusUpdateEmailData): { subject: string; html: string } {
  const subject = `Order Status Update: ${data.orderNumber} is now ${data.status.toUpperCase()}`;
  const html = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
        ${headerHtml}
        <div style="padding: 32px 24px;">
          <h2 style="color: #1B4332; margin: 0 0 12px;">Order Status Update</h2>
          <p style="color: #4B5563; line-height: 1.6; margin: 0 0 20px;">
            Hello <strong>${data.customerName}</strong>,<br/>
            The status of your Pureliva Foods order <strong>${data.orderNumber}</strong> has been updated to:
          </p>

          <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
            <span style="font-size: 20px; font-weight: 700; color: #065F46; text-transform: uppercase; letter-spacing: 1px;">${data.status}</span>
            ${data.note ? `<p style="margin: 8px 0 0; color: #047857; font-size: 14px;">${data.note}</p>` : ""}
          </div>

          <p style="color: #6B7280; font-size: 14px; line-height: 1.5;">
            Thank you for choosing Pureliva Foods. If you have any questions, feel free to reply to this email or chat with us on WhatsApp at +91 97531 64155.
          </p>

          ${footerHtml}
        </div>
      </div>
    </div>
  `;
  return { subject, html };
}

export function renderContactNotifications(data: ContactNotificationData) {
  const adminSubject = `[Website Contact] ${data.subject || "New Message"} from ${data.name}`;
  const adminHtml = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px;">
        <h2 style="color: #1B4332; margin-top: 0;">📬 New Contact Form Message</h2>
        <p style="line-height: 1.6; font-size: 14px;">
          <strong>From:</strong> ${data.name}<br/>
          <strong>Email:</strong> ${data.email}<br/>
          <strong>Phone:</strong> ${data.phone || "N/A"}<br/>
          <strong>Subject:</strong> ${data.subject || "General Enquiry"}<br/>
        </p>
        <div style="background-color: #F9FAFB; padding: 16px; border-radius: 8px; border-left: 4px solid #1B4332; margin: 16px 0;">
          <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #1F2937;">${data.message}</p>
        </div>
        ${footerHtml}
      </div>
    </div>
  `;

  const senderSubject = `We received your message - Pureliva Foods`;
  const senderHtml = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
        ${headerHtml}
        <div style="padding: 32px 24px;">
          <h2 style="color: #1B4332; margin: 0 0 12px;">Hello ${data.name},</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            Thank you for reaching out to Pureliva Foods! We have received your message regarding "<strong>${data.subject || "Enquiry"}</strong>".
          </p>
          <p style="color: #4B5563; line-height: 1.6;">
            Our team will review your enquiry and get back to you shortly. For immediate assistance, you can also reach us via WhatsApp at +91 97531 64155.
          </p>
          ${footerHtml}
        </div>
      </div>
    </div>
  `;

  return { adminSubject, adminHtml, senderSubject, senderHtml };
}

export function renderBulkEnquiryNotifications(data: BulkEnquiryNotificationData) {
  const adminSubject = `[Bulk/Export Enquiry] ${data.company} (${data.country}) - ${data.product}`;
  const adminHtml = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px;">
        <h2 style="color: #1B4332; margin-top: 0;">🌐 New Bulk & Export Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.8;">
          <tr><td style="color: #6B7280; width: 140px;">Contact Person:</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="color: #6B7280;">Company:</td><td><strong>${data.company}</strong></td></tr>
          <tr><td style="color: #6B7280;">Country/Region:</td><td>${data.country}</td></tr>
          <tr><td style="color: #6B7280;">Product:</td><td><strong>${data.product}</strong></td></tr>
          <tr><td style="color: #6B7280;">Quantity Volume:</td><td><strong>${data.quantity}</strong></td></tr>
          <tr><td style="color: #6B7280;">Email:</td><td>${data.email}</td></tr>
          <tr><td style="color: #6B7280;">Phone:</td><td>${data.phone}</td></tr>
        </table>
        ${
          data.message
            ? `<div style="background-color: #F9FAFB; padding: 16px; border-radius: 8px; border-left: 4px solid #1B4332; margin-top: 16px;">
                <strong>Requirements:</strong><br/>
                <p style="margin: 4px 0 0; white-space: pre-wrap; color: #1F2937;">${data.message}</p>
              </div>`
            : ""
        }
        ${footerHtml}
      </div>
    </div>
  `;

  const senderSubject = `Bulk & Export Enquiry Received - Pureliva Foods`;
  const senderHtml = `
    <div style="${baseStyles}">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
        ${headerHtml}
        <div style="padding: 32px 24px;">
          <h2 style="color: #1B4332; margin: 0 0 12px;">Dear ${data.name},</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            Thank you for your interest in sourcing seeds from Pureliva Foods / Patidar Enterprises. We have registered your bulk enquiry for <strong>${data.product} (${data.quantity})</strong>.
          </p>
          <p style="color: #4B5563; line-height: 1.6;">
            Our B2B export team is reviewing your requirements and will connect with product specifications, lab certificates, and quotation.
          </p>
          ${footerHtml}
        </div>
      </div>
    </div>
  `;

  return { adminSubject, adminHtml, senderSubject, senderHtml };
}
