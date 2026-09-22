// Clothing data with correct image paths
const clothingData = {
    shirt1: {
        image: '/images/clothes/Safari.png',
        title: 'Safari T-Shirt',
        size: 'Size: XL',
        description: '---------------------------.'
    },
    shirt2: {
        image: '/images/clothes/HeartInThroat.png',
        title: 'Heart In Throat Design',
        size: 'Size: XL',
        description: ''
    },
    shirt3: {
        image: '/images/clothes/Dragon.png',
        title: 'Dragon Art Tee',
        size: 'Size: XL',
        description: ''
    },
    shirt4: {
        image: '/images/clothes/Spider.png',
        title: 'Spider Web Design',
        size: 'Size: XL',
        description: ''
    },
    shirt5: {
        image: '/images/clothes/WesternWorm.png',
        title: 'Western Worm Graphic',
        size: 'Size: XL',
        description: ''
    },
    shirt6: {
        image: '/images/clothes/CityMonk.png',
        title: 'City Monk Design',
        size: 'Size: XL',
        description: ''
    },
    shirt7: {
        image: '/images/clothes/Mermaid.png',
        title: 'Mermaid Tee',
        size: 'Size: XL',
        description: ''
    },
    shirt8: {
        image: '/images/clothes/Gun.png',
        title: 'Gun Art Design',
        size: 'Size: XL',
        description: ''
    },
    shirt9: {
        image: '/images/clothes/Clown.png',
        title: 'Clown Portrait Tee',
        size: 'Size: XL',
        description: ''
    },
    shirt10: {
        image: '/images/clothes/Skeleton.png',
        title: 'Skeleton Design',
        size: 'Size: XL',
        description: ''
    },
    shirt11: {
        image: '/images/clothes/Tiger.png',
        title: 'Tiger Design',
        size: 'Size: XL',
        description: ''
    },
    shirt12: {
        image: '/images/clothes/OldTimeySmoker.png',
        title: 'Old Timey Smoker',
        size: 'Size: XL',
        description: ''
    }
};

function openModal(itemId) {
    // Prevent event propagation
    event.stopPropagation();

    const modal = document.getElementById('clothingModal');
    const item = clothingData[itemId];

    if (item) {
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalSize').textContent = item.size;
        document.getElementById('modalDescription').textContent = item.description;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Add a small delay to ensure proper display
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('clothingModal');
    modal.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Prevent conflicts with main script.js by using more specific event handling
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside of modal content (but not on the modal content itself)
    const modal = document.getElementById('clothingModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Only close if clicking the modal background, not the content
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with escape key - but only if this specific modal is open
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('clothingModal');
            if (modal && modal.style.display === 'flex') {
                closeModal();
            }
        }
    });

    // Add click event listeners to clothing items to prevent conflicts
    const clothingItems = document.querySelectorAll('.clothing-item');
    clothingItems.forEach((item, index) => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Get the onclick attribute to determine which item was clicked
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/openModal\('([^']+)'\)/);
                if (match) {
                    openModal(match[1]);
                }
            }
        });
    });
});

// Remove the conflicting window.onclick handler and replace with more specific handling
// This prevents conflicts with other modals or scripts