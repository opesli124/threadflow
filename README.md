# ThreadFlow - AI Tweet Rewriter

Transform your tweets and threads into different styles using AI.

## Features

- **5 Writing Styles**: Professional, Casual, Witty, Educational, Story
- **AI-Powered**: Uses Claude API for intelligent rewriting
- **Character Counter**: Twitter-ready with character limit indicators
- **One-Click Copy**: Copy rewritten content instantly

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- TypeScript
- Anthropic API (Claude)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env.local with your Anthropic API key
ANTHROPIC_API_KEY=your-api-key-here
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Deploy the out/ folder to GitHub Pages
```

### Cloudflare Pages
```bash
wrangler pages deploy out
```

## Pricing

- **Free**: 5 rewrites/day
- **Pro** ($9/mo): Unlimited rewrites
- **Business** ($29/mo): Team features

## License

MIT
