## Getting Started

- Clone the repository.
- Create a [Neon project](https://neon.tech/docs/introduction)
- Create a [Clerk email authentication project](https://clerk.com/)
- Get your [Resend API key](https://resend.com/)
- Create a `.env.local` file containing the following credentials:

```txt
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEON_DATABASE_URL=
RESEND_API_KEY=r
```

- Run `npm i` to install the project dependencies.
- Run `npm run db-create` to create the database tables.
- Start the development server by running: `npm run dev`.
