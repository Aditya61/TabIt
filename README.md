# Tabit - Credit Tracking Made Easy
A full-stack PWA built to help local shops manage customer credits and payments efficiently with WhatsApp message reminders.

## Live App

Access the app live on [Tabit](tabit-git-main-aditya61s-projects.vercel.app)

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

## Project Structure

- prisma
    - migrations
        - 20250702152602_init
        - migration_lock.toml
    - schema.prisma
- src
    - lib
        - server
            - auth.js
            - authGuard.js
            - prisma.js
        - stores
            - settingsPanel.js
        - index.js
    - routes
        - creditors
            - dashboard
                - [id]
                    - credit
                        - [creditId]
                            - +page.server.js
                            - +page.svelte
                        - new
                            - +page.server.js
                            - +page.svelte
                    - payment
                        - new
                            - +page.server.js
                            - +page.svelte
                    - +page.server.js
                    - +page.svelte
            - new
                - +page.server.js
                - +page.svelte
            - +page.server.js
            - +page.svelte
        - login
            - +page.server.js
            - +page.svelte
        - logout
            - +page.server.js
        - offline
            - +page.svelte
        - signup
            - +page.server.js
            - +page.svelte
        - +layout.server.js
        - +layout.svelte
        - +page.server.js
        - +page.svelte
    - app.css
    - app.html
    - hooks.server.js
    - service-worker.js
    - static
        - icons
            - icon-192.png
            - icon-512.png
        - favicon.png
        - manifest.webmanifest
- package-lock.json
- package.json
- svelte.config.js
- tailwind.config.js
- vite.config.js

## Deployment Details

- **Frontend**: [Vercel](tabit-git-main-aditya61s-projects.vercel.app)

- **Database**: Supabase

## License / Credits

This project is public for portfolio and demonstration purposes only.
It is **not open source** and **not licensed for reuse, modification, or redistribution**.
You may view the code for learning or evaluation purposes, but you may not use, copy, modify, or redistribute it without written permission.

All rights reserved © 2025 Aditya Narayan Panda