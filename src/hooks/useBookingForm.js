import { useState } from "react";
import { CLINIC } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { validateBooking } from "@/utils/validation";
import { buildBookingLines, buildWhatsAppUrl } from "@/utils/whatsapp";

const EMPTY = { name: "", phone: "", message: "" };

/**
 * State, validation and submission for the booking form.
 * Submitting opens WhatsApp with a pre-filled message (no backend needed).
 *
 * @param {{service: string}} args selected service id (owned by the parent so service cards can set it)
 */
export function useBookingForm({ service }) {
  const { t } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) => setValues((v) => ({ ...v, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = t.contact.form;

    const nextErrors = validateBooking(values, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const serviceName =
      t.services.items.find((s) => s.id === service)?.title ?? form.servicePlaceholder;
    const lines = buildBookingLines(
      { name: values.name, phone: values.phone, serviceName, note: values.message },
      form,
    );
    window.open(buildWhatsAppUrl(CLINIC.phone.whatsapp, lines), "_blank", "noopener");
  };

  return { values, errors, setField, handleSubmit };
}
