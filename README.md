# Chef Claude 🍳

A React application that uses the Groq API and GPT-OSS-20B to generate recipes from user-provided ingredients. It also supports general questions and mathematical calculations.

## Features
- Add and manage ingredients.
- Generate recipes using AI.
- Render AI responses in Markdown.
- Support Arabic and English inputs.

## Tech Stack
- React
- Vite
- Groq API
- JavaScript
- React Markdown

## Setup

1. Install dependencies:
   `npm install`

2. Create a `.env.local` file in the project root and add your Groq API key:
   `VITE_GROQ_API_KEY=your_api_key_here`

3. Start the development server:
   `npm run dev`

**Note:** Never commit your API key. Client-side API keys are exposed in browser applications, so use a backend before deploying publicly.
