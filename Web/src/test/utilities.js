
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;

export const tryResNetButtonName = "tryResNetButton";
export const tryResNetButtonText = "[New] Try ResNet50";
const tryResNetButtonTextCss = "width:100%;text-decoration:underline;";
const tryResNetButtonBackgroundCss = "background:#e61d5f;";

// function isAndroid() {
//   return /Android/i.test(navigator.userAgent);
// }

// function isiOS() {
//   return /iPhone|iPad|iPod/i.test(navigator.userAgent);
// }

// export function isMobile() {
//   return isAndroid() || isiOS();
// }

// function setDatGuiPropertyCss(propertyText, liCssString, spanCssString = "") {
//   var spans = document.getElementsByClassName("property-name");
//   for (var i = 0; i < spans.length; i++) {
//     var text = spans[i].textContent || spans[i].innerText;
//     if (text == propertyText) {
//       spans[i].parentNode.parentNode.style = liCssString;
//       if (spanCssString !== "") {
//         spans[i].style = spanCssString;
//       }
//     }
//   }
// }

// export function updateTryResNetButtonDatGuiCss() {
//   setDatGuiPropertyCss(
//     tryResNetButtonText,
//     tryResNetButtonBackgroundCss,
//     tryResNetButtonTextCss
//   );
// }

// /**
//  * Toggles between the loading UI and the main canvas UI.
//  */
// export function toggleLoadingUI(
//   showLoadingUI,
//   loadingDivId = "loading",
//   mainDivId = "main"
// ) {
//   if (showLoadingUI) {
//     document.getElementById(loadingDivId).style.display = "block";
//     document.getElementById(mainDivId).style.display = "none";
//   } else {
//     document.getElementById(loadingDivId).style.display = "none";
//     document.getElementById(mainDivId).style.display = "block";
//   }
// }

function toTuple({ y, x }) {
  return [y, x];
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

export const drawRect = (detections, ctx) =>{
  // Loop through each prediction
  detections.forEach(prediction => {

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox']; 
    const text = prediction['class']; 

    // Set styling
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
  });
}