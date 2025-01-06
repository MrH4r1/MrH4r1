document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const terminalHeader = document.getElementById('terminal-header');
    const terminalBody = document.getElementById('terminal-body');

    if (!terminal || !terminalHeader || !terminalBody) {
        console.error('Required elements are missing from the DOM.');
        return;
    }

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Dragging functionality
    terminalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - terminal.offsetLeft;
        offsetY = e.clientY - terminal.offsetTop;
        terminal.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        terminal.style.cursor = 'default';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let xPos = e.clientX - offsetX;
            let yPos = e.clientY - offsetY;

            // Constrain movement within the viewport
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (xPos < 0) xPos = 0;
            if (yPos < 0) yPos = 0;
            if (xPos + terminal.offsetWidth > windowWidth) {
                xPos = windowWidth - terminal.offsetWidth;
            }
            if (yPos + terminal.offsetHeight > windowHeight) {
                yPos = windowHeight - terminal.offsetHeight;
            }

            terminal.style.left = `${xPos}px`;
            terminal.style.top = `${yPos}px`;
        }
    });

    // Command handling functionality

    const art = `I am the shadow in the digital abyss, a nameless specter in the underground. A hacker, not by title, but by instinct—driven by the thirst to break, to breach, and to understand what others fear to touch. I am a "newbie" by choice, for in the darkness, there is always more to learn. Web technologies, the veins of the digital world, are my playground, and the underground is where I sharpen my skills.

 My mission is not to destroy, but to protect, to expose vulnerabilities before they can be exploited. I am the chaos in the system, the glitch in the matrix, the one who watches and waits.
    `;
    const commands = {
        'whoami': art,
        'help': 'Available commands: whoami, help, clear',
        'clear': 'clear'
    };

    function createNewInput() {
        const terminalInputContainer = document.createElement('div');
        terminalInputContainer.classList.add('terminal-input');

        const userSpan = document.createElement('span');
        userSpan.classList.add('user');
        userSpan.textContent = 'H4r1@kali:~$';

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'command-line';
        inputField.autofocus = true;
        inputField.autocomplete = 'off';

        terminalInputContainer.appendChild(userSpan);
        terminalInputContainer.appendChild(inputField);
        terminalBody.appendChild(terminalInputContainer);

        inputField.focus();

        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const command = inputField.value.trim();
                handleCommand(command, terminalInputContainer);
                inputField.disabled = true; // Disable input after command execution
            }
        });
    }

    function handleCommand(command, terminalInputContainer) {
        let outputDiv = document.createElement('div');
        let commandOutput;

        if (commands[command]) {
            if (command === 'clear') {
                terminalBody.innerText = ''; // Clear terminal output
                createNewInput(); // Create new input after clear
                return;
            } else {
                commandOutput = commands[command];
            }
        } else {
            commandOutput = `Command not found: ${command}`;
        }

        outputDiv.innerText = commandOutput;
        terminalBody.appendChild(outputDiv);

        terminalBody.scrollTop = terminalBody.scrollHeight;

        createNewInput();
    }

    createNewInput();
});
