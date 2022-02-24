import "./style.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setDimensions();

// window.addEventListener("resize", setDimensions);

function setDimensions() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const HEIGHT = 5;
const WIDTH = 5;
let NUM_ANTS = 666;

function drawNewLines() {
  for (const ant of Array(NUM_ANTS).fill(0)) {
    const { x, y } = getRandomPoint();
    const { cX, cY } = getCenter();

    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function getRandomPoint() {
  const x = Math.floor(Math.random() * CANVAS_WIDTH);
  const y = Math.floor(Math.random() * CANVAS_HEIGHT);
  return { x, y };
}

function drawCenter() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 10, 10);
}

function getCenter() {
  return {
    cX: CANVAS_WIDTH / 2,
    cY: CANVAS_HEIGHT / 2,
  };
}

let start, previousTime;

function Update(timestamp) {
  if (!start) {
    start = timestamp;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const delta = start - previousTime;

  NUM_ANTS = Math.floor(Math.random() * 100);

  if (previousTime !== timestamp) {
    NUM_ANTS = Math.floor(Math.random() * 100) + 50;
    drawNewLines();
  }

  previousTime = timestamp;

  window.setTimeout(() => {
    window.requestAnimationFrame(Update);
  }, 500);
}

window.requestAnimationFrame(Update);
