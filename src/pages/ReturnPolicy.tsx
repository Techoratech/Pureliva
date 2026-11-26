import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../components/SectionHeading";

export const ReturnPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Return & Refund Policy | Pureliva</title>
        <meta
          name="description"
          content="Learn about Pureliva policies regarding damaged parcels, seal defects, returns, and refunds."
        />
        <link rel="canonical" href="https://purelivafoods.com/return-policy" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Customer Satisfaction"
            title="Return & Refund Policy"
            subtitle="Our commitment to delivering uncompromised freshness and food safety."
            align="center"
          />

          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                1. Food Safety & Hygiene
              </h3>
              <p>
                Due to the edible and perishable nature of food and natural seed items, unopened or opened pouches cannot be accepted for return once delivered, ensuring strictly sterile supply hygiene for all customers.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                2. Damaged or Tampered Parcels
              </h3>
              <p>
                In the rare event that your package arrives visibly damaged, punctured, or compromised in transit, please share an unboxing photo or video with our team within 48 hours of delivery at [EMAIL] or via WhatsApp at [WHATSAPP_NUMBER].
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                3. Replacement or Refund
              </h3>
              <p>
                Upon verification of transit damage or shipment defect, we will immediately initiate a free replacement dispatch or issue a full refund to your original payment method.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
