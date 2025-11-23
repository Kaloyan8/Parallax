As artificial intelligence gets smarter, it is becoming too easy to let computers make our decisions for us. Parallax is a tool designed to fix this by acting as a thinking partner rather than a replacement. Instead of simply giving you the answer, it uses the Claude API to challenge your assumptions and force you to think through problems yourself.

The main feature is the Socratic Assistant. If you ask it for help with a high-stakes problem, like firing a co-founder, it refuses to just write the email for you. Instead, it guides you through the legal and ethical risks so you can make the right choice. Also included are early prototypes for two other modes: a Perspective Engine that helps you understand opposing viewpoints, and a Creative Bridge that checks if your invention ideas are actually realistic. All modes require further development and testing.

The application was built using JavaScript and used XML to create a strict set of rules for the AI. The biggest challenge was fighting against the AI's natural tendency to be a people-pleaser. It was difficult to program the system to say no to user requests without being annoying

## Features
- **Socratic Assistant**: Uses CRIT templates and a 2:1 Reflection-to-Question ratio to guide learning without giving answers.
- **Perspective Engine**: Uses Steelmanning and Ideological Turing Tests to broaden viewpoints.
- **Creative Bridge**: Uses First Principles and TRL assessments to ground engineering ideas in reality.

## Architecture
- **index.html**: Main UI.
- **style.css**: "Cognitive Clarity" design system.
- **system_prompt.js**: Contains the XML-based Master Prompt Architecture.
- **app.js**: Handles application logic and simulates the AI response.
