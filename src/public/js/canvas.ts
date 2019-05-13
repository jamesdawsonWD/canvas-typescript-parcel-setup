import { Vector, add } from "./vector";
import { WeaponsMenu } from "./weaponsMenu";
import { Ball } from "./ball";
import {
  randomColorFromArray,
  randomIntFromRange,
} from "./helpers";
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector;
  private balls: Ball[];
  private menu = false;

  private Configs = {
    steps: 3,
    numOfParticles: 10000,
    lastStep: 0,
    colors: ["#75DCFF", "#FFFC77", "#90FF84", "#FF6060", "#8B80F9"]
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
    let j = 0;
    for (let i = 0; i < this.Configs.numOfParticles; i++) {
      const origins = [
        new Vector(
          randomIntFromRange(-200, this.canvas.width + 200),
          randomIntFromRange(0 - this.canvas.height, -200),
        ),
        new Vector(
          randomIntFromRange(-200, this.canvas.width + 200),
          randomIntFromRange(this.canvas.height, this.canvas.height + this.canvas.height),
        ),
        new Vector(
          randomIntFromRange(0 - this.canvas.width, -200),
          randomIntFromRange(0 -this.canvas.height, this.canvas.height + this.canvas.height),
        ),
        new Vector(
          randomIntFromRange(this.canvas.width, this.canvas.width + this.canvas.width),
          randomIntFromRange(0 - this.canvas.height, this.canvas.height + this.canvas.height),
        ),
      ];
      const dest = new Vector(
        randomIntFromRange(100, this.canvas.width - 100),
        randomIntFromRange(100, this.canvas.height - 100)
      );
      this.balls.push(
        new Ball(
          origins[j],
          randomIntFromRange(1, 1.3),
          dest,
          randomIntFromRange(1, 3),
          randomColorFromArray(this.Configs.colors),
          this.ctx
        )
      );
      j = j < 4 ? j++ : 0;
      console.log(j);
    }

    // Event Listeners
    addEventListener("mousemove", event => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      for (let ball of this.balls) {
        if (ball.getDestination.distanceTo(this.mouse) < 200) {
          const dest = new Vector(
            randomIntFromRange(100, this.canvas.width - 100),
            randomIntFromRange(100, this.canvas.height - 100),
          );
          ball.setDestination(dest);
        }
      }
    });
    addEventListener("auxclick", event => {
      event.preventDefault();
      this.menu = !this.menu;
    });
    addEventListener("click", event => {
      const position = new Vector(event.clientX, event.clientY);
      const color = randomColorFromArray(this.Configs.colors);

      this.balls.push(
        new Ball(
          new Vector(-200, -200),
          randomIntFromRange(1, 6),
          position,
          randomIntFromRange(1, 35),
          color,
          this.ctx
        )
      );
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
      if (
        Math.ceil(ball.getOrigin.x) + 1 > ball.getDestination.x &&
        Math.ceil(ball.getOrigin.y) + 1 > ball.getDestination.y
      ) {
        const dest = new Vector(
          randomIntFromRange(100, this.canvas.width - 100),
          randomIntFromRange(100, this.canvas.height - 100)
        );
        ball.setDestination(dest);
      }
      ball.update(elapsed);
    }
    if (this.menu) {
      const menu = new WeaponsMenu(this.mouse, 200, [], this.ctx);
      menu.update();
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
