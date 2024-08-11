import React from "react";
import { Col, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit, DiJava, DiMysql } from "react-icons/di";
import { SiNextdotjs, SiRedis, SiSqlite, SiHtml5, SiCss3, SiCsharp } from "react-icons/si";

const skills = [
  { icon: <DiJavascript1 />, name: "JavaScript", level: 90 },
  { icon: <DiNodejs />, name: "Node.js", level: 85 },
  { icon: <DiReact />, name: "React", level: 90 },
  { icon: <DiMongodb />, name: "MongoDB", level: 75 },
  { icon: <SiNextdotjs />, name: "Next.js", level: 80 },
  { icon: <DiGit />, name: "Git", level: 95 },
  { icon: <SiRedis />, name: "Redis", level: 65 },
  { icon: <DiPython />, name: "Python", level: 90 },
  { icon: <DiJava />, name: "Java", level: 80 },
  { icon: <DiMysql />, name: "MySQL", level: 85 },
  { icon: <SiSqlite />, name: "SQLite", level: 95 },
  { icon: <SiHtml5 />, name: "HTML", level: 95 },
  { icon: <SiCss3 />, name: "CSS", level: 90 },
  { icon: <SiCsharp />, name: "C#", level: 80 },
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skills.map((skill, index) => (
        <Col xs={12} md={6} key={index} className="tech-col">
          <SkillItem skill={skill} />
        </Col>
      ))}
    </Row>
  );
}

function SkillItem({ skill }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`tech-item ${inView ? "visible" : ""}`}>
      <div className="tech-icon">{skill.icon}</div>
      <div className="tech-name">{skill.name}</div>
      <div className="tech-bar">
        <div
          className="tech-bar-fill"
          style={{ width: inView ? `${skill.level}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
}

export default Techstack;
