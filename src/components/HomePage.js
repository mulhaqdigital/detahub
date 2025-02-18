import React, { useRef, useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import Card from './Card';

const HomePage = () => {
  const sliderRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { projects } = useProjects();

  // Double the cards array for seamless loop
  const doubledPortfolioData = [...projects, ...projects];

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="content-wrapper">
      <h1>DETA Projects and Portfolio Hub</h1>
      <h2>Community-Driven Projects empowering developers</h2>
      
      <div 
        className="cards-container" 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="cards-slider">
          <div className="cards-slider-content">
            {doubledPortfolioData.map((project, index) => (
              <Card
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl || '/logo192.png'}
                projectUrl={project.projectUrl}
                author={project.author}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="slider-controls">
        <button className="slider-button" onClick={() => scroll(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="slider-button" onClick={() => scroll(1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage; 