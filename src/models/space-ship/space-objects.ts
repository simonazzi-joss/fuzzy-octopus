import { Point } from '../general/point';

/* I need this class to set every class that i will need in the game
 * I decide to put everything in one file for space and sanity reasons
*/

export abstract class SpaceObject {
	constructor(public position: Point, public speed: number, public  size: number) { }

	abstract draw(ctx);

	checkCollision(pos: Point) {
		return 	( pos.x >= this.position.x - this.size && pos.x <= this.position.x + this.size )
					&&
				( pos.y >= this.position.y - this.size && pos.y <= this.position.y + this.size );
	}

	move(direction: number, multiplicator: number) {
		this.position.x += (multiplicator * this.speed) * Math.sin(direction);
		this.position.y += (multiplicator * this.speed) * Math.cos(direction);
	}
}

export class Ship extends SpaceObject {
    private prj_speed: number;
	private prj_size: number;
	private max_x: number;
	private max_y: number;

	constructor(x: number, y: number, speed: number, size: number, max_x: number, max_y: number) {
		super(new Point(x, y), speed, size);
		this.bind(max_x, max_y);
		this.prj_speed = 1;
		this.prj_size = 1;
    }

	bind(max_x: number, max_y: number) {
		this.max_x = max_x;
		this.max_y = max_y;
	}
    setProjectiles(speed: number, size: number) {
        this.prj_size = size;
        this.prj_speed = speed;
    }
	move(direction: number, multiplicator: number) {
		const new_x = this.position.x + (multiplicator * this.speed) * Math.sin(direction);
		const new_y = this.position.y + (multiplicator * this.speed) * Math.cos(direction);

		if(new_x < ( this.max_x ) && new_x > ( 0 )) {
			this.position.x = new_x;
		}
		if(new_y < ( this.max_y ) && new_y > ( 0 )) {
			this.position.y = new_y;
		}
	}
	// add method that generate a projectile
	shoot(): Projectile {
		return new Projectile(this.position.x, this.position.y - this.size, this.prj_speed, this.prj_size);
	}
	checkCollision(pos: Point) {  // not super useful, for now it will sit like this
		return false;
	}

	draw(ctx) {
        ctx.beginPath();
		ctx.moveTo(this.position.x - this.size, this.position.y);
		ctx.lineTo(this.position.x + this.size, this.position.y);
		ctx.lineTo(this.position.x, this.position.y - this.size );
        ctx.fill();
	}
}

export class Asteroid extends SpaceObject {
	constructor(x: number, y: number, speed: number, size: number) {
		super(new Point(x, y), speed, size);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.position.x - this.size , this.position.y - this.size , this.size * 2, this.size * 2);
		ctx.fill();
	}
}

export class Projectile extends SpaceObject {
	constructor(x: number, y: number, speed: number, size: number) {
		super(new Point(x, y), speed, size);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.position.x - this.size , this.position.y - this.size , this.size * 2, this.size * 2);
		ctx.fill();
	}
}
