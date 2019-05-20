import { Vector, add } from "../../helpers/vector";

import { randomItemFromArray, randomIntFromRange, HSLA } from "../../helpers/";
import { Circle } from "../../classes/circle";
export class StyledMenu {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector;
  private rings: Ring[];
  private center = new Vector(0, 0);
  private Configs = {
    steps: 3,
    numOfRings: 4,
    lastStep: 0,
    colors: [
      new HSLA(164, 23, 45, 1),
      new HSLA(50, 78, 76, 1),
      new HSLA(28, 83, 70, 1),
      new HSLA(5, 63, 60, 1),
      new HSLA(0, 33, 41, 1)
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

    this.center.set(this.canvas.width / 2, this.canvas.height / 2);

    this.rings = [];

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.mouse = new Vector(innerWidth / 2, innerHeight / 2);

    for (let i = 0; i < this.Configs.numOfRings; i++) {
      this.rings.push(new Circle(this.center, randomIntFromRange(20,300), 'white', 40, ''));
    }
    // Event Listeners
    addEventListener("mousemove", event => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.rings[this.rings.length - 1].setOrigin(this.mouse);
    });

    addEventListener("click", event => {
      const position = new Vector(event.clientX, event.clientY);
      this.rings.push((new Circle(this.center, randomIntFromRange(20,300), 'white', 40, '')));
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
    this.update(elapsed);
    this.ctx.fill();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  public draw(milliseconds: number) {
    const colors = ["#270f36", "#632b6c", "#c76b98", "#f09f9c", "#fcc3a3"];

    this.ctx.save();
    for (let ring of this.rings) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
      this.ctx.strokeStyle = randomItemFromArray(colors);
      this.ctx.arc(ring.getOrigin.x, ring.getOrigin.y, ring.getRadius, 0, Math.PI * 2, false);
      this.ctx.lineWidth = 10;
      this.ctx.fill();
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
  public update(elapsed: number) {
    this.draw(elapsed);
  }
}
