"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SingInPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("User Login successfully");
      router.push("/profile");
    } catch (error: any) {
      console.error(error);
      toast.error("Error Login");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-4xl font-bold text-center">Login Up</h1>

        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <button
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              buttonDisabled ? "bg-gray-300" : ""
            }`}
            onClick={onSignUp}
            disabled={buttonDisabled}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <Link href={"/forget-password"}>Forget Password</Link>
      </div>
    </div>
  );
}

export default SingInPage;
