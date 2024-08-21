import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
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
import { FaSearch } from "react-icons/fa";

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
  
  const [searchTerm, setSearchTerm] = useState("");

  // Funktion, um den korrekten Abstract-Pfad basierend auf der aktuellen Sprache zu wählen
  const getAbstractPath = (abstractEN, abstractDE) => {
    return currentLanguage === "de" ? abstractDE : abstractEN;
  };

  // Filter-Funktion für die Projekte basierend auf dem Suchbegriff
  const projects = [
    {
      imgPath: studypal,
      title: t('studypal_title'),
      description: t('studypal_description'),
      ghLink: "https://github.com/PJR23/StudyPal",
      languages: ["React Native", "JavaScript", "SQLite"],
      previewLink: getAbstractPath(abstractStudypalEN, abstractStudypalDE),
      abstract: getAbstractPath(abstractStudypalEN, abstractStudypalDE),
    },
    {
      imgPath: facereg,
      title: t('facelogin_title'),
      description: t('facelogin_description'),
      ghLink: "https://github.com/PJR23/Facelogin-Calendar-App",
      languages: ["Python", "Flask", "HTML", "CSS", "JavaScript", "SQLite"],
      previewLink: getAbstractPath(abstractFaceregEN, abstractFaceregDE),
      abstract: getAbstractPath(abstractFaceregEN, abstractFaceregDE),
    },
    {
      imgPath: onlineshop,
      title: t('online_shop_title'),
      description: t('online_shop_description'),
      ghLink: "https://github.com/PJR23/Online-Shop",
      languages: ["PHP", "HTML", "CSS", "JavaScript", "MongoDB", "Apache2"],
      previewLink: getAbstractPath(abstractOnlineshopEN, abstractOnlineshopDE),
      abstract: getAbstractPath(abstractOnlineshopEN, abstractOnlineshopDE),
    },
    {
      imgPath: taskmaster,
      title: t('taskmaster_title'),
      description: t('taskmaster_description'),
      ghLink: "https://github.com/PJR23/TaskMaster",
      languages: ["C#", "XAML", ".NET MAUI", "SQLite"],
      previewLink: getAbstractPath(abstractTaskmasterEN, abstractTaskmasterDE),
      abstract: getAbstractPath(abstractTaskmasterEN, abstractTaskmasterDE),
    },
    {
      imgPath: m293website,
      title: t('m293_website_title'),
      description: t('m293_website_description'),
      ghLink: "https://github.com/PJR23/M293-Website",
      languages: ["HTML", "CSS", "JavaScript"],
      previewLink: getAbstractPath(abstractM293websiteEN, abstractM293websiteDE),
      abstract: getAbstractPath(abstractM293websiteEN, abstractM293websiteDE),
    },
    {
      imgPath: wormgame,
      title: t('worm_title'),
      description: t('worm_description'),
      ghLink: "https://github.com/soumyajit4419/Plant_AI",
      languages: ["HTML", "CSS", "JavaScript"],
      previewLink: getAbstractPath(abstractWormgameEN, abstractWormgameDE),
      abstract: getAbstractPath(abstractWormgameEN, abstractWormgameDE),
    },
    {
      imgPath: websitev2,
      title: t('first_website_v2_title'),
      description: t('first_website_v2_description'),
      ghLink: "https://github.com/PJR23/First-Website-v2",
      languages: ["HTML", "CSS", "JavaScript"],
      previewLink: getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE),
      abstract: getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE),
    },
    {
      imgPath: firstwebsite,
      title: t('first_website_title'),
      description: t('first_website_description'),
      ghLink: "https://github.com/PJR23/First-Website",
      languages: ["HTML", "CSS"],
      previewLink: getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE),
      abstract: getAbstractPath(abstractFirstwebsiteEN, abstractFirstwebsiteDE),
    },
  ]
  
  const filteredProjects = projects.filter(project =>
    project.languages.some(language =>
      language.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container fluid className="project-section" >
      {particlesEnabled && <Particle />}
      <Container>
        <h1 className="project-heading">
          {t('current_projects')} <strong className="purple">{t('projects')}</strong>
        </h1>
        <p>
          {t('project_description')}
        </p>

        <div id="poda">
            <div className="glow"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>
            <div className="white"></div>
            <div className="border"></div>
            <div id="main">
              <input
                placeholder={t('search_placeholder')}
                type="text"
                name="text"
                className="inputbar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div id="input-mask"></div>
              <div id="pink-mask"></div>
              <div className="filterBorder"></div>
              <div id="filter-icon">
                <svg
                  preserveAspectRatio="none"
                  height="27"
                  width="27"
                  viewBox="4.8 4.56 14.832 15.408"
                  fill="none"
                >
                  <path
                    d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                    className="filtericoncolor"
                    stroke-width="1"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div id="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  height="24"
                  fill="none"
                  className="feather feather-search"
                >
                  <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                  <line
                    stroke="url(#searchl)"
                    y2="16.65"
                    y1="22"
                    x2="16.65"
                    x1="22"
                  ></line>
                  <defs>
                    <linearGradient gradientTransform="rotate(50)" id="search">
                      <stop stop-color="#f8e7f8" offset="0%"></stop>
                      <stop stop-color="#b6a9b7" offset="50%"></stop>
                    </linearGradient>
                    <linearGradient id="searchl">
                      <stop stop-color="#b6a9b7" offset="0%"></stop>
                      <stop stop-color="#837484" offset="50%"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {filteredProjects.map((project, index) => (
            <Col key={index} md={4} className="project-card">
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={false}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                languages={project.languages}
                previewLink={project.previewLink}
                abstract={project.abstract}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
