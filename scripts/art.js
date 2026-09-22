// Art Gallery JavaScript - Row Layout

// Open art modal
function openArtModal(imageSrc, title) {
    const modal = document.getElementById('artModal');
    const modalImage = document.getElementById('modalArtImage');
    const modalTitle = document.getElementById('modalArtTitle');

    modalImage.src = imageSrc;
    modalTitle.textContent = title;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add fade in effect
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close art modal
function closeArtModal() {
    const modal = document.getElementById('artModal');

    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById('artModal');
    if (event.target === modal) {
        closeArtModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('artModal');
        if (modal.style.display === 'block') {
            closeArtModal();
        }
    }
});

// Row-specific animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeArtGallery();
    initializeRowAnimations();
    initializeCollageInteractions();
    preloadImages();
});

// Initialize main art gallery functionality
function initializeArtGallery() {
    const artItems = document.querySelectorAll('.art-item, .collage-large, .collage-small, .collage-item');

    artItems.forEach((item, index) => {
        // Set initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50); // Staggered animation
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(item);

        // Add click animation
        item.addEventListener('click', function() {
            if (!this.classList.contains('placeholder')) {
                this.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Initialize row-specific animations
function initializeRowAnimations() {
    const rows = document.querySelectorAll('.art-row');

    rows.forEach((row, rowIndex) => {
        // Add staggered row appearance
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 1s ease, transform 1s ease';

        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, rowIndex * 200);
    });
}

// Initialize collage-specific interactions
function initializeCollageInteractions() {
    const collageRows = document.querySelectorAll('.collage-row');

    collageRows.forEach(collageRow => {
        // Add special hover effects for collage items
        const collageItems = collageRow.querySelectorAll('.collage-large, .collage-small, .collage-item');

        collageItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Slightly dim other items in the same collage
                collageItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.style.opacity = '0.7';
                    }
                });
            });

            item.addEventListener('mouseleave', function() {
                // Restore opacity to all items
                collageItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    });
}

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('.art-item img, .collage-large img, .collage-small img, .collage-item img');

    images.forEach(img => {
        if (img.src && !img.src.includes('placeholder')) {
            const imageLoader = new Image();
            imageLoader.src = img.src;
        }
    });
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('artModal');

    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeArtModal();
        }
        // Could add prev/next navigation here in the future
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', function(event) {
    const modal = document.getElementById('artModal');

    if (modal.style.display === 'block') {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;

        // Quick swipe down to close modal
        if (deltaY > 100 && Math.abs(deltaX) < 100 && deltaTime < 500) {
            closeArtModal();
        }
    }
}, { passive: true });

// Initialize mobile-specific features
if ('ontouchstart' in window) {
    // Mobile-specific touch enhancements can be added here
    console.log('Mobile device detected - touch features enabled');
}

// Lazy loading for images as they come into view
function initializeLazyLoading() {
    const images = document.querySelectorAll('.art-item img, .collage-large img, .collage-small img, .collage-item img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        }
    });
}

// Initialize lazy loading when page loads
window.addEventListener('load', initializeLazyLoading);

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Recalculate any necessary layouts on resize
    const collageContainers = document.querySelectorAll('.collage-container');
    collageContainers.forEach(container => {
        // Force redraw of collage layouts
        container.style.display = 'none';
        container.offsetHeight; // Trigger reflow
        container.style.display = '';
    });
}, 250));

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add visual feedback for interactive elements
function addVisualFeedback() {
    const interactiveElements = document.querySelectorAll('.art-item, .collage-large, .collage-small, .collage-item');

    interactiveElements.forEach(element => {
        if (!element.classList.contains('placeholder')) {
            element.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });

            element.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Initialize visual feedback when DOM is ready
document.addEventListener('DOMContentLoaded', addVisualFeedback);
