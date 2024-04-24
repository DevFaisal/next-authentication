"use client";
import React from "react";

export default function page({ params }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Profile Page</h1>
      <p className="bg-green-400 p-2">{params.id}</p>
    </div>
  );
}
