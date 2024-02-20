import React, { useState, useRef } from "react";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Focus next input field if available
    if (value !== "" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOTP.every((code) => code !== "")) {
      setIsComplete(true);
      onComplete(newOTP.join(""));
    } else {
      setIsComplete(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, length);
    if (/^\d+$/.test(paste)) {
      const pasteArray = paste.split("");
      const newOTP = [...otp];
      pasteArray.forEach((char, index) => {
        if (index < length) {
          newOTP[index] = char;
        }
      });
      setOTP(newOTP);
      setIsComplete(newOTP.every((code) => code !== ""));
      onComplete(newOTP.join(""));
    }
  };

  return (
    <div className="flex items-center flex-col justify-center gap-5">
      <h2 className="text-2xl font-semibold">OTP Verification</h2>
      <p className="">OTP has been sent to +*********12</p>
      <div className="flex items-center gap-5">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className={`w-[50px] p-[10px] text-xl border outline-none text-center rounded-md focus:border  ${
              isComplete
                ? "border-green-500 bg-green-50 text-green-600"
                : "focus:border-indigo-500"
            }`}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>
      <button className="text-sm">Resend otp</button>
    </div>
  );
};

export default OTPInput;
