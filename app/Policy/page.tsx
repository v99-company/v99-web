// pages/Policy.js
import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const sectionStyles = "mb-8";
const headingStyles = "text-2xl font-bold mb-4";
const paragraphStyles = "mb-4";

const TermsAndPrivacy = () => {
  return (
    <main className='min-h-screen'>

    <Navbar />

    <div className="container mx-auto bg-gray-300 p-8 m-16 rounded-2xl">
      <h1 className={`${headingStyles} text-3xl`}>Important Notice</h1>
      <p className={paragraphStyles}>
        V99 India is solely a listing platform for small, medium, and micro business operators, service providers, and professionals to showcase their services and products online. We do not guarantee or assure leads, sales, or any business outcomes through our platform. V99 India is not responsible for any misinformation, errors, or losses arising from the use of our platform. Users are advised to verify information independently and use the platform at their own discretion.
      </p>

      <h1 className={`${headingStyles} mt-8`}>Terms & Conditions</h1>
      <section className={sectionStyles}>
        <h2 className={headingStyles}>User Registration and Directory Submissions</h2>
        <p className={paragraphStyles}><strong>Eligibility:</strong> Users must be legally capable of entering into a binding agreement.</p>
        <p className={paragraphStyles}><strong>Accuracy of Information:</strong> All submitted information must be accurate, current, and complete.</p>
        <p className={paragraphStyles}><strong>Submission Review:</strong> V99 India reviews submissions but is not responsible for errors or misleading content. False submissions may be deleted, and legal action may be taken.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Use of the Platform</h2>
        <p className={paragraphStyles}><strong>License to Use:</strong> Users are granted a limited license to use the Platform for listing and browsing purposes.</p>
        <p className={paragraphStyles}><strong>User Obligations:</strong> Users must not provide false information, violate laws, or compromise the Platform's security.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Content and Intellectual Property</h2>
        <p className={paragraphStyles}><strong>User-Generated Content:</strong> Users retain ownership of their content but grant V99 India a license to use it.</p>
        <p className={paragraphStyles}><strong>Removal of Content:</strong> V99 India can remove inappropriate content without notice.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Disclaimers and Limitation of Liability</h2>
        <p className={paragraphStyles}><strong>Disclaimer of Warranties:</strong> The Platform is provided "as is" without warranties.</p>
        <p className={paragraphStyles}><strong>Limitation of Liability:</strong> V99 India is not liable for indirect damages or losses arising from Platform use.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Indemnification</h2>
        <p className={paragraphStyles}>Users agree to indemnify V99 India from claims arising from their use of the Platform or violations of these terms.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Modifications and Termination</h2>
        <p className={paragraphStyles}><strong>Modifications:</strong> Terms may be revised at any time.</p>
        <p className={paragraphStyles}><strong>Termination:</strong> Access may be suspended or terminated for violations of these terms.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Governing Law and Dispute Resolution</h2>
        <p className={paragraphStyles}>These terms are governed by applicable laws in [Your Jurisdiction]. Disputes will be resolved through negotiations or courts in [Your Jurisdiction].</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Contact Information</h2>
        <p className={paragraphStyles}>Email: v99india@gmail.com</p>
        <p className={paragraphStyles}>Address: Ayaan Kitchen B-22, Beside Metalica Steel Factory, Balanagar Industrial Area Sanathnagar, Hyderabad - 500018, Telangana, India</p>
        <p className={paragraphStyles}>Second Address: 8-4-122/21, Palace view colony, East Bandla GudaOpp RTA Office Chandrayangutta Hyderabad, Telangana 500005</p>
      </section>

      <h1 className={`${headingStyles} mt-8`}>Privacy Policy</h1>
      <section className={sectionStyles}>
        <h2 className={headingStyles}>Information We Collect</h2>
        <p className={paragraphStyles}><strong>Personal Information:</strong> Name, business name, contact details, etc.</p>
        <p className={paragraphStyles}><strong>Usage Information:</strong> IP address, browser type, pages visited, etc.</p>
        <p className={paragraphStyles}><strong>Cookies:</strong> Used to enhance user experience and analyze usage patterns.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>How We Use Your Information</h2>
        <p className={paragraphStyles}>To provide and improve services, communicate with users, and ensure legal compliance.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Sharing Your Information</h2>
        <p className={paragraphStyles}>With third-party service providers, for legal requirements, and in case of business transfers.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Data Security</h2>
        <p className={paragraphStyles}>Reasonable measures are implemented to protect personal information.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Data Retention</h2>
        <p className={paragraphStyles}>Personal information is retained as long as necessary to fulfill its purpose.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Your Rights</h2>
        <p className={paragraphStyles}>Users may have rights to access, correct, or delete their data.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Changes to This Privacy Policy</h2>
        <p className={paragraphStyles}>The policy may be updated periodically.</p>
      </section>

      <section className={sectionStyles}>
        <h2 className={headingStyles}>Contact Us</h2>
        <p className={paragraphStyles}>Email: v99india@gmail.com</p>
        <p className={paragraphStyles}>Address: Ayaan Kitchen B-22, Beside Metalica Steel Factory, Balanagar Industrial Area Sanathnagar, Hyderabad - 500018, Telangana, India</p>
        <p className={paragraphStyles}>Second Address: 8-4-122/21, Palace view colony, East Bandla GudaOpp RTA Office Chandrayangutta Hyderabad, Telangana 500005</p>
      </section>
    </div>
    
    {/* Footer */}
    <Footer />
    </main>
  );
};

export default TermsAndPrivacy;
