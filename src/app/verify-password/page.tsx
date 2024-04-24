"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyPasswordPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");

  const VerifyPassword = async () => {
    try {
      const response = await axios.post("/api/users/verify-password", {
        token,
      });
      setIsVerified(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  };
  const onChangePassword = async () => {
    try {
      const response = await axios.post("/api/users/change-password", {
        password,
        token,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      VerifyPassword();
    }
  }, [token]);

  if (!isVerified) return <div>Loading</div>;
  return (
    <div>
      <label>New Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type="text" />
      <button onClick={onChangePassword}>Change Password</button>
    </div>
  );
}
