import { Vector, add } from "@helpers/vector";

import {
  randomItemFromArray,
  randomIntFromRange,
  HSLA
} from "@helpers/index.ts";
export class StyledMenu {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector;

  private menu = false;

  private Configs = {
    steps: 3,
    numOfParticles: 2000,
    lastStep: 0,
    colors: [
      new HSLA(164, 23, 45, 1), 
      new HSLA(50, 78, 76, 1),  
      new HSLA(28, 83, 70, 1),
      new HSLA(5, 63, 60, 1),
      new HSLA(0, 33, 41, 1), 
    ]
  };
  constructor(private canvas: HTMLCanvasElement) {
    window.requestAnimationFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.mouse = new Vector(innerWidth / 2, innerHeight / 2);

    // Event Listeners
    addEventListener("mousemove", event => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });

    addEventListener("click", event => {
      const position = new Vector(event.clientX, event.clientY);
    });

    addEventListener("resize", () => {
      if (this.canvas) {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
      }
    });
    this.init();
  }
  public init() {
    window.requestAnimationFrame(this.animate.bind(this));
  }
  public animate(milliseconds: any) {
    const elapsed = milliseconds - this.Configs.lastStep;
    this.Configs.lastStep = milliseconds;
    if (this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.fill();
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
