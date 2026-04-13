"use client";
// components/sections/ContactForm.tsx
// Contact form — Client Component.
// Uses mailto: for zero-backend static deployment.
// Implements controlled form state with validation.

import { useState, useId, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { COMPANY_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECTS = [
  "Product Enquiry",
  "Request a Quote",
  "Technical Consultation",
  "Custom Formulation",
  "Logistics & Shipping",
  "Other",
];

const INITIAL_STATE: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: SUBJECTS[0],
  message: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.subject) errors.subject = "Please select a subject.";
  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined } as FormErrors));
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(`${id}-${firstErrorField}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch (err: any) {
      setApiError(err.message || "A system error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Modal using Portal to avoid z-index/stacking context issues */}
      {submitted && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl p-8 sm:p-10 max-w-sm w-full flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in-95 duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            {/* Green background and green icon for success */}
            <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-2">
              <FiCheckCircle className="w-8 h-8 text-success-500" aria-hidden="true" />
            </div>
            <h3 id="success-modal-title" className="text-xl font-bold text-neutral-900">
              Message Sent!
            </h3>
            <p className="text-neutral-600 text-sm">
              We have received your message. A member of our team will get back to you within one business day.
            </p>
            <button
              className="btn-primary w-full mt-4"
              onClick={() => setSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

      <form
        id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="card p-8 flex flex-col gap-5 scroll-mt-28"
    >
      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${id}-name`}
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            Full Name <span className="text-error-500" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            placeholder="Reynaldo Putra"
            className={cn(
              "w-full px-4 py-3 rounded-xl border text-sm bg-white",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "transition-colors duration-200 placeholder:text-neutral-400",
              errors.name
                ? "border-error-500 focus:ring-error-500"
                : "border-neutral-200 hover:border-neutral-300"
            )}
          />
          {errors.name && (
            <p
              id={`${id}-name-error`}
              className="mt-1.5 text-xs text-error-500"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${id}-company`}
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            Company
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            placeholder="PT Infinith Creative Lab"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 hover:border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors duration-200 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${id}-email`}
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            Email Address <span className="text-error-500" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            placeholder="reynaldo@example.com"
            className={cn(
              "w-full px-4 py-3 rounded-xl border text-sm bg-white",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "transition-colors duration-200 placeholder:text-neutral-400",
              errors.email
                ? "border-error-500 focus:ring-error-500"
                : "border-neutral-200 hover:border-neutral-300"
            )}
          />
          {errors.email && (
            <p
              id={`${id}-email-error`}
              className="mt-1.5 text-xs text-error-500"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${id}-phone`}
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            Phone Number
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+62 878 5540 0002"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 hover:border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors duration-200 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor={`${id}-subject`}
          className="block text-sm font-semibold text-neutral-700 mb-1.5"
        >
          Subject <span className="text-error-500" aria-hidden="true">*</span>
        </label>
        <select
          id={`${id}-subject`}
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.subject}
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm bg-white",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "transition-colors duration-200",
            errors.subject
              ? "border-error-500"
              : "border-neutral-200 hover:border-neutral-300"
          )}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${id}-message`}
          className="block text-sm font-semibold text-neutral-700 mb-1.5"
        >
          Message <span className="text-error-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          placeholder="Please describe your requirements, product grade, volume, and delivery destination…"
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm bg-white resize-none",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "transition-colors duration-200 placeholder:text-neutral-400",
            errors.message
              ? "border-error-500 focus:ring-error-500"
              : "border-neutral-200 hover:border-neutral-300"
          )}
        />
        {errors.message && (
          <p
            id={`${id}-message-error`}
            className="mt-1.5 text-xs text-error-500"
            role="alert"
          >
            {errors.message}
          </p>
        )}
        <p className="mt-1.5 text-xs text-neutral-400">
          Minimum 20 characters. Be as specific as possible about grade, quantity, and destination.
        </p>
      </div>

      {/* API Error Box */}
      {apiError && (
        <div className="p-4 rounded-xl bg-error-50 border border-error-100 text-error-600 text-sm" role="alert">
          {apiError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary btn-lg w-full sm:w-auto self-start flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isSubmitting ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <FiSend className="w-4 h-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
    </>
  );
}
