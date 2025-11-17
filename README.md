This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

---

## Kambaz Full Stack Setup

### 1. Server (Express)
Repository: `kambaz-node-server-app`

Environment variables (see `.env` in server repo):
```
PORT=4000
SESSION_SECRET=your-secret
CLIENT_URL=https://your-nextjs-domain.vercel.app
SERVER_ENV=production # or development locally
```
Deploy the server (Render/Railway/Fly.io/Heroku). Expose HTTPS URL.

### 2. Client (Next.js)
Set `NEXT_PUBLIC_HTTP_SERVER` in Vercel Project Settings → Environment Variables to the deployed server base URL (e.g. `https://kambaz-server.onrender.com`). Redeploy.

### 3. CORS & Sessions
Server uses `express-session` with conditional `sameSite:none` & `secure` when `SERVER_ENV` != development. Ensure your deployment platform sets `SERVER_ENV=production` and that you are serving over HTTPS so cookies work cross-site.

### 4. Authentication Flow
`/api/users/signup` → create account
`/api/users/signin` → establish session
`/api/users/profile` → retrieve current user
`/api/users/signout` → destroy session

### 5. Core API Endpoints
Courses: `GET /api/courses`, `GET /api/users/current/courses`, `POST /api/users/current/courses`, `PUT /api/courses/:courseId`, `DELETE /api/courses/:courseId`
Modules: `GET /api/courses/:courseId/modules`, `POST /api/courses/:courseId/modules`, `PUT /api/modules/:moduleId`, `DELETE /api/modules/:moduleId`
Assignments: `GET /api/courses/:courseId/assignments`, `POST /api/courses/:courseId/assignments`, `PUT /api/assignments/:assignmentId`, `DELETE /api/assignments/:assignmentId`
Enrollments: `GET /api/enrollments`, `GET /api/users/current/enrollments`, `POST /api/courses/:courseId/enroll`, `DELETE /api/courses/:courseId/enroll`

### 6. Local Development
Client: `npm run dev` (port 3000)
Server: `npm start` (port 4000) or `node index.js`
Set `NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000` in client `.env.local` for local development.

### 7. Deployment Checklist
- Deploy server with env vars above
- Confirm CORS allows client origin & credentials
- Add client env var `NEXT_PUBLIC_HTTP_SERVER`
- Test signup/signin/profile across domains
- Verify enroll/unenroll buttons and CRUD pages

### 8. Future Enhancements
- People tab (list enrolled users per course)
- Persist data in a database instead of in-memory arrays
- Role-based permissions for editing/deleting courses

