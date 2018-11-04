import { Point } from './../general/point';

/*  Pedine cheat sheets
    0: Re
    1: Regina
    2: Alfiere
    3: Cavallo
    4: Torre
    5: Pedone
*/

export abstract class Pedina {
    public orig: Point;
    public name: number;
    public UID: number;

    constructor(p: Point, name: number, UID: number) {
        this.orig = p;
        this.name = name;
        this.UID = UID;
    }

    abstract mossa(dest: Point): boolean;

    getPosition(): Point {
        return this.orig;
    }

    calculateRouteTo(dest: Point): Array<Point> {
        const route = [],
              steps = Math.max( Math.abs(this.orig.x - dest.x), Math.abs(this.orig.y - dest.y) ),
              directionX = Math.sign(dest.x - this.orig.x),
              directionY = Math.sign(dest.y - this.orig.y);

        for (let i = 0; i < steps; i++) {
            route.push(
                [
                    this.orig.x + directionX * (i + 1),
                    this.orig.y + directionY * (i + 1)
                ]
            );
        }

        return route;
    }

    getData(): String {
        return 'UID: ' + this.UID + ' | Type: ' + this.name + ' | pos: ' + this.orig.x + ':' + this.orig.y;
    }
}

export class Re extends Pedina {
    constructor(orig: Point, UID: number) {
        super(orig, 0, UID);
    }

    calculateRouteTo(): Array<Point> {
        return [];
    }

    mossa(dest: Point): boolean {
        const deltaX = Math.abs(this.orig.x - dest.x),
              deltaY = Math.abs(this.orig.y - dest.y);

        if (deltaX <= 1 || deltaY <= 1) {
            return true;
        } else {
            return false;
        }
    }
}

export class Regina extends Pedina {
    constructor(orig: Point, UID: number) {
        super(orig, 1, UID);
    }

    mossa(pos: Point): boolean {
        const deltaX = Math.abs(pos.x - this.orig.x),
              deltaY = Math.abs(pos.y - this.orig.y);

        if (deltaX === 0 || deltaY === 0 || deltaX === deltaY) {
            return true;
        } else {
            return false;
        }
    }
}

export class Alfiere extends Pedina {
    constructor(orig: Point, UID: number) {
        super(orig, 2, UID);
    }

    mossa(pos: Point): boolean {
        const deltaX = Math.abs(pos.x - this.orig.x),
              deltaY = Math.abs(pos.y - this.orig.y);

        if (deltaX === deltaY) {
            return true;
        } else {
            return false;
        }
    }
}

export class Cavallo extends Pedina {
    constructor(orig: Point, UID: number) {
        super(orig, 3, UID);
    }

    mossa(pos: Point): boolean {
        const deltaX = Math.abs(pos.x - this.orig.x),
              deltaY = Math.abs(pos.y - this.orig.y);

        if (( deltaX === 3 && deltaY === 2) || (deltaX === 2 && deltaY === 3)) {
            return true;
        } else {
            return false;
        }
    }

    calculateRouteTo(dest: Point): Array<Point> {
        return [];
    }
}

export class Torre extends Pedina {
    constructor (orig: Point, UID: number) {
        super(orig, 4, UID);
    }

    mossa(pos: Point): boolean {
        const deltaX = Math.abs(pos.x - this.orig.x),
              deltaY = Math.abs(pos.y - this.orig.y);

        if (deltaX === 0 || deltaY === 0) {
            return true;
        } else {
            return false;
        }
    }
}

export class Pedone extends Pedina {
    constructor(orig: Point, UID: number) {
        super(orig, 5, UID);
    }

    mossa(pos: Point): boolean {
        const deltaX = Math.abs(pos.x - this.orig.x),
              deltaY = Math.abs(pos.y - this.orig.y);

        if (deltaX === 0 && deltaY === 1) {
            return true;
        } else {
            return false;
        }
    }

    calculateRouteTo(pos: Point): Array<Point> {
        return [];
    }
}
