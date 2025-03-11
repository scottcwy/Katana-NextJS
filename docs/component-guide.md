# Katana-NextJS u7ec4u4ef6u4f7fu7528u6307u5357

u672cu6587u6863u63d0u4f9bu4e86Katana-NextJSu6846u67b6u4e2du6240u6709u7ec4u4ef6u7684u8be6u7ec6u4f7fu7528u6307u5357u548cu6700u4f73u5b9eu8df5u3002

## u5febu901fu5f00u59cb

Katana-NextJSu6846u67b6u91c7u7528u6a21u5757u5316u8bbeu8ba1uff0cu5141u8bb8u60a8u8f7bu677eu7ec4u5408u4e0du540cu7ec4u4ef6u6765u521bu5efau5b8cu6574u7684u9875u9762u3002u6700u5e38u89c1u7684u7ec4u5408u662fuff1a

```tsx
// src/app/[locale]/(default)/page.tsx
import Hero from "@/components/blocks/hero";
import dynamic from 'next/dynamic';

const Generator = dynamic(() => 
  import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});

export default async function LandingPage() {
  return (
    <>
      <Hero />
      <Generator />
    </>
  );
}
```

## u6838u5fc3u7ec4u4ef6u8be6u89e3

### 1. Hero u7ec4u4ef6

`Hero`u7ec4u4ef6u662fu4e00u4e2au5168u529fu80fdu7684u9875u9762u9996u5c4fu7ec4u4ef6uff0cu5305u542bu6807u9898u3001u526fu6807u9898u3001u80ccu666fu6548u679cu548cu884cu52a8u53ecu552eu6309u94aeu3002

#### u7ec4u4ef6u7ed3u6784

```
/components/blocks/hero/
u251cu2500u2500 index.tsx           # u4e3bu7ec4u4ef6
u251cu2500u2500 announcement-bar.tsx  # u516cu544au680fu7ec4u4ef6
u251cu2500u2500 floating-image.tsx   # u6d6eu52a8u56feu50cfu6548u679c
u251cu2500u2500 gradient.tsx        # u6e10u53d8u80ccu666fu6548u679c
u251cu2500u2500 happy-users.tsx      # u7528u6237u5934u50cfu5c55u793a
u2514u2500u2500 moving-spots.tsx     # u52a8u6001u70b9u6548u679c
```

#### u56fdu9645u5316u652fu6301

Herou7ec4u4ef6u4f7fu7528next-intlu8fdbu884cu6587u672cu56fdu9645u5316uff0cu76f4u63a5u4f7fu7528i18nu7cfbu7edfu83b7u53d6u6240u6709u6587u672cu5185u5bb9u3002

```tsx
// Herou7ec4u4ef6u5185u90e8u5b9eu73b0
 import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');
  
  return (
    <section className="hero-section">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      {/* ... */}
    </section>
  );
};
```

u5bf9u5e94u7684u56fdu9645u5316u6587u4ef6u7ed3u6784u5e94u4e3auff1a

```json
// messages/en/hero.json
{
  "title": "AI Wallpaper Generator",
  "description": "Create beautiful, unique wallpapers powered by AI",
  "cta": "Generate Now"
}

// messages/zh/hero.json
{
  "title": "AIu58c1u7eb8u751fu6210u5668",
  "description": "u521bu5efau7531AIu9a71u52a8u7684u7f8eu4e3du72ecu7279u58c1u7eb8",
  "cta": "u7acbu5373u751fu6210"
}
```

### 2. ImageGenerator u7ec4u4ef6

`ImageGenerator`u7ec4u4ef6u662fu4e00u4e2aAIu56feu50cfu751fu6210u5668u7684u5b8cu6574UIu5b9eu73b0uff0cu5305u542bu8f93u5165u3001u751fu6210u548cu663eu793au529fu80fdu3002

#### u7ec4u4ef6u5c5eu6027

u5c3du7ba1ImageGeneratoru7ec4u4ef6u6ca1u6709u5fc5u9700u7684u5c5eu6027uff0cu4f46u5185u90e8u5b9eu73b0u4e86u4e0bu5217u529fu80fduff1a

- u63d0u793au8bcdu8f93u5165u4e0eu5b57u7b26u8ba1u6570
- u751fu6210u6309u94aeu4e0eu52a0u8f7du72b6u6001
- u6837u4f8bu63d0u793au8bcdu5e2eu52a9u7528u6237u5febu901fu5f00u59cb
- u56feu7247u5c55u793au533au57dfu5305u542bu7f29u653eu548cu4e0bu8f7du529fu80fd
- u652fu6301u9519u8befu5904u7406u548cu53cdu9988

#### u4f7fu7528u793au4f8b

ImageGeneratoru7ec4u4ef6u5305u542bu5ba2u6237u7aefu4ea4u4e92u903bu8f91uff0cu56e0u6b64u5efau8baeu901au8fc7u52a8u6001u5bfcu5165u4f7fu7528uff1a

```tsx
// u5728u9875u9762u4e2du7684u4f7fu7528u793au4f8b
import dynamic from 'next/dynamic';

const Generator = dynamic(() => 
  import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});

export default function GeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">u56feu50cfu751fu6210u5668</h1>
      <Generator />
    </div>
  );
}
```

#### u56feu7247u751fu6210u8fc7u7a0b

ImageGeneratoru7ec4u4ef6u4f7fu7528u5f02u6b65u51fdu6570u5904u7406u56feu7247u751fu6210uff1a

```tsx
const handleGenerate = async () => {
  if (!prompt.trim()) {
    setError(t('errors.emptyPrompt'));
    return;
  }
  
  setLoading(true);
  setError('');
  
  try {
    // u8c03u7528APIu751fu6210u56feu7247
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.trim() })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    setImageUrl(data.imageUrl);
    
    // u66f4u65b0u56feu5e93
    if (galleryRef.current) {
      galleryRef.current.addImage(data.imageUrl, prompt);
    }
  } catch (err) {
    setError(t('errors.generateFailed'));
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

### 3. Pricing u7ec4u4ef6

`Pricing`u7ec4u4ef6u7528u4e8eu5c55u793au4ea7u54c1u7684u4ef7u683cu65b9u6848u548cu529fu80fdu6bd4u8f83u3002

#### u7ec4u4ef6u5c5eu6027

Pricingu7ec4u4ef6u901au8fc7u56fdu9645u5316u6587u4ef6u83b7u53d6u4ef7u683cu548cu65b9u6848u4fe1u606fuff0cu4e0du9700u8981u76f4u63a5u4f20u5165u5c5eu6027u3002

#### u4f7fu7528u793au4f8b

```tsx
import Pricing from "@/components/blocks/pricing";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">u9009u62e9u6700u9002u5408u60a8u7684u65b9u6848</h1>
      <Pricing />
    </div>
  );
}
```

## u8fdbu9636u5b9au5236

### u8c03u6574u4e3bu9898u548cu6837u5f0f

Katana-NextJSu4f7fu7528Tailwind CSSu8fdbu884cu6837u5f0fu5316uff0cu53efu4ee5u901au8fc7u7f16u8f91`tailwind.config.ts`u6587u4ef6u81eau5b9au4e49u4e3bu9898uff1a

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... u5176u4ed6u989cu8272
      },
      // ... u5176u4ed6u4e3bu9898u8bbeu7f6e
    },
  },
  // ... u5176u4ed6u914du7f6e
};

export default config;
```

### u96c6u6210u81eau5b9au4e49API

u8981u4f7fu7528u81eau5b9au4e49u7684AIu56feu50cfu751fu6210APIuff0cu53efu4ee5u4feeu6539`.env`u6587u4ef6u4e2du7684u8bbeu7f6euff1a

```
# .env
NEXT_PUBLIC_API_URL=https://your-custom-api.com
API_KEY=your_api_key_here
```

u7136u540eu5728APIu8c03u7528u4e2du4f7fu7528u8fd9u4e9bu53d8u91cfuff1a

```typescript
// u4f8bu5982u5728src/app/api/generate/route.ts
export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify({ prompt })
  });
  
  const data = await response.json();
  return Response.json(data);
}
```

## u6700u4f73u5b9eu8df5

### u6027u80fdu4f18u5316

1. **u4f7fu7528u52a8u6001u5bfcu5165**uff1au5bf9u4e8eu5927u578bu6216u4ec5u5ba2u6237u7aefu7ec4u4ef6uff0cu4f7fu7528u52a8u6001u5bfcu5165u51cfu5c0fu521du59cbu52a0u8f7du65f6u95f4u3002

2. **u56feu50cfu4f18u5316**uff1au4f7fu7528Next.jsu7684Imageu7ec4u4ef6u8fdbu884cu81eau52a8u56feu50cfu4f18u5316u3002

3. **u7f13u5b58u7b56u7565**uff1au5408u7406u4f7fu7528Next.jsu7684ISRu548cSSGu529fu80fdu8fdbu884cu9875u9762u7f13u5b58u3002

### u53efu8bbfu95eeu6027

1. **u4fddu6301u8bedu4e49u6807u8bb0**uff1au4f7fu7528u9002u5f53u7684HTMLu6807u7b7eu548caroleu5c5eu6027u3002

2. **u652fu6301u952eu76d8u5bfcu822a**uff1au786eu4fddu6240u6709u4ea4u4e92u5143u7d20u90fdu53efu4ee5u901au8fc7u952eu76d8u8bbfu95eeu3002

3. **u54cdu5e94u5f0fu8bbeu8ba1**uff1au6240u6709u7ec4u4ef6u5747u9002u5e94u4e0du540cu5c4fu5e55u5c3au5bf8u3002

### u56fdu9645u5316

1. **u96c6u4e2du7ba1u7406u6587u672c**uff1au5c06u6240u6709u6587u672cu5b58u50a8u5728u56fdu9645u5316u6587u4ef6u4e2du800cu975eu786cu7f16u7801u3002

2. **u6ce8u610fu65e5u671fu548cu6570u5b57u683cu5f0f**uff1au4f7fu7528u9002u5f53u7684u683cu5f0fu5316u51fdu6570u5904u7406u4e0du540cu533au57dfu7684u65e5u671fu548cu6570u5b57u683cu5f0fu3002

3. **u65b9u5411u6027**uff1au8003u8651u4eceu53f3u5230u5de6uff08RTLuff09u7684u8bedu8a00u652fu6301u3002
