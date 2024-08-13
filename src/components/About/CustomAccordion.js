import React, { useState } from 'react';
import SkillItem from './SkillItem'; // Importiere die angepasste SkillItem-Komponente
import { Row, Col } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Pfeil-Icons für die Öffnungsanimation

function CustomAccordion({ sections }) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleSection = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className="custom-accordion" style={{ paddingBottom: "50px" }}>
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <div
            className="accordion-header"
            onClick={() => toggleSection(index)}
          >
            <span>{section.category}</span>
            <span className={`accordion-toggle-icon ${openIndices.includes(index) ? 'open' : ''}`}>
               <FaChevronDown />
            </span>
          </div>
          <div
            className={`accordion-body ${openIndices.includes(index) ? 'open' : ''}`}
          >
            <Row style={{ justifyContent: "center"}}>
              {section.skills.map((skill, skillIndex) => (
                <Col xs={12} md={6} key={skillIndex} className="tech-col">
                  <SkillItem skill={skill} />
                </Col>    
              ))}
            </Row>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomAccordion;
