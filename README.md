# Ta'lim wa Tarbiya — starter site

A Next.js + Tailwind starter for a live Quran/Islamic education site,
modeled on the structure of sites like Mizan Academy but with its own
branding and design tokens.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's included

- `/` — homepage (hero, stats, differentiation, 3-step process, course grid)
- `/courses` — full course listing
- `/courses/[slug]` — individual course template, driven by `lib/courses.ts`
- Shared `Header` / `Footer` components
- Design tokens in `tailwind.config.ts` (lapis blue + terracotta clay palette,
  Fraunces + Inter type pairing)

## Login portals

`/parent/login` and `/teacher/login` are wired up with **NextAuth.js**
(credentials provider — email + password). Demo accounts, both password
`password123`:

- `parent@example.com` → redirects to `/parent/dashboard`
- `teacher@example.com` → redirects to `/teacher/dashboard`

Both dashboard routes are protected by `middleware.ts` — visiting them
without a session redirects to the login page.

Copy `.env.example` to `.env.local` and fill in a real `NEXTAUTH_SECRET`
before running (`openssl rand -base64 32`).

### Making this production-ready

Right now `lib/users.ts` is an **in-memory placeholder** — it resets every
time the server restarts, and there's no way to actually register a new
parent or teacher account yet. Before this is usable with real families:

1. **Add a real database.** Postgres via Supabase or Prisma is the most
   common pairing with Next.js. A minimal `users` table needs:
   ```
   id, email (unique), name, password_hash, role (enum: parent | teacher), created_at
   ```
2. **Replace `findUserByEmail` in `lib/users.ts`** with a real query
   against that table — the function signature in `lib/auth.ts` doesn't
   need to change, only the implementation.
3. **Build a registration flow** — a signup form that hashes the password
   with `bcryptjs` (already a dependency) before storing it.
4. **Link parents to their children's records** — once you have a
   `students` table, the parent dashboard should query for students where
   `parent_id` matches the logged-in user, instead of showing static
   placeholder data.
5. **Do the same for teachers** — a `classes` table linked to `teacher_id`
   powers the "today's schedule" section.

## Not yet built

- Payments (Stripe is the standard choice for a plans/enrollment flow)
- Real registration/signup pages (see auth section above)
- **Contact form backend** — `/contact` has a working form UI, but
  submitting it doesn't send an email or save anywhere yet. To wire it up:
  - Easiest: a service like Resend or Formspree — a few lines in
    `components/ContactForm.tsx`'s `handleSubmit` function
  - More control: a Next.js API route (`app/api/contact/route.ts`) that
    saves to your database and/or sends an email via your provider of choice

## Next steps

1. Fill in the placeholder hero image/gradient with real photography or
   illustration.
2. Connect a real database and swap out `lib/users.ts` (see above).
3. Build out the remaining pages listed above.
4. Decide on a CMS (or keep courses/blog as code, like `lib/courses.ts`)
   once someone non-technical needs to edit content.
5. Deploy to Vercel: `vercel --prod` (after `vercel login`). Remember to
   set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` in Vercel's environment
   variables too.
