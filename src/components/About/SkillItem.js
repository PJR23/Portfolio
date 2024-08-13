import React from 'react';
import { useInView } from 'react-intersection-observer';

function SkillItem({ skill }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`tech-item ${inView ? 'visible' : ''}`}>
      <div className="tech-icon">{skill.icon}</div>
      <div className="tech-name">{skill.name}</div>
      <div className="tech-bar">
        <div
          className="tech-bar-fill"
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
}

export default SkillItem;
