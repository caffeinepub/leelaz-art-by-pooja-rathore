import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../backend";
import { useActor } from "../hooks/useActor";

const COMMISSION_TYPES = [
  "Portrait",
  "Landscape",
  "Abstract",
  "Pet Portrait",
  "Custom",
];

const PRICING = [
  {
    type: "Portrait",
    price: "\u20b92,500 \u2013 \u20b96,000",
    delivery: "7\u201310 days",
  },
  {
    type: "Landscape",
    price: "\u20b93,000 \u2013 \u20b97,500",
    delivery: "10\u201314 days",
  },
  {
    type: "Abstract",
    price: "\u20b92,000 \u2013 \u20b95,000",
    delivery: "5\u20138 days",
  },
  {
    type: "Pet Portrait",
    price: "\u20b93,500 \u2013 \u20b98,000",
    delivery: "10\u201314 days",
  },
  { type: "Custom", price: "Contact for quote", delivery: "Varies" },
];

export default function Commissions() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commissionType, setCommissionType] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address.";
    if (!commissionType)
      errs.commissionType = "Please select a commission type.";
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
      let photoRef: ExternalBlob | null = null;
      const referencePhotoUrl: string | null = null;
      if (file) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          setUploadProgress(pct),
        );
        photoRef = blob;
      }
      if (actor) {
        await actor.submitCommissionRequest(
          name,
          email,
          commissionType,
          referencePhotoUrl,
          message || null,
          photoRef,
        );
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setName("");
    setEmail("");
    setCommissionType("");
    setMessage("");
    setFile(null);
    setUploadProgress(0);
  };

  if (success) {
    return (
      <div
        className="max-w-xl mx-auto px-6 py-24 text-center"
        data-ocid="commissions.success_state"
      >
        <CheckCircle
          className="mx-auto mb-6 text-foreground"
          size={48}
          strokeWidth={1.5}
        />
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
          Request Received!
        </h2>
        <p className="font-sans text-muted-foreground leading-relaxed mb-3">
          Thank you, <strong>{name}</strong>. Your commission request for a{" "}
          <strong>{commissionType}</strong> has been submitted.
        </p>
        <p className="font-sans text-muted-foreground text-sm">
          Pooja will review your request and get in touch at{" "}
          <strong>{email}</strong> within 2 business days.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-10 px-8 py-3 bg-foreground text-background font-sans text-sm font-semibold tracking-wider uppercase hover:opacity-80 transition-opacity"
          data-ocid="commissions.secondary_button"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans mb-2">
          Work With Me
        </p>
        <h1 className="font-serif text-4xl font-bold text-foreground">
          Commission a Sketch
        </h1>
        <div className="w-12 h-px bg-foreground mx-auto mt-4" />
      </div>

      <section className="mb-16" data-ocid="commissions.section">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
          Pricing &amp; Delivery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRICING.map((p) => (
            <div
              key={p.type}
              className="border border-border p-5"
              data-ocid="commissions.card"
            >
              <div className="font-serif text-sm font-bold text-foreground mb-2">
                {p.type}
              </div>
              <div className="font-sans text-xs text-muted-foreground mb-1">
                {p.price}
              </div>
              <div className="font-sans text-xs text-muted-foreground">
                {p.delivery}
              </div>
            </div>
          ))}
        </div>
        <p className="font-sans text-xs text-muted-foreground mt-4">
          * Prices vary by size and complexity. A 50% deposit is required to
          begin work.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
          data-ocid="commissions.panel"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Request a Commission
          </h2>

          <div>
            <Label
              htmlFor="comm-name"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Full Name *
            </Label>
            <Input
              id="comm-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="font-sans text-sm"
              data-ocid="commissions.input"
            />
            {errors.name && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="commissions.error_state"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="comm-email"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Email Address *
            </Label>
            <Input
              id="comm-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="font-sans text-sm"
              data-ocid="commissions.input"
            />
            {errors.email && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="commissions.error_state"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block">
              Commission Type *
            </Label>
            <Select value={commissionType} onValueChange={setCommissionType}>
              <SelectTrigger
                className="font-sans text-sm"
                data-ocid="commissions.select"
              >
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {COMMISSION_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="font-sans text-sm">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.commissionType && (
              <p
                className="font-sans text-xs text-destructive mt-1"
                data-ocid="commissions.error_state"
              >
                {errors.commissionType}
              </p>
            )}
          </div>

          <div>
            <Label className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block">
              Reference Photo (Optional)
            </Label>
            <button
              type="button"
              className="w-full border border-dashed border-border p-6 text-center cursor-pointer hover:border-foreground transition-colors"
              onClick={() => fileRef.current?.click()}
              aria-label="Upload reference photo"
              data-ocid="commissions.dropzone"
            >
              <Upload
                className="mx-auto mb-2 text-muted-foreground"
                size={20}
              />
              <p className="font-sans text-xs text-muted-foreground">
                {file ? file.name : "Click to upload a reference image"}
              </p>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-3 h-1 bg-border w-full">
                  <div
                    className="h-1 bg-foreground transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              data-ocid="commissions.upload_button"
            />
          </div>

          <div>
            <Label
              htmlFor="comm-message"
              className="font-sans text-xs uppercase tracking-wider text-foreground mb-1.5 block"
            >
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="comm-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your vision, dimensions, any special requirements..."
              rows={4}
              className="font-sans text-sm resize-none"
              data-ocid="commissions.textarea"
            />
          </div>

          {errors.submit && (
            <p
              className="font-sans text-xs text-destructive"
              data-ocid="commissions.error_state"
            >
              {errors.submit}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-foreground text-background font-sans text-sm font-semibold tracking-wider uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
            data-ocid="commissions.submit_button"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </button>
        </form>

        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
              What to Expect
            </h3>
            <ol className="space-y-4">
              {[
                {
                  step: "01",
                  label: "Submit your request",
                  detail:
                    "Fill in the form with your requirements and reference photo.",
                },
                {
                  step: "02",
                  label: "Confirmation & quote",
                  detail:
                    "Pooja will respond within 2 business days with a final quote.",
                },
                {
                  step: "03",
                  label: "Work begins",
                  detail:
                    "After a 50% deposit, Pooja starts on your custom artwork.",
                },
                {
                  step: "04",
                  label: "Review & delivery",
                  detail:
                    "You'll receive a preview before the final artwork is shipped.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-serif text-xl font-bold text-border flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <div className="font-sans text-sm font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="font-sans text-xs text-muted-foreground mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-border p-6">
            <img
              src="/assets/generated/gallery-portrait-1.dim_600x750.jpg"
              alt="Sample commission work"
              className="w-full h-48 object-cover mb-4"
            />
            <p className="font-sans text-xs text-muted-foreground italic">
              &ldquo;Serene Portrait&rdquo; &mdash; Graphite, A3 Size
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
