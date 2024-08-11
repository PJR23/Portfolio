import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" style={{ maxHeight: "260px", width: "auto" }} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {/* GitHub-Button nur rendern, wenn ghLink vorhanden ist */}
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank" style={{ margin: "5px" }}>
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        )}
        {"\n"}
        {"\n"}

        {/* Demo-Link-Button nur rendern, wenn demoLink vorhanden ist */}
        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ margin: "5px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
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
            {"Abstract"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
