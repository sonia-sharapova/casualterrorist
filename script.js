// Hacker-style website JavaScript effects

document.addEventListener('DOMContentLoaded', function() {

    // Matrix Background Effect
    function initMatrix() {
        const canvas = document.getElementById('matrix-bg');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 10;
        const columns = canvas.width / fontSize;

        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#fbfcfc';
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 35);

        // Resize handler
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Improved Glitch Effect
    function glitchEffect(element) {
        // Store original text and ensure element exists
        if (!element || !element.textContent) return;

        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?ÄÖÜäöüß';

        let glitchCount = 0;
        const maxGlitch = 5;

        // Clear any existing intervals on this element
        if (element.glitchInterval) {
            clearInterval(element.glitchInterval);
        }

        element.glitchInterval = setInterval(() => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;

            glitchCount++;
            if (glitchCount >= maxGlitch) {
                clearInterval(element.glitchInterval);
                element.glitchInterval = null;
                // Ensure text returns to original
                element.textContent = originalText;
            }
        }, 50);
    }

    // Terminal Typing Effect
    function initTerminalEffect() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        const cursor = document.querySelector('.terminal-cursor');

        if (cursor) {
            // Random cursor movement
            setInterval(() => {
                const randomX = Math.random() * 5 - 2.5;
                const randomY = Math.random() * 2 - 1;
                cursor.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 100);
        }

        // Add new terminal lines occasionally
        const terminalContent = document.querySelector('.terminal-content');
        if (terminalContent) {
            const commands = [
                'C:\\> ping localhost',
                'C:\\> dir /w',
                'C:\\> system.exe running...',
                'C:\\> accessing mainframe...',
                'C:\\> connection established',
                'C:\\> downloading files...',
                'C:\\> ERROR: ACCESS DENIED',
                'C:\\> retrying connection...'
            ];

            setInterval(() => {
                if (Math.random() < 0.3) {
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.textContent = commands[Math.floor(Math.random() * commands.length)];
                    newLine.style.opacity = '0';

                    terminalContent.insertBefore(newLine, cursor);

                    setTimeout(() => {
                        newLine.style.opacity = '1';
                        newLine.style.transition = 'opacity 0.5s ease';
                    }, 100);

                    // Remove old lines if too many
                    const lines = terminalContent.querySelectorAll('.terminal-line');
                    if (lines.length > 20) {
                        lines[0].remove();
                    }
                }
            }, 5000);
        }
    }

    // System Status Updates
    function initStatusUpdates() {
        const statusItems = document.querySelectorAll('.status-item');
        const statusMessages = [
            'SYSTEM STABLE',
            'MEMORY OPTIMIZED',
            'CONNECTION SECURE',
            'FIREWALL ACTIVE',
            'SCANNING...',
            'DOWNLOAD COMPLETE',
            'ERROR 404',
            'REBOOTING...',
            'VIRUS DETECTED',
            'CLEANING CACHE'
        ];

        setInterval(() => {
            if (statusItems.length > 0) {
                const randomStatus = statusItems[Math.floor(Math.random() * statusItems.length)];
                const originalText = randomStatus.textContent;
                const newMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];

                randomStatus.textContent = newMessage;
                randomStatus.style.color = '#ff0000';

                setTimeout(() => {
                    randomStatus.textContent = originalText;
                    randomStatus.style.color = '#00ff00';
                }, 2000);
            }
        }, 8000);
    }

    // Interactive Elements
    function initInteractiveElements() {
        // Navigation hover effects - with debugging
        const navHeaders = document.querySelectorAll('.nav-header');
        console.log(`Found ${navHeaders.length} navigation buttons`);

        navHeaders.forEach((header, index) => {
            console.log(`Setting up button ${index + 1}: ${header.textContent.trim()}`);

            header.addEventListener('mouseenter', () => {
                console.log(`Hover detected on: ${header.textContent.trim()}`);
                glitchEffect(header);
            });

            header.addEventListener('mouseleave', () => {
                console.log(`Mouse left: ${header.textContent.trim()}`);
            });

            header.addEventListener('click', (e) => {
                console.log(`Clicked on: ${header.textContent.trim()}`);
                console.log(`Link URL: ${header.href}`);

                header.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    header.style.transform = 'scale(1)';
                }, 200);

                // Don't prevent default - let the link work normally
            });
        });

        // Also add event listeners to all nav-button class elements as backup
        const navButtons = document.querySelectorAll('.nav-button');
        console.log(`Found ${navButtons.length} nav-button elements`);

        navButtons.forEach((button, index) => {
            if (!button.classList.contains('nav-header')) {
                console.log(`Adding backup listeners to button ${index + 1}`);

                button.addEventListener('mouseenter', () => {
                    console.log(`Backup hover on: ${button.textContent.trim()}`);
                    glitchEffect(button);
                });

                button.addEventListener('click', (e) => {
                    console.log(`Backup click on: ${button.textContent.trim()}`);
                    button.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        });

        // Gallery items interaction
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                item.style.background = 'rgba(46, 115, 70, 0.2)';
                item.style.transform = 'scale(1.2) rotate(5deg)';
                setTimeout(() => {
                    item.style.background = 'rgba(10, 77, 33, 0.4)';
                    item.style.transform = 'scale(1)';
                }, 500);
            });
        });

        // Terminal window dragging
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;
            let xOffset = 0;
            let yOffset = 0;

            const terminalHeader = terminalWindow.querySelector('.terminal-header');
            if (terminalHeader) {
                terminalHeader.addEventListener('mousedown', dragStart);
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', dragEnd);

                function dragStart(e) {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;

                    if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
                        isDragging = true;
                        terminalHeader.style.cursor = 'grabbing';
                    }
                }

                function drag(e) {
                    if (isDragging) {
                        e.preventDefault();
                        currentX = e.clientX - initialX;
                        currentY = e.clientY - initialY;

                        xOffset = currentX;
                        yOffset = currentY;

                        terminalWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
                    }
                }

                function dragEnd(e) {
                    initialX = currentX;
                    initialY = currentY;
                    isDragging = false;
                    terminalHeader.style.cursor = 'grab';
                }
            }
        }

        // Widget buttons
        const widgetButtons = document.querySelectorAll('.widget-button');
        widgetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const responses = [
                    'ACCESS GRANTED',
                    'PERMISSION DENIED',
                    'LOADING...',
                    'ERROR 404',
                    'CONNECTION TIMEOUT',
                    'FILE NOT FOUND',
                    'SYSTEM BUSY'
                ];

                const originalText = button.textContent;
                const response = responses[Math.floor(Math.random() * responses.length)];

                button.textContent = response;
                button.style.background = '#ff0000';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#333';
                }, 1500);
            });
        });

        // Video placeholder
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                const videoContainer = document.querySelector('.video-container');
                if (videoContainer) {
                    videoContainer.innerHTML = '<div style="color: #ff0000; text-align: center; padding: 20px;">BUFFERING...<br>CONNECTION UNSTABLE</div>';

                    setTimeout(() => {
                        videoContainer.innerHTML = `
                            <div class="play-button">▶</div>
                            <div class="video-title">Orgazm Nostr...</div>
                        `;
                        initInteractiveElements(); // Re-initialize for new elements
                    }, 3000);
                }
            });
        }
    }

    // Keyboard Shortcuts and Easter Eggs
    function initKeyboardShortcuts() {
        let konami = [];
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', function(e) {
            // Konami Code
            konami.push(e.keyCode);
            if (konami.length > konamiCode.length) {
                konami.shift();
            }

            if (JSON.stringify(konami) === JSON.stringify(konamiCode)) {
                document.body.style.filter = 'hue-rotate(180deg) invert(1)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 5000);
                console.log('HACKER MODE ACTIVATED');
            }

            // Ctrl + Shift + H for hacker mode
            if (e.ctrlKey && e.shiftKey && e.keyCode === 72) {
                document.body.style.animation = 'glitch 0.1s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
            }

            // ESC to reset effects
            if (e.keyCode === 27) {
                document.body.style.filter = '';
                document.body.style.animation = '';
            }
        });
    }

    // Random System Messages
    function initSystemMessages() {
        const messages = [
            'Incoming transmission...',
            'Firewall breach detected',
            'System scan complete',
            'New user connected',
            'Download in progress',
            'Cache cleared',
            'Memory optimized',
            'Security protocol active'
        ];

        setInterval(() => {
            if (Math.random() < 0.2) {
                const message = messages[Math.floor(Math.random() * messages.length)];
                console.log(`[SYSTEM] ${message}`);

                // Flash status bar if it exists
                const statusBar = document.querySelector('.status-bar');
                if (statusBar) {
                    statusBar.style.background = '#ff0000';
                    setTimeout(() => {
                        statusBar.style.background = '#001100';
                    }, 200);
                }
            }
        }, 3000);
    }

    // Add glitch keyframes
    function addGlitchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all effects
    addGlitchStyles();
    initMatrix();
    initTerminalEffect();
    initStatusUpdates();
    initInteractiveElements();
    initKeyboardShortcuts();
    initSystemMessages();

    // Console welcome message
    console.log(`
    ██╗  ██╗██╗    ██╗████████╗ ██████╗
    ██║ ██╔╝██║    ██║╚══██╔══╝██╔════╝
    █████╔╝ ██║ █╗ ██║   ██║   ██║     
    ██╔═██╗ ██║███╗██║   ██║   ██║     
    ██║  ██╗╚███╔███╔╝   ██║   ╚██████╗
    ╚═╝  ╚═╝ ╚══╝╚══╝    ╚═╝    ╚═════╝
    
    SYSTEM INITIALIZED
    Welcome to the matrix...
    
    Easter eggs:
    - Konami Code: ↑↑↓↓←→←→BA
    - Ctrl+Shift+H: Glitch mode
    - ESC: Reset effects
    `);

    // Random background interference
    setInterval(() => {
        if (Math.random() < 0.05) {
            document.body.style.filter = 'contrast(1.5) brightness(1.2)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
    }, 2000);

});

// Error handling for retro feel
window.addEventListener('error', function(e) {
    console.log(`[ERROR ${Math.floor(Math.random() * 9999)}] ${e.message}`);
});

// Star cursor trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.15) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.left = (e.clientX - 4) + 'px';
        star.style.top = (e.clientY - 4) + 'px';
        star.style.width = '8px';
        star.style.height = '8px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.fontSize = '12px';
        star.style.lineHeight = '8px';
        star.style.textAlign = 'center';

        // Array of different star styles
        const starStyles = ['✦', '✧', '⋆', '⛥', '✴', '⭒'];
        const colors = ['#ffffff'];

        // Randomly choose star style and color
        star.textContent = starStyles[Math.floor(Math.random() * starStyles.length)];
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        star.style.textShadow = `0 0 5px ${star.style.color}`;

        // Random rotation and scale
        const rotation = Math.random() * 360;
        const scale = 0.5 + Math.random() * 0.5;
        star.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        document.body.appendChild(star);

        // Animate the star
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transition = 'all 0.8s ease-out';
            star.style.transform += ` translateY(-20px) scale(${scale * 1.5})`;

            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 800);
        }, 50);
    }
});


function openModal(itemId) {
    const modal = document.getElementById('artModal');
    const item = artworkData[itemId];

    if (item) {
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalMedium').textContent = item.medium;
        document.getElementById('modalDescription').textContent = item.description;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add glitch effect to modal title
        setTimeout(() => {
            glitchModalTitle();
        }, 300);
    }
}

function closeModal() {
    const modal = document.getElementById('artModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function glitchModalTitle() {
    const titleElement = document.getElementById('modalTitle');
    const originalText = titleElement.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?ÄÖÜäöüß';

    let glitchCount = 0;
    const maxGlitch = 3;

    const glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        titleElement.textContent = glitchedText;

        glitchCount++;
        if (glitchCount >= maxGlitch) {
            clearInterval(glitchInterval);
            titleElement.textContent = originalText;
        }
    }, 100);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('artModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add hover effect to artwork items
document.addEventListener('DOMContentLoaded', function() {
    const artworkItems = document.querySelectorAll('.artwork-item');

    artworkItems.forEach(item => {
        // Subtle hover glitch effect
        item.addEventListener('mouseenter', () => {
            if (Math.random() < 0.2) {
                item.style.filter = 'contrast(1.3) brightness(1.1) hue-rotate(10deg)';
                setTimeout(() => {
                    item.style.filter = '';
                }, 150);
            }
        });

        // Click animation
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 100);
        });
    });

    // Random subtle interference for gallery items
    setInterval(() => {
        if (Math.random() < 0.03) {
            const randomItem = artworkItems[Math.floor(Math.random() * artworkItems.length)];
            randomItem.style.filter = 'brightness(1.2) contrast(1.1)';
            setTimeout(() => {
                randomItem.style.filter = '';
            }, 80);
        }
    }, 4000);
});

// Console art message
console.log(`
    ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗         ██████╗ ██████╗ ████████╗
    ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║        ██╔══██╗██╔══██╗╚══██╔══╝
    ██║  ██║██║██║  ███╗██║   ██║   ███████║██║        ███████║██████╔╝   ██║   
    ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║        ██╔══██║██╔══██╗   ██║   
    ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗   ██║  ██║██║  ██║   ██║   
    ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
    
    DIGITAL ART GALLERY INITIALIZED
    Exploring the boundaries of digital creativity...
`);