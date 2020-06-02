import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

//
export class Paddle extends Entity {
	//
	constructor(gameWidth, gameHeight) {
		super(gameWidth / 2, gameHeight - 50, gAssetsManager.getImage('paddle'));

		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.speed = 0;
		this.speedModule = 200;
	}

	//
	edges() {
		//left
		if (this.position.x < 0) {
			this.position.x = 0;
		}

		//right
		if (this.getRight() >= this.gameWidth) {
			this.setRight(this.gameWidth);
		}
	}

	//
	stop() {
		this.velocity.x = 0;
	}

	//
	moveLeft() {
		this.velocity.x = -this.speedModule;
	}

	//
	moveRight() {
		this.velocity.x = this.speedModule;
	}

	update(dt) {
		super.update(dt);

		this.edges();
	}

	render(ctx) {
		super.render(ctx);
		//super.renderDebug(ctx);
	}
}
