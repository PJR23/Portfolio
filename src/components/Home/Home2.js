import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import pupu from "../../Assets/pupu.png";


function Home2() {
  const { t } = useTranslation();

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              {t('introduction')} <span className="purple"> {t('introduction2')} </span>
            </h1>
            <p className="home-about-body">
              {t('passion_intro')}
              <br />
              <br />{t('skills_intro')}
              <i>
                <b className="purple"> {t('languages')} </b>
              </i>
              <br />
              <br />
              {t('interests_intro')}
              <i>
                <b className="purple"> {t('web_technologies')} </b>
              </i>
              {t('interests_more')}
              <i>
                <b className="purple"> {t('databases')} </b>
              </i>
              {t('interests_final')}
              <br />
              <br />
              {t('passion_final')}
              <i><b className="purple"> {t('node_js')} </b></i>
              {t('modern_libraries')}
              <i>
                <b className="purple"> {t('react_js')} </b>
              </i>{" "}
              {t('and')}
              <i>
                <b className="purple"> {t('next_js')} </b>
              </i>{" "}
              {t('development')}
            </p>
          </Col>
          <Col md={4} className="myAvtar" style={{ position: "relative", textAlign: "center" }}>
            <Tilt>
              <img src={pupu} className="myAvatar-img"/>            
              <div className="myAvatar-circle"  />
            </Tilt>

          </Col>

        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{t('find_me')}</h1>
            <p>
              {t('contact_us')} <span className="purple">{t('contact')}</span>
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/PJR23"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/PJR_23"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/paul-rehbein-88b640322/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/p.j.r06/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
