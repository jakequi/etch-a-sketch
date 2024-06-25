function createGrid(num) {
    const container = document.querySelector(".container");
    container.textContent = "";
    for (let i = 0; i < num ** 2; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "sketch-grid");
        newDiv.style.flexBasis = `${100 / num}%`;
        newDiv.dataset.hoverCount = 0;  // Initialize hover count
        container.appendChild(newDiv);
    }
    const sketchDivs = document.querySelectorAll(".sketch-grid");
    sketchDivs.forEach(sketchDiv => {
        sketchDiv.addEventListener("mouseenter", () => {
            let hoverCount = Number(sketchDiv.dataset.hoverCount);
            if (!sketchDiv.style.backgroundColor) {
                sketchDiv.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            } 
        });
    });
}

const newGridButton = document.querySelector("button");
newGridButton.addEventListener("click", () => {
    let newNum = prompt("Please enter the number of squares you want along each axis");
    while (!Number.isInteger(Number(newNum)) || newNum > 100 || newNum < 1) {
        newNum = prompt("Please enter a number between 1 and 100");
    }
    createGrid(newNum);
});

createGrid(16);
