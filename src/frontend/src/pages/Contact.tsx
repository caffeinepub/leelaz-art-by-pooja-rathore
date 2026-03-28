import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function Contact() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address.";
    if (!message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      if (actor) {
        await actor.submitContactMessage(name, email, message);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        className="max-w-xl mx-auto px-6 py-24 text-center"
        data-ocid="contact.success_state"
      >
        <CheckCircle
          className="mx-auto mb-6 text-foreground"
          size={48}
          strokeWidth={1.5}
        />
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
          Message Sent!
        </h2>
        <p className="font-sans text-muted-foreground leading-relaxed">
          Thank you, <strong>{name}</strong>. Pooja will get back to you at{" "}
          <strong>{email}</strong> soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans mb-2">
          Get In Touch
        </p>
        <h1 className="font-serif text-4xl font-bold text-foreground">
          Contact
        </h1>
        <div className="w-12 h-px bg-foreground mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          data-ocid="contact.panel"
        >
          <div>
            <Label
              htmlFor="contact-name"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Full Name *
            </Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="font-sans text-sm"
              data-ocid="contact.input"
            />
            {errors.name && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="contact.error_state"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="contact-email"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Email Address *
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="font-sans text-sm"
              data-ocid="contact.input"
            />
            {errors.email && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="contact.error_state"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="contact-message"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Message *
            </Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={6}
              className="font-sans text-sm resize-none"
              data-ocid="contact.textarea"
            />
            {errors.message && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="contact.error_state"
              >
                {errors.message}
              </p>
            )}
          </div>

          {errors.submit && (
            <p
              className="font-sans text-xs text-destructive"
              data-ocid="contact.error_state"
            >
              {errors.submit}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-foreground text-background font-sans text-sm font-semibold tracking-wider uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
            data-ocid="contact.submit_button"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Let&apos;s Connect
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              Have a question about commissions, collaborations, or just want to
              say hello? Fill in the form and Pooja will get back to you within
              2 business days.
            </p>
            <div className="space-y-4">
              {[
                { label: "Email", value: "pooja@leelazart.in" },
                { label: "Location", value: "India" },
                {
                  label: "Commission Enquiries",
                  value: "Use the Commissions page",
                },
              ].map((info) => (
                <div key={info.label} className="flex gap-4">
                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground w-36 flex-shrink-0 pt-0.5">
                    {info.label}
                  </span>
                  <span className="font-sans text-sm text-foreground">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border p-6">
            <img
              src="/assets/generated/gallery-abstract-1.dim_600x600.jpg"
              alt="Abstract artwork"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
