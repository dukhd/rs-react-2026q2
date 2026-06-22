## 🧪 Rick and Morty Explorer (Redux Toolkit & RTK Query)

A modern, highly performant Single Page Application (SPA) built with React, TypeScript, and Redux Toolkit for searching and browsing characters from the Rick and Morty universe.

The project showcases cutting-edge web development standards: declarative data fetching and efficient client-side caching using **RTK Query**, clean state management, strict type-safety, and thorough component test suites integrated with network mocking layers.

---

### 🚀 Features

- 🔍 **Smart Search:** Search characters by name in real-time with state persistence in Local Storage / URL parameters.
- 📄 **Pagination:** Smooth server-side pagination with automatic page caching.
- 💾 **Advanced Caching (RTK Query):** Navigating back to previously visited list pages or reopening character detail sidebars renders cached data instantly, eliminating redundant network requests.
- 🔄 **Manual Cache Invalidation:** A custom "Refresh" button that explicitly invalidates specific query cache tags, forcing the app to clear memory and retrieve fresh data from the server.
- ⏳ **Loading State Indicators:** Polished loading visuals displayed during ongoing API calls, factoring in background refetches (`isFetching`).
- ⚠️ **Robust Error Handling:** Human-readable, user-friendly error messages for network failures or empty responses, alongside a reliable global `Error Boundary` fallback.

---

### 🛠️ Tech Stack

- **Core Framework:** React (Functional Components & Hooks)
- **State & API Management:** Redux Toolkit, RTK Query
- **Language:** TypeScript (Strictly typed, zero usage of `any` or `ts-ignore`)
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Testing Suite:** Vitest, JSDOM, Mock Service Worker (MSW) for API isolation, and `v8` for test coverage reporting.

---

### 🔧 Environment Variables

The application uses environment variables for dynamic runtime configuration. Before running the project locally, create a `.env` file in the root directory based on the provided template:

```bash
cp .env.example .env
```

| **Variable**            | **Description**                                                                                                     | **Example Value** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `NEXT_PUBLIC_CACHE_TTL` | Cache Time-To-Live (TTL) in seconds before the query data is considered unused and eligible for garbage collection. | `60`              |

### ⚙️ Installation & Setup

| **Step**                        | **Command**                                              |
| ------------------------------- | -------------------------------------------------------- |
| 1. Clone the repository         | `git clone https://github.com/dukhd/rs-react-2026q2.git` |
| 2. Enter the directory          | `cd rs-react-2026q2`                                     |
| 3. Install dependencies         | `npm install`                                            |
| 4. Set up the environment file  | `cp .env.example .env`                                   |
| 5. Run development server       | `npm run dev`                                            |
| 6. Run TypeScript type checks   | `npm run typecheck`                                      |
| 7. Build for production         | `npm run build`                                          |
| 8. Preview the production build | `npm run preview`                                        |

### 🧪 Testing

The codebase enforces rigorous quality control with unit and integration tests. Network calls are entirely simulated using **Mock Service Worker (MSW)** to maintain test deterministic isolation.

- **Run all tests:**

  Bash

  ```
  npm run test
  ```

- **Run tests with coverage analysis (Target: ≥80%):**

  Bash

  ```
  npm run test:coverage
  ```

### 📡 API Reference

Data is dynamically requested from the official public REST API:

https://rickandmortyapi.com/
