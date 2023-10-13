import React from "react";
import "./PrivacyPolicy.css"; // Include your updated CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">
        Privacy Policy for financialHub.info
      </h1>
      <div className="privacy-policy-description">
        <p>
          At <b>financialHub.info</b>, we are committed to protecting your
          privacy. We do not collect any user data, and we do not use any
          third-party services that collect user data.
        </p>
        <p>
          This Privacy Policy outlines our policies regarding the collection,
          use, and disclosure of personal information when you use our website.
        </p>
      </div>

      <h2 className="privacy-h2">Information We Do Not Collect</h2>
      <p>
        We do not collect any personally identifiable information (PII) such as
        names, email addresses, phone numbers, or home addresses.
      </p>

      <h2 className="privacy-h2">Log Files</h2>
      <p>
        Like many website operators, we collect information that your browser
        sends whenever you visit our site. This may include information such as
        your computer's Internet Protocol ("IP") address, browser type, browser
        version, the pages of our site that you visit, the time and date of your
        visit, the time spent on those pages, and other statistics.
      </p>

      <h2 className="privacy-h2">Cookies</h2>
      <p>
        We use "cookies" to collect information. You can instruct your browser
        to refuse all cookies or to indicate when a cookie is being sent.
        However, if you do not accept cookies, you may not be able to use some
        portions of our site.
      </p>

      <h2 className="privacy-h2">Third-Party Services</h2>
      <p>
        We do not use any third-party services that collect user data, such as
        analytics or advertising services.
      </p>

      <h2 className="privacy-h2">Children's Privacy</h2>
      <p>
        Our website does not address anyone under the age of 18. We do not
        knowingly collect personal identifiable information from children under
        18. If you are a parent or guardian and you are aware that your child
        has provided us with personal information, please contact us, and we
        will delete that information.
      </p>

      <h2 className="privacy-h2">Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. Thus, we advise you
        to review this page periodically for any changes. We will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately after they are posted on this page.
      </p>

      <h2 className="privacy-h2">Contact Us</h2>
      <p>
        If you have any questions or suggestions about our Privacy Policy,
        please contact us.
      </p>

      <p>Last updated: Oct 12, 2023</p>
    </div>
  );
};

export default PrivacyPolicy;
