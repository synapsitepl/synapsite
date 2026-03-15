# Synapsite

Nowoczesna strona internetowa agencji Synapsite z formularzem kontaktowym, panelem administracyjnym i chatbotem AI.

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL
- **Auth:** NextAuth.js v5 (credentials provider, JWT)
- **Email:** Resend (transakcyjny)
- **AI Chatbot:** Vercel AI SDK, OpenAI (gpt-4o-mini)
- **Hosting:** Vercel

## Quick Start

### 1. Zainstaluj zależności

```bash
npm install
```

### 2. Skonfiguruj zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i uzupełnij wartości:

```bash
cp .env.example .env.local
```

Wymagane zmienne:

| Zmienna | Opis |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `NEXTAUTH_SECRET` | Losowy secret (np. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL aplikacji (np. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Email konta administratora |
| `ADMIN_PASSWORD` | Hasło konta administratora |
| `CONTACT_RECEIVER_EMAIL` | Email na który trafiają zgłoszenia z formularza |
| `RESEND_API_KEY` | Klucz API z resend.com |
| `EMAIL_FROM` | Adres nadawcy emaili (np. `Synapsite <noreply@synapsite.pl>`) |
| `OPENAI_API_KEY` | Klucz API OpenAI dla chatbota |

### 3. Przygotuj bazę danych

```bash
npx prisma generate
npx prisma db push
```

### 4. Utwórz konto administratora

```bash
npx tsx prisma/seed.ts
```

### 5. Uruchom lokalnie

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Funkcje

### Formularz kontaktowy
- Walidacja Zod + ochrona antyspamowa (honeypot + rate limiting)
- Zapis do bazy danych + wysyłka emaila via Resend
- Pola: imię, firma, email, telefon, usługa, budżet, termin, wiadomość
- `reply-to` ustawiony na email klienta

### Panel administracyjny (`/admin`)
- Logowanie credentials (NextAuth v5)
- CRUD projektów portfolio
- Zarządzanie leadami ze zgłoszeń kontaktowego (statusy: nowy/skontaktowany/zakwalifikowany/zamknięty)

### Chatbot AI
- Widget czatu w prawym dolnym rogu
- Streaming odpowiedzi (Vercel AI SDK + OpenAI)
- Baza wiedzy o Synapsite (usługi, ceny, FAQ)
- Lead-capture gdy użytkownik wykazuje zainteresowanie
- Historia czatu zapisywana w bazie

### Portfolio
- Dynamicznie renderowane z bazy danych
- Zarządzane przez panel admin

## Deploy na Vercel

1. Push na GitHub
2. Połącz repo z Vercel
3. Dodaj zmienne środowiskowe w ustawieniach projektu
4. Dodaj bazę PostgreSQL (np. Vercel Postgres, Neon, Supabase)
5. Po deploy uruchom: `npx prisma db push` i `npx tsx prisma/seed.ts`

## Struktura projektu

```
app/
├── api/
│   ├── admin/          # Admin API (projects, leads)
│   ├── auth/           # NextAuth
│   ├── chat/           # AI chatbot
│   ├── contact/        # Contact form
│   └── projects/       # Public portfolio API
├── admin/
│   ├── login/          # Admin login
│   └── (dashboard)/    # Protected admin pages
├── layout.tsx
└── page.tsx
components/
├── ui/                 # shadcn/ui components
├── chatbot.tsx         # AI chat widget
├── contact-form.tsx    # Contact form modal
├── portfolio.tsx       # Dynamic portfolio
├── admin-sidebar.tsx   # Admin navigation
└── ...                 # Other page sections
lib/
├── auth.ts             # NextAuth config
├── prisma.ts           # Prisma client
├── email-template.ts   # Email HTML template
├── chatbot/            # System prompt
└── knowledge/          # Business knowledge base
prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Admin user seeder
```
