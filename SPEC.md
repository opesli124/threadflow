# ThreadFlow - AI Tweet/Thread Rewriter

## Product Overview
- **Name**: ThreadFlow
- **Type**: Web App (Single Page Application)
- **Core Value**: Transform tweets and threads into different styles using AI, helping creators repurpose content
- **Target Users**: Content creators, founders, marketers who want to maximize their Twitter/X reach

## Features (MVP)
1. **Input**: Paste tweet or thread text
2. **Style Selection**: Choose from predefined styles (Professional, Casual, Witty, Educational, Story)
3. **AI Rewrite**: Use Claude API to rewrite in selected style
4. **Copy**: One-click copy to clipboard
5. **Character Count**: Show character count with Twitter limit indicator

## Tech Stack
- Next.js 16 (we have the stack)
- React 19
- Tailwind CSS v4
- TypeScript
- Anthropic API (already have key!)
- LocalStorage for saving drafts

## Pricing (Future)
- Free: 5 rewrites/day
- Pro ($9/mo): Unlimited rewrites, custom styles
- Business ($29/mo): Team features, API access

## UI/UX
- Clean, minimalist design
- Dark mode by default (Twitter users prefer dark)
- Split view: input on left, output on right
- Style selector as pill buttons
- Real-time character count
- Success toast on copy

## Acceptance Criteria
1. User can paste text up to 2800 characters
2. User can select from 5 styles
3. Clicking "Rewrite" calls Claude API and shows result
4. Copy button copies to clipboard with confirmation
5. Character count updates in real-time
6. Works offline for previously generated content (localStorage)

## Deployment
- GitHub Pages (blocked - auth issue)
- Vercel (blocked - auth issue)
- Cloudflare Pages (blocked - auth issue)
- **Status**: Code ready, waiting on auth resolution
