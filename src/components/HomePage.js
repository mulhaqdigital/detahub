import React, { useRef } from 'react';
import { useProjects } from '../context/ProjectContext';
import Card from './Card';
import './HomePage.css';

const HomePage = () => {
  const sliderRef = useRef(null);
  const { projects } = useProjects();

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = 320; // Card width (300) + gap (20)
      
      const newScroll = container.scrollLeft + (direction * scrollAmount);
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="content-wrapper">
      <div className="header-section">
        <h1>DETA Projects and Portfolio Hub</h1>
        <h2>Community-Driven Projects empowering developers</h2>
      </div>
      
      <div className="slider-container">
        <div 
          className="cards-container" 
          ref={sliderRef}
        >
          <div className="cards-wrapper">
            {projects.map((project, index) => (
              <div className="card-wrapper" key={index}>
                <Card
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl || '/logo192.png'}
                  projectUrl={project.projectUrl}
                  author={project.author}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="slider-controls">
          <button 
            className="slider-button" 
            onClick={() => scroll(-1)}
          >
            ←
          </button>
          <button 
            className="slider-button" 
            onClick={() => scroll(1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 