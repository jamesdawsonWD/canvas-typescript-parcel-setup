export const randomIntFromRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomColorFromArray = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)];


export class HSLA {
    constructor(private h: number , private s: number, private l: number, private a: number) {}
    public toString(){
        return 'hsla(' + this.h + ',' + (this.s) + '%,' + (this.l) + '%,' + this.a + ')';
    }
}


