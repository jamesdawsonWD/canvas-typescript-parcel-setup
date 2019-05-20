import { Vector } from "../helpers/vector";
import { HSLA } from "../helpers";

export class Circle {
  constructor(
    private position: Vector,
    private radius: number,
    private color: HSLA | string,
    private stroke: number,
    private strokeColor: HSLA | string
  ) {}
  get getOriginalColor(): HSLA | string {
    return this.color;
  }
  get getOrigin(): Vector {
      return this.position;
  }
  get getRadius(): number {
    return this.radius;
  }
  get getStroke(): number {
    return this.stroke;
  }

  get getStrokeColor(): HSLA| string {
    return this.strokeColor;
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
