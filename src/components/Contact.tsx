import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, Send, ExternalLink, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionReveal from './SectionReveal';

const EMAIL = 'letschoice83@gmail.com';
const GITHUB_URL = 'https://github.com/MahatabHossain221';
const GITHUB_HANDLE = 'github.com/MahatabHossain221';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_CONFIGURED =
  EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID &&
  !EMAILJS_PUBLIC_KEY.startsWith('your_') && !EMAILJS_SERVICE_ID.startsWith('your_') && !EMAILJS_TEMPLATE_ID.startsWith('your_');

const ACTIVE_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    display: EMAIL,
    href: `mailto:${EMAIL}`,
    color: '#00ffa3',
    ariaLabel: `Send an email to ${EMAIL}`,
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    display: GITHUB_HANDLE,
    href: GITHUB_URL,
    color: '#ffffff',
    ariaLabel: `Visit GitHub profile at ${GITHUB_URL}`,
    external: true,
  },
];

const PENDING_LINKS = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    placeholder: 'LinkedIn profile — coming soon',
    color: '#0a66c2',
  },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormFields = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  function validate(fields: FormFields): boolean {
    const next: Partial<Record<keyof FormFields, string>> = {};

    if (!fields.name.trim()) next.name = 'Please enter your name';
    if (!fields.email.trim()) {
      next.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!fields.subject.trim()) next.subject = 'Please enter a subject';
    if (!fields.message.trim()) {
      next.message = 'Please enter a message';
    } else if (fields.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status === 'success' || status === 'error') setStatus('idle');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (status === 'loading') return;
    if (!validate(form)) return;

    if (!EMAILJS_CONFIGURED) {
      setStatus('error');
      setErrorMsg('Email service is not configured yet. Please use the direct email link instead.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
          to_email: EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? `Failed to send: ${err.message}`
          : 'Something went wrong. Please try again or use the direct email link.'
      );
    }
  }

  const inputBase =
    'w-full rounded-lg border bg-space-700/50 px-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-colors focus:outline-none focus:ring-2';

  function fieldClass(field: keyof FormFields) {
    const hasError = errors[field];
    return `${inputBase} ${
      hasError
        ? 'border-red-500/40 focus:ring-red-500/30'
        : 'border-white/10 focus:border-emerald-glow/40 focus:ring-emerald-glow/30'
    }`;
  }

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-glow/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow" />
            <span className="section-label">05 — Contact</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={150}>
          <p className="mb-12 max-w-2xl text-gray-400">
            I'm always open to discussing new opportunities, collaborations, or just connecting with
            fellow developers. Feel free to reach out — I'd love to hear from you.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact cards */}
          <SectionReveal delay={200}>
            <div className="grid gap-4">
              {/* Active links — Email + GitHub */}
              {ACTIVE_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  aria-label={social.ariaLabel}
                  className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-emerald-glow/25 hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-emerald-glow/40"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-110"
                    style={{
                      borderColor: `${social.color}30`,
                      background: `${social.color}08`,
                    }}
                  >
                    <social.icon size={22} style={{ color: social.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-white">{social.label}</p>
                    <p className="truncate font-mono text-xs text-gray-400 transition-colors group-hover:text-emerald-glow">
                      {social.display}
                    </p>
                  </div>
                  {social.external ? (
                    <ExternalLink
                      size={16}
                      className="shrink-0 text-gray-600 transition-colors group-hover:text-emerald-glow"
                    />
                  ) : (
                    <span className="shrink-0 font-mono text-[10px] text-emerald-glow/60 transition-opacity group-hover:text-emerald-glow">
                      Email Me
                    </span>
                  )}
                </a>
              ))}

              {/* Pending links — LinkedIn + others */}
              {PENDING_LINKS.map((social) => (
                <div
                  key={social.label}
                  className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-5"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border opacity-50"
                    style={{
                      borderColor: `${social.color}30`,
                      background: `${social.color}08`,
                    }}
                  >
                    <social.icon size={22} style={{ color: social.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-white">{social.label}</p>
                    <p className="truncate font-mono text-xs text-gray-600">{social.placeholder}</p>
                  </div>
                  <span className="font-mono text-[10px] text-gray-700">Soon</span>
                </div>
              ))}

              {/* Quick info */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <p className="font-mono text-xs text-gray-600">
                  Email:{' '}
                  <span className="text-gray-400 break-all">{EMAIL}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-gray-600">
                  GitHub:{' '}
                  <span className="text-gray-400 break-all">{GITHUB_HANDLE}</span>
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Message form — EmailJS powered */}
          <SectionReveal delay={300}>
            <div className="glass-panel relative overflow-hidden p-8">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-cyan-glow/5 blur-3xl" />

              <h3 className="mb-1 font-display text-lg font-semibold text-white">Send a Message</h3>
              <p className="mb-6 text-sm text-gray-500">
                {EMAILJS_CONFIGURED
                  ? 'Fill out the form below and I\'ll get back to you as soon as possible.'
                  : 'Use the form below or email me directly using the link on the left.'}
              </p>

              {!EMAILJS_CONFIGURED && (
                <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-xs leading-relaxed text-amber-400/90">
                    Email form is not yet configured. Please use the direct email link, or set up
                    EmailJS to enable this form.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-gray-500">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="Enter your name"
                    className={fieldClass('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 font-mono text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-gray-500">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="you@example.com"
                    className={fieldClass('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 font-mono text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-xs text-gray-500">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="What's this about?"
                    className={fieldClass('subject')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 font-mono text-xs text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-gray-500">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="Type your message..."
                    rows={4}
                    className={`${fieldClass('message')} resize-none`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 font-mono text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-glow/20 bg-emerald-glow/5 px-6 py-3 font-medium text-emerald-glow transition-all duration-300 hover:border-emerald-glow/40 hover:bg-emerald-glow/10 hover:shadow-lg hover:shadow-emerald-glow/10 focus:outline-none focus:ring-2 focus:ring-emerald-glow/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success state */}
                {status === 'success' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-lg border border-emerald-glow/20 bg-emerald-glow/5 px-4 py-3"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-glow" />
                    <p className="text-xs leading-relaxed text-emerald-glow/90">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {/* Error state */}
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <p className="text-xs leading-relaxed text-red-400/90">{errorMsg}</p>
                      {!EMAILJS_CONFIGURED && (
                        <a
                          href={`mailto:${EMAIL}`}
                          className="mt-1 inline-block font-mono text-xs text-emerald-glow underline underline-offset-2 hover:text-emerald-300"
                        >
                          Click here to email me directly
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
