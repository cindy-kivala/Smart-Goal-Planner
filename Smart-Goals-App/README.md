# Smart Goals Planner

The Smart Goals Planner is a single-page React application that helps users set, track, and manage financial goals effectively. Users can add SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals, update progress, record savings, monitor deadlines, and gain a visual overview of their goal progress.

## Features

### 1. Add and Edit Goals
- Users can add new financial goals with fields including:
  - Goal name
  - Description
  - Target amount
  - Deadline (date)
- Existing goals can be edited to update any of the above fields.

### 2. Progress Tracking
- Each goal includes a progress bar that updates based on the total saved amount.
- Goals are marked as completed when the saved amount equals or exceeds the target amount.

### 3. Deposit Handling (CRUD)
- Users can add savings (deposits) to each goal.
- Deposits update the saved amount and adjust the progress bar accordingly.
- Each deposit is stored persistently using a local `db.json` file via JSON Server.

### 4. Goal Overview Dashboard
- The dashboard displays a summarized view including:
  - Total number of goals
  - Total saved amount
  - Number of completed goals
  - Number of goals due soon (within 7 days)
  - Number of goals overdue (past deadline)
- Goals that are due soon or overdue are visually indicated (e.g., colored borders or icons).

### 5. Light/Dark Mode Toggle
- Users can switch between light and dark themes for better accessibility and personal preference.
- The theme applies globally across the application.

### 6. Search and Filter
- Users can filter goals by completion status (all, completed, active).
- A search bar allows searching for goals by name.

---

## Technologies Used

- **Frontend**: React (with functional components and hooks)
- **State Management**: useState, useEffect
- **Styling**: CSS modules or plain CSS
- **Backend (Mock)**: JSON Server with `db.json` for simulating CRUD operations

---

## Folder Structure

Smart-Goals-App/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── App.jsx
│ │ ├── GoalItem.jsx
│ │ ├── GoalForm.jsx
│ │ ├── DepositForm.jsx
│ │ ├── GoalOverview.jsx
│ │ ├── Filter.jsx
│ ├── styles/
│ │ └── app.css
│ ├── main.jsx
│ └── index.css
├── db.json
├── package.json

## Installation & Setup

### 1. Clone the Repository

```bash
git clone git.github.com/cindy-kivala/smart-goals-planner.git
cd smart-goals-planner
npm install
npm install -g json-server
json-server --watch db.json --port 3000
npm run dev
