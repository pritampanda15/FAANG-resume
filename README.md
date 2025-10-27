# FAANG Resume Sprint - 14 Day Application System

A comprehensive web application to help computer science graduates transform their resumes from ghosted applications to recruiter callbacks in 14 days.

## Features

- **14-Day Sprint System**: Structured day-by-day plan with tasks and focus areas
- **Interactive Checklist**: Track progress across all 84 tasks with automatic local storage
- **Job Application Tracker**: Comprehensive tracking system for managing FAANG applications
  - Company, position, salary, location tracking
  - Status management (Not Applied → Offer)
  - ATS score tracking
  - Resume version management
  - Recruiter contact information
  - Interview scheduling
  - Notes and follow-ups
- **Core Frameworks**: STAR formula, Impact Metrics Ladder, Keyword strategies
- **Progress Tracking**: Real-time progress bar showing completion percentage
- **Premium Design**: Monochrome color scheme, clean and professional
- **Data Persistence**: All data saved to browser localStorage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository or download the project files:

```bash
git clone <your-repo-url>
cd faang-resume-sprint
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/faang-resume-sprint)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically detect Next.js and configure everything.

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Railway**: Connect GitHub repo and deploy
- **Render**: Static site deployment with build command `npm run build`
- **AWS Amplify**: Connect GitHub and auto-deploy
- **DigitalOcean App Platform**: Import from GitHub

## Project Structure

```
faang-resume-sprint/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/
│   └── FAANGResumeSprintApp.js  # Main application component
├── public/                # Static assets (if needed)
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## Features Breakdown

### Sprint Overview
- Introduction to the 14-day system
- Statistics and success metrics
- Why the method works

### 14-Day Sprint
- Day-by-day breakdown
- Expandable task lists
- Key focus areas for each day
- Interactive checkboxes

### Frameworks
- STAR Formula for resume bullets
- Impact Metrics Ladder
- Keyword Anchor Strategy
- 80/20 Prioritization
- Three-Layer Extraction Method
- Quantification Toolkit

### Job Tracker
- Add/Edit/Delete applications
- Comprehensive form with all job details
- Status tracking with color coding
- Statistics dashboard
- Filter and search capabilities
- Notes and follow-up tracking

### Checklist
- Complete task list for all 14 days
- Progress tracking per day
- Overall completion percentage
- Persistent data across sessions

## Data Storage

All data is stored locally in your browser using `localStorage`:

- Sprint progress: `faang-sprint-progress`
- Job applications: `faang-job-tracker`

**Note**: Data is specific to your browser and device. Export important data before clearing browser storage.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Modern browsers with ES6+ support required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

Based on the comprehensive "14-Day FAANG Resume Sprint" methodology for helping CS graduates land FAANG interviews.

---

**Start your transformation from ghosted applications to recruiter callbacks today!**
