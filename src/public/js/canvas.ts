import { Vector } from "../models";
import { WeaponsMenu } from "./weaponsMenu";
import { Ball } from "./ball";

export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector = { x: 0, y: 0 };
  private balls: Ball[];

  private canvas: HTMLCanvasElement;
  private menu = false;

  private Configs = {
    steps: 3,
    numOfParticles: 20,
    lastStep: 0,
};
  constructor(canvas: HTMLCanvasElement) {
    window.requestAnimationFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    this.canvas = canvas;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this.balls = [];
    // Event Listeners
    addEventListener("mousemove", event => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });
    addEventListener("auxclick", event => {
      event.preventDefault();
      this.menu = !this.menu;
    });
    addEventListener("click", event => {
      const position = { x: event.clientX, y: event.clientY };
      this.balls.push(new Ball(position, 50, "#FF7F66", this.ctx));
    });

    addEventListener("resize", () => {
      if (this.canvas) {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
      }
      this.init();
    });

    this.init();
  }
  public init() {
    this.animate(0);
    
  }
  public drawBalls() {
    // this.ctx.save();
    // this.ctx.beginPath();
    // this.ctx.translate(fireworks[i].origin.x, fireworks[i].origin.y);
    // this.ctx.arc(0, 0, fireworks[i].radius, 0, 2 * Math.PI);
    // this.ctx.fillStyle = fireworks[i].color;
    // this.ctx.fill();
    // this.ctx.restore();
  }
  public animate(milliseconds: any) {
    const elapsed = milliseconds - this.Configs.lastStep;
    this.Configs.lastStep = milliseconds;
    if (this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.fill();
    for (let ball of this.balls) {
      // ball.update();
    }
    if (this.menu) {
      const menu = new WeaponsMenu(this.mouse, 200, [], this.ctx);
      menu.update();
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
