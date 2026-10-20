import { useRef, useState } from 'react';
import ThreadInteraction from './ThreadInteraction.jsx';

const projects = [
  {
    id: 'fraud',
    categories: ['data', 'fintech'],
    title: 'Fraud Detection',
    description: 'An event-driven fraud detection backend built with Java 17 and Spring Boot. It scores incoming transactions asynchronously, approves low-risk activity, and routes high-risk transactions to account freezes and analyst-reviewed cases.',
    tags: ['Java 17', 'Spring Boot 3.4', 'Apache Kafka', 'JWT', 'Prometheus', 'OpenTelemetry'],
    repositories: [
      { label: 'GitHub source', url: 'https://github.com/b-rtn/fraud-detection' },
    ],
  },
  {
    id: 'stocks',
    categories: ['data', 'fintech'],
    title: 'Stock Analysis & Portfolio Optimizer',
    description: 'A full-stack portfolio analysis and optimization app built with React, Spring Boot, and PostgreSQL. Users can manage holdings, review portfolio performance and risk, and explore target allocations and rebalance suggestions.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'JWT'],
    repositories: [
      { label: 'Frontend', url: 'https://github.com/b-rtn/stock-analysis-portfolio-optimizer-ui' },
      { label: 'Backend', url: 'https://github.com/b-rtn/stock-analysis-and-portfolio-optimizer' },
    ],
  },
  {
    id: 'medical',
    categories: ['ai', 'healthcare'],
    title: 'Medical AI Assist',
    status: 'Planned',
    description: 'A full-stack AI-assisted triage platform that sanitizes patient symptom submissions and generates structured summaries for clinician review. It includes patient and doctor portals, PII masking, and safeguards for handling AI responses.',
    tags: ['React', 'Java 17', 'Spring Boot 3.4', 'Spring AI', 'OpenAI', 'PostgreSQL', 'JWT'],
    repositories: [
      { label: 'Frontend', url: 'https://github.com/b-rtn/medical-ai-assist-ui' },
      { label: 'Backend', url: 'https://github.com/b-rtn/medical-ai-assist' },
    ],
  },
  {
    id: 'portfolio',
    categories: ['web'],
    title: 'Portfolio Website',
    description: 'A responsive React portfolio featuring an interactive thread visualization, project filtering, experience details, and light/dark themes.',
    tags: ['React', 'JavaScript', 'CSS'],
    repositories: [],
  },
];

const filters = [
  { id: 'all', label: 'All projects' },
  { id: 'data', label: 'Data' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'ai', label: 'AI' },
  { id: 'web', label: 'Web' },
];

const experienceEntries = [
  {
    id: 'independent',
    role: 'Full Stack Developer',
    company: 'Independent Projects',
    details: [
      'Fraud Detection: Built an event-driven Spring Boot service to score transactions, apply risk rules, freeze accounts, create analyst review cases, and publish events and notifications. Added automated tests, traceable records, and centralized API validation and error handling.',
      'Stock Analysis & Portfolio Optimizer: Built a React and Spring Boot app for market-data ingestion, portfolio management, risk analysis, and interactive visualizations. Implemented target allocation recommendations, JWT-protected user data, and safeguards against conflicting portfolio updates.',
      'Medical AI Assist: Developed a Spring AI prototype that turns symptom descriptions into preliminary severity assessments and specialist suggestions for physician review. Added patient and doctor access controls, symptom data masking, PostgreSQL persistence, and request correlation IDs for tracing.'
    ],
  },
  {
    id: 'fis',
    role: 'Software Engineer I',
    company: 'FIS Global',
    details: [
      'Migrated PaymentsOne functionality into Spring Boot APIs and Angular applications, and updated Drools rules for ATM requirements.',
      'Automated terminal update workflows with Spring Batch; developed data transfer and Elasticsearch integrations, and fixed an API issue involving delayed canister data.',
      'Investigated workflow and ATM service issues using Splunk and OpenShift; wrote JUnit tests and reviewed code.',
    ],
  },
  {
    id: 'boston-scientific',
    role: 'Medical Device Specialist III',
    company: 'Boston Scientific',
    details: [
      'Led a nine-person production team that exceeded daily output goals by 6–17%, coordinating downtime, scrap, and quality concerns.',
      'Trained 25–30 MDS across production processes and supported order release and stock transfers.',
    ],
  },
];

function ProjectPreview({ variant }) {
  return (
    <div className={`preview preview-${variant}`} aria-hidden="true">
      <div className="mini-window">
        <div className="mini-title" />
        <div className="mini-chart">
          {[48, 82, 60, 100, 72].map((height, index) => (
            <i key={index} style={{ '--bar-height': `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg className="github-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <ProjectPreview variant={project.id} />
      <div className="project-body">
        <div className="project-heading">
          <h3>{project.title}</h3>
          {project.status && <span className="status">{project.status}</span>}
        </div>
        <p className="project-description">{project.description}</p>
        <div className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        {project.repositories.length > 0 && (
          <div className="project-links">
            <div className="repository-links" aria-label={`${project.title} source code`}>
              {project.repositories.map((repository) => (
                <a
                  href={repository.url}
                  key={repository.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} ${repository.label} repository on GitHub`}
                ><GitHubIcon />{repository.label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeExperience, setActiveExperience] = useState(experienceEntries[0].id);
  const projectTrackRef = useRef(null);
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.categories.includes(activeFilter));
  const selectedExperience = experienceEntries.find((entry) => entry.id === activeExperience);

  const moveProjects = (direction) => {
    const track = projectTrackRef.current;
    const firstCard = track?.querySelector('.project-card');
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(firstCard.parentElement).columnGap) || 0;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    track.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap), behavior });
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <header className="site-header">
        <div className="container nav-row">
          <a className="wordmark" href="#home">Ratna Barot</a>
          <nav className="navigation" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? '☾' : '☀'}
            </button>
          </nav>
        </div>
      </header>

      <main className="container" id="home">
        <section className="portfolio" aria-labelledby="portfolio-title">
          <div className="portfolio-intro-container">
            <p className="portfolio-intro-label">Full Stack Developer</p>
            <h1 id="portfolio-title">From problem to working product.</h1>
            <p className="portfolio-intro-text">I design and build applications end to end, with focus on turning complex problems into clear and practical solutions.</p>
            <div className="portfolio-actions">
              <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <ThreadInteraction compact />
        </section>

        <section className="section about-section" id="about">
          <div className="about-label"><p className="section-kicker">/ About</p><h2>A little about me</h2></div>
          <div className="about-copy">
            <p>I enjoy working across the stack—from building APIs to creating interfaces that make applications easy to understand and use.
               I’m using independent projects to explore new ideas and continue to grow my skills through hands-on development.</p>
            <div className="tag-list skill-list">
              {['Java', 'SpringBoot', 'React', 'JavaScript', 'TypeScript', 'SQL'].map((skill) => <span className="tag" key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading"><h2>/ Experience</h2></div>
          <div className="experience-layout">
            <div className="experience-selector" role="group" aria-label="Choose an experience">
              {experienceEntries.map((entry) => (
                <button
                  className={`experience-option ${activeExperience === entry.id ? 'active' : ''}`}
                  key={entry.id}
                  type="button"
                  aria-pressed={activeExperience === entry.id}
                  aria-controls="experience-details"
                  onClick={() => setActiveExperience(entry.id)}
                >
                  <span className="experience-company">{entry.company}</span>
                  <span className="experience-role">{entry.role}</span>
                  <span></span>
                  {/* <span className="experience-arrow" aria-hidden="true">↗</span> */}
                </button>
              ))}
            </div>
            <article className="experience-details" id="experience-details" aria-live="polite">
              {/* <p className="experience-detail-role">{selectedExperience.role}</p> */}
              <h3>{selectedExperience.company}</h3>
              <ul>
                {selectedExperience.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading"><h2>/ Selected projects</h2></div>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
                  projectTrackRef.current?.scrollTo({ left: 0, behavior });
                }}
              >{filter.label}</button>
            ))}
          </div>
          <div className="project-carousel-controls" aria-label="Browse projects">
            <button type="button" aria-label="Previous projects" disabled={visibleProjects.length < 2} onClick={() => moveProjects(-1)}>←</button>
            <button type="button" aria-label="Next projects" disabled={visibleProjects.length < 2} onClick={() => moveProjects(1)}>→</button>
          </div>
          <div className="project-carousel-viewport" id="project-carousel" ref={projectTrackRef} role="region" aria-label="Project cards" tabIndex={0}>
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div><p className="section-kicker">/ Contact</p><h2>Interested in how it works?</h2></div>
          <a className="button button-primary" href="mailto:ratna.b0264@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
        </section>
        <footer className="site-footer"><span>Designed &amp; built by Ratna Barot</span><a href="#home">Back to top ↑</a></footer>
      </main>
    </div>
  );
}

export default App;
