import { Vector, ToVector, distanceToAndAngle } from './vector';

export class Ball {
  constructor
  (
    private origin: Vector,
    private destination: Vector,
    private radius: number,
    private color: string,
    private ctx: CanvasRenderingContext2D
  ) {}
  
  get getOrigin() {
    return this.origin;
  }
  get getDestination() {
    return this.destination;
  }
  get getRadius() {
    return this.radius;
  }
  get getColor() {
    return this.color;
  }
  public setOrigin(v: Vector) {
    this.origin = v;
  }
  public setDestination(v: Vector) {
    this.destination = v;
  }
  public draw(milliseconds: number) {
    const data = distanceToAndAngle(this.origin, this.destination);
    const velocity = data.distance / 0.5;
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
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
  public update(elapsed: number) {
    this.draw(elapsed);
  }

}
