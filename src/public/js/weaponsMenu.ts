import { Vector } from "../models/";

export class WeaponsMenu {
    private weapons: string[];
    private radius: number;
    private position: Vector;
    private c: any;
    constructor(position: Vector, radius: number, weapons: string[], c: any) {
        this.weapons = weapons;
        this.radius = radius;
        this.position = position;
        this.c = c;
    }
    get getPosition() {
        return this.position;
    }
    get getRadius() {
        return this.radius;
    }
    get getWeapons() {
        return this.weapons;
    }
    public draw() {
        this.c.beginPath()
        this.c.arc(this.position.x + 300, this.position.y, this.radius, 0, Math.PI * 2, false)
        this.c.fillStyle = '#000';
        this.c.fill()
        this.c.closePath()
    }
    public update() {
        this.draw();
    }
}