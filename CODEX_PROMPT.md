# Build Task: floating-point-comparator

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: floating-point-comparator
HEADLINE: Safe floating point comparison tool for developers
WHAT: None
WHY: None
WHO PAYS: None
NICHE: developer-tools
PRICE: $$5/mo

ARCHITECTURE SPEC:
A Next.js web app that provides safe floating-point comparison utilities with an interactive playground, code generation, and educational content. Users can test comparisons, generate code snippets for multiple languages, and access premium features like batch processing and API access.

PLANNED FILES:
- app/page.tsx
- app/playground/page.tsx
- app/api/compare/route.ts
- app/api/generate-code/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- components/FloatingPointComparator.tsx
- components/CodeGenerator.tsx
- components/PricingCard.tsx
- lib/floating-point-utils.ts
- lib/lemonsqueezy.ts
- lib/auth.ts

DEPENDENCIES: next, react, tailwindcss, @lemonsqueezy/lemonsqueezy.js, next-auth, prisma, @prisma/client, zod, lucide-react, prismjs

REQUIREMENTS:
- Next.js 15 with App Router (app/ directory)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (npx shadcn@latest init, then add needed components)
- Dark theme ONLY — background #0d1117, no light mode
- Lemon Squeezy checkout overlay for payments
- Landing page that converts: hero, problem, solution, pricing, FAQ
- The actual tool/feature behind a paywall (cookie-based access after purchase)
- Mobile responsive
- SEO meta tags, Open Graph tags
- /api/health endpoint that returns {"status":"ok"}

ENVIRONMENT VARIABLES (create .env.example):
- NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID
- NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID
- LEMON_SQUEEZY_WEBHOOK_SECRET

After creating all files:
1. Run: npm install
2. Run: npm run build
3. Fix any build errors
4. Verify the build succeeds with exit code 0

Do NOT use placeholder text. Write real, helpful content for the landing page
and the tool itself. The tool should actually work and provide value.


PREVIOUS ATTEMPT FAILED WITH:
Codex exited 1: Reading additional input from stdin...
OpenAI Codex v0.121.0 (research preview)
--------
workdir: /tmp/openclaw-builds/floating-point-comparator
model: gpt-5.3-codex
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: none
reasoning summaries: none
session id: 019d94e4-0199-7fa0-b95b-bea0c1f88fdf
--------
user
# Build Task: floating-point-comparator

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: floating-point-comparator
HEADLINE: Safe
Please fix the above errors and regenerate.