import React, { useState, useCallback, useRef } from 'react';
import SkillItem from './SkillItem';
import { Row, Col } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

function CustomAccordion({ sections }) {
  const [openIndices, setOpenIndices] = useState([]);
  const [typewriterInstances, setTypewriterInstances] = useState({}); 
  const [closingIndices, setClosingIndices] = useState(new Set()); 

  const toggleSection = useCallback((index) => {
    if (openIndices.includes(index)) {
      setClosingIndices(prev => new Set(prev.add(index)));
      if (typewriterInstances[index]) {
        typewriterInstances[index]

          .deleteAll(50)         

          .callFunction(() => {
            setTimeout(() => {
              setOpenIndices(openIndices.filter(i => i !== index));
              setClosingIndices(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }, 500); 
          })          
          .start();
      } else {
        setOpenIndices(openIndices.filter(i => i !== index));
        setClosingIndices(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }
    } else {
      setOpenIndices([...openIndices, index]);
    }
  }, [openIndices, typewriterInstances]);

  const calculateAverage = (skills) => {
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return (total / skills.length).toFixed(2);
  };

  return (
    <div className="custom-accordion" style={{ paddingBottom: "50px" }}>
      {sections.map((section, index) => {
        const isOpen = openIndices.includes(index);
        const isClosing = closingIndices.has(index);
        const average = isOpen ? calculateAverage(section.skills) : '';

        return (
          <div key={index} className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => toggleSection(index)}
            >
              <span>{section.category}</span>
              <span className={`accordion-toggle-icon ${isOpen ? 'open' : ''}`}>
                <FaChevronUp />
              </span>
            </div>
            <div
              className={`accordion-body ${isOpen ? 'open' : ''}`}
            >
              <div className={`average-text ${isOpen ? 'open' : ''}`} >
              {isOpen && (
                <div className={`average-text ${isOpen ? 'open' : ''}`} >
                  <Typewriter
                    onInit={(typewriter) => {
                      setTypewriterInstances(prev => ({
                        ...prev,
                        [index]: typewriter
                      }));
                      typewriter
                        .typeString(`Average: ${average}%`)
                        .start()
                    }}
                    options={{
                      delay: 50,
                      deleteSpeed: 50,
                      loop: false,
                    }}
                  />
                </div>
              )}</div>
              <Row style={{ justifyContent: "center" }}>
                {section.skills.map((skill, skillIndex) => (
                  <Col xs={12} md={6} key={skillIndex} className="tech-col">
                    <SkillItem skill={skill} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CustomAccordion;
