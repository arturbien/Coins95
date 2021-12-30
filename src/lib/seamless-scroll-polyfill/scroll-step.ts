export interface IScrollConfig {
  readonly duration?: number;
  readonly timingFunc?: (k: number) => number;
}

export interface IContext extends IScrollConfig {
  readonly timeStamp: number;
  readonly startX: number;
  readonly startY: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly method: (x: number, y: number) => void;
  rafId: number;
}

const ease = (k: number) => {
  return 0.5 * (1 - Math.cos(Math.PI * k));
};

export const now = (): number =>
  window.performance?.now?.() ?? window.Date.now();

const DURATION = 500;

export const step = (context: IContext) => {
  const currentTime = now();

  const elapsed =
    (currentTime - context.timeStamp) / (context.duration || DURATION);
  if (elapsed > 1) {
    context.method(context.targetX, context.targetY);
    return true;
  }
  const value = (context.timingFunc || ease)(elapsed);

  const currentX = context.startX + (context.targetX - context.startX) * value;
  const currentY = context.startY + (context.targetY - context.startY) * value;

  context.method(currentX, currentY);

  return new Promise((resolve, reject) => {
    context.rafId = window.requestAnimationFrame(() => {
      resolve(step(context));
    });
  });
};
