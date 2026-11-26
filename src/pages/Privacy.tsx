import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../components/SectionHeading";

export const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Pureliva</title>
        <meta
          name="description"
          content="Learn how Pureliva collects, uses, and safeguards customer data and contact information."
        />
        <link rel="canonical" href="https://purelivafoods.com/privacy" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Privacy & Data Protection"
            title="Privacy Policy"
            subtitle="Your privacy is critically important to us. Learn how we safeguard your details."
            align="center"
          />

          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                1. Information We Collect
              </h3>
              <p>
                When you place an order, build a custom seed box, or submit an enquiry on our website, we collect personal information such as your name, billing and delivery address, phone number, and email address.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                2. How We Use Your Information
              </h3>
              <p>
                We use the information we collect to fulfill your orders, provide dispatch tracking updates via SMS or WhatsApp, process payments, and communicate with you regarding your shipments.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                3. Data Security & Third Parties
              </h3>
              <p>
                We do not sell, trade, or rent your personal identification information to others. Courier partners receive only necessary shipping information (name, address, phone) to effect delivery.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                4. Cookies & Analytics
              </h3>
              <p>
                We may use basic cookies or session tracking strictly to keep track of your shopping cart and preferences across browsing sessions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
