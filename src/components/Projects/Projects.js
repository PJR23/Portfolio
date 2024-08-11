import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { useTranslation } from 'react-i18next';
import taskmaster from "../../Assets/Projects/taskmaster.png";
import firstwebsite from "../../Assets/Projects/firstwebsite.png";
import websitev2 from "../../Assets/Projects/firstwebsitev2.png";
import onlineshop from "../../Assets/Projects/shop.png";
import wormgame from "../../Assets/Projects/worm.png";
import facereg from "../../Assets/Projects/facereg.png";
import m293website from "../../Assets/Projects/m293webseite.png";
import studypal from "../../Assets/Projects/studypal.png";

// Abstract-Dateipfade
import abstractStudypalEN from "../../Assets/Projects/abstracts/en/studypal.pdf";
import abstractStudypalDE from "../../Assets/Projects/abstracts/de/studypal.pdf";
import abstractFaceregEN from "../../Assets/Projects/abstracts/en/facereg.pdf";
import abstractFaceregDE from "../../Assets/Projects/abstracts/de/facereg.pdf";
import abstractOnlineshopEN from "../../Assets/Projects/abstracts/en/onlineshop.pdf";
import abstractOnlineshopDE from "../../Assets/Projects/abstracts/de/onlineshop.pdf";
import abstractTaskmasterEN from "../../Assets/Projects/abstracts/en/taskmaster.pdf";
import abstractTaskmasterDE from "../../Assets/Projects/abstracts/de/taskmaster.pdf";
import abstractM293websiteEN from "../../Assets/Projects/abstracts/en/m293website.pdf";
import abstractM293websiteDE from "../../Assets/Projects/abstracts/de/m293website.pdf";
import abstractWormgameEN from "../../Assets/Projects/abstracts/en/wormgame.pdf";
import abstractWormgameDE from "../../Assets/Projects/abstracts/de/wormgame.pdf";
import abstractFirstwebsiteEN from "../../Assets/Projects/abstracts/en/firstwebsite.pdf";
import abstractFirstwebsiteDE from "../../Assets/Projects/abstracts/de/firstwebsite.pdf";

function Projects({ particlesEnabled }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Funktion, um den korrekten Abstract-Pfad basierend auf der aktuellen Sprache zu wählen
  const getAbstractPath = (abstractEN, abstractDE) => {
    return currentLanguage === "de" ? abstractDE : abstractEN;
  };

  return (
    <Container fluid className="project-section">
      {particlesEnabled && <Particle />}
      <Container>
        <h1 className="project-heading">
          {t('current_projects')} <strong className="purple">{t('projects')}</strong>
        </h1>
        <p>
          {t('project_description')}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={studypal}
              isBlog={false}
              title={t('studypal_title')}
              description={t('studypal_description')}
              ghLink="https://github.com/PJR23/StudyPal"
              // demoLink=""
              abstract={getAbstractPath(abstractStudypalEN, abstractStudypalDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={facereg}
              isBlog={false}
              title={t('facelogin_title')}
              description={t('facelogin_description')}
              ghLink="https://github.com/PJR23/Facelogin-Calendar-App"
              // demoLink=""
              abstract={getAbstractPath(abstractFaceregEN, abstractFaceregDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={onlineshop}
              isBlog={false}
              title={t('online_shop_title')}
              description={t('online_shop_description')}
              ghLink="https://github.com/PJR23/Online-Shop"
              // demoLink=""
              abstract={getAbstractPath(abstractOnlineshopEN, abstractOnlineshopDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={taskmaster}
              isBlog={false}
              title={t('taskmaster_title')}
              description={t('taskmaster_description')}
              ghLink="https://github.com/PJR23/TaskMaster"
              abstract={getAbstractPath(abstractTaskmasterEN, abstractTaskmasterDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={m293website}
              isBlog={false}
              title={t('m293_website_title')}
              description={t('m293_website_description')}
              ghLink="https://github.com/PJR23/M293-Website"
              // demoLink=""
              abstract={getAbstractPath(abstractM293websiteEN, abstractM293websiteDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={wormgame}
              isBlog={false}
              title={t('worm_title')}
              description={t('worm_description')}
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              // demoLink=""
              abstract={getAbstractPath(abstractWormgameEN, abstractWormgameDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={websitev2}
              isBlog={false}
              title={t('first_website_v2_title')}
              description={t('first_website_v2_description')}
              ghLink="https://github.com/PJR23/First-Website-v2"
              // demoLink=""
              abstract={getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE)}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={firstwebsite}
              isBlog={false}
              title={t('first_website_title')}
              description={t('first_website_description')}
              ghLink="https://github.com/PJR23/First-Website"      
              // demoLink=""
              abstract={getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE)}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
