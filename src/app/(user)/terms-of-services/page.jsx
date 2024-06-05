import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import Link from "next/link";


const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-[70%] m-auto">
          <div className="flex justify-center items-center ">
            <h2 className="text-4xl font-semibold py-5 ">Terms of Service</h2>
          </div>
          <p className="py-3 leading-7">
            Welcome to Arozeen.com (&quot;us&quot;, &quot;we&quot;, or
            &quot;our&quot;). Please read these Terms of Service
            (&quot;Terms&quot;) carefully before using our website (the
            &quot;Service&quot;). Your access to and use of the Service is
            conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users, and others who access or
            use the Service.
          </p>
          <div className="py-5">
            <h3 className="text-2xl font-semibold">Acceptance of Terms</h3>
            <p className="py-3 leading-7">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the Terms, then you may
              not access the Service.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">2. Use of the Service</h3>
            <div className="">
              <h4 className="text-xl font-semibold py-3 pl-5">
                2.1 Eligibility
              </h4>
              <p className="leading-7 pl-5">
                You must be at least 18 years old to use this Service. By using
                the Service, you represent and warrant that you are at least 18
                years old.
              </p>
            </div>
            <div className="">
              <h4 className="text-xl font-semibold py-3 pl-5">
                2.2 User Account
              </h4>
              <p className="leading-7 pl-5">
                To access certain features of the Service, you may be required
                to create an account. You are responsible for maintaining the
                confidentiality of your account and password. You agree to
                accept responsibility for all activities that occur under your
                account.
              </p>
            </div>
            <div className="">
              <h4 className="text-xl font-semibold py-3 pl-5">
                2.3 Prohibited Activities
              </h4>
              <p className="leading-7 pl-5">
                You may not access or use the Service for any purpose other than
                that for which we make the Service available. Prohibited
                activities include, but are not limited to:
              </p>
              <ul className="list-disc pl-16 py-3 space-y-2">
                <li>Violating any laws or regulations.</li>
                <li>Engaging in any fraudulent or misleading activities.</li>
                <li>Interfering with or disrupting the Service.</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">3. Products and Pricing</h3>
            <div className="">
              <h4 className="text-xl font-semibold py-3 pl-5">
                3.1 Product Descriptions
              </h4>
              <p className="leading-7 pl-5">
                We make every effort to ensure that product descriptions are
                accurate. However, we do not warrant that product descriptions
                are error-free.
              </p>
              <h4 className="text-xl font-semibold py-3 pl-5">3.2 Pricing</h4>
              <p className="leading-7 pl-5">
                Prices for products are subject to change without notice. We
                reserve the right to modify or discontinue the Service without
                notice.
              </p>
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">4. Payment and Security</h3>
            <h4 className="text-xl font-semibold py-3 pl-5">
              4.1 Payment Methods
            </h4>
            <p className="leading-7 pl-5">
              All payments are processed securely. We accept payment through
              [Payment Gateway Name] and Cash on Delivery (COD). By providing
              payment information, you represent and warrant that you have the
              legal right to use any payment method(s) utilized.
            </p>
            <h4 className="text-xl font-semibold py-3 pl-5">
              4.2 Billing Information
            </h4>
            <p className="leading-7 pl-5">
              You agree to provide current, complete, and accurate purchase and
              account information for all purchases made via the Service.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">5. Shipping and Delivery</h3>
            <p className="py-3 leading-7">
              For information on shipping and delivery, please refer to our{" "}
              <span className="text-blue-800 underline">
                <Link href="/shipping-policy">Shipping Policy</Link>
              </span>
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">6. Returns and Refunds</h3>
            <p className="py-3 leading-7">
              For information on returns and refunds, please refer to our{" "}
              <span className="text-blue-800 underline">
                <Link href="/refund-policy">Returns and Refunds Policy</Link>
              </span>
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">7. Privacy Policy</h3>
            <p className="py-3 leading-7">
              Your use of the Service is also governed by our Privacy Policy.
              Please review our{" "}
              <span className="text-blue-800 underline">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </span>{" "}
              for information on how we collect, use, and share your personal
              information.
            </p>
          </div>

          <div className="">
            <h3 className="text-2xl font-semibold">8. Intellectual Property</h3>
            <p className="py-3 leading-7">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of YourStoreName.com
              and its licensors.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">9. Termination</h3>
            <p className="py-3 leading-7">
              We may terminate or suspend access to our Service immediately,
              without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">10. Governing Law</h3>
            <p className="py-3 leading-7">
              These Terms shall be governed and construed in accordance with the
              laws of India, without regard to its conflict of law provisions.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">11. Changes to Terms</h3>
            <p className="py-3 leading-7">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. What constitutes a material change will
              be determined at our sole discretion.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">12. Contact Information</h3>
            <p className="py-3 leading-7">
              For any questions about these Terms, please contact us at
              arozeenhelp@gmail.com
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
      
    </>
  );
};

export default page;
