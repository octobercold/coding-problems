interface Border {
    x: { min: number; max: number };
    y: { min: number; max: number };
}

export class Point {
    constructor(public x: number, public y: number, public val?: string) {}

    sum(other: Point) {
        this.x += other.x;
        this.y += other.y;
    }
    move(wrap = false, border?: Border, logging = false) {
        const oldX = this.x;
        const oldY = this.y;

        const M = {
            "<": new Point(-1, 0),
            ">": new Point(1, 0),
            "^": new Point(0, -1),
            v: new Point(0, 1),
        };

        this.sum(M[this.val]);

        if (wrap) {
            if (!border)
                throw new Error("pass Border if you want point to wrap around");
            else {
                if (this.x < border.x.min) {
                    this.x = border.x.max;
                } else if (this.x > border.x.max) {
                    this.x = border.x.min;
                } else if (this.y < border.y.min) {
                    this.y = border.y.max;
                } else if (this.y > border.y.max) {
                    this.y = border.y.min;
                }
            }
        }
        if (logging && (this.x !== oldX || this.y !== oldY))
            console.log(`${oldX},${oldY} ==> ${this.x},${this.y}`);
    }
    key() {
        return `${this.x},${this.y}`;
    }
}
