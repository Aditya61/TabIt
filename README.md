# Tabit - Credit Tracking Made Easy
A full-stack PWA built to help local shops manage customer credits and payments efficiently with WhatsApp message reminders.

## Live App

Access the app live on [tabit-sigma.vercel.app](https://tabit-sigma.vercel.app)

## Overview

**Tabit** is a credit tracking application designed for local stores and small businesses. It lets shopkeepers record credits and payments for customers, manage outstanding dues, and share auto-generated itemized bills through WhatsApp. This solo full-stack project is currently deployed and actively used in a real store.

## Features

- Add and manage customers (creditors)
- Record itemized credit transactions
- FIFO-based automated payment distribution across credits
- View outstanding balances and transaction history
- Auto-generate WhatsApp messages for credit summary, overall credit history and payment details
- JWT-based authentication with session persistence
- PWA ready with install support and auto updation on deployment of new version

## Tech Stack

- **Frontend**: SvelteKit, HTML, TailwindCSS
- **Backend**: SvelteKit backend, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: JWT (with remember-me functionality using cookies)
- **Deployment**: Vercel (App), Supabase (PostgreSQL)

## Deployment Details

- **Frontend**: Vercel - [tabit-sigma.vercel.app](https://tabit-sigma.vercel.app)

- **Database**: Supabase

## License / Credits

This project is public for portfolio and demonstration purposes only.
It is **not open source** and **not licensed for reuse, modification, or redistribution**.
You may view the code for learning or evaluation purposes, but you may not use, copy, modify, or redistribute it without written permission.

All rights reserved © 2025 Aditya Narayan Panda
