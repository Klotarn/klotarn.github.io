document.addEventListener("DOMContentLoaded", function() {
    const titles = document.querySelectorAll("#titles .titles-item");

    // Function to update dots
    function updateDots() {
        // Reset all dots first
        titles.forEach(title => {
            title.style.setProperty('--dot', '"•"'); // Custom CSS variable for dots
        });

        // Loop through each title item to detect when it wraps
        let previousTop = titles[0].offsetTop; // Track top offset of first item
        titles.forEach((title, index) => {
            const currentTop = title.offsetTop;

            // If item is on a new line, remove dot from the previous item
            if (currentTop > previousTop && index > 0) {
                titles[index - 1].style.setProperty('--dot', '""'); // Remove dot for line-end item
            }
            previousTop = currentTop; // Update previous top offset
        });
    }

    // Call the function on page load and window resize
    updateDots();
    window.addEventListener("resize", updateDots);
});

// Function to move #languages-section based on screen width
function moveLanguagesSection() {
    const languagesSection = document.getElementById('languages-section');
    const firstColumn = document.getElementById('first-secondary-column');
    const secondColumn = document.getElementById('second-secondary-column');

    if (window.innerWidth >= 769) {
        // Move to second column if screen width is 769px or larger
        if (secondColumn && !secondColumn.contains(languagesSection)) {
            secondColumn.appendChild(languagesSection);
        }
    } else {
        // Move back to first column if screen width is less than 769px
        if (firstColumn && !firstColumn.contains(languagesSection)) {
            firstColumn.appendChild(languagesSection);
        }
    }
}

// Run the function on page load and on window resize
window.addEventListener('load', moveLanguagesSection);
window.addEventListener('resize', moveLanguagesSection);
