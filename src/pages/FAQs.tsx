import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../components/SectionHeading";
import FAQAccordion from "../components/FAQAccordion";
import { FAQS } from "../data/faqs";

export const FAQs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions (FAQs) | Pureliva</title>
        <meta
          name="description"
          content="Find answers to common questions about Pureliva seeds, ingredients, ordering process, and shelf life."
        />
        <link rel="canonical" href="https://purelivafoods.com/faqs" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Customer Support"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our seed varieties, ordering on WhatsApp, tracking, and shelf life."
            align="center"
          />

          <div className="mt-12">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
