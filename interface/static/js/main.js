function toggleConfigurationPanel() {
  const wrapper = document.getElementById("wrapper");
  const configurationPanel = document.getElementById("configurationPanel");
  const controlPanel = document.getElementById("controlPanel");

  if (wrapper.style.transform === "translateX(-100vw)") {
    wrapper.style.transform = "translateX(0)";
    configurationPanel.style.opacity = "1";
    controlPanel.style.opacity = "0";
  } else {
    wrapper.style.transform = "translateX(-100vw)";
    configurationPanel.style.opacity = "0";
    controlPanel.style.opacity = "1";
  }
}

function checkServerAndMeasureLatency() {
    setInterval(() => {
      const startTime = Date.now();
    
      fetch('/ping')
          .then(response => {
              if (response.ok) {
                  const latency = Date.now() - startTime;
                  document.getElementById('latency-display').textContent = `${latency} ms`;
              } 
          })
          .catch(error => {
              console.error('Error checking server:', error);
          });
  }, 5000);
}

checkServerAndMeasureLatency();

function updateControlMode() {
  const isJoystick = document.getElementById("controlModeSwitch").checked;
  const analogControl = document.getElementById("analogControl");
  const joystickControl = document.getElementById("joystickControl");

  if (isJoystick) {
    analogControl.classList.add("d-none");
    analogControl.classList.remove("d-flex");
    joystickControl.classList.remove("d-none");
    joystickControl.classList.add("d-flex");
  } else {
    analogControl.classList.remove("d-none");
    analogControl.classList.add("d-flex");
    joystickControl.classList.add("d-none");
    joystickControl.classList.remove("d-flex");
  }
}

const joystick = document.getElementById("joystick");
const joystickContainer = document.getElementById("joystickControl");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

joystick.addEventListener("mousedown", dragStart, false);
joystick.addEventListener("touchstart", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("touchend", dragEnd, false);
document.addEventListener("mousemove", drag, false);
document.addEventListener("touchmove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
  if (e.target === joystick) {
    active = true;
  }
}

function dragEnd(e) {
  xOffset = 0;
  yOffset = 0;
  initialX = 0;
  initialY = 0;
  active = false;
  setTranslate(0, 0, joystick);
}

function drag(e) {
  if (active) {
    e.preventDefault();
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }
    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, joystick);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

const video = document.getElementById('cameraFeed');

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}