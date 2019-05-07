import { Vector } from "../models";
import { WeaponsMenu } from "./weaponsMenu";
import { Ball } from "./ball";

export class Canvas {
  private c: any;
  private mouse: Vector = { x: 0, y: 0 };
  private balls: Ball[];

  private canvas: any;
  private menu = false;
  constructor(canvas: any) {
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
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    if (this.canvas) {
      // grabs 2d context
      this.c = this.canvas.getContext("2d");
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    }
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
      this.balls.push(new Ball(position, 50, "#FF7F66", this.c));
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
    this.animate();
  }

  public animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    if (this.canvas) {
      this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.c.fill();
    for(let ball of this.balls) {
      ball.update();
    } 
    if (this.menu) {
      const menu = new WeaponsMenu(this.mouse, 200, [], this.c);
      menu.update();
    }
  }
}
