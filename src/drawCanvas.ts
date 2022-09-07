import { Point } from './types';

const RETINA_RATIO = 2;

export const setUp = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth * RETINA_RATIO;
  canvas.height = 450 * RETINA_RATIO;
  // Set the "drawn" size of the canvas
  // canvas.style.width = window.innerWidth + 'px';
  // canvas.style.height = 300 + 'px';

  return canvas;
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius * RETINA_RATIO, 0, Math.PI * 2, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
) => {
  ctx.fillStyle = 'blue';
  ctx.font = `${16 * RETINA_RATIO}px Arial`;
  ctx.fillText(text, x, y);
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  isBold?: boolean | null,
) => {
  const { x0, x1, x2, x3, y0, y1, y2, y3 } = point;
  // パスをリセット
  ctx.beginPath();

  // 線を引くスタート地点に移動
  ctx.moveTo(x0, y0);

  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);

  // 線の色
  ctx.strokeStyle = 'red';

  // 線の太さ
  ctx.lineWidth = isBold ? 8 * RETINA_RATIO : 1 * RETINA_RATIO;

  // 線を描画する
  ctx.stroke();
};

/*
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 1
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005

function draw()
{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
  ctx.translate( window.innerWidth / 2, window.innerHeight / 2 )
  ctx.scale(cameraZoom, cameraZoom)
  ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
  ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
  ctx.fillStyle = "#991111"
  drawRect(-50,-50,100,100)

  ctx.fillStyle = "#eecc77"
  drawRect(-35,-35,20,20)
  drawRect(15,-35,20,20)
  drawRect(-35,15,70,20)

  ctx.fillStyle = "#fff"
  drawText("Simple Pan and Zoom Canvas", -255, -100, 32, "courier")

  ctx.rotate(-31*Math.PI / 180)
  ctx.fillStyle = `#${(Math.round(Date.now()/40)%4096).toString(16)}`
  drawText("Now with touch!", -110, 100, 32, "courier")

  ctx.fillStyle = "#fff"
  ctx.rotate(31*Math.PI / 180)

  drawText("Wow, you found me!", -260, -2000, 48, "courier")

  requestAnimationFrame( draw )
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e)
{
  if (e.touches && e.touches.length == 1)
  {
    return { x:e.touches[0].clientX, y: e.touches[0].clientY }
  }
  else if (e.clientX && e.clientY)
  {
    return { x: e.clientX, y: e.clientY }
  }
}

function drawRect(x, y, width, height)
{
  ctx.fillRect( x, y, width, height )
}

function drawText(text, x, y, size, font)
{
  ctx.font = `${size}px ${font}`
  ctx.fillText(text, x, y)
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
  isDragging = true
  dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
  dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e)
{
  isDragging = false
  initialPinchDistance = null
  lastZoom = cameraZoom
}

function onPointerMove(e)
{
  if (isDragging)
  {
    cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
    cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
  }
}

function handleTouch(e, singleTouchHandler)
{
  if ( e.touches.length == 1 )
  {
    singleTouchHandler(e)
  }
  else if (e.type == "touchmove" && e.touches.length == 2)
  {
    isDragging = false
    handlePinch(e)
  }
}

let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
  e.preventDefault()

  let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

  // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
  let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2

  if (initialPinchDistance == null)
  {
    initialPinchDistance = currentDistance
  }
  else
  {
    adjustZoom( null, currentDistance/initialPinchDistance )
  }
}

function adjustZoom(zoomAmount, zoomFactor)
{
  if (!isDragging)
  {
    if (zoomAmount)
    {
      cameraZoom += zoomAmount
    }
    else if (zoomFactor)
    {
      console.log(zoomFactor)
      cameraZoom = zoomFactor*lastZoom
    }

    cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
    cameraZoom = Math.max( cameraZoom, MIN_ZOOM )

    console.log(zoomAmount)
  }
}

canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

// Ready, set, go
draw()
*/
