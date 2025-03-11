# Katana-NextJS

Nextjs Pages in a Swoosh! A modern Next.js framework for building Single-Screen Apps in just 5 minutes.

![preview](preview.png)

## Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/scottcwy/Katana-NextJS.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

## Features

- **One-Line Landing Page Generation**: Create complete, professional landing pages with a single prompt
- **Advanced Next.js Framework**: Built with cutting-edge technology and supports both Vercel and Cloudflare deployment
- **Comprehensive Content Platform**: Integrated admin dashboard, blog system with markdown support, and SEO tools for meta tags and structured data to manage content and improve search rankings
- **Authentication System**: Ready-to-use login and user management functionality
- **Payment Integration**: Pre-configured payment processing with secure checkout flows
- **Built-in Internationalization**: Full support for multiple languages with seamless switching between English and Chinese
- **Customizable Themes**: Easily modify color schemes and UI elements to match your brand
- **Sample Project: Flux Generator**: Includes AI wallpaper generator as a demonstration of framework capabilities

## Core Components

### 1. Hero Component

The Hero component creates an engaging header section for your landing page.

```tsx
// Example usage in your page
import Hero from "@/components/blocks/hero";

export default function Page() {
  return <Hero />;
}
```

### 2. ImageGenerator Component

The ImageGenerator component provides an AI-powered image generation interface.

```tsx
// Example usage with dynamic import
import dynamic from 'next/dynamic';

const Generator = dynamic(() => 
  import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});

export default function Page() {
  return <Generator />;
}
```

### 3. Pricing Component

The Pricing component displays pricing plans and options.

```tsx
// Example usage
import Pricing from "@/components/blocks/pricing";

export default function Page() {
  return <Pricing />;
}
```

## Authentication and Payments

- Configure authentication providers in `.env`

```bash
# Enable GitHub authentication
NEXT_PUBLIC_AUTH_GITHUB_ENABLED="true"
```

- Set up payment integration

```bash
# Configure Stripe keys
STRIPE_PUBLIC_KEY="your_stripe_public_key"
STRIPE_PRIVATE_KEY="your_stripe_private_key"
```

- Access the admin dashboard at `/admin` after setting up authentication

## Customization

- Set your environment variables

```bash
cp .env.example .env.local
```

- Customize your theme

```bash
# Edit the theme variables in src/app/theme.css
# Available color schemes: light, dark, system
# Example:
html {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --accent: 210 40% 96.1%;
  /* Add more custom colors as needed */
}
```

- Generate a new landing page with a single prompt
- In an AI editor (Cursor or Windsurf), ask AI to modify the i18n JSON files based on a specific theme to achieve the effect of changing the landing page with just one sentence

## Deploy

Deploy your own instance of Katana-NextJS with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscottcwy%2FKatana-NextJS)

Just click the button above to deploy, and Vercel will guide you through the setup process. No configuration required!

## About

- Version: 0.2.1
- Author: scottcwy
- Website: [https://www.flux.xz.cn](https://www.flux.xz.cn)

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/katana-nextjs)
[![Build Status](https://img.shields.io/github/workflow/status/scottcwy/Katana-NextJS/CI)](https://github.com/scottcwy/Katana-NextJS/actions)
[![Issues](https://img.shields.io/github/issues/scottcwy/Katana-NextJS)](https://github.com/scottcwy/Katana-NextJS/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/scottcwy/Katana-NextJS/pulls)

[![构建状态](https://img.shields.io/github/workflow/status/scottcwy/Katana-NextJS/CI)](https://github.com/scottcwy/Katana-NextJS/actions)
[![问题](https://img.shields.io/github/issues/scottcwy/Katana-NextJS)](https://github.com/scottcwy/Katana-NextJS/issues)
[![欢迎PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/scottcwy/Katana-NextJS/pulls)
