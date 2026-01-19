"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContext } from "../../../components/next-routing/ToastProvider";
import "../styles.css";

function ContactPage() {
  const router = useRouter();
  const { createToast } = React.useContext(ToastContext);
  function handleSubmit(e) {
    e.preventDefault();
    router.push("/flash-messages");
    createToast("form submitted successfully", "success");
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" required={true} />

        <label htmlFor="message">Message:</label>
        <textarea id="message" />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default ContactPage;
