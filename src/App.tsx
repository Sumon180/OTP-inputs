import OTPInput from "./components/otp-inputs";

function App() {
  const handleOTPComplete = (otp: string) => {
    console.log("OTP Entered:", otp);
    // You can do whatever you want with the OTP here (e.g., send it to a server for verification)
  };

  return <OTPInput length={4} onComplete={handleOTPComplete} />;
}

export default App;
