import PropTypes from "prop-types";
import { SECTION_IDS } from "@/config/site";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BookingForm from "./BookingForm";
import ContactInfo from "./ContactInfo";
import MapEmbed from "./MapEmbed";
import "./Contact.css";

export default function Contact({ service, onServiceChange }) {
  return (
    <Section id={SECTION_IDS.contact}>
      <Container className="contact">
        <ContactInfo />
        <BookingForm service={service} onServiceChange={onServiceChange} />
        <MapEmbed />
      </Container>
    </Section>
  );
}

Contact.propTypes = {
  service: PropTypes.string.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};
