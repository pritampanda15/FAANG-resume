'use client';

import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, Edit2, Trash2, X, Save, LogOut, User } from 'lucide-react';
import AuthForm from './auth-form';

const FAANGResumeSprintApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
    status: 'Not Applied',
    applicationDate: '',
    followUpDate: '',
    jobDescription: '',
    responsibilities: '',
    qualifications: '',
    skills: '',
    atsScore: '',
    resumeVersion: '',
    jobUrl: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterLinkedIn: '',
    notes: '',
    interviewDates: '',
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
      // Load sprint progress from localStorage for now
      const saved = localStorage.getItem(`faang-sprint-progress-${user.id}`);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setJobs([]);
      setCheckedItems({});
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleCheck = (id) => {
    const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newChecked);
    if (user) {
      localStorage.setItem(`faang-sprint-progress-${user.id}`, JSON.stringify(newChecked));
    }
  };

  const getProgress = () => {
    const total = sprintDays.reduce((acc, day) => acc + day.tasks.length, 0);
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const saveJobs = async (updatedJobs) => {
    setJobs(updatedJobs);
    // Note: In production, this would save to the backend
    // For now, jobs are handled by the API routes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      salary: '',
      location: '',
      jobType: 'Full-time',
      status: 'Not Applied',
      applicationDate: '',
      followUpDate: '',
      jobDescription: '',
      responsibilities: '',
      qualifications: '',
      skills: '',
      atsScore: '',
      resumeVersion: '',
      jobUrl: '',
      recruiterName: '',
      recruiterEmail: '',
      recruiterLinkedIn: '',
      notes: '',
      interviewDates: '',
    });
    setEditingJob(null);
    setShowJobForm(false);
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      if (editingJob !== null) {
        const response = await fetch(`/api/jobs/${jobs[editingJob].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          const updatedJobs = [...jobs];
          updatedJobs[editingJob] = data.job;
          setJobs(updatedJobs);
        }
      } else {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setJobs([...jobs, data.job]);
        }
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleEditJob = (index) => {
    setFormData(jobs[index]);
    setEditingJob(index);
    setShowJobForm(true);
  };

  const handleDeleteJob = async (index) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        const response = await fetch(`/api/jobs/${jobs[index].id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const updatedJobs = jobs.filter((_, i) => i !== index);
          setJobs(updatedJobs);
        }
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Not Applied': 'bg-gray-800 text-gray-400',
      'Applied': 'bg-blue-900 text-blue-300',
      'Phone Screen': 'bg-purple-900 text-purple-300',
      'Technical Interview': 'bg-yellow-900 text-yellow-300',
      'Final Round': 'bg-orange-900 text-orange-300',
      'Offer': 'bg-green-900 text-green-300',
      'Rejected': 'bg-red-900 text-red-300',
      'Withdrawn': 'bg-gray-700 text-gray-500',
    };
    return colors[status] || 'bg-gray-800 text-gray-400';
  };

  const getJobStats = () => {
    const stats = {
      total: jobs.length,
      applied: jobs.filter(j => j.status !== 'Not Applied' && j.status !== 'Withdrawn').length,
      interviews: jobs.filter(j => ['Phone Screen', 'Technical Interview', 'Final Round'].includes(j.status)).length,
      offers: jobs.filter(j => j.status === 'Offer').length,
    };
    return stats;
  };

  const sprintDays = [
    {
      day: 1,
      title: "Target Roles",
      description: "Establish your foundation by identifying target companies and setting success metrics",
      tasks: [
        { id: "d1-t1", text: "Identify 5-7 target FAANG roles (record company, team, level, responsibilities)" },
        { id: "d1-t2", text: "Create role library with JD text for each position" },
        { id: "d1-t3", text: "Set success metrics: ATS threshold (75%+), response rate goal" },
        { id: "d1-t4", text: "Create change log spreadsheet and progress dashboard" },
        { id: "d1-t5", text: "Document tech stack and outcomes for each target role" }
      ],
      keyFocus: ["Role Library Setup", "Metrics Definition", "JD Collection"]
    },
    {
      day: 2,
      title: "Resume Skeleton",
      description: "Build ATS-safe structure with proper section ordering and formatting",
      tasks: [
        { id: "d2-t1", text: "Create single-column template with standard font" },
        { id: "d2-t2", text: "Set up six sections: Header, Summary, Education, Experience, Projects, Skills" },
        { id: "d2-t3", text: "Add professional header with working links (LinkedIn, GitHub, Portfolio)" },
        { id: "d2-t4", text: "Verify all links work on desktop and mobile" },
        { id: "d2-t5", text: "Establish consistent formatting: bullet style, tense, metric units" }
      ],
      keyFocus: ["ATS-Safe Structure", "Link Hygiene", "Formatting Standards"]
    },
    {
      day: 3,
      title: "JD Signal Extraction",
      description: "Dissect job descriptions to build your master keyword bank",
      tasks: [
        { id: "d3-t1", text: "Split 2-3 JDs into: Responsibilities, Min Qualifications, Preferred Qualifications" },
        { id: "d3-t2", text: "Annotate each line with capability, technology, and outcome" },
        { id: "d3-t3", text: "Build signal taxonomy: Technical Skills, Engineering Practices, Product Context, Collaboration" },
        { id: "d3-t4", text: "Create synonym maps for 5-7 core signals (3-5 variants each)" },
        { id: "d3-t5", text: "Rank signals using 2x2 grid: Critical vs Optional, High vs Low Frequency" },
        { id: "d3-t6", text: "Choose 7 anchor signals for summary and top bullets" }
      ],
      keyFocus: ["Keyword Banking", "Signal Taxonomy", "Synonym Mapping"]
    },
    {
      day: 4,
      title: "Bullet Drafting",
      description: "Convert keyword bank into STAR-precision, outcome-first bullets",
      tasks: [
        { id: "d4-t1", text: "Create bullet grid mapping experiences to top JD signals" },
        { id: "d4-t2", text: "Draft 6-8 bullets using formula: Action Verb + JD Keywords + Scope + Outcome" },
        { id: "d4-t3", text: "Integrate 2-3 signals per bullet naturally" },
        { id: "d4-t4", text: "Rewrite bullets to be outcome-first (results at the end)" },
        { id: "d4-t5", text: "Ensure at least one bullet covers each minimum qualification gate" },
        { id: "d4-t6", text: "Vary action verbs across bullets (avoid repetition)" }
      ],
      keyFocus: ["STAR Framework", "Keyword Integration", "Outcome-First Writing"]
    },
    {
      day: 5,
      title: "Quantification Toolkit",
      description: "Add credible metrics to prove measurable impact",
      tasks: [
        { id: "d5-t1", text: "Choose 2 projects to instrument with baselines" },
        { id: "d5-t2", text: "Add simple timers, counters, and telemetry" },
        { id: "d5-t3", text: "Run repeatable tests to document before/after values" },
        { id: "d5-t4", text: "Calculate percent improvements and add scale context" },
        { id: "d5-t5", text: "Draft 3 outcome-first bullets placing numbers at the end" },
        { id: "d5-t6", text: "Review with peer for credibility and defensibility" }
      ],
      keyFocus: ["Baseline Establishment", "Metrics Collection", "Defensible Numbers"]
    },
    {
      day: 6,
      title: "AI-Assisted Drafting",
      description: "Accelerate drafting with AI while maintaining authenticity",
      tasks: [
        { id: "d6-t1", text: "Prepare inputs: JD signals, role schema, experience snippets, metrics" },
        { id: "d6-t2", text: "Create Prompt Sandwich template (context + signals + directives)" },
        { id: "d6-t3", text: "Set up Keyword Anchor list (primary + secondary term per bullet)" },
        { id: "d6-t4", text: "Generate 5 bullets and run authenticity filter" },
        { id: "d6-t5", text: "Apply anti-hallucination checklist: verify tools, metrics, acronyms" },
        { id: "d6-t6", text: "Confirm you can defend every claim at interview depth" }
      ],
      keyFocus: ["Prompt Engineering", "Human Verification", "Authenticity Checks"]
    },
    {
      day: 7,
      title: "ATS Testing - Round 1",
      description: "Run baseline tests and prioritize high-impact fixes",
      tasks: [
        { id: "d7-t1", text: "Select 1-2 ATS testing tools and document their scoring focus" },
        { id: "d7-t2", text: "Run baseline test on latest tailored resume for target JD" },
        { id: "d7-t3", text: "Record missing keywords, parsing errors, and baseline score" },
        { id: "d7-t4", text: "Prioritize fixes: cover minimum qualifications first" },
        { id: "d7-t5", text: "Execute first 10-minute test loop: edit summary and top bullets" },
        { id: "d7-t6", text: "Log changes in change log with rationale" }
      ],
      keyFocus: ["Baseline Testing", "Gap Analysis", "Priority Fixes"]
    },
    {
      day: 8,
      title: "Iteration & A/B Testing",
      description: "Test bullet variants and optimize for higher match scores",
      tasks: [
        { id: "d8-t1", text: "Create 2-3 A/B bullet variants for high-impact bullets" },
        { id: "d8-t2", text: "Test each variant and compare ATS scores" },
        { id: "d8-t3", text: "Select winning variants based on coverage and clarity" },
        { id: "d8-t4", text: "Save winners to bullet library with tags" },
        { id: "d8-t5", text: "Execute second 10-minute test loop" },
        { id: "d8-t6", text: "Update change log with iteration results" }
      ],
      keyFocus: ["A/B Testing", "Winning Variants", "Iterative Improvement"]
    },
    {
      day: 9,
      title: "LinkedIn & Portfolio Alignment",
      description: "Synchronize your online presence with resume narrative",
      tasks: [
        { id: "d9-t1", text: "Create alignment spreadsheet: list all roles, projects, titles, dates" },
        { id: "d9-t2", text: "Normalize naming: use consistent titles across all platforms" },
        { id: "d9-t3", text: "Update LinkedIn About section to mirror resume summary" },
        { id: "d9-t4", text: "Port outcome-first bullets to LinkedIn Experience section" },
        { id: "d9-t5", text: "Add media links to projects and demos on LinkedIn" },
        { id: "d9-t6", text: "Test all portfolio links for accessibility" }
      ],
      keyFocus: ["Cross-Platform Consistency", "Link Validation", "Profile Optimization"]
    },
    {
      day: 10,
      title: "README & Evidence Building",
      description: "Create compelling project documentation with metrics",
      tasks: [
        { id: "d10-t1", text: "Write/upgrade READMEs for 2-3 target projects" },
        { id: "d10-t2", text: "Include: problem statement, approach, tech stack, metrics, demo instructions" },
        { id: "d10-t3", text: "Add architecture diagrams where relevant" },
        { id: "d10-t4", text: "Create short demo videos or screenshots" },
        { id: "d10-t5", text: "Build relevancy heatmap: score signal coverage across sections" },
        { id: "d10-t6", text: "Curate LinkedIn skills section (remove noise, elevate JD-aligned terms)" }
      ],
      keyFocus: ["Project Documentation", "Visual Evidence", "Relevancy Mapping"]
    },
    {
      day: 11,
      title: "ATS Testing - Round 2",
      description: "Validate improvements and fix parsing issues",
      tasks: [
        { id: "d11-t1", text: "Run comprehensive ATS parsing checks across tailored resumes" },
        { id: "d11-t2", text: "Verify section headings are recognized correctly" },
        { id: "d11-t3", text: "Check keyword coverage for all minimum qualifications" },
        { id: "d11-t4", text: "Fix any formatting issues that break parsing" },
        { id: "d11-t5", text: "Ensure critical keywords appear in summary and top bullets" },
        { id: "d11-t6", text: "Record final ATS scores in change log" }
      ],
      keyFocus: ["Parsing Validation", "Keyword Coverage", "Format Optimization"]
    },
    {
      day: 12,
      title: "Final Version Preparation",
      description: "Polish and tailor final resume versions for each role",
      tasks: [
        { id: "d12-t1", text: "Run final polish checklist: verbs, metrics, consistency" },
        { id: "d12-t2", text: "Adjust summary to mirror top 2 signals from each target JD" },
        { id: "d12-t3", text: "Curate skills section: move essential tools forward" },
        { id: "d12-t4", text: "Create 2-3 tailored resume versions with clear naming" },
        { id: "d12-t5", text: "Verify one bullet explicitly addresses each must-have requirement" },
        { id: "d12-t6", text: "Sync final edits with LinkedIn and portfolio" }
      ],
      keyFocus: ["Final Polish", "Role-Specific Tailoring", "Version Control"]
    },
    {
      day: 13,
      title: "Recruiter Calibration & Outreach",
      description: "Prepare targeted outreach highlighting measurable outcomes",
      tasks: [
        { id: "d13-t1", text: "Draft 3 outreach templates: Amazon (ownership), Google (reliability), neutral" },
        { id: "d13-t2", text: "Prepare 3-5 sentence notes referencing specific outcomes for each role" },
        { id: "d13-t3", text: "Get peer review on clarity, believability, and link hygiene" },
        { id: "d13-t4", text: "Build application tracker: company, role, date, version, ATS score, outreach" },
        { id: "d13-t5", text: "Write STAR expansions for every top bullet" },
        { id: "d13-t6", text: "Schedule follow-up dates (3-5 business days after outreach)" }
      ],
      keyFocus: ["Outreach Strategy", "Peer Review", "Interview Prep"]
    },
    {
      day: 14,
      title: "Submit & Track",
      description: "Execute targeted submissions and establish feedback loop",
      tasks: [
        { id: "d14-t1", text: "Submit tailored applications to 5-7 target roles" },
        { id: "d14-t2", text: "Pair each submission with calibrated outreach message" },
        { id: "d14-t3", text: "Update tracker with submission details and follow-up dates" },
        { id: "d14-t4", text: "Note patterns in ATS scores and responses" },
        { id: "d14-t5", text: "Save winning bullet variants and templates for future use" },
        { id: "d14-t6", text: "Set up weekly review cadence to refine keyword bank and templates" }
      ],
      keyFocus: ["Strategic Submission", "Response Tracking", "Continuous Improvement"]
    }
  ];

  const frameworks = [
    {
      title: "STAR Formula",
      description: "Action Verb + JD Keywords + Scope + Quantified Outcome",
      example: "Optimized RESTful API in Java, improved p95 latency from 420ms to 220ms for 50k daily requests by refactoring database access and adding caching"
    },
    {
      title: "Impact Metrics Ladder",
      description: "Technical Performance → Reliability & Operations → Product Impact → Business Proxies",
      example: "Latency, throughput, uptime, MTTR, conversion, adoption, cost avoidance, time saved"
    },
    {
      title: "Keyword Anchor Strategy",
      description: "One primary JD keyword + one secondary capability per bullet",
      example: "Primary: Distributed Systems | Secondary: Observability → naturally integrated within outcome-first bullet"
    },
    {
      title: "80/20 Prioritization",
      description: "Focus on critical, high-frequency signals that drive hiring decisions",
      example: "Critical-High: Summary + top bullets | Optional-High: Skills section | Critical-Low: One focused bullet"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">The 14-Day FAANG Resume Sprint</h1>
              <p className="text-gray-400 text-sm mt-1">From Ghosted Applications to Recruiter Callbacks</p>
            </div>
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveSection('overview')}
                className={`text-sm font-medium transition-colors ${activeSection === 'overview' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSection('sprint')}
                className={`text-sm font-medium transition-colors ${activeSection === 'sprint' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Sprint
              </button>
              <button
                onClick={() => setActiveSection('frameworks')}
                className={`text-sm font-medium transition-colors ${activeSection === 'frameworks' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Frameworks
              </button>
              <button
                onClick={() => setActiveSection('tracker')}
                className={`text-sm font-medium transition-colors ${activeSection === 'tracker' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Job Tracker
              </button>
              <button
                onClick={() => setActiveSection('checklist')}
                className={`text-sm font-medium transition-colors ${activeSection === 'checklist' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Checklist
              </button>
              
              <div className="flex items-center space-x-4 ml-8">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Sprint Progress</span>
            <span className="text-sm font-medium text-white">{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-16">
            <section>
              <div className="border border-gray-800 bg-gray-950 p-12 rounded-lg">
                <h2 className="text-4xl font-bold mb-6">Stop Getting Ghosted</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  You refresh your inbox again, half hoping for a recruiter message, half bracing for silence. 
                  You have applied to roles at Amazon, Google, Meta, and other top companies. You have strong 
                  projects, solid internships, and coursework that should impress. Yet applications vanish into 
                  the void, and the few responses you get are generic rejections.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The problem is not that you lack skill or effort. It is that hiring systems reward alignment, 
                  clarity, and evidence. This sprint gives you a system to turn job description signals into 
                  tailored evidence, then validates alignment before you apply.
                </p>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-800 bg-gray-950 p-8 rounded-lg">
                <div className="text-4xl font-bold mb-4">14</div>
                <h3 className="text-xl font-semibold mb-2">Days</h3>
                <p className="text-gray-400">Focused sprint from uncertainty to recruiter-ready applications</p>
              </div>
              <div className="border border-gray-800 bg-gray-950 p-8 rounded-lg">
                <div className="text-4xl font-bold mb-4">75%+</div>
                <h3 className="text-xl font-semibold mb-2">ATS Match</h3>
                <p className="text-gray-400">Target threshold for passing applicant tracking systems</p>
              </div>
              <div className="border border-gray-800 bg-gray-950 p-8 rounded-lg">
                <div className="text-4xl font-bold mb-4">3x</div>
                <h3 className="text-xl font-semibold mb-2">Response Rate</h3>
                <p className="text-gray-400">Typical improvement in recruiter callback rates</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-8">Why This Method Works</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-white pl-6">
                  <h3 className="text-xl font-semibold mb-2">Literal Keyword Alignment</h3>
                  <p className="text-gray-400">
                    ATS systems scan for exact matches between job description nouns, verbs, and outcomes. 
                    This method teaches you to extract these signals and place them where systems look first.
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Outcome-First Bullets</h3>
                  <p className="text-gray-400">
                    Recruiters recognize measurable results instantly. You learn to package actions and outcomes 
                    in STAR format that proves ownership and impact.
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Clean, Consistent Structure</h3>
                  <p className="text-gray-400">
                    ATS-safe formatting eliminates parsing friction. Your quantified bullets stand out fast 
                    in a single-column layout with proper section ordering.
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Rapid Iteration With Verification</h3>
                  <p className="text-gray-400">
                    Pair AI acceleration with human verification. Test, log changes, and iterate in short loops 
                    so match scores climb predictably while maintaining authenticity.
                  </p>
                </div>
              </div>
            </section>

            <section className="border border-gray-800 bg-gray-950 p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Your Transformation</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Imagine opening your tracker and seeing match scores consistently above 75 percent. Your summary 
                reads with confidence and precision. Your top bullets hit the exact signals the role emphasizes, 
                then land with measurable outcomes that prove you deliver.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                In fourteen days, you move from uncertainty to a repeatable system that shortens the path from 
                application to interview. You will not control every outcome. You will control your alignment, 
                your storytelling, and your iteration.
              </p>
            </section>
          </div>
        )}

        {/* Sprint Section */}
        {activeSection === 'sprint' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">The 14-Day Execution Plan</h2>
              <p className="text-gray-400 text-lg">
                A disciplined, day-by-day roadmap to transform your resume from generic to recruiter-ready
              </p>
            </div>

            {sprintDays.map((day) => (
              <div key={day.day} className="border border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                  className="w-full bg-gray-950 p-6 flex items-center justify-between hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold">{day.day}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold mb-1">{day.title}</h3>
                      <p className="text-gray-400">{day.description}</p>
                    </div>
                  </div>
                  {activeDay === day.day ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                {activeDay === day.day && (
                  <div className="border-t border-gray-800 bg-black p-8">
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY FOCUS AREAS</h4>
                      <div className="flex flex-wrap gap-2">
                        {day.keyFocus.map((focus, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-900 border border-gray-800 text-sm rounded"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-4">TASKS</h4>
                      <div className="space-y-3">
                        {day.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start space-x-4 p-4 border border-gray-800 rounded hover:border-gray-700 transition-colors"
                          >
                            <button
                              onClick={() => toggleCheck(task.id)}
                              className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                                checkedItems[task.id]
                                  ? 'bg-white border-white'
                                  : 'border-gray-600 hover:border-gray-400'
                              }`}
                            >
                              {checkedItems[task.id] && <Check className="w-4 h-4 text-black" />}
                            </button>
                            <span className={`flex-1 ${checkedItems[task.id] ? 'line-through text-gray-600' : 'text-gray-300'}`}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Frameworks Section */}
        {activeSection === 'frameworks' && (
          <div className="space-y-12">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Core Frameworks</h2>
              <p className="text-gray-400 text-lg">
                Proven methodologies to structure your resume content for maximum impact
              </p>
            </div>

            <div className="grid gap-8">
              {frameworks.map((framework, idx) => (
                <div key={idx} className="border border-gray-800 bg-gray-950 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">{framework.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{framework.description}</p>
                  <div className="bg-black border border-gray-800 p-6 rounded">
                    <div className="text-sm text-gray-500 mb-2">EXAMPLE</div>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed">{framework.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="border border-gray-800 bg-gray-950 p-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-8">Three-Layer Extraction Method</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-white pl-6">
                  <h4 className="text-xl font-semibold mb-2">Layer 1: Responsibilities</h4>
                  <p className="text-gray-400">Daily verbs and outcomes that define the role&apos;s core work</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-6">
                  <h4 className="text-xl font-semibold mb-2">Layer 2: Minimum Qualifications</h4>
                  <p className="text-gray-400">Hard gates that ATS weighs heavily - must be explicitly covered</p>
                </div>
                <div className="border-l-4 border-gray-700 pl-6">
                  <h4 className="text-xl font-semibold mb-2">Layer 3: Preferred Qualifications</h4>
                  <p className="text-gray-400">Differentiators and seniority clues that boost your match</p>
                </div>
              </div>
            </section>

            <section className="border border-gray-800 bg-gray-950 p-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-8">Quantification Toolkit</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Technical Performance</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Latency improvements (p95, p99)</li>
                    <li>• Throughput increases</li>
                    <li>• Memory/CPU optimization</li>
                    <li>• Error rate reduction</li>
                    <li>• Test coverage gains</li>
                    <li>• Build time reduction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Reliability & Operations</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Uptime improvements</li>
                    <li>• Incident reduction</li>
                    <li>• MTTR (Mean Time To Recovery)</li>
                    <li>• Deployment success rate</li>
                    <li>• Rollback frequency</li>
                    <li>• On-call burden reduction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Product Impact</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Conversion rate changes</li>
                    <li>• User adoption metrics</li>
                    <li>• Retention improvements</li>
                    <li>• Task completion time</li>
                    <li>• Click-through rate</li>
                    <li>• Feature usage growth</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Business Proxies</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Cost avoidance/reduction</li>
                    <li>• Resource efficiency gains</li>
                    <li>• Time saved (users/teams)</li>
                    <li>• Scale indicators</li>
                    <li>• Data volume processed</li>
                    <li>• Infrastructure savings</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Checklist Section */}
        {activeSection === 'checklist' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Complete Sprint Checklist</h2>
              <p className="text-gray-400 text-lg mb-6">
                Track your progress through all 14 days. Your progress is automatically saved.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white rounded"></div>
                  <span className="text-sm text-gray-400">Completed: {Object.values(checkedItems).filter(Boolean).length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
                  <span className="text-sm text-gray-400">
                    Remaining: {sprintDays.reduce((acc, day) => acc + day.tasks.length, 0) - Object.values(checkedItems).filter(Boolean).length}
                  </span>
                </div>
              </div>
            </div>

            {sprintDays.map((day) => (
              <div key={day.day} className="border border-gray-800 rounded-lg bg-gray-950">
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 border border-gray-700 rounded flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{day.title}</h3>
                      <p className="text-sm text-gray-400">{day.description}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold">
                        {day.tasks.filter(task => checkedItems[task.id]).length}/{day.tasks.length}
                      </div>
                      <div className="text-xs text-gray-500">completed</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {day.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleCheck(task.id)}
                      className="flex items-start space-x-4 p-4 border border-gray-800 rounded cursor-pointer hover:border-gray-700 transition-colors"
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                          checkedItems[task.id]
                            ? 'bg-white border-white'
                            : 'border-gray-600'
                        }`}
                      >
                        {checkedItems[task.id] && <Check className="w-4 h-4 text-black" />}
                      </div>
                      <span className={`flex-1 ${checkedItems[task.id] ? 'line-through text-gray-600' : 'text-gray-300'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Tracker Section */}
        {activeSection === 'tracker' && (
          <div className="space-y-8">
            {/* Header and Stats */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Job Application Tracker</h2>
                  <p className="text-gray-400 text-lg">
                    Manage all your FAANG applications in one place
                  </p>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowJobForm(true);
                  }}
                  className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Job</span>
                </button>
              </div>

              {/* Statistics */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="border border-gray-800 bg-gray-950 p-6 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{getJobStats().total}</div>
                  <div className="text-sm text-gray-400">Total Applications</div>
                </div>
                <div className="border border-gray-800 bg-gray-950 p-6 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{getJobStats().applied}</div>
                  <div className="text-sm text-gray-400">Applied</div>
                </div>
                <div className="border border-gray-800 bg-gray-950 p-6 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{getJobStats().interviews}</div>
                  <div className="text-sm text-gray-400">In Progress</div>
                </div>
                <div className="border border-gray-800 bg-gray-950 p-6 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{getJobStats().offers}</div>
                  <div className="text-sm text-gray-400">Offers</div>
                </div>
              </div>
            </div>

            {/* Job Form Modal */}
            {showJobForm && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 overflow-y-auto py-12">
                <div className="bg-gray-950 border border-gray-800 rounded-lg w-full max-w-4xl mx-4">
                  <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">
                      {editingJob !== null ? 'Edit Application' : 'Add New Application'}
                    </h3>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmitJob} className="p-6">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Basic Information</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Google, Amazon, Meta"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Position *
                            </label>
                            <input
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Software Engineer, SDE"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Salary Range
                            </label>
                            <input
                              type="text"
                              name="salary"
                              value={formData.salary}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., $120k - $180k"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Seattle, WA / Remote"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Job Type
                            </label>
                            <select
                              name="jobType"
                              value={formData.jobType}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            >
                              <option>Full-time</option>
                              <option>Part-time</option>
                              <option>Contract</option>
                              <option>Internship</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Job URL
                            </label>
                            <input
                              type="url"
                              name="jobUrl"
                              value={formData.jobUrl}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Application Status */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Application Status</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            >
                              <option>Not Applied</option>
                              <option>Applied</option>
                              <option>Phone Screen</option>
                              <option>Technical Interview</option>
                              <option>Final Round</option>
                              <option>Offer</option>
                              <option>Rejected</option>
                              <option>Withdrawn</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Application Date
                            </label>
                            <input
                              type="date"
                              name="applicationDate"
                              value={formData.applicationDate}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Follow-up Date
                            </label>
                            <input
                              type="date"
                              name="followUpDate"
                              value={formData.followUpDate}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Job Details</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Job Description
                            </label>
                            <textarea
                              name="jobDescription"
                              value={formData.jobDescription}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="Brief overview of the role..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Key Responsibilities
                            </label>
                            <textarea
                              name="responsibilities"
                              value={formData.responsibilities}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="List main responsibilities from the JD..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Qualifications Required
                            </label>
                            <textarea
                              name="qualifications"
                              value={formData.qualifications}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="Minimum and preferred qualifications..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Required Skills & Technologies
                            </label>
                            <textarea
                              name="skills"
                              value={formData.skills}
                              onChange={handleInputChange}
                              rows="2"
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Java, Python, AWS, Kubernetes, React..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Resume & Contact */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Resume & Contact Information</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              ATS Score
                            </label>
                            <input
                              type="text"
                              name="atsScore"
                              value={formData.atsScore}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., 85%"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Resume Version Used
                            </label>
                            <input
                              type="text"
                              name="resumeVersion"
                              value={formData.resumeVersion}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Resume_Amazon_SDE_v3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Recruiter Name
                            </label>
                            <input
                              type="text"
                              name="recruiterName"
                              value={formData.recruiterName}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="Recruiter contact name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Recruiter Email
                            </label>
                            <input
                              type="email"
                              name="recruiterEmail"
                              value={formData.recruiterEmail}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="recruiter@company.com"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Recruiter LinkedIn
                            </label>
                            <input
                              type="url"
                              name="recruiterLinkedIn"
                              value={formData.recruiterLinkedIn}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="https://linkedin.com/in/..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Additional Information</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Interview Dates
                            </label>
                            <input
                              type="text"
                              name="interviewDates"
                              value={formData.interviewDates}
                              onChange={handleInputChange}
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="e.g., Phone: 1/15, Technical: 1/22, Final: 1/29"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Notes & Next Steps
                            </label>
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                              placeholder="Track action items, follow-ups, key conversation points..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2 border border-gray-700 text-gray-400 rounded hover:border-gray-600 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingJob !== null ? 'Update' : 'Save'} Application</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Jobs List */}
            {jobs.length === 0 ? (
              <div className="border border-gray-800 bg-gray-950 rounded-lg p-12 text-center">
                <div className="text-gray-600 mb-4">
                  <Plus className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No applications tracked yet</h3>
                <p className="text-gray-400 mb-6">Start tracking your FAANG applications to stay organized</p>
                <button
                  onClick={() => setShowJobForm(true)}
                  className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors font-medium"
                >
                  Add Your First Application
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div key={job.id} className="border border-gray-800 bg-gray-950 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="text-2xl font-bold">{job.company}</h3>
                            <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            {job.atsScore && (
                              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs font-medium">
                                ATS: {job.atsScore}
                              </span>
                            )}
                          </div>
                          <div className="text-xl text-gray-300 mb-2">{job.position}</div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            {job.location && <span>{job.location}</span>}
                            {job.jobType && <span>{job.jobType}</span>}
                            {job.salary && <span>{job.salary}</span>}
                            {job.applicationDate && <span>Applied: {job.applicationDate}</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditJob(index)}
                            className="p-2 text-gray-400 hover:text-white border border-gray-800 rounded hover:border-gray-700 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(index)}
                            className="p-2 text-gray-400 hover:text-red-400 border border-gray-800 rounded hover:border-red-900 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Details */}
                      <div className="space-y-4 pt-4 border-t border-gray-800">
                        {job.jobDescription && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">DESCRIPTION</div>
                            <p className="text-gray-400 text-sm">{job.jobDescription}</p>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          {job.skills && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 mb-2">REQUIRED SKILLS</div>
                              <p className="text-gray-400 text-sm">{job.skills}</p>
                            </div>
                          )}
                          {job.resumeVersion && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 mb-2">RESUME VERSION</div>
                              <p className="text-gray-400 text-sm">{job.resumeVersion}</p>
                            </div>
                          )}
                        </div>

                        {job.responsibilities && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">KEY RESPONSIBILITIES</div>
                            <p className="text-gray-400 text-sm">{job.responsibilities}</p>
                          </div>
                        )}

                        {job.qualifications && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">QUALIFICATIONS</div>
                            <p className="text-gray-400 text-sm">{job.qualifications}</p>
                          </div>
                        )}

                        {(job.recruiterName || job.recruiterEmail) && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">RECRUITER CONTACT</div>
                            <div className="text-gray-400 text-sm space-y-1">
                              {job.recruiterName && <div>{job.recruiterName}</div>}
                              {job.recruiterEmail && <div>{job.recruiterEmail}</div>}
                              {job.recruiterLinkedIn && (
                                <a href={job.recruiterLinkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                  LinkedIn Profile
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {job.interviewDates && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">INTERVIEW SCHEDULE</div>
                            <p className="text-gray-400 text-sm">{job.interviewDates}</p>
                          </div>
                        )}

                        {job.notes && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">NOTES</div>
                            <p className="text-gray-400 text-sm whitespace-pre-wrap">{job.notes}</p>
                          </div>
                        )}

                        {job.jobUrl && (
                          <div className="pt-2">
                            <a
                              href={job.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                              View Original Job Posting →
                            </a>
                          </div>
                        )}

                        {job.followUpDate && (
                          <div className="pt-2 border-t border-gray-800">
                            <div className="text-sm text-gray-500">
                              Follow up by: <span className="text-white font-medium">{job.followUpDate}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold mb-4">Key Principles</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Alignment over perfection</li>
                <li>Outcomes over tools</li>
                <li>Evidence over claims</li>
                <li>Iteration over stagnation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Success Metrics</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>ATS match threshold: 75%+</li>
                <li>Recruiter response rate</li>
                <li>Iteration velocity</li>
                <li>Interview conversion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Common Pitfalls</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Keyword stuffing without context</li>
                <li>Inflated metrics you cannot defend</li>
                <li>Inconsistent titles across platforms</li>
                <li>Ignoring minimum qualifications</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>Your transformation from ghosted applications to recruiter callbacks starts now.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAANGResumeSprintApp;