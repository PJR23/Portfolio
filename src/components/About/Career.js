import React, { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function Career() {
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".timeline-container .timeline-item");
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
            {t('career_title')} <strong className="purple">{t('career_subtitle')}</strong>
          </h1>
        </Row>
      </Container>
      <div className="timeline-container">
        <div className="timeline-item left">
          <div className="timeline-content">
            <div className="item1"></div>
            <h4>08/2022 - {t('career_present')}</h4>
            <h2>{t('career_school_name')}</h2>
            <p>{t('career_school_description')}<br/>{t('career_school_description2')}</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <div className="item2"></div>
            <h4>08/2022 - {t('career_present')}</h4>
            <h2>{t('career_job_title')}</h2>
            <p>{t('career_job_description')}<br/>{t('career_job_description2')}</p>
          </div>
        </div>

        <div className="timeline-item left">
          <div className="timeline-content">
            <div className="item3"></div>
            <h4>08/2019 - 07/2022</h4>
            <h2>{t('timeline_secondary_school')}</h2>
            <p>{t('timeline_secondary_school_desc')}</p>
          </div>
        </div>
        
        <div className="timeline-item right">
          <div className="timeline-content">
            <div className="item4"></div>
            <h4>08/2014 - 07/2019</h4>
            <h2>{t('timeline_primary_school1')}</h2>
            <p>{t('timeline_primary_school1_desc')}</p>
          </div>
        </div>

        <div className="timeline-item left">
          <div className="timeline-content">
            <div className="item5"></div>
            <h4>08/2013 - 07/2014</h4>
            <h2>{t('timeline_primary_school2')}</h2>
            <p>{t('timeline_primary_school2_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;
