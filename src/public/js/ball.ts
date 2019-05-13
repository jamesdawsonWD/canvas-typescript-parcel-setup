import { HSLA } from './helpers';
import { Vector, ToVector, distanceToAndAngle } from './vector';
export class Ball {
  private tempColor: string;
  constructor
  (
    private origin: Vector,
    private velocity: number,
    private destination: Vector,
    private radius: number,
    private originalColor: HSLA,
    private ctx: CanvasRenderingContext2D
  ) {
    this.tempColor = this.originalColor.toString();
  }
  
  get getOrigin() {
    return this.origin;
  }
  get getDestination() {
    return this.destination;
  }
  get getRadius() {
    return this.radius;
  }
  get getOriginalColor(): HSLA {
    return this.originalColor;
  }
  get getTempColor(): string {
    return this.tempColor;
  }
  public setTempColor(color: string) {
    this.tempColor = color;
  }
  public setOrigin(v: Vector) {
    this.origin = v;
  }
  public setDestination(v: Vector) {
    this.destination = v;
  }
  public setRadius(r: number) {
    this.radius = r;
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
      this.radius,
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
