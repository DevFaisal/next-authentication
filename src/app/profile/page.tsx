"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response: any = await axios.post("/api/users/me");
      console.log(response.data.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      const response: any = axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("User Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Profile Page</h1>
        <h1>
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>Click Here</Link>
          )}
        </h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
        <hr />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
