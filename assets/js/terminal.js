// Select the terminal and its header
const terminal = document.getElementById('terminal');
const terminalHeader = document.getElementById('terminal-header');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// When the mouse is pressed down on the terminal header
terminalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - terminal.offsetLeft;
    offsetY = e.clientY - terminal.offsetTop;
    terminal.style.cursor = 'grabbing';
});

// When the mouse is released, stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
    terminal.style.cursor = 'default';
});

// Handle terminal movement when dragging
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

document.addEventListener('DOMContentLoaded', function () {
    const terminalBody = document.getElementById('terminal-body');

    const commands = {
        'hello': 'Hello, user!',
        'date': new Date().toString(),
        'help': 'Available commands: hello, date, help, clear',
        'clear': 'clear'
    };

    // Function to create a new input line with prompt
    function createNewInput() {
        const terminalInputContainer = document.createElement('div');
        terminalInputContainer.classList.add('terminal-input');
        
        const userSpan = document.createElement('span');
        userSpan.classList.add('user');
        userSpan.textContent = 'h4r1@kali:~$';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'command-line';
        inputField.autofocus = true;
        inputField.autocomplete = 'off';
        
        terminalInputContainer.appendChild(userSpan);
        terminalInputContainer.appendChild(inputField);
        
        terminalBody.appendChild(terminalInputContainer);
        
        // Focus on the new input field
        inputField.focus();

        // Add event listener to the new input field
        inputField.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const command = inputField.value.trim();
                handleCommand(command, terminalInputContainer);
                inputField.disabled = true;  // Disable the input after command execution
            }
        });
    }

    // Function to handle commands
    function handleCommand(command, terminalInputContainer) {
        let outputDiv = document.createElement('div');
        let commandOutput;

        if (commands[command]) {
            if (command === 'clear') {
                terminalBody.innerHTML = '';  // Clear the terminal output
                createNewInput();  // Create new input after clear
                return;
            } else {
                commandOutput = commands[command];
            }
        } else {
            commandOutput = `Command not found: ${command}`;
        }

        // Display the command output
        outputDiv.textContent = commandOutput;
        terminalBody.appendChild(outputDiv);

        // Scroll to the bottom to see the latest output
        terminalBody.scrollTop = terminalBody.scrollHeight;

        // Create a new input field for the next command
        createNewInput();
    }

    // Initialize with the first input prompt
    createNewInput();
});