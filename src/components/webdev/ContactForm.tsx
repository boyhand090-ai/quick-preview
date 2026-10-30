import React, { useState, useEffect, useRef } from "react";
import { siteData } from "@/data/webdev/siteData";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { saveInquiry } from "@/lib/inbox";

interface ContactFormProps {
  defaultService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService }) => {
  const { contact } = siteData;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Form states matching user's design
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    defaultService || "Web Development",
  ]);
  const [budget, setBudget] = useState("$1k to 10k");
  const [message, setMessage] = useState("");
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHelpDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHelpDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % contact.testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [contact.testimonials.length]);

  const currentT = contact.testimonials[activeTestimonial]!;

  const serviceOptions = [
    "UX UI Design",
    "Web Development",
    "Web Design",
    "WordPress Development",
    "SaaS Web & Application Design",
    "Branding & Strategy",
    "AI Automation & CRM",
    "E-commerce",
  ];

  const budgetOptions = ["$1k to 10k", "$10k to 20k", "$20k to 50k", "$50k+"];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    const resolvedSource =
      currentPath || (defaultService ? `/services/${defaultService}` : "/services/web-development");

    try {
      saveInquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        services:
          selectedServices.length > 0 ? selectedServices : [defaultService || "Web Development"],
        budget,
        message: message.trim() || undefined,
        source: resolvedSource,
      });
      toast.success("Inquiry received! Connected directly to our admin team.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    }

    setIsSubmitted(true);
  };

  return (
    <section
      id="contact-us-form"
      className="contact-forms relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#111113] overflow-visible"
    >
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_24px_70px_rgba(0,0,0,0.45)] border border-neutral-200/90 overflow-visible grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Testimonial Showcase */}
          <div className="p-8 sm:p-10 xl:p-12 flex flex-col justify-between min-h-[560px] lg:min-h-[640px] text-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-200/80">
            {/* Top Company Badge */}
            <div className="flex items-center gap-2.5">
              <div
                className="size-7 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-xs font-semibold"
                style={{ color: currentT.color }}
              >
                {currentT.letter.toLowerCase()}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                {currentT.company}
              </span>
            </div>

            {/* Testimonial Quote */}
            <div className="my-auto py-8">
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] leading-[1.25] font-bold text-neutral-950 tracking-tight">
                {currentT.quote}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mt-4 max-w-md">
                {currentT.subquote}
              </p>

              {/* Author & Avatar */}
              <div className="flex items-center gap-3.5 mt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200/80 p-1 shrink-0 bg-white shadow-sm flex items-center justify-center">
                  <img
                    src={currentT.avatar}
                    alt={currentT.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base sm:text-lg font-bold text-neutral-900">
                  {currentT.company}
                </span>
              </div>
            </div>

            {/* Bottom Rating & Progress Indicator */}
            <div className="pt-6">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="size-3.5 fill-black text-black" />
                ))}
              </div>
              <p className="text-xs text-neutral-600 font-medium">
                200+ happy Customers based on complement and customer reviews
              </p>

              {/* Progress bars */}
              <div className="flex gap-2 items-center mt-6">
                {contact.testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className="h-1 flex-1 rounded-full bg-neutral-200 overflow-hidden cursor-pointer"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {activeTestimonial === idx ? (
                      <div
                        className="h-full bg-[#87E00C] animate-[contactProgressGrow_linear_forwards]"
                        style={{ animationDuration: "5.5s" }}
                      />
                    ) : (
                      <div className="h-full bg-transparent" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 sm:p-10 xl:p-12 flex flex-col justify-between min-h-[560px] lg:min-h-[640px] text-neutral-900 relative">
            {isSubmitted ? (
              <div className="my-auto text-center py-12 px-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#9AFD0D]/30 text-black rounded-full flex items-center justify-center mx-auto mb-5 border border-[#9AFD0D]">
                  <CheckCircle className="w-9 h-9 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 mb-2">Thank You, {fullName}!</h3>
                <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
                  Your project details have been received. We'll be in touch within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full justify-between">
                <div>
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-3.5 py-1.5 text-xs font-semibold w-fit mb-3">
                    <span className="size-2 rounded-full bg-[#9AFD0D]" />
                    <span>Get in Touch</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-950 tracking-tight leading-tight">
                    Let's Talk About Your Project
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-2 mb-6 leading-relaxed">
                    Tell us what you're building. We design and build high-quality digital products
                    globally.
                  </p>

                  <div className="space-y-4">
                    {/* Row 1: Name and Services Multi-select */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                          Hi, I'm
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#F4F4F5] border-0 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                        />
                      </div>

                      <div className="relative" ref={dropdownRef}>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                          I need help with
                        </label>
                        <div
                          tabIndex={0}
                          role="button"
                          aria-expanded={helpDropdownOpen}
                          aria-haspopup="listbox"
                          onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setHelpDropdownOpen(!helpDropdownOpen);
                            }
                          }}
                          className="w-full h-11 px-3 rounded-xl bg-[#F4F4F5] border-0 text-neutral-900 text-xs flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 select-none"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden max-w-[calc(100%-20px)]">
                            {selectedServices.slice(0, 2).map((srv) => (
                              <span
                                key={srv}
                                className="inline-flex items-center gap-1 bg-white border border-neutral-300 rounded-md px-2 py-0.5 text-[11px] font-medium text-neutral-800 shrink-0"
                              >
                                <span className="truncate max-w-[95px]">{srv}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleService(srv);
                                  }}
                                  className="text-neutral-400 hover:text-black cursor-pointer text-xs leading-none"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {selectedServices.length > 2 && (
                              <span className="text-[11px] font-medium text-neutral-500 shrink-0">
                                +{selectedServices.length - 2} more
                              </span>
                            )}
                            {selectedServices.length === 0 && (
                              <span className="text-neutral-400 text-xs px-1">
                                Select services...
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`size-4 text-neutral-600 shrink-0 transition-transform ${
                              helpDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Dropdown Menu Modal */}
                        {helpDropdownOpen && (
                          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-neutral-200 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.18)] p-1.5 z-50 max-h-[260px] overflow-y-auto">
                            {serviceOptions.map((srv) => {
                              const isChecked = selectedServices.includes(srv);
                              return (
                                <div
                                  key={srv}
                                  onClick={() => toggleService(srv)}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-xs transition-colors mb-1 last:mb-0 select-none ${
                                    isChecked
                                      ? "bg-[#9AFD0D] text-black font-semibold"
                                      : "bg-white text-neutral-700 hover:bg-neutral-100 font-medium"
                                  }`}
                                >
                                  <div
                                    className={`size-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                                      isChecked
                                        ? "bg-black border-black text-white"
                                        : "border-neutral-400 bg-white"
                                    }`}
                                  >
                                    {isChecked && (
                                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path
                                          d="M1 4L3.5 6.5L9 1"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <span>{srv}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#F4F4F5] border-0 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                      />
                    </div>

                    {/* Row 3: Budget range */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-2">
                        Budget range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgetOptions.map((b) => {
                          const isSelected = budget === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBudget(b)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                                isSelected
                                  ? "bg-black text-white border-black font-semibold shadow-sm"
                                  : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Additional info? */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Additional info?
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Goals, scope, timeline, or helpful links"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border-0 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all resize-none min-h-[90px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 5: Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#9AFD0D] hover:bg-[#8ee80c] active:scale-[0.99] text-black font-bold text-sm sm:text-base py-3.5 rounded-full transition-all cursor-pointer shadow-[0_6px_20px_rgba(154,253,13,0.35)]"
                  >
                    Get in Touch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
