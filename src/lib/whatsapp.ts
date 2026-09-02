/** Single source of truth for the showroom's WhatsApp line. */
export const WHATSAPP_NUMBER = "+880 1960-481983";
const WA_ID = "8801960481983";

export function whatsappLink(message: string) {
  return `https://wa.me/${WA_ID}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}
