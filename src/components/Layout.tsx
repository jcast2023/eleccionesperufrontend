import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import ReportErrorForm from "./ReportErrorForm";
import DonationModal from "./DonationModal";

export default function Layout() {
  const [showContact, setShowContact] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  return (
    <div className="app-wrapper">
      <Outlet />

      <Footer 
        onContactClick={() => setShowContact(true)} 
        onReportClick={() => setShowReport(true)} 
        onDonationClick={() => setShowDonation(true)}
      />

      {showContact && <ContactForm onClose={() => setShowContact(false)} />}
      {showReport && <ReportErrorForm onClose={() => setShowReport(false)} />}
      {showDonation && <DonationModal onClose={() => setShowDonation(false)} />}  
    </div>
  );
}