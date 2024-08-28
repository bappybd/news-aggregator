# News Aggregator Website

This project is a news aggregator website built using **React.js**, **TypeScript**, **Axios**, **Tailwind CSS**, and **Shadcn components**. It pulls articles from multiple news sources including NewsAPI, The Guardian OpenPlatform, and New York Times News API, and allows users to search and filter news articles.

## Features

- **Multi-source Aggregation**: Aggregates news articles from NewsAPI, The Guardian, and New York Times.
- **Search & Filter**: Users can search for articles by keyword and filter results by date, category, and source.
- **Customizable News Feed**: Users can customize their news feed by selecting preferred sources, categories, and authors on a dedicated settings page.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Best Practices**: Adheres to software development best practices like DRY, KISS, and SOLID principles.

## Tech Stack

- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Vite is a local development server for React project templates.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn Components**: UI component library.

## Project Structure

```plaintext
src/
├── assets/
├── components/
│   ├── core/
│   │   ├── nav-bar.tsx
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── index.ts
├── lib/
│   ├── utils.ts
├── news/
│   ├── componets/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SkeletonCard.tsx
│   ├── hooks/
│   │   ├── useFetchArticle.ts
│   │   ├── usePreferences.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── Settings.tsx
│   ├── services/
│   │   ├── guardian.service.ts
│   │   ├── news-api.service.ts
│   │   ├── nyt.service.ts
│   ├── types/
│   │   ├── article.service.ts
│   │   ├── news-service.service.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts

```

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Project in Docker

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

### 2. Build and Run the Containers

Build and start the Docker containers using Docker Compose:

```bash
docker-compose up --build
```

This will:

- Build the React app in a multi-stage Docker build.
- Serve the app using an NGINX web server.

### 3. Access the Application

Once the containers are up and running, you can access the application in your web browser at:

```bash
http://localhost:3000
```

### 4. Stopping the Containers

To stop the containers, run:

```bash
docker-compose down
```

## Configuration

### Environment Variables

You can configure the environment variables in the Docker Compose file or by creating an .env file. Here's an example of possible environment variables:

```dotenv
NODE_ENV=production
REACT_APP_NEWS_API_KEY=your_news_api_key
REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key
REACT_APP_NYT_API_KEY=your_nyt_api_key
```

### Custom NGINX Configuration

If you need to customize NGINX, you can modify the nginx.conf file located in the root directory.