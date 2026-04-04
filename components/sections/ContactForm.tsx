"use client";
// components/sections/ContactForm.tsx
// Contact form — Client Component.
// Uses mailto: for zero-backend static deployment.
// Implements controlled form state with validation.

import { useState, useId } from "react";
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(`${id}-${firstErrorField}`)?.focus();
      return;
    }

    // Build mailto link — static site friendly, no backend needed
    const subject = encodeURIComponent(`[Takara Web] ${form.subject} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company || "—"}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm(INITIAL_STATE);
  };

  if (submitted) {
    return (
      <div
        className="card p-12 flex flex-col items-center justify-center text-center gap-4"
        role="alert"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center">
          <FiCheckCircle className="w-8 h-8 text-brand-500" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">
          Your email client has opened
        </h3>
        <p className="text-neutral-600 text-sm max-w-sm">
          Send the pre-filled message and our team will respond within one
          business day.
        </p>
        <button
          className="btn-ghost mt-2"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
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

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary btn-lg w-full sm:w-auto self-start flex items-center justify-center gap-2 mt-1"
      >
        <FiSend className="w-4 h-4" aria-hidden="true" />
        Send Message
      </button>
    </form>
  );
}
