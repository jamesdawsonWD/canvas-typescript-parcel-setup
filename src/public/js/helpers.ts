export const randomIntFromRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
export const randomColorFromArray = (colors: string[]): string => colors[Math.floor(Math.random() * colors.length)];
export const inverseNumber = (i: number, max: number): number => max - i

export class HSLA {
    constructor(private h: number , private s: number, private l: number, private a: number) {}
    public toString(){
        return 'hsla(' + this.h + ',' + (this.s) + '%,' + (this.l) + '%,' + this.a + ')';
    }
}


