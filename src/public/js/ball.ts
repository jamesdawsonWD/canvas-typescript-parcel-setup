import { Vector } from "../models/";

export class Ball {
  private color: string;
  private radius: number;
  private ctx: CanvasRenderingContext2D;
  private position: Vector;
  constructor(position: Vector, radius: number, color: string, ctx: CanvasRenderingContext2D) {
    this.color = color;
    this.radius = radius;
    this.position = position;
    this.ctx = ctx;
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
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  public update() {
    this.draw();
  }
}
