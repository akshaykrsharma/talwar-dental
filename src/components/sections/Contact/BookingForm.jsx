import PropTypes from "prop-types";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useLanguage } from "@/hooks/useLanguage";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/** Appointment request form. Sends the details to the clinic's WhatsApp. */
export default function BookingForm({ service, onServiceChange }) {
  const { t } = useLanguage();
  const { values, errors, setField, handleSubmit } = useBookingForm({ service });
  const f = t.contact.form;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        <span>{f.name}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <em role="alert">{errors.name}</em>}
      </label>

      <label>
        <span>{f.phone}</span>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={setField("phone")}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone && <em role="alert">{errors.phone}</em>}
      </label>

      <label>
        <span>{f.service}</span>
        <select value={service} onChange={(e) => onServiceChange(e.target.value)}>
          <option value="">{f.servicePlaceholder}</option>
          {t.services.items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{f.message}</span>
        <textarea rows="3" value={values.message} onChange={setField("message")} />
      </label>

      <Button type="submit" size="lg">
        <Icon name="chat" />
        {f.submit}
      </Button>
    </form>
  );
}

BookingForm.propTypes = {
  service: PropTypes.string.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};
