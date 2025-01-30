// File: app/career/jobs-data.js

// Define the job data
export const jobsData = {
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    experience: 'Mid-Level',
    description: 'Build intuitive user interfaces for our AI-powered platform.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    requiredDocuments: ['Resume', 'Cover Letter'],
    additionalFields: [],
    fullDescription: `We're looking for a talented Frontend Developer to join our engineering team. You'll be responsible for building and maintaining user interfaces that make our AI technology accessible and intuitive for users worldwide.

    What you'll do:
    • Develop responsive and accessible web applications using React and TypeScript
    • Collaborate with designers to implement pixel-perfect interfaces
    • Write clean, maintainable, and well-tested code
    • Optimize application performance and user experience
    
    Requirements:
    • 3+ years of experience with React and modern JavaScript
    • Strong understanding of web fundamentals (HTML, CSS, JavaScript)
    • Experience with TypeScript and state management solutions
    • Knowledge of responsive design and cross-browser compatibility
    • Excellent problem-solving and communication skills`,
    benefits: [
      'Competitive salary and equity',
      'Remote-first culture',
      'Flexible working hours',
      'Health insurance',
      'Learning and development budget',
      'Regular team retreats'
    ]
  },
  'ai-researcher': {
    id: 'ai-researcher',
    title: 'AI Research Scientist',
    type: 'Full-time',
    location: 'Hybrid',
    department: 'Research',
    experience: 'Senior',
    description: 'Lead cutting-edge AI research initiatives.',
    skills: ['Machine Learning', 'Python', 'PyTorch'],
    requiredDocuments: ['Resume', 'Cover Letter', 'Research Papers'],
    additionalFields: ['publications', 'researchAreas'],
    fullDescription: `We're seeking an experienced AI Research Scientist to drive innovation in our AI initiatives. You'll work on challenging problems at the forefront of AI technology.

    What you'll do:
    • Lead research projects in machine learning and AI
    • Publish papers in top-tier conferences and journals
    • Collaborate with engineering teams to implement research findings
    • Mentor junior researchers and contribute to the research community
    
    Requirements:
    • Ph.D. in Computer Science, Machine Learning, or related field
    • Strong publication record in top-tier conferences
    • Experience with deep learning frameworks
    • Excellence in Python and mathematical modeling
    • Track record of turning research into practical applications`,
    benefits: [
      'Competitive salary and equity',
      'Research conference budget',
      'Publication support',
      'Flexible work arrangements',
      'Health and wellness benefits',
      'Learning and development resources'
    ]
  },
  'technical-writer': {
    id: 'technical-writer',
    title: 'Technical Writer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Documentation',
    experience: 'Mid-Level',
    description: 'Create clear and comprehensive technical documentation.',
    skills: ['Technical Writing', 'Markdown', 'Documentation Tools'],
    requiredDocuments: ['Resume', 'Cover Letter', 'Writing Samples'],
    additionalFields: ['writingSamples'],
    fullDescription: `Join our documentation team to create clear, user-friendly technical content that helps developers and users understand and implement our technology.

    What you'll do:
    • Write and maintain technical documentation for APIs and SDKs
    • Create user guides, tutorials, and reference materials
    • Collaborate with engineering teams to understand technical details
    • Improve documentation processes and tools
    
    Requirements:
    • 3+ years of technical writing experience
    • Strong understanding of software development concepts
    • Experience with documentation tools and version control
    • Excellent written and verbal communication skills
    • Ability to explain complex concepts clearly`,
    benefits: [
      'Competitive compensation',
      'Remote work flexibility',
      'Professional development',
      'Health benefits',
      'Work-life balance',
      'Collaborative environment'
    ]
  }
};

// Filter categories for the jobs listing page
export const filters = {
  department: ['Engineering', 'Research', 'Documentation', 'Product', 'Marketing', 'Sales',],
  location: ['Remote', 'Hybrid', 'United States', 'United Kingdom', 'India', 'Germany'],
  type: ['Full-time', 'Part-time', 'Contract'],
  experience: ['Entry-Level', 'Mid-Level', 'Senior']
};

// Helper functions to work with job data
export const getAllJobs = () => {
  return Object.values(jobsData);
};

export const getJobById = (id) => {
  return jobsData[id] || null;
};

// Function to validate job application data
export const validateJobApplication = (applicationData) => {
  const { firstName, lastName, email, phone, coverletter, files } = applicationData;
  const errors = {};

  if (!firstName) errors.firstName = 'First name is required';
  if (!lastName) errors.lastName = 'Last name is required';
  if (!email) errors.email = 'Email is required';
  if (!phone) errors.phone = 'Phone number is required';
  if (!coverletter) errors.coverletter = 'Cover letter is required';
  if (!files.length) errors.files = 'Required documents must be uploaded';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};