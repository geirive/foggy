const foggy = document.querySelector(".foggy");
const whiteSheet = document.querySelector(".whiteSheet");

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("touchmove", handleTouchMove);
window.addEventListener("wheel", handleMouseWheel);

document.addEventListener("DOMContentLoaded", () => {
  const jokeDiv = document.getElementById("joke");

  function fetchJoke() {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Joke:", data.joke);
        jokeDiv.innerHTML = `<a href="#" id="jokeLink">${data.joke}</a>`;
        setPosition(jokeDiv);

        // Add event listener to the link to fetch a new joke on click
        document
          .getElementById("jokeLink")
          .addEventListener("click", (event) => {
            event.preventDefault();
            fetchJoke();
          });
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
        jokeDiv.innerHTML =
          "Arrr, me hearties! I be sorry, but I can't tell a joke. Avast ye and try again!";
      });
  }

  function setPosition(element) {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate random positions ensuring the element stays within the viewport
    const maxX = viewportWidth - elementWidth;
    const maxY = viewportHeight - elementHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Set the position of the element
    element.style.position = "absolute";
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
  }

  // Initial fetch, position, and animation
  fetchJoke();
  initialAnimation();
});

let innerRadiusPercentage = 5;  // Start with a smaller inner radius
let outerRadiusPercentage = 10; // Start with a smaller outer radius

function handleMouseMove(e) {
  const { clientX: x, clientY: y } = e;
  circularFogHole(x, y);
}

function handleTouchMove(e) {
  const { clientX: x, clientY: y } = e.touches[0];
  circularFogHole(x, y);
}

function handleMouseWheel(e) {
  const delta = Math.sign(e.deltaY);
  const scaleFactor = delta > 0 ? -5 : 5;
  updateRadiusPercentage(scaleFactor);
  circularFogHole(e.clientX, e.clientY);
}

function handleTouchMove(e) {
  const { clientX: x, clientY: y } = e.touches[0];
  const { clientX: x2, clientY: y2 } = e.touches[1];
  const distance = Math.hypot(x - x2, y - y2);
  const previousDistance = Math.hypot(
    e.touches[0].clientX - e.touches[1].clientX,
    e.touches[0].clientY - e.touches[1].clientY
  );
  const delta = distance - previousDistance;
  const scaleFactor = delta > 0 ? 5 : -5;
  updateRadiusPercentage(scaleFactor);
  circularFogHole((x + x2) / 2, (y + y2) / 2);
}

function updateRadiusPercentage(scaleFactor) {
  const diff = outerRadiusPercentage - innerRadiusPercentage;
  innerRadiusPercentage += scaleFactor;
  outerRadiusPercentage += scaleFactor;

  // Ensure percentages stay within bounds
  lowerBound = 0;
  upperBound = 80 - diff;
  innerRadiusPercentage = Math.max(
    lowerBound,
    Math.min(innerRadiusPercentage, upperBound)
  );
  outerRadiusPercentage = Math.max(
    lowerBound + diff,
    Math.min(outerRadiusPercentage, upperBound + diff)
  );
}

function circularFogHole(x, y) {
  whiteSheet.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent ${innerRadiusPercentage}vh, whitesmoke ${outerRadiusPercentage}vh`;
}

function initialAnimation() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const INNER_RADIUS_INCREMENT = 0.5;
  const OUTER_RADIUS_INCREMENT = 0.75;
  const MAX_OUTER_RADIUS = 35;
  const ANIMATION_INTERVAL = 13; // milliseconds

  const animationInterval = setInterval(() => {
    innerRadiusPercentage += INNER_RADIUS_INCREMENT;
    outerRadiusPercentage += OUTER_RADIUS_INCREMENT;
    
    circularFogHole(centerX, centerY);
    
    if (outerRadiusPercentage >= MAX_OUTER_RADIUS) {
      clearInterval(animationInterval);
    }
  }, ANIMATION_INTERVAL);
}