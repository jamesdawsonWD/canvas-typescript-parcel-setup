import { HSLA } from '../helpers';
import { Ball } from "./ball";

import { Vector, ToVector, distanceToAndAngle } from '../vector';
export class Star extends Ball{
  private tempColor: string;
  constructor
  (
    private origin: Vector,
    private velocity: number,
    private destination: Vector,
    private size: number,
    private originalColor: HSLA,
    private ctx: CanvasRenderingContext2D,
  ) {
    super(origin, size, originalColor);
    this.tempColor = this.originalColor.toString();
  }

  get getDestination() {
    return this.destination;
  }

  get getTempColor(): string {
    return this.tempColor;
  }
  public setTempColor(color: string) {
    this.tempColor = color;
  }

  public setDestination(v: Vector) {
    this.destination = v;
  }

  public draw(milliseconds: number) {
    const data = distanceToAndAngle(this.origin, this.destination);
    const velocity = data.distance / this.velocity;
    const toMouseVector = new ToVector(velocity, data.angle);
    const elapsedSeconds = milliseconds / 1000;

    this.origin.x += toMouseVector.magnitudeX * elapsedSeconds;
    this.origin.y += toMouseVector.magnitudeY * elapsedSeconds;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.origin.x, this.origin.y);
    this.ctx.arc(
      0,
      0,
      this.size,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = this.tempColor;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
  public update(elapsed: number) {
    this.draw(elapsed);
  }

}
