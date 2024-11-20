document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll("#titles .titles-item");

    // Function to update dots
    function updateDots() {
        // Reset all dots first
        titles.forEach((title) => {
            title.style.setProperty("--dot", '"•"'); // Custom CSS variable for dots
        });

        // Loop through each title item to detect when it wraps
        let previousTop = titles[0].offsetTop; // Track top offset of first item
        titles.forEach((title, index) => {
            const currentTop = title.offsetTop;

            // If item is on a new line, remove dot from the previous item
            if (currentTop > previousTop && index > 0) {
                titles[index - 1].style.setProperty("--dot", '""'); // Remove dot for line-end item
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
    const languagesSection = document.getElementById("languages-section");
    const firstColumn = document.getElementById("first-secondary-column");
    const secondColumn = document.getElementById("second-secondary-column");

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

function resetTopContentOrder(element1, element2, element3) {
    ensureOrder(element1, 1, 1, 3);
    ensureOrder(element2, 2, 1, 3);
    ensureOrder(element3, 3, 1, 3);
}

function ensureOrder(element, targetOrder, startOrder, endOrder) {
    // Remove all order classes
    for (let order = startOrder; order <= endOrder; order++) {
        if (element.classList.contains(`order-${order}`)) {
            element.classList.remove(`order-${order}`);
        }
    }

    // Add the target order class
    element.classList.add(`order-${targetOrder}`);
}

function getTotalWidth(element) {
    const style = window.getComputedStyle(element);
    const width = parseFloat(style.width);
    const marginX = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    // console.log(width, marginX, paddingX);
    return width + marginX + paddingX;
}

function setFlex(element, toFlex, fromFlex) {
    if (element.classList.contains(`flex-${fromFlex}`)) {
        element.classList.remove(`flex-${fromFlex}`);
    }
    if (!element.classList.contains(`flex-${toFlex}`)) {
        element.classList.add(`flex-${toFlex}`);
    }
}

function setAlignItems(element, toAlign, fromAlign) {
    if (element.classList.contains(`align-items-${fromAlign}`)) {
        element.classList.remove(`align-items-${fromAlign}`);
    }
    if (!element.classList.contains(`align-items-${toAlign}`)) {
        element.classList.add(`align-items-${toAlign}`);
    }
}

function setMargin(element, toMargin, fromMargin) {
    if (element.classList.contains(fromMargin)) {
        element.classList.remove(fromMargin);
    }
    if (!element.classList.contains(toMargin)) {
        element.classList.add(toMargin);
    }
}
function reorderElements() {
    // Do different thing for work exp and  education
    const containers = document.getElementsByClassName("block-top-content");

    for (let container of containers) {
        const title = container.querySelector(".block-title");
        const links = container.querySelector(".block-links");
        const date = container.querySelector(".block-date");

        if (!links) {
            // Do this if there are no links
        } else {
            // Get positions of elements relative to the container
            const linksExist = links.children.length > 0;

            console.log(title.innerHTML);
            var containerTotalWidth = getTotalWidth(container);
            var titleTotalWidth = getTotalWidth(title);
            var dateTotalWidth = getTotalWidth(date);
            var linksTotalWidth = getTotalWidth(links);

            console.log(title.innerHTML, "Total width:", parseInt(containerTotalWidth), "Title + date + links:", parseInt(titleTotalWidth + dateTotalWidth + linksTotalWidth));

            // Check if container is too narrow to fit all elements side by side
            // If so, move the date below the title
            if (parseInt(containerTotalWidth) < parseInt(titleTotalWidth + dateTotalWidth + linksTotalWidth)) {
                console.log(getComputedStyle(title).top);
                console.log(getComputedStyle(date).top);
                console.log(getComputedStyle(links).top);
                // Move date below title if container is too narrow
                ensureOrder(title, 1, 1, 3);
                ensureOrder(date, 2, 1, 3);
                ensureOrder(links, 3, 1, 3);

                // setMargin(links, "mt-03", "mt-0");

                if (linksExist) {
                    setMargin(links.children[0], "ms-0", "ms-05px");
                }
            }
            // If not, reset the order of the elements
            else {
                // Move date back to the right side of the title
                resetTopContentOrder(title, links, date);

                // setMargin(links, "mt-0", "mt-03");

                if (linksExist) {
                    setMargin(links.children[0], "ms-05px", "ms-0");
                }
            }
            console.log(title.innerHTML, "Total width:", parseInt(containerTotalWidth), "Title + date:", parseInt(titleTotalWidth + dateTotalWidth));

            // Check if container is too narrow to fit date and header side by side
            // If so, move the date below the title and adjust margin and alignment
            if (parseInt(containerTotalWidth) < parseInt(titleTotalWidth + dateTotalWidth)) {
                // Move date below title if container is too narrow
                setFlex(container, "col", "row");
                setAlignItems(container, "start", "center");
                setMargin(date, "ms-0", "ms-auto");
            }
            // If not, move the date back to the right side of the title
            else {
                setFlex(container, "row", "col");
                setAlignItems(container, "center", "start");
                setMargin(date, "ms-auto", "ms-0");
            }
        }
    }
}

// Run on page load and window resize
window.addEventListener("load", reorderElements);
window.addEventListener("resize", reorderElements);

// Run the function on page load and on window resize
window.addEventListener("load", moveLanguagesSection);
window.addEventListener("resize", moveLanguagesSection);
