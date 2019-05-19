import { Vector, add } from "./vector";
import { WeaponsMenu } from "./weaponsMenu";
import { Star } from "./star";
import { Pulse } from "./pulse";
import {
  randomItemFromArray,
  randomIntFromRange,
  HSLA
} from "../helpers";
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector;
  private balls: Star[];
  private pulses: Pulse[]
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

    this.balls = [];
    this.pulses = [];

    let j = 0;
    for (let i = 0; i < this.Configs.numOfParticles; i++) {
      const origins = [
        new Vector(
          randomIntFromRange(0-this.canvas.width, 0-100),
          randomIntFromRange(0-300, this.canvas.height+300)
        ),
        new Vector(
          randomIntFromRange(this.canvas.width+100, this.canvas.width+ this.canvas.width),
          randomIntFromRange(0-300, this.canvas.height+300)
        ),
        new Vector(
          randomIntFromRange(0-300, this.canvas.width+300),
          randomIntFromRange(0-this.canvas.height, this.canvas.height-100)
        ),
        new Vector(
          randomIntFromRange(0-300, this.canvas.width+300),
          randomIntFromRange(this.canvas.height + 100, this.canvas.height + this.canvas.height)
        )
      ];
      const dest = new Vector(
        randomIntFromRange(100, this.canvas.width - 100),
        randomIntFromRange(100, this.canvas.height - 100)
      );
      this.balls.push(
        new Star(
          origins[j],
          randomIntFromRange(1, 1.3),
          dest,
          randomIntFromRange(1, 3),
          randomItemFromArray(this.Configs.colors),
          this.ctx
        )
      );
      j = j < 4 ? j++ : 0;
    }

    // Event Listeners
    addEventListener("mousemove", event => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      for (let ball of this.balls) {
        if (ball.getDestination.distanceTo(this.mouse) < 200) {

          const color = ball.getOriginalColor as HSLA;
          const dest = new Vector(
            randomIntFromRange(100, this.canvas.width - 100),
            randomIntFromRange(100, this.canvas.height - 100),
          );
          ball.setDestination(dest);
          color.increaseLight(1);
        }
      }
    });
    addEventListener("auxclick", event => {
      event.preventDefault();
      this.menu = !this.menu;
    });
    addEventListener("click", event => {
      const position = new Vector(event.clientX, event.clientY);
      const color = randomItemFromArray(this.Configs.colors);

      this.pulses.push(
        new Pulse(
          position,
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
    for (let pulse of this.pulses) {
      pulse.update(elapsed);
    }
    for (let ball of this.balls) {
      
      const center = new Vector(this.canvas.width/2, this.canvas.height/2);
      const distance = ball.getOrigin.distanceTo(center) > 300 ? 10 : ball.getOrigin.distanceTo(center);
      ball.setRadius(5 * distance/100);
      
      ball.update(elapsed);
    }
    if (this.menu) {
      const menu = new WeaponsMenu(this.mouse, 200, [], this.ctx);
      menu.update();
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
