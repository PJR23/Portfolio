import React from 'react';
import CustomAccordion from './CustomAccordion'; 
import { SiNextdotjs, SiJavascript, SiReact, SiGit, SiMysql, SiMongodb, SiPython, SiRedis, SiSqlite, SiHtml5, SiCss3, SiMicrosoftazure, SiCsharp, SiDocker, SiKubernetes, SiPortainer, SiAzuredevops, SiAmazonaws, SiGitlab, SiGithub, SiFirebase, SiExpress, SiPostgresql, SiPhp, SiFlask, SiDotnet } from 'react-icons/si';
import { FaNodeJs, FaJava } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function Techstack() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      category: t("skills.web_development"), // Web Development -> Webentwicklung
      skills: [
        { icon: <SiJavascript />, name: "JavaScript", level: 90 },
        { icon: <SiReact />, name: "React", level: 90 },
        { icon: <SiNextdotjs />, name: "Next.js", level: 80 },
        { icon: <SiHtml5 />, name: "HTML", level: 95 },
        { icon: <SiCss3 />, name: "CSS", level: 90 },
        { icon: <FaNodeJs />, name: "Node.js", level: 85 },
        { icon: <SiExpress />, name: "Express.js", level: 80 },
        { icon: <SiFlask />, name: "Flask", level: 80 },
      ],
    },
    {
      category: t("skills.app_development"), // App Development -> App-Entwicklung
      skills: [
        { icon: <SiReact />, name: "React Native", level: 90 },
        { icon: <SiDotnet />, name: ".NET MAUI", level: 70 },
      ],
    },
    {
      category: t("skills.programming_languages"), // Programming Languages -> Programmiersprachen
      skills: [
        { icon: <SiPython />, name: "Python", level: 90 },
        { icon: <FaJava />, name: "Java", level: 80 },
        { icon: <SiCsharp />, name: "C#", level: 80 },
        { icon: <SiPhp />, name: "PHP", level: 80 },
        { icon: <SiDotnet />, name: ".NET", level: 75 },
      ],
    },
    {
      category: t("skills.databases"), // Databases -> Datenbanken
      skills: [
        { icon: <SiMongodb />, name: "MongoDB", level: 75 },
        { icon: <SiMysql />, name: "MySQL", level: 85 },
        { icon: <SiSqlite />, name: "SQLite", level: 95 },
        { icon: <SiPostgresql />, name: "PostgreSQL", level: 95 },
        { icon: <SiRedis />, name: "Redis", level: 65 },
      ],
    },
    {
      category: t("skills.cloud_devops"), // Cloud & DevOps -> Cloud & DevOps
      skills: [
        { icon: <SiAmazonaws />, name: "AWS", level: 75 },
        { icon: <SiMicrosoftazure />, name: "Azure", level: 80 },
        { icon: <SiFirebase />, name: "Firebase", level: 70 },
        { icon: <SiDocker />, name: "Docker", level: 85 },
        { icon: <SiKubernetes />, name: "Kubernetes", level: 70 },
        { icon: <SiPortainer />, name: "Portainer", level: 65 },
        { icon: <SiAzuredevops />, name: "Azure DevOps", level: 80 },
      ],
    },
    {
      category: t("skills.tools_extensions"), // Tools & Extensions -> Werkzeuge & Erweiterungen
      skills: [
        { icon: <SiGit />, name: "Git", level: 95 },
        { icon: <SiGithub />, name: "GitHub", level: 90 },
        { icon: <SiGitlab />, name: "GitLab", level: 85 },
      ],
    },
  ];

  return (
    <div>
      <CustomAccordion sections={skillCategories} />
    </div>
  );
}

export default Techstack;
