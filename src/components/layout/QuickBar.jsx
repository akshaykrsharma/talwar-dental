import { CLINIC, SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { anchor } from "@/utils/scroll";
import Icon from "@/components/ui/Icon";
import "./QuickBar.css";

/** Phones only: a fixed Call / Book bar so the main actions are always one tap away. */
export default function QuickBar() {
  const { t } = useLanguage();
  return (
    <div className="quickbar">
      <a href={`tel:${CLINIC.phone.tel}`}>
        <Icon name="phone" />
        {t.nav.call}
      </a>
      <a href={anchor(SECTION_IDS.contact)} className="quickbar__book">
        {t.nav.book}
      </a>
    </div>
  );
}
