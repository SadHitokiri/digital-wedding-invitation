## Project Overview

This is a real-world digital wedding invitation that I built and used for my own wedding.

The website provided guests with all the essential information about the event, including the date, location, schedule, dress code, drinks, and other important details. At the end of the invitation, guests could submit an RSVP form with their attendance and additional information.

### How it worked

* **Next.js + React + TypeScript** — application architecture, components and UI
* **Tailwind CSS** — styling and responsive design
* **Framer Motion** — interactive UI animations and page transitions
* **Canvas Confetti** — interactive confetti effects triggered by user actions
* **Supabase** — database for storing RSVP responses
* **Vercel** — deployment and hosting
* **Custom domain** — publicly accessible wedding invitation
* **Google Sheets + Google Apps Script** — periodically checked the Supabase API for new responses and synchronized them into a spreadsheet
* **Statistics** — processed RSVP data was used to track guest preferences and improve wedding budget calculations

### Development Tools

* **OpenAI Codex** — used as an AI coding assistant throughout the development process for implementation, debugging, refactoring and exploring technical solutions

The project was built as a real production website rather than a demo or portfolio mockup. It was deployed and actively used by wedding guests to receive information and submit their responses.

### Key Features

* Interactive envelope opening animation
* Animated transitions and interactive UI elements
* Responsive design optimized for mobile devices
* Wedding information and event details
* RSVP form with guest preferences and additional information
* Persistent RSVP data stored in Supabase
* Automated synchronization with Google Sheets
* Guest response statistics for planning and budget estimation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
