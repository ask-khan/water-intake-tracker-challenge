# Fullstack Technical Challenge – Water Intake Tracker 💧

Welcome! This is your take-home assignment to help us assess your fullstack development skills in a real-world feature scenario.

---

## Goal

You're tasked with building a small feature for a health tracking platform: a **Water Intake Tracker**.

Users should be able to:

- Submit their **daily water intake (in ml)**
- View a **weekly summary chart** that compares intake against a fixed hydration goal (2,000 ml/day)

---

## Tech Stack

You're expected to use the following technologies:

### Backend
- **NestJS** (TypeScript)
- **Prisma** (with SQLite – already set up)
- **Jest** (for unit testing)

### Frontend
- **Next.js** (TypeScript + React)
- **Any UI framework** (e.g., shadcn/ui, Tailwind, AntD, or plain CSS)
- **Charting**: You may use `recharts`, `chart.js`, or anything lightweight

---

## Your Tasks

### 1. **Backend API**

Implement two API endpoints in the provided NestJS backend:

#### `POST /water-log` DONE
- Accepts: `userId: string`, `date: string`, `intakeMl: number`
- Behavior: Upsert water intake for that user + date (one log per day)

#### `GET /water-summary/:userId` DONE
- Returns the **last 7 days** of logs for the user
- Each item should include:
  - `date` (YYYY-MM-DD)
  - `totalIntake` (ml)
  - `percentageOfGoal` (0–100, based on 2000ml/day goal)

- 💡 Use **raw SQL** (`prisma.$queryRaw`) for this query.

---

### 2. **Frontend UI**

Implement two pages in the Next.js frontend:

#### `/log` DONE
- A form to log water intake for a selected day
- Input fields: `date`, `intakeMl`
- Submits to `POST /water-log`
- Show success/failure state

#### `/summary` DONE
- Fetch from `GET /water-summary/:userId`
- Render a **bar chart** of the last 7 days
- Each bar = intake for a day
- Include a horizontal reference line at 2,000ml to visualize the goal

---

### 3. **Unit Tests**

Write **at least one** test on each side:

- Backend (Jest): e.g., test the service method for logging or summary
- Frontend (Jest): e.g., test a small component or form logic

---

## 📦 Setup Instructions

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run start:dev
````

* The database uses **SQLite**, stored at `prisma/dev.db`
* Port: `http://localhost:3001`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

* Access the app at `http://localhost:3000`

---

## 📬 Submission Instructions

1. Fork this repo
2. Complete the tasks with clean, readable commits
3. Push your code and open a **pull request**
4. In your PR, include:

   * Need a Proper List View Summary Page with proper requirement.
   * I have tested the worked by runing npm test.
   * Yes more clear requirement.

---

### AI Tool Usage Policy

*"I used ChatGPT to help write the SQL aggregation logic, then refined it and tested edge cases manually."*

We’re not testing how much you can memorize — we’re interested in **how you think**, **how you learn**, and **how you deliver** working solutions using modern tools.

---


## ⏱ Estimated Time

2–3 hours.

---

## Bonus (optional)

* Show a “Well done!” message if 5+ of 7 days meet or exceed the goal Completed

---

Looking forward to your solution. Good luck!
