import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../components/SectionHeading";

export const ShippingPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery Policy | Pureliva</title>
        <meta
          name="description"
          content="Learn about Pureliva shipping timelines, delivery coverage, and packaging standards across India."
        />
        <link rel="canonical" href="https://purelivafoods.com/shipping-policy" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Delivery Information"
            title="Shipping Policy"
            subtitle="Transparent shipping timelines and dispatch standards across pan-India pin codes."
            align="center"
          />

          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-pureliva-cream border border-stone-200 shadow-soft space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                1. Order Dispatch Timelines
              </h3>
              <p>
                All confirmed retail seed orders are dispatched within 24 to 48 working hours from our central packing facility in Khandwa, Madhya Pradesh.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                2. Delivery Schedules
              </h3>
              <p>
                Standard courier transit times range between 3 to 7 working days depending on your destination city, state, and pincode tier.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                3. Order Tracking
              </h3>
              <p>
                Once your batch is packed and handed to our courier partner, you will receive tracking updates directly on our website at{" "}
                <a href="/track-order" className="text-pureliva-green font-semibold underline">
                  purelivafoods.com/track-order
                </a>{" "}
                using your Order Number and Phone Number.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                4. Secure Zipper Packaging
              </h3>
              <p>
                All seed pouches are enclosed in sturdy corrugated outer shipping boxes to prevent transit compression, moisture intrusion, or seal breach.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
