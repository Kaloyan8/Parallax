document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const CONSTRAINTS = {
        'Socratic Assistant': [
            'Scaffold, Do Not Solve.',
            'Intellectual Brevity (200-300 words).',
            'Paragraph Form (No Markdown).'
        ],
        'Perspective Engine': [
            'Steelmanning: Argue the opposing view.',
            'Ideological Turing Test.',
            'Paragraph Form (No Markdown).'
        ],
        'Creative Bridge': [
            'Physics Audit & TRL Assessment.',
            'Pre-Mortem Analysis.',
            'Paragraph Form (No Markdown).'
        ]
    };

    // --- DOM ELEMENTS ---
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const constraintsList = document.getElementById('active-constraints');

    let currentMode = 'Socratic Assistant';

    // --- INITIALIZATION ---
    updateConstraintsUI(currentMode);

    // --- EVENT LISTENERS ---
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update Active State
            modeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Update Mode Logic
            currentMode = e.target.textContent;
            updateConstraintsUI(currentMode);

            addSystemMessage('Switched to ' + currentMode + ' mode.');
        });
    });

    // --- CORE LOGIC ---
    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        userInput.value = '';

        // Show thinking state
        const thinkingId = addThinkingMessage();

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    mode: currentMode
                })
            });

            const data = await response.json();
            removeMessage(thinkingId);

            if (data.error) {
                addSystemMessage('Error: ' + data.error);
            } else {
                addAIMessage(data.response);
            }
        } catch (err) {
            removeMessage(thinkingId);
            addSystemMessage('Connection Error: Is the server running?');
            console.error(err);
        }
    }

    function updateConstraintsUI(mode) {
        const constraints = CONSTRAINTS[mode];
        constraintsList.innerHTML = constraints.map(c =>
            '<div class="constraint-item">' + c + '</div>'
        ).join('');
    }

    // --- UI HELPERS ---
    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message user-message';
        div.textContent = text;
        chatHistory.appendChild(div);
        scrollToBottom();
    }

    function addAIMessage(text) {
        const div = document.createElement('div');
        div.className = 'message ai-message';
        
        // CLEANUP: Remove <thinking> tags and their content
        let cleanText = text.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();
        
        // Fallback if everything was inside thinking tags (shouldn't happen with good prompt)
        if (!cleanText) cleanText = text;

        // Simple formatting: just newlines to breaks
        div.innerHTML = cleanText.replace(/\n/g, '<br>');
        
        chatHistory.appendChild(div);
        scrollToBottom();
    }

    function addSystemMessage(text) {
        const div = document.createElement('div');
        div.className = 'message system-message';
        div.innerHTML = '<div class="message-content"><p>' + text + '</p></div>';
        chatHistory.appendChild(div);
        scrollToBottom();
    }

    function addThinkingMessage() {
        const id = 'thinking-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message system-message';
        div.innerHTML = '<em>Contacting Claude API...</em>';
        chatHistory.appendChild(div);
        scrollToBottom();
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});
