# Setup Guide - FAANG Resume Sprint

Complete guide to set up the FAANG Resume Sprint application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required:
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)

### Optional:
- **Git**: For version control
- **VS Code**: Recommended code editor

## Check Your Versions

```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 9.0.0 or higher
```

## Installation Steps

### Step 1: Get the Code

**Option A: Clone from GitHub** (if available)
```bash
git clone <repository-url>
cd faang-resume-sprint
```

**Option B: Extract from ZIP**
```bash
unzip faang-resume-sprint.zip
cd faang-resume-sprint
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Tailwind CSS
- Lucide React (icons)
- And all other dependencies

**Expected Output:**
```
added 150+ packages in 30s
```

### Step 3: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Ready in 2.5s
```

### Step 4: Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

You should see the FAANG Resume Sprint homepage!

## Project Structure Explained

```
faang-resume-sprint/
│
├── app/                          # Next.js App Router
│   ├── layout.js                # Root layout (metadata, fonts)
│   ├── page.js                  # Home page (imports main component)
│   └── globals.css              # Global styles with Tailwind
│
├── components/                   # React components
│   └── FAANGResumeSprintApp.js # Main application component
│
├── public/                       # Static files (images, etc.)
│
├── package.json                  # Project dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── jsconfig.json                # JavaScript configuration
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
│
├── README.md                     # Main documentation
├── DEPLOYMENT.md                 # Deployment guide
└── SETUP.md                      # This file
```

## Understanding the Tech Stack

### Next.js 14
- React framework for production
- App Router for file-based routing
- Server and client components
- Automatic code splitting

### React 18
- UI library for building components
- Hooks for state management
- Client-side interactivity

### Tailwind CSS
- Utility-first CSS framework
- Responsive design utilities
- Custom color schemes
- Dark mode support (used for monochrome theme)

### Lucide React
- Icon library
- Lightweight and customizable
- Used for UI icons throughout the app

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

## Features Overview

### 1. Sprint Overview
- Introduction and methodology
- Success statistics
- Why the method works

### 2. 14-Day Sprint
- Day-by-day breakdown
- Interactive task lists
- Focus areas for each day

### 3. Frameworks
- STAR formula
- Impact metrics
- Keyword strategies
- Quantification toolkit

### 4. Job Tracker
- Add/edit/delete applications
- Track status and progress
- Store recruiter information
- Interview scheduling

### 5. Checklist
- Complete task tracking
- Progress visualization
- Persistent storage

## Data Storage

The app uses browser `localStorage` to save:
- Sprint progress (`faang-sprint-progress`)
- Job applications (`faang-job-tracker`)

**To clear data:**
```javascript
// In browser console
localStorage.removeItem('faang-sprint-progress')
localStorage.removeItem('faang-job-tracker')
```

## Customization

### Changing Colors

Edit `app/globals.css`:
```css
:root {
  --foreground-rgb: 255, 255, 255;
  --background-rgb: 0, 0, 0;
}
```

Edit Tailwind classes in components for specific elements.

### Adding New Sections

1. Add new state in `FAANGResumeSprintApp.js`
2. Create navigation button
3. Add section content in main render

### Modifying Content

Edit `components/FAANGResumeSprintApp.js`:
- `sprintDays` array: Day-by-day tasks
- `frameworks` array: Framework content
- JSX sections: Overview and other content

## Troubleshooting

### Issue: Port 3000 already in use

**Solution 1**: Use different port
```bash
PORT=3001 npm run dev
```

**Solution 2**: Kill process using port 3000
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Module not found errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Styles not loading

**Solution**: Check Tailwind configuration
```bash
# Ensure these files exist:
# - tailwind.config.js
# - postcss.config.js
# - app/globals.css has @tailwind directives
```

### Issue: Hot reload not working

**Solution**: Restart dev server
```bash
# Press Ctrl+C to stop
npm run dev
```

## IDE Setup (VS Code Recommended)

### Recommended Extensions:

1. **ES7+ React/Redux/React-Native snippets**
   - Quick component creation

2. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

3. **ESLint**
   - Code quality and consistency

4. **Prettier**
   - Code formatting

### VS Code Settings:

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Testing Your Setup

Run through this checklist:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server successfully
- [ ] `http://localhost:3000` loads the app
- [ ] Navigation between sections works
- [ ] Checkboxes can be toggled
- [ ] Progress bar updates
- [ ] Job tracker form opens
- [ ] Data persists after page refresh

## Next Steps

1. ✅ Complete setup
2. ✅ Explore the application
3. ✅ Customize content if needed
4. ✅ Test all features locally
5. ✅ Follow DEPLOYMENT.md to publish

## Getting Help

### Resources:
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Common Questions:

**Q: Can I use TypeScript?**
A: Yes! Rename files to `.tsx` and add types.

**Q: Can I deploy without GitHub?**
A: Yes! Use Vercel CLI or direct uploads.

**Q: Can I add a database?**
A: Yes! Consider Supabase, Firebase, or MongoDB.

**Q: Can I add authentication?**
A: Yes! Consider NextAuth.js or Clerk.

## Success!

If you can see the app at `http://localhost:3000`, you're ready to go! 🎉

Start tracking your FAANG applications and following the 14-day sprint!
