let colourSelect;
let sketchDivs;
let buttonState = "draw";
let mouseDown = true;
const drawButton = document.querySelector(".draw-button");
const eraseButton = document.querySelector(".erase-button");
// const fillButton = document.querySelector(".fill-button")
const colourPicker = document.querySelector(".colour-picker");
const clearGrid = document.querySelector(".clear-grid");
const gridSize = document.querySelector(".grid-size");
const holdClickMode = document.querySelector(".hold-click-mode")
const rainbowColours = document.querySelector(".rainbow-mode")
const gridVisible = document.querySelector(".grid-visible")

function createGrid(num) {
    const container = document.querySelector(".container");
    container.textContent = "";
    for (let i = 0; i < num ** 2; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "sketch-grid");
        newDiv.style.flexBasis = `${100 / num}%`;
        container.appendChild(newDiv);
        colourSelect = "black";
    }
    sketchDivs = document.querySelectorAll(".sketch-grid");
    sketchDivs.forEach(sketchDiv => {
        sketchDiv.addEventListener("mouseenter", () => {
                // sketchDivs.forEach(sketchDiv => {
                //     sketchDiv.addEventListener("click", () => {
                //         sketchDivs.forEach(sketchDiv => {  
                //             if(buttonState === "fill") {
                //                 sketchDiv.style.backgroundColor = colourSelect;
                //             } 
                //         });
                //     });
                // });
            if(mouseDown) {
                if (buttonState === "erase") {
                    sketchDiv.style.backgroundColor = "";
                }
                else {
                    if (rainbowColours.checked) {
                        sketchDiv.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    }
                    else{
                        sketchDiv.style.backgroundColor = colourSelect;
                    }
                } 
            }
        });
    });
    gridVisible.checked = true;
}

createGrid(32);

drawButton.addEventListener("click", () => {
    drawButton.classList.add("toggled-button");
    eraseButton.classList.remove("toggled-button")
    fillButton.classList.remove("toggled-button")
    buttonState = "draw";
});

eraseButton.addEventListener("click", () => {
    drawButton.classList.remove("toggled-button");
    eraseButton.classList.add("toggled-button")
    fillButton.classList.remove("toggled-button")
    buttonState = "erase";
});

// fillButton.addEventListener("click", () => {
//     drawButton.classList.remove("toggled-button");
//     eraseButton.classList.remove("toggled-button")
//     fillButton.classList.add("toggled-button");
//     buttonState = "fill";
// });

colourPicker.addEventListener("change", () => {
    if (!rainbowColours.checked) {
        colourSelect = colourPicker.value;
    }
});

gridSize.addEventListener("click", () => {
    let newNum = prompt("Please enter the number of squares you want along each axis");
    while (!Number.isInteger(Number(newNum)) || newNum > 100 || newNum < 1) {
        newNum = prompt("Please enter a number between 1 and 100");
    }
    createGrid(newNum);
});

clearGrid.addEventListener("click", () => {
    const sketchDivs = document.querySelectorAll(".sketch-grid");
    sketchDivs.forEach(sketchDiv => {
        sketchDiv.style.backgroundColor = "";
    });
});

rainbowColours.addEventListener("change", () => {
    if (!rainbowColours.checked) {
        colourSelect = colourPicker.value;
    }
});

gridVisible.addEventListener("change", () => {
    sketchDivs.forEach(sketchDiv => {
        sketchDiv.classList.toggle("sketch-grid-no-border");
    });
});

holdClickMode.addEventListener("change", () => {
    mouseDown = !holdClickMode.checked;
});

document.addEventListener("mousedown", () => {
    if (holdClickMode.checked) {
        mouseDown = true;
    }
});

document.addEventListener("mouseup", () => {
    if (holdClickMode.checked) {
        mouseDown = false;
    }
});