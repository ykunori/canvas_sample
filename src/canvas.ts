import { drawCircle, drawLine, drawText, setUp } from './drawCanvas';
import { items } from './mock';
import { ItemsWithPosition, ItemWithPosition } from './types';

const SCROLL_SENSITIVITY = 0.0005;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;

export const drawCanvas = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('test');
  if (!canvas) {
    return;
  }

  setUp(canvas);

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  // for ratina
  // ctx.scale(2, 2);

  const horizontalItemLength = items.length;

  const b: any = [];
  const minMax: {
    [parentId: number]: {
      min: number;
      max: number;
    };
  } = {};

  // console.log(a);
  [...items].reverse().forEach((dimension, i) => {
    // console.log('dimension', i);
    const x =
      canvasWidth * ((horizontalItemLength - i) / (horizontalItemLength + 1));
    b[items.length - 1 - i] = [];
    const parentIds = dimension
      .map((item) => item.parent_id)
      .filter(
        (element, index, self) =>
          self.findIndex((e) => e === element) === index &&
          element !== undefined,
      ) as number[];

    // console.log('parentIds', parentIds);
    let count = 0;
    parentIds.forEach((id) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      minMax[id] = {};

      const filteredDimension = dimension.filter(
        (item) => item.parent_id === id,
      );

      filteredDimension.forEach((item, k) => {
        // console.log('filtered', id, k);
        let y;
        // 一番右側（末端）
        if (i === 0) {
          y = canvasHeight * ((count + 1) / (dimension.length + 1));
        } else {
          // console.log(item.parent_id, item.id, minMax);
          const max =
            item.id !== undefined && minMax[item.id].max
              ? minMax[item.id].max
              : canvasHeight;
          const min =
            item.id !== undefined && minMax[item.id].min
              ? minMax[item.id].min
              : 0;
          y = min + (max - min) / 2;
        }
        const radius = 40 - 5 * (items.length - 1 - i);
        b[items.length - 1 - i][count] = {
          ...item,
          x,
          y,
          radius,
        };
        count += 1;

        if (filteredDimension.length === 1) {
          minMax[id].min = y;
          minMax[id].max = y;
          // parent_idが同じ配列の連番が0 つまり一番はじめの要素
        } else if (k === 0) {
          minMax[id].min = y;
          // parent_idが同じ配列の連番が最後
        } else if (k === filteredDimension.length - 1) {
          minMax[id].max = y;
        }
        // console.log(i, k, b[i][k], id, minMax[id]);
      });
    });
  });

  // console.log(b);
  // console.log(minMax);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const itemsWithPosition: ItemsWithPosition = (
    b as ItemWithPosition[][]
  ).flatMap((dimension) => {
    return dimension.map((item) => item);
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    itemsWithPosition.forEach((item) => {
      const index = itemsWithPosition.findIndex((a) => a.id === item.parent_id);
      const parentItem = index < 0 ? null : itemsWithPosition[index];
      if (parentItem) {
        const diffX = item.x - parentItem.x;
        // const diffY = item.y - parentItem.y;
        const point = {
          x0: parentItem.x,
          y0: parentItem.y,
          x1: parentItem.x + diffX / 3,
          y1: parentItem.y,
          x2: parentItem.x + (diffX / 3) * 2,
          y2: item.y,
          x3: item.x,
          y3: item.y,
        };
        if (!item.name) {
          return;
        }
        drawLine(ctx, point, item.is_bold);
      }
    });

    itemsWithPosition.forEach((item) => {
      if (!item.name) {
        return;
      }
      drawCircle(ctx, item.x, item.y, item.radius);
      drawText(ctx, `${item.id}:${item.name}`, item.x, item.y);
    });
  };

  draw();

  // ctx.translate(100, 0);

  let isDragging = false;
  const dragStart = { x: 0, y: 0 };
  let cameraZoom = 1;
  const cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let initialPinchDistance = null;
  let lastZoom = cameraZoom;

  // Gets the relevant location from a mouse or single touch event
  const getEventLocation = (e: MouseEvent) => {
    // if (e.touches && e.touches.length == 1) {
    //   return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    // } else
    if (e.clientX && e.clientY) {
      return { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerDown = (e: MouseEvent) => {
    const location = getEventLocation(e);
    if (!e || !location) {
      return;
    }
    isDragging = true;
    dragStart.x = location.x / cameraZoom - cameraOffset.x;
    dragStart.y = location.y / cameraZoom - cameraOffset.y;
    console.log(isDragging, dragStart);
  };

  const onPointerUp = () => {
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
    console.log(isDragging, initialPinchDistance, lastZoom);

    hoge();
  };

  const hoge = () => {
    console.log(22);
    console.log(cameraOffset);
    // ctx.translate(
    //   -window.innerWidth / 2 + cameraOffset.x,
    //   -window.innerHeight / 2 + cameraOffset.y,
    // );
    draw();
    ctx.translate(100, 0);
  };

  const onPointerMove = (e: MouseEvent) => {
    const location = getEventLocation(e);

    if (isDragging && location) {
      cameraOffset.x = location.x / cameraZoom - dragStart.x;
      cameraOffset.y = location.y / cameraZoom - dragStart.y;
      // console.log(cameraOffset);
    }
  };

  const adjustZoom = (zoomAmount: number, zoomFactor?: number) => {
    if (!isDragging) {
      if (zoomAmount) {
        cameraZoom += zoomAmount;
      } else if (zoomFactor) {
        console.log(zoomFactor);
        cameraZoom = zoomFactor * lastZoom;
      }

      cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
      cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

      console.log(zoomAmount);
    }
  };

  canvas.addEventListener('mousedown', onPointerDown);
  canvas.addEventListener('mouseup', onPointerUp);
  canvas.addEventListener('mousemove', onPointerMove);
  // canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
  canvas.addEventListener('wheel', (e) => {
    adjustZoom(e.deltaY * SCROLL_SENSITIVITY);
  });
};
