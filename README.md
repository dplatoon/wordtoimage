
# Welcome to WordToImage

## Project Overview
WordToImage is an AI-powered text-to-image generation platform that transforms text prompts into stunning graphics.

## Getting Started
... (existing README content)

## Deployment Workflow

### 1. Sync Your Local (or Lovable) Changes to GitHub

#### If you're working in Lovable:
- Click the Git / Sync button in the top-right corner of the Lovable editor.
- Select the correct branch (usually main or master).
- Click Push to GitHub.

#### If you're working locally:
```bash
# In your project folder
git status            # see changed files
git add .             # stage all changes (or specify individual files)
git commit -m "Describe your changes—e.g. 'Polish hero title and loading states'"
git push origin main  # push to the main branch on GitHub
```

### 2. Trigger (or Verify) the Vercel Deployment

Vercel automatically deploys from your GitHub repo's main branch.

#### Automatic Deploy:
- Head to your Vercel dashboard at https://vercel.com/dashboard.
- Look for a new "Production" deployment in progress.

#### Manual Redeploy (if needed):
- In Vercel, select your WordToImage project → Deployments tab.
- Find the most recent build and click Redeploy.

### 3. Verify Live Site
- Once deployment succeeds, visit https://wordtoimage.com
- Reload and confirm your changes are visible

### Troubleshooting

#### No new commit on GitHub?
- Verify Git remote: `git remote -v`
- Check current branch: `git branch`

#### Vercel not picking up the push?
- In Vercel Settings → Git, confirm GitHub integration
- Re-authorize GitHub App if repo privacy changed

#### Environment Variables
- In Vercel Settings → Environment Variables
- Ensure all secrets are defined for Production
- Mirror new local variables in Vercel before deploying
