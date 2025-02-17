import React, { createContext, useState, useContext, useEffect } from 'react';

const ProjectContext = createContext(null);

// Initial projects data
const initialProjects = [
  {
    id: 1,
    title: "Community Hub",
    description: "A central platform connecting community members, facilitating discussions, and sharing resources. Built by the community, for the community.",
    category: "Web App",
    created: "09 Nov 2023",
    status: "Active",
    views: "1,234",
    projectUrl: "https://example.com/hub",
    imageUrl: "/logo192.png"
  },
  {
    id: 2,
    title: "Education Portal",
    description: "Free educational resources and learning management system. Empowering communities through knowledge sharing and skill development.",
    category: "Web App",
    created: "10 Nov 2023",
    status: "Development",
    views: "987",
    projectUrl: "https://example.com/education",
    imageUrl: "/logo192.png"
  },
  {
    id: 3,
    title: "Local Business Directory",
    description: "Supporting local businesses by providing a digital presence. Connecting community merchants with local customers.",
    category: "Web App",
    created: "11 Nov 2023",
    status: "Active",
    views: "756",
    projectUrl: "https://example.com/business",
    imageUrl: "/logo192.png"
  },
  {
    id: 4,
    title: "Event Manager",
    description: "Community event planning and management platform. Organizing gatherings, workshops, and cultural celebrations.",
    category: "Web App",
    created: "12 Nov 2023",
    status: "Development",
    views: "543",
    projectUrl: "https://example.com/events",
    imageUrl: "/logo192.png"
  },
  {
    id: 5,
    title: "Resource Sharing",
    description: "Platform for sharing and managing community resources. Making tools and facilities accessible to all community members.",
    category: "Web App",
    created: "13 Nov 2023",
    status: "Active",
    views: "432",
    projectUrl: "https://example.com/resources",
    imageUrl: "/logo192.png"
  },
  {
    id: 6,
    title: "Healthcare Connect",
    description: "Connecting community members with local healthcare services. Simplifying access to medical resources and information.",
    category: "Web App",
    created: "14 Nov 2023",
    status: "Active",
    views: "321",
    projectUrl: "https://example.com/healthcare",
    imageUrl: "/logo192.png"
  },
  {
    id: 7,
    title: "Youth Programs",
    description: "Digital platform supporting youth development initiatives. Mentorship programs and skill-building opportunities for young community members.",
    category: "Community",
    created: "15 Nov 2023",
    status: "Development",
    views: "210",
    projectUrl: "https://example.com/youth",
    imageUrl: "/logo192.png"
  },
  {
    id: 8,
    title: "Volunteer Network",
    description: "Coordinating volunteer efforts and community service projects. Bringing together people who want to make a difference.",
    category: "Community",
    created: "16 Nov 2023",
    status: "Active",
    views: "198",
    projectUrl: "https://example.com/volunteer",
    imageUrl: "/logo192.png"
  }
];

export const ProjectProvider = ({ children }) => {
  // Try to get projects from localStorage, if not available use initialProjects
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('deta-projects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('deta-projects', JSON.stringify(projects));
  }, [projects]);

  // Function to reset projects to initial state
  const resetProjects = () => {
    setProjects(initialProjects);
    localStorage.setItem('deta-projects', JSON.stringify(initialProjects));
  };

  return (
    <ProjectContext.Provider value={{ projects, setProjects, resetProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext); 