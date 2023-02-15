import { Point } from "./Point";

export const mapScanner = (map: string[]) => {
    const res: Point[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const newPoint = new Point(x, y, map[y][x]);
            res.push(newPoint);
        }
    }

    return res;
};
