import { Vector } from "../models/";

export class Ball {
  private color: string;
  private radius: number;
  private position: Vector;
  private c: any;
  constructor(position: Vector, radius: number, color: string, c: any) {
    this.color = color;
    this.radius = radius;
    this.position = position;
    this.c = c;
  }
  get getPosition() {
    return this.position;
  }
  public setPosition(v: Vector) {
    this.position = v;
  }
  get getRadius() {
    return this.radius;
  }
  get getColor() {
    return this.color;
  }
  public draw() {
    this.c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
  }
  public update() {
    this.draw();
  }
}
