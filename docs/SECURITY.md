# Security Policy

The Takara Enterprise website implements a layered security approach, focusing on static site integrity and client-side data protection.

## Architecture-level Security

- **Static Site Generation (SSG)**: By pre-rendering the site at build time, we eliminate traditional server-side vulnerabilities such as SQL injection, server-side request forgery (SSRF), and remote code execution (RCE).
- **Environment Isolation**: Sensitive configuration (IDs, API keys) is managed via environment variables (`.env.local`) and is never committed to source control.

## Form & Data Protection

- **Client-side Validation**: The `ContactForm` implements strict TypeScript-based validation to ensure data integrity before submission.
- **Mailto Implementation**: For maximum privacy and zero-backend risk, the contact form uses a `mailto:` integration. This ensures that user data is never stored on an interim server or database, placing the communication directly into the user's secure mail client.
- **Bot Mitigation**: All forms and email links are designed to prevent simple scraping while maintaining full accessibility.

## HTTP & Header Security

- **Next.js Security Headers**: Standard security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) are configured via `next.config.ts`.
- **Content Security Policy (CSP)**: The site is architected to be compatible with strict CSP requirements, avoiding inline scripts where possible.

## Infrastructure

- **Global Edge Network**: Deploying via Vercel/Netlify ensures high availability, DDoS protection, and secure SSL/TLS termination out of the box.

---

> [!CAUTION]
> Never store sensitive API keys in client-side code (`process.env.NEXT_PUBLIC_`). Always use server components or environment variables for sensitive logic.
