import { MessageCircle } from "lucide-react";

const PHONE = "93774801267";
const MESSAGE = "Assalamu alaikum, I'd like to know more about Ta'lim and Tarbiya classes for my child.";

/** Floating "Chat on WhatsApp" button, shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#1EBE5A] hover:-translate-y-0.5 transition-all"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
