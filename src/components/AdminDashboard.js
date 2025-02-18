import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import './AdminDashboard.css';

// View type icons
const ViewIcons = {
  grid: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  list: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  )
};

// Import icons (you can use any icon library like react-icons)
const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const PortfolioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="M18 9l-5 5-4-4-3 3" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { projects, setProjects, resetProjects } = useProjects();
  const [viewType, setViewType] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'web-app',
    imageUrl: '',
    projectUrl: '',
    author: '',
    status: 'active',
    created: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    views: '0'
  });

  // Filter projects based on search
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'desktop-app', label: 'Desktop Application' },
    { value: 'community', label: 'Community Project' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProjectForm(prev => ({
          ...prev,
          imageUrl: imageDataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...projectForm,
      id: editingProject ? editingProject.id : Date.now()
    };

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id ? newProject : p
      ));
    } else {
      // Add new project
      setProjects([...projects, newProject]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm(project);
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        category: 'web-app',
        imageUrl: '',
        projectUrl: '',
        author: '',
        status: 'active',
        created: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        views: '0'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      category: 'web-app',
      imageUrl: '',
      projectUrl: '',
      author: '',
      status: 'active',
      created: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      views: '0'
    });
  };

  const renderProjects = () => {
    switch(viewType) {
      case 'list':
        return (
          <div className="projects-list">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Views</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr key={project.id}>
                    <td>
                      <div className="project-info">
                        <img 
                          src={project.imageUrl || '/logo192.png'} 
                          alt={project.title}
                          className="project-thumb"
                        />
                        <span className="project-title">{project.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="project-author">{project.author}</span>
                    </td>
                    <td>
                      <span className="project-category">{project.category}</span>
                    </td>
                    <td>
                      <div className={`status-indicator ${project.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        <span className="status-text">{project.status}</span>
                      </div>
                    </td>
                    <td>
                      <span className="project-date">{project.created}</span>
                    </td>
                    <td>
                      <span className="project-views">{project.views}</span>
                    </td>
                    <td className="action-buttons">
                      <button onClick={() => openModal(project)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(project.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default: // grid view
        return (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <img 
                    src={project.imageUrl || '/logo192.png'} 
                    alt={project.title} 
                    className="project-image"
                  />
                  <div className={`status-indicator ${project.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">{project.status}</span>
                  </div>
                </div>
                <div className="project-card-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-author">Created by {project.author}</p>
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-views">{project.views} views</span>
                  </div>
                  <div className="project-date">Created: {project.created}</div>
                </div>
                <div className="project-card-actions">
                  <button onClick={() => openModal(project)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Simplified Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src="/logo192.png" alt="DETA" className="logo" />
          <h1>DETA Admin</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <button 
              className={`nav-item ${viewType === 'grid' ? 'active' : ''}`}
              onClick={() => setViewType('grid')}
            >
              Grid View
            </button>
          </div>

          <div className="nav-section">
            <button 
              className={`nav-item ${viewType === 'list' ? 'active' : ''}`}
              onClick={() => setViewType('list')}
            >
              List View
            </button>
          </div>

          <div className="nav-section admin-info">
            <h3>{user?.role}</h3>
            <p>{user?.username}</p>
            <button onClick={logout} className="logout-btn">Logout</button>
            {user?.role === 'Super Admin' && (
              <button onClick={resetProjects} className="reset-btn">
                Reset Projects
              </button>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="main-header">
          <div className="header-title">
            <h2>DETA Projects ({projects.length})</h2>
            <div className="view-controls">
              {Object.entries(ViewIcons).map(([type, icon]) => (
                <button
                  key={type}
                  className={`view-button ${viewType === type ? 'active' : ''}`}
                  onClick={() => setViewType(type)}
                  title={`${type.charAt(0).toUpperCase() + type.slice(1)} view`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <button className="add-project-btn" onClick={() => openModal()}>
              Add New Project
            </button>
          </div>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        {renderProjects()}

        {/* Project Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="project-modal">
              <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={projectForm.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={projectForm.category}
                    onChange={handleInputChange}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {projectForm.imageUrl && (
                    <div className="image-preview">
                      <img src={projectForm.imageUrl} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Project URL</label>
                  <input
                    type="url"
                    name="projectUrl"
                    value={projectForm.projectUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={projectForm.author}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter author name"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={projectForm.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Development">Development</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="submit-btn">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button type="button" onClick={closeModal} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 