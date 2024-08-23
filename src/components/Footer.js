import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  let date = new Date();
  let year = date.getFullYear();

  // State to handle the Modal
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>{t('footer_design')}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>{t('footer_copyright')} {year} {t('footer_name')}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/PJR23"
                className="socialicons"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://x.com/PJR_23"
                className="socialicons"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/paul-rehbein-88b640322/"
                className="socialicons"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/p.j.r06/"
                className="socialicons"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
            <li className="social-icons">
                <Button onClick={handleShow} className="socialicons impressumbutton" >
                <IoDocumentText/>  Impressum
              </Button>
            </li>
          </ul>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} >
        <Modal.Header >
          <Modal.Title>{t('footer.impressum_title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
          <p>{t('footer.impressum_content_line1')}</p>
          <p>{t('footer.impressum_content_line2')}</p>
          <p>{t('footer.impressum_content_line3')}</p>
          <p>{t('footer.impressum_content_line4')}</p>
          <p>{t('footer.impressum_content_line5')}</p>
          <h5>{t('footer.impressum_disclaimer_title')}</h5>
          <ul>
            <li>{t('footer.impressum_disclaimer_item1')}</li>
            <li>{t('footer.impressum_disclaimer_item2')}</li>
            <li>{t('footer.impressum_disclaimer_item3')}</li>
          </ul>
          <p>{t('footer.impressum_disclaimer_warning')}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Footer;
