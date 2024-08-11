import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useTranslation } from 'react-i18next';

function AboutCard() {
  const { t } = useTranslation();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t('aboutcard_greeting')} <span className="purple">{t('aboutcard_name')} </span> 
            {t('aboutcard_location')}
            <br />
            {t('aboutcard_studies')}
            <br />
            {t('aboutcard_courses')}
            <br />
            <br />
            {t('aboutcard_activities_title')}
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> {t('aboutcard_activity1')}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t('aboutcard_activity2')}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t('aboutcard_activity3')}
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            {t('aboutcard_quote')}
          </p>
          <footer className="blockquote-footer">{t('aboutcard_footer')}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
