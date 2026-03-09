# Unmatrix — Build Beyond the System

> The developer platform that removes every constraint. Deploy instantly, scale infinitely, integrate everything.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS v3 + Framer Motion + Zustand
- **Backend**: Express + TypeScript + Supabase
- **Auth**: Supabase Auth (email + Google OAuth)
- **Database**: Supabase (PostgreSQL)

## Project Structure

```
.
├── client/          # React/Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # Navbar, Footer, Sidebar
│   │   │   ├── sections/  # Hero, Features, Stats, etc.
│   │   │   └── shared/    # GlassCard, AnimatedButton, etc.
│   │   ├── pages/         # Landing, About, Product, Contact, Dashboard
│   │   ├── hooks/         # useAuth, useScroll, useAnimations
│   │   ├── lib/           # supabase, utils, validations
│   │   ├── store/         # authStore (Zustand)
│   │   └── types/         # TypeScript interfaces
│   └── ...
└── server/          # Express API
    └── src/
        ├── routes/        # contact, projects, auth
        ├── middleware/     # authMiddleware, errorHandler
        └── lib/           # supabase (service role)
```

## Setup

### 1. Clone and install dependencies

```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 2. Configure environment variables

**`client/.env.local`**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

**`server/.env`**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CLIENT_URL=http://localhost:5173
PORT=3001
```

### 3. Supabase Setup

Create these tables in your Supabase project:

```sql
-- Contacts table
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  status text not null default 'building',
  environment text not null default 'production',
  last_deploy timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table contacts enable row level security;
alter table projects enable row level security;

-- Projects: users can only access their own
create policy "Users can view own projects"
  on projects for select using (auth.uid() = user_id);

create policy "Users can create own projects"
  on projects for insert with check (auth.uid() = user_id);

create policy "Users can delete own projects"
  on projects for delete using (auth.uid() = user_id);
```

### 4. Run development servers

```bash
# Terminal 1 — frontend
cd client && npm run dev
# Starts on http://localhost:5173

# Terminal 2 — backend
cd server && npm run dev
# Starts on http://localhost:3001
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with Hero, Features, Stats, Testimonials, Pricing |
| `/about` | Team, mission, values |
| `/product` | Product breakdown, feature tabs, integrations |
| `/contact` | Contact form + FAQ accordion |
| `/dashboard` | Protected dashboard (requires auth) |

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push and open a PR

## License

MIT © 2025 Unmatrix, Inc.
