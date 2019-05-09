import { Vector, add } from "./vector";
import { WeaponsMenu } from "./weaponsMenu";
import { Ball } from "./ball";

export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector
  private balls: Ball[];
  private menu = false;

  private Configs = {
    steps: 3,
    numOfParticles: 20,
    lastStep: 0,
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
      const position = new Vector(event.clientX, event.clientY);
      const destination = add(position, new Vector(500, 500));
      this.balls.push(new Ball(position, destination, 50, "#FF7F66", this.ctx));
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
    window.requestAnimationFrame(this.animate.bind(this));
  }
  public animate(milliseconds: any) {
    const elapsed = milliseconds - this.Configs.lastStep;
    this.Configs.lastStep = milliseconds;
    if (this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.fill();
    for (let ball of this.balls) {
      ball.update(elapsed);
    }
    if (this.menu) {
      const menu = new WeaponsMenu(this.mouse, 200, [], this.ctx);
      menu.update();
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
