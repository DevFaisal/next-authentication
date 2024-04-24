"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  //   const router = useRouter();

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      // const { query } = router;
      // const urlToken2 = query.token;
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    setError(false);
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-4xl font-bold text-center">Verify Email</h1>
        <div className="mt-4">
          <h1 className="bg-orange-400 p-1">{token}</h1>
          {/* <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
        </div>
        <div className="mt-4">
          <button className="w-full p-2 bg-blue-500 text-white rounded">
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
