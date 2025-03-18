# 🚀 Katana-NextJS

<div align="center">

[简体中文](./README.md) | English

</div>

✨ Nextjs Pages in a Swoosh! A modern Next.js framework that lets you build beautiful single-page applications in just 5 minutes.

## 🌟 Framework Preview

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="preview.png" alt="Main Interface" width="400px" />
        <br />
        <em>🏠 Main Interface Design</em>
      </td>
      <td align="center">
        <img src="preview-generator.png" alt="Features" width="400px" />
        <br />
        <em>⚙️ Core Features</em>
      </td>
    </tr>
  </table>
</div>

## 🛠️ Requirements

- Node.js 20.x or higher
- Next.js 14.2.9
- pnpm (recommended) or npm

## 🚀 Quick Start

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

## ✨ Features

- **📝 One-Line Landing Page Generation**: Create complete, professional landing pages with a single prompt
- **🔥 Advanced Next.js Framework**: Built with cutting-edge technology and supports both Vercel and Cloudflare deployment
- **📚 Comprehensive Content Platform**: Integrated admin dashboard, blog system with markdown support, and SEO tools
- **🔐 Authentication System**: Ready-to-use login and user management functionality
- **💳 Payment Integration**: Pre-configured payment processing with secure checkout flows
- **🌐 Built-in Internationalization**: Full support for multiple languages with seamless switching between English and Chinese
- **🎨 Customizable Themes**: Easily modify color schemes and UI elements to match your brand
- **🖼️ Sample Project: Flux Generator**: Includes AI wallpaper generator as a demonstration of framework capabilities

## 🔒 Authentication and Payments

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

## ⚙️ Customization

- Set your environment variables

```bash
cp .env.example .env.local
```

- Customize theme
You can easily create and apply custom themes using the shadcn UI theme generator:

1. Visit shadcn UI Theme Generator
2. Adjust colors, border radius, and fonts until satisfied
3. Click the "Copy" button in the top right
4. Paste the generated CSS code into your project's src/app/theme.css file
5. Save the file and refresh to see the new theme


```css
@layer base {
  :root {
    /* basic color */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    /* main color */
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    
    /* secondary color */
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
  }
}
/* README Style */
.readme-container {
  background: var(--card);
  border: 1px solid hsl(var(--card-border));
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  margin: 1rem 0;
}
```
- Generate a new landing page with a single prompt
- In an AI editor (Cursor or Windsurf), ask AI to modify the i18n JSON files based on a specific theme to achieve the effect of changing the landing page with just one sentence

## 🚀 Deploy

Deploy your own instance of Katana-NextJS with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscottcwy%2FKatana-NextJS)

Just click the button above to deploy, and Vercel will guide you through the setup process. No configuration required!

## ℹ️ About

- Version: 0.2.1
- Author: scottcwy
- Website: [https://www.flux.xz.cn](https://www.flux.xz.cn)

