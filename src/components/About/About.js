import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import Career from "./Career";
import { useTranslation } from 'react-i18next';

function About({ particlesEnabled }) {
  const { t } = useTranslation();

  return (
    <Container fluid className="about-section">
      {particlesEnabled && <Particle />} 
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              {t('about_title')} <strong className="purple">{t('about_me')}</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt={t('about_img_alt')} className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          {t('skills_title')} <strong className="purple">{t('skills_profile')}</strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">{t('tools_title')}</strong>, {t('tools_description')}
        </h1>
        <Toolstack />

        <Career />
      </Container>
    </Container>
  );
}

export default About;
