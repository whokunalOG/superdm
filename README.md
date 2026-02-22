# SuperDM MVP - Instagram DM Automation

A high-converting SaaS landing page that automates Instagram DMs and gates content behind a "Follower Check" to increase followers.

## 🚀 Project Structure

```
superdm/
├── app/
│   ├── actions/
│   │   └── waitlist.ts           # Server action to save leads
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main landing page
│   └── globals.css               # Global styles
├── components/
│   └── WaitlistModal.tsx          # Modal for email capture
├── lib/
│   └── supabase.ts               # Supabase client setup
├── .env.local                    # Environment variables (template)
├── schema.sql                    # Database schema
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
├── next.config.js                # Next.js config
└── README.md                     # This file
```

## ✨ Features

### Frontend
- 🎨 **Dark Premium UI** - Professional #0a0a0a dark background
- 🔒 **Follower-Lock Visual** - Shows how the automation works
- 💰 **Pricing Section** - Free tier & Pro ($49 Lifetime Deal)
- 📧 **Waitlist Modal** - Captures email on ANY button click
- 📱 **Responsive Design** - Works on all devices

### Backend
- 🔧 **Server Actions** - Secure email capture with validation
- 🗄️ **Supabase Integration** - Real-time database
- ✅ **Intent Tracking** - Records which tier users are interested in
- 🎯 **Error Handling** - Graceful error messages

### Database
- 📊 **Leads Table** - Stores email, intent, and timestamp
- 🔐 **Row Level Security** - Optional RLS policies

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
1. Create a [Supabase](https://supabase.com) project
2. Get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the `schema.sql` file in Supabase SQL editor

### 3. Environment Variables
Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 📋 Database Schema

```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  intent VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Unique identifier
- `email` - User's email (unique constraint)
- `intent` - 'free' or 'pro' tier selection
- `created_at` - Timestamp of signup

## 🎯 How It Works

1. **User lands on page** → Sees hero section with features
2. **User clicks ANY button** → WaitlistModal opens
3. **User enters email** → Server action validates & saves to Supabase
4. **Success toast** → User gets confirmation
5. **Data logged** → Email + intent tracked for follow-up

## 🎨 Components

### WaitlistModal.tsx
- Modal that captures email
- Shows loading state during submission
- Displays success/error toasts
- Accessible with close button

### app/page.tsx
- Main landing page
- Features section with icons
- How it works visual
- Pricing comparison table
- CTA footer

### app/actions/waitlist.ts
- Server-side email validation
- Supabase insert with error handling
- Duplicate email detection
- Secure server-only execution

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t superdm .
docker run -p 3000:3000 superdm
```

## 🔐 Environment Security

- Never commit `.env.local` to git
- Use `.env.local` for local development
- Use environment secrets in Vercel/deployment platform
- Supabase anon key is safe to expose (has RLS)

## 📊 Analytics Setup (Optional)

Add to `app/layout.tsx`:
```tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: Lucide React
- **Toasts**: Sonner
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (recommended)

## 📝 Next Steps for Full Product

1. **Instagram API Integration** - Add follower verification
2. **Authentication** - User signup/login
3. **Dashboard** - Analytics and DM management
4. **Payment** - Stripe integration for $49 tier
5. **DM Automation** - Background jobs for auto-messaging
6. **Admin Panel** - Manage leads and campaigns

## 🤝 Support

For issues or questions:
1. Check Supabase console for database errors
2. Verify environment variables are set
3. Check browser console for frontend errors
4. Check server logs for backend errors

## 📄 License

MIT

---

**Built with ❤️ for Instagram growth automation**
