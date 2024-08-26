import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FiDownload, FiEye } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

function ProjectCards(props) {
  const { t } = useTranslation();
  
  return (
    <Card className="project-card-view">        
      <Card.Body>
        {/* Programmiersprachen-Tags */}
        {props.languages && (
              <div className="language-tags">
                {props.languages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
              </div>
            )}
        
        <div className="cardimg">
          <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        </div>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className={"cardtxt"}>
          {props.description}
        </Card.Text>
        
        {/* GitHub-Button nur rendern, wenn ghLink vorhanden ist */}
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank" style={{ margin: "5px" }}>
            <BsGithub /> &nbsp;
            {props.isBlog ? t('Blog') : t('GitHub')}
          </Button>
        )}
        
        {/* Demo-Link-Button nur rendern, wenn demoLink vorhanden ist */}
        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ margin: "5px" }}
          >
            <CgWebsite /> &nbsp;
            {t('Demo')}
          </Button>
        )}
        
        {/* Vorschau-Button nur rendern, wenn previewLink vorhanden ist */}
        {props.previewLink && (
          <Button
            variant="primary"
            href={props.previewLink}
            target="_blank"
            style={{ margin: "5px" }}
          >
            <FiEye /> &nbsp;
            {t('Preview Abstract')}
          </Button>
        )}
        
        {/* Download-Button nur rendern, wenn abstract vorhanden ist */}
        {props.abstract && (
          <Button
            variant="primary"
            href={props.abstract}
            target="_blank"
            style={{ margin: "5px" }}
            download
          >
            <FiDownload /> &nbsp;
            {t('Download Abstract')}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
