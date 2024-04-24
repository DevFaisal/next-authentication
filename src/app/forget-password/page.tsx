"use client";
import React from "react";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onForgetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forget-password", { email });
      console.log(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Forget Password</h1>
        <div>
          <label>Email ID</label>
          <input
            className="text-black p-2 outline-none mx-2"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <button
          className="px-1 py-2 bg-blue-400 rounded-md"
          onClick={onForgetPassword}
        >
          Sent Rest Link
        </button>
      </div>
    </div>
  );
}
