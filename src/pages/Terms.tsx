import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../components/SectionHeading";

export const Terms: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Pureliva</title>
        <meta
          name="description"
          content="Review the terms and conditions governing purchases, deliveries, and browsing on Pureliva Foods."
        />
        <link rel="canonical" href="https://purelivafoods.com/terms" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Legal Information"
            title="Terms & Conditions"
            subtitle="Please review the terms and conditions governing the use of Pureliva website and ordering natural seed products."
            align="center"
          />

          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                1. General Overview
              </h3>
              <p>
                Pureliva is an agro-brand owned and operated by Patidar Enterprises, 31, Vaikunth Nagar, Khandwa, Madhya Pradesh - 450001, India. Throughout the site, the terms "we", "us" and "our" refer to Pureliva.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                2. Product Availability & Pricing
              </h3>
              <p>
                All our products are carefully packaged in 100g resealable zipper pouches. Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product or category at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                3. Orders & Payment
              </h3>
              <p>
                Orders placed via our website, WhatsApp, or order builder are fulfilled upon confirmation. We accept online payments, bank transfers, UPI, and Cash on Delivery (COD) as mutually agreed during chat confirmation.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                4. Intellectual Property
              </h3>
              <p>
                All trademarks, logos, brand assets, packaging imagery, and text content displayed on purelivafoods.com are the exclusive property of Patidar Enterprises.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                5. Contact & Support
              </h3>
              <p>
                For questions regarding these Terms & Conditions, please contact us at info@purelivafoods.com or +91 97525 99343.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
