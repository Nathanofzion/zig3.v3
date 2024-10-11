<div align="center">

# 🚀 Next.js 14 Referrel Web Template

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-black?style=for-the-badge&logo=nextauth&logoColor=white)](https://next-auth.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Tremor](https://img.shields.io/badge/Tremor-FD0061?style=for-the-badge)](https://www.tremor.so)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Next.js 14** web template with a magic link referral system (inspired by Slack 😎, Notion 📝, and Figma 🎨) built on top of **Next Auth** and **Firebase**. Styled with **Tremor** components and  **Tailwind CSS**.

</div>

## 🚩 Overview  

This starter template is built on top of the following main dependencies:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)  
- Database - [Firebase](https://firebase.google.com)  
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)  
- Formatting - [Prettier](https://prettier.io)  

This template includes authentication via NextAuth.js with a Firebase adapter. It also implements a referral system using a Firebase backend to generate magic links.  

The template is set up for optimal deployment on Vercel allowing features like preview mode, automatic cache invalidation, and serverless functions.  

## 🚀 Getting Started   

### ✅ Prerequisites  

- [Node.js 14+](https://nodejs.org/en)  
- [Vercel](https://vercel.com) account
- [Firebase](https://firebase.google.com/) project
- [SendGrid](https://sendgrid.com/en-us) account  

### 📂 Installation

```  
git clone https://github.com/yourname/nextjs14-web-template  
cd nextjs14-web-template
yarn install  
```

### ⚙️ Configuration  

Copy `.env.local.example` to `.env.local` and add your Firebase and SendGrid credentials.  

### ▶️ Run development server

```
yarn dev
```   

Open http://localhost:3000 to view the app.  

### 🚢 Deployment  

Deploy on Vercel by pushing to Git (e.g. GitHub) and importing into a Vercel project.  

## ⚖️ License  

MIT License - see [LICENSE.md](LICENSE.md) for more.