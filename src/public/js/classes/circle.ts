import { Vector } from "../helpers/vector";
import { HSLA } from "../helpers";

export class Circle {
  constructor(
    private position: Vector,
    private radius: number,
    private color: HSLA,
    private stroke: number
  ) {}
  get getOriginalColor(): HSLA {
    return this.color;
  }
  get getOrigin(): Vector {
      return this.position;
  }
  get getRadius() {
    return this.radius;
  }
  public setColor(color: HSLA) {
      this.color = color;
  }
  public setOrigin(v: Vector) {
    this.position = v;
  }
  public setRadius(r: number) {
    this.radius = r;
  }
}
