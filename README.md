Parallax: Cognitive Operating System

A "scaffolding" AI architecture designed to preserve human agency. Rather than replacing human decision-making, Parallax utilizes strict XML-based constraint prompting to act as a Socratic reasoning partner.

Core Architecture

This is a full-stack application utilizing an Express.js backend to securely handle Anthropic API routing, paired with a vanilla JavaScript/CSS frontend.

system_prompt.js: The core engineering artifact. Contains the XML-based Master Prompt Architecture that forces the LLM to output structured <thinking> tags before delivering conversational responses.

server.js: Express backend handling CORS, environment variables, and secure API payload generation to the Claude 3.5 Sonnet endpoint.

app.js: Frontend state management and DOM parsing logic to separate the LLM's internal cognitive state from the user-facing UI.

style.css: "Cognitive Clarity" design system.

Modes of Operation

Socratic Assistant: Uses CRIT templates and a 2:1 Reflection-to-Question ratio to guide learning without giving answers.

Perspective Engine: Uses Steelmanning and Ideological Turing Tests to broaden viewpoints.

Creative Bridge: Uses First Principles and TRL assessments to ground engineering ideas in reality.

Local Deployment Instructions

Prerequisites

Node.js installed

An active Anthropic API Key

Installation

Clone the repository.

Install the backend dependencies:

npm install


Create a .env file in the root directory and add your Anthropic API key:

ANTHROPIC_API_KEY=your_api_key_here


Start the Express server:

npm start


Open your browser and navigate to the local port (default: http://localhost:3000 - Note: ensure your frontend is served or open index.html via a local live server that points to the correct backend port).
