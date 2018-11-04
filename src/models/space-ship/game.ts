import { Asteroid, Ship, Projectile, SpaceObject } from './space-objects';
import { Point } from '../general/point';

export class SpaceGame {
// Costanti.... più o meno
	private GAME_SPEED = 1;
	private SPAWNCHANCE = 0.1;
	//  size of the objects
	private AST_SIZE = 25;
	private PRJ_SIZE = 2;
	private SHP_SIZE = 20;
	//  speed of the objects
	private AST_SPD = 5;
	private PRJ_SPD = 20;
	private SHP_SPD = 20;

	private UP = this.convertDegreeIntoRadians(180);
	private DOWN = this.convertDegreeIntoRadians(0);    // for some reason the coordinate are upside down;
	private RIGHT = this.convertDegreeIntoRadians(90);
	private LEFT = this.convertDegreeIntoRadians(270);

	// Variabili
	private width: number;
	private height: number;

	private asteroids: Asteroid[];
	private ship: Ship;
	private projectiles: Projectile[];

	private interval: number;
	private delayUpdate: number;
	private clockCounter: number;

	constructor(width: number, height: number) {
		this.delayUpdate = 66;  // ms

		this.setMapSize(width, height);

		this.asteroids = [];
		this.projectiles = [];
        this.ship = new Ship(width / 2, height, this.SHP_SPD, this.SHP_SIZE, width, height);

		this.ship.setProjectiles(this.PRJ_SPD * this.GAME_SPEED, this.PRJ_SIZE);

		this.spawnAsteroids();

		this.clockCounter = 0;
	}

	setMapSize(width: number, height: number) {
		if( width > 0 && height > 0) {
			this.width = width;
			this.height = height;	
		}
	}

	private convertDegreeIntoRadians(dg): number {
		return dg * ( Math.PI / 180);
	}

	private moveAsteroids() {
		for(let i = this.asteroids.length - 1; i >= 0; i--) {		// it's better to loop in reverse becouse of the splice
			
			this.asteroids[i].move(this.DOWN, this.GAME_SPEED);

			if( this.checkBorders(this.asteroids[i].position) ) {
				this.asteroids.splice(i, 1);
			}
		}
	}

	private checkCollisions() {
		for(let i = this.asteroids.length - 1; i > 0; i--) {		// it's better to loop in reverse becouse of the splice
			for(let ind = this.projectiles.length - 1; ind > 0; ind--) {			// check if they hit an asteroid
				if (this.asteroids[i].checkCollision(this.projectiles[ind].position) ) {
					this.projectiles.splice(ind, 1);
					this.asteroids.splice(i, 1);
				}
			}
		}
	}

	private moveProjectiles() {
		for(let i = this.projectiles.length - 1; i >= 0; i--) {
			this.projectiles[i].move(this.UP, this.GAME_SPEED);

			if ( this.checkBorders(this.projectiles[i].position) ) {
				this.projectiles.splice(i, 1);
			}
		}
	}

	private checkBorders(pos: Point): boolean {
		return  ( pos.y <= 0 && pos.y >= this.height )
					&&
				( pos.x <= 0 && pos.x >= this.width );
	}

	private spawnAsteroids() {
		const cell = this.width / this.AST_SIZE * 2;
		const n = Math.floor( Math.random() * cell );
		for(let i = 0; i < n; i++) {
			// i do need a better way to position the assteroids, this way will probably make them sit on each others
			this.asteroids.push( new Asteroid( Math.floor( ( Math.random() * this.width ) / cell ) * cell, 0, this.AST_SPD, this.AST_SIZE) )
		}
	}

	private test() {					// TO TEST for new spawn asteroids
		var width = 200;
		var cell = 40;
		var nCell = Math.floor( width / cell );
		var n =  Math.floor( (Math.random() * this.width) / cell );
		var chanceSpace = n / nCell;
		var calcChance = 0;

		console.log('nCell ' + nCell);
		console.log('N asteroid ' + n);

		for( var i = 0; i < nCell; i++) {
			if( Math.random() < calcChance ) {
				//asteroid
				n--;
				console.log('new Asteroid at ' + i);
			} else {
				//space
			}
			if( n > 0 ) {
				calcChance = n / ( nCell - i );
			} else {
				calcChance = 0;
			}
		}
	}

	update(): boolean {
		try {
			this.clockCounter++;
			if(this.clockCounter > 15) {
				this.clockCounter = 0;
				this.spawnAsteroids();
			}

			this.projectiles.push( this.ship.shoot() );		//autofire

			this.moveAsteroids();
			this.moveProjectiles();
			this.checkCollisions();		//tecnicaly this thing can go into one of the other 2 for efficency

			return true;
		} catch(err) {
			console.log(err);
			return false;
		}
	}

	drawState(ctx) {
		ctx.clearRect(0, 0, this.width, this.height);

		ctx.fillStyle = '#0000ff';
        this.ship.draw(ctx);

		ctx.fillStyle = '#000000';
		for ( const ast of this.asteroids ) {
			ast.draw(ctx);
		}

		ctx.fillStyle = '#ff0000';
		for ( const prj of this.projectiles) {
			prj.draw(ctx);
        }
	}
	
	keyPress(codeKey: any) {
		switch (codeKey) {
			case 0:					// unlimited keys works
			case 32:				// spacebar
			case ' ':
				//this.projectiles.push(this.ship.shoot());
				break;
			case 37 :				// a
			case 97 :				// arrow
			case 'a':
			case 'ArrowLeft':		// 	arrow
				this.ship.move(this.LEFT, 1);
				break;
			case 39 :				// d
			case 100 :				// arrow
			case 'd':
			case 'ArrowRight':		// arrow
				this.ship.move(this.RIGHT, 1);
				break;
			case 'w':
			case 'ArrowUp':
				this.ship.move(this.UP, 1);
				break;
			case 's':
			case 'ArrowDown':
				this.ship.move(this.DOWN, 1);
				break;
		}
	}
}
