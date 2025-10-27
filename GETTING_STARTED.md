# 🚀 Getting Started - FAANG Resume Sprint

Welcome! This guide will get you up and running in under 5 minutes.

## What You're Building

A complete web application to help you:
- Follow a structured 14-day resume improvement sprint
- Track all your FAANG job applications
- Learn proven frameworks for resume success
- Monitor your progress with an interactive checklist

## Prerequisites

You need:
- **Node.js 18+** - [Download here](https://nodejs.org)
- A text editor (VS Code recommended)
- A web browser (Chrome recommended)
- 5 minutes of your time

## Quick Start (3 Steps)

### Step 1: Install Dependencies

**On Mac/Linux:**
```bash
./setup.sh
```

**On Windows:**
```
setup.bat
```

**Or manually:**
```bash
npm install
```

### Step 2: Start the App

```bash
npm run dev
```

### Step 3: Open in Browser

Visit: [http://localhost:3000](http://localhost:3000)

**That's it!** 🎉

## What You'll See

The app has 5 main sections:

1. **Overview** - Learn about the methodology
2. **Sprint** - Day-by-day breakdown of the 14-day plan
3. **Frameworks** - STAR formula, metrics, and strategies
4. **Job Tracker** - Manage all your applications
5. **Checklist** - Track progress on all 84 tasks

## Using the App

### Track Your Progress
- Click checkboxes to mark tasks complete
- Watch your progress bar fill up
- All progress saved automatically

### Add Job Applications
1. Go to "Job Tracker" tab
2. Click "Add Job"
3. Fill in company, position, and details
4. Track status from application to offer

### Follow the Sprint
- Start with Day 1 in the Sprint section
- Expand each day to see tasks
- Complete tasks and check them off
- Move through all 14 days

## File Structure

```
faang-resume-sprint/
├── app/              # Next.js pages
├── components/       # React components
├── public/           # Static files
├── README.md         # Main docs
├── SETUP.md          # Detailed setup
└── DEPLOYMENT.md     # How to deploy
```

## Development Commands

```bash
npm run dev      # Start development (port 3000)
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

## Common Issues

### Port 3000 in use?
```bash
PORT=3001 npm run dev
```

### Installation errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Need help?
Check `SETUP.md` for detailed troubleshooting.

## Deploy Your App (Optional)

Want to share it online?

**Fastest way - Vercel (Free):**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click deploy
5. Done! Get your live URL

See `DEPLOYMENT.md` for detailed instructions.

## What's Next?

1. ✅ Start the app (`npm run dev`)
2. ✅ Explore all sections
3. ✅ Add your first job application
4. ✅ Begin Day 1 of the sprint
5. ✅ Track your progress daily

## Features Highlight

### 📊 Job Tracker
- Company and position details
- Salary range tracking
- Status management (8 stages)
- ATS score tracking
- Resume version tracking
- Recruiter contact info
- Interview scheduling
- Notes and follow-ups

### ✅ Progress Tracking
- 84 total tasks across 14 days
- Real-time progress percentage
- Per-day completion tracking
- Automatic save to browser

### 📚 Frameworks
- STAR formula for bullets
- Impact metrics ladder
- Keyword strategies
- Quantification toolkit
- Three-layer extraction method

## Data Storage

Your data is stored in your browser:
- ✅ Private (never sent to servers)
- ✅ Fast (instant access)
- ✅ Persistent (survives page refresh)
- ⚠️ Browser-specific (use same browser)

**Note**: Clear browser data = lost progress. Consider exporting important info.

## Tips for Success

1. **Work Daily**: Spend 60-90 minutes per day
2. **Track Everything**: Use Job Tracker for all applications
3. **Check Tasks**: Complete tasks in order
4. **Review Frameworks**: Reference them while writing
5. **Monitor Progress**: Watch your progress bar grow

## Keyboard Shortcuts

- Click navigation tabs to switch sections
- Click day headers to expand/collapse
- Click checkboxes or task text to toggle
- Scroll naturally through content

## Browser Support

Tested and working on:
- ✅ Chrome (best experience)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Need More Help?

📖 **Documentation:**
- `README.md` - Overview and features
- `SETUP.md` - Detailed installation guide
- `DEPLOYMENT.md` - Publishing instructions

🌐 **Online Resources:**
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- React: [react.dev](https://react.dev)
- Tailwind: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Success Checklist

Before you start the sprint, make sure:

- [ ] App runs at `http://localhost:3000`
- [ ] You can navigate between sections
- [ ] Checkboxes work and persist
- [ ] You can add a test job application
- [ ] Progress bar updates when checking tasks
- [ ] You've read Day 1 tasks

## Ready to Transform Your Resume?

Your journey from ghosted applications to recruiter callbacks starts now!

```bash
npm run dev
```

Then visit: **http://localhost:3000**

**Good luck with your FAANG applications! 🎯**
