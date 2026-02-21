# Nexus Platform

[![Vercel Deployment](https://img.shields.io/badge/Vercel-View%20App-000000?style=flat&logo=vercel)](https://charged-pathfinder.vercel.app)

A modern AI-powered platform for document management, intelligent chat, and Model Context Protocol (MCP) integration.

## 🚀 Features

- **AI Playground**: Interactive chat interface powered by Google Gemini.
- **Document Management**: Seamless document ingestion and vector storage using Upstash.
- **MCP Integration**: Enhanced model capabilities through Model Context Protocol.
- **Background Processing**: Reliable task handling with Inngest.
- **Modern UI**: Built with Next.js 15, Tailwind CSS, and shadcn/ui.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: Google Gemini API, LangGraph, LangChain
- **Database**: Upstash Vector (Serverless Vector DB)
- **Background Jobs**: Inngest
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn
- API Keys for Gemini and Upstash

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:ankitshaw/nexus-platform.git
   cd nexus-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file with:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_key
   UPSTASH_VECTOR_REST_URL=your_url
   UPSTASH_VECTOR_REST_TOKEN=your_token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Repository Structure

- `src/app/playground`: AI Chat interface
- `src/app/documents`: Document management and ingestion
- `src/app/mcp-info`: MCP status and configuration
- `src/inngest`: Background function definitions
- `src/lib`: Core utilities and API clients
