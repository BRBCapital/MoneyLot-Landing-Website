import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import PrivacyPolicy from "./pages/privacy";
import TermsOfUse from "./pages/termsOfUse";
import PaymentSuccess from "./pages/paymentStatus";
import PaymentFailed from "./pages/paymentStatus/failed";
import PaymentCancelled from "./pages/paymentStatus/cancelled";
import ClientServiceAgreement from "./pages/clientServiceAgreement";
import SignaturePage from "./pages/signaturePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./scrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-screen">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/signature" element={<SignaturePage />} />
          <Route path="/signature-page" element={<SignaturePage />} />
          <Route
            path="/client-service-agreement"
            element={<ClientServiceAgreement />}
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/payment/cancelled" element={<PaymentCancelled />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
