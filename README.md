# movie_app
A sleek, modern, and high-performance movie web application built using Next.js 14, Tailwind CSS, and TMDB API. This application fetches real-time data for upcoming, trending, and popular cinematic releases, displaying them in a beautifully engineered custom asymmetric grid layout.


# 🎬 CineVerse — Premium Movie App

A sleek, modern, and high-performance movie web application built using **Next.js 14**, **Tailwind CSS**, and **TMDB API**. This application fetches real-time data for upcoming, trending, and popular cinematic releases, displaying them in a beautifully engineered custom asymmetric grid layout.

---

## 🔥 Features

*   **Custom Dynamic Grid Layout:** Features an eye-catching, high-visibility "Featured Portrait Spotlight" card taking up the full height on the left side, paired with a clean 2x2 grid configuration for recent horizontal movie reviews on the right side.
*   **Real-Time Data Integration:** Securely connects directly with the official TMDB (The Movie Database) API endpoints to serve live up-to-date movie details, star ratings, and metadata.
*   **Performance Optimized Loading:** Built-in network lifecycle controls using Axios and `AbortController` to handle clean page transitions, state updates, and prevent memory leaks.
*   **Next.js Subsystems:** Utilizes Next.js `next/font` for fast, zero-layout-shift loading of Google Fonts (`Catamaran`), along with `next/image` for automatic poster lazy-loading and aspect-ratio protection.
*   **Smart State Mapping:** Custom custom-built hooks (`useGenres`) that map real-time TMDB genre IDs into stylized visual categorical badge tags dynamically.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js 14 (App Router Architecture)
*   **Styling:** Tailwind CSS (Asymmetric CSS Grids, custom line-clamping transitions)
*   **Data Fetching:** Axios Async/Await HTTP Pipeline
*   **API Provider:** The Movie Database (TMDB v3 API)

---

## 🚀 Getting Started

Follow these steps to run this project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME