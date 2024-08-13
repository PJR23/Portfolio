import React from 'react';
import CustomAccordion from './CustomAccordion'; 
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit, DiJava, DiMysql } from 'react-icons/di';
import { SiNextdotjs, SiRedis, SiSqlite, SiHtml5, SiCss3, SiCsharp } from 'react-icons/si';

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { icon: <DiJavascript1 />, name: "JavaScript", level: 90 },
      { icon: <DiReact />, name: "React", level: 90 },
      { icon: <SiNextdotjs />, name: "Next.js", level: 80 },
      { icon: <SiHtml5 />, name: "HTML", level: 95 },
      { icon: <SiCss3 />, name: "CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { icon: <DiNodejs />, name: "Node.js", level: 85 },
      { icon: <DiPython />, name: "Python", level: 90 },
      { icon: <DiJava />, name: "Java", level: 80 },
      { icon: <DiGit />, name: "Git", level: 95 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { icon: <DiMongodb />, name: "MongoDB", level: 75 },
      { icon: <DiMysql />, name: "MySQL", level: 85 },
      { icon: <SiSqlite />, name: "SQLite", level: 95 },
      { icon: <SiRedis />, name: "Redis", level: 65 },
    ],
  },
  {
    category: "Other",
    skills: [
      { icon: <SiCsharp />, name: "C#", level: 80 },
    ],
  },
];

function Techstack() {
  return (
    <div>
      <CustomAccordion sections={skillCategories} />
    </div>
  );
}

export default Techstack;
