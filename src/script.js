let foggy = document.querySelector(".foggy");
let white_sheet = document.querySelector(".white_sheet");

window.addEventListener("mousemove", function(e) {
    let x = e.clientX;
    let y = e.clientY;
    let radius = 100;
    // foggy.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`; // add invert(100%) after the circle function
    white_sheet.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 20%, whitesmoke 30.1%)`;
});
