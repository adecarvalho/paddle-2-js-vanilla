import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

//
export class Ball extends Entity {
	//
	constructor(screenWidth, screenHeight, paddle, score) {
		//
		super(0, 0, gAssetsManager.getImage('ball'));

		this.paddle = paddle;
		this.score = score;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.velocity.x = 0;
		this.velocity.y = 0;

		this.state = 'LOCKED';
	}
	//
	removeX() {
		this.velocity.x *= -1;
	}
	removeY() {
		this.velocity.y *= -1;
	}
	//
	setMouvement() {
		if (this.state == 'LOCKED') {
			this.state = 'MOVE';
			this.velocity.x = 150;
			this.velocity.y = -200;
		}
	}
	//
	collidePaddle() {
		if (this.collides(this.paddle) && this.velocity.y > 0) {
			gAssetsManager.getSound('bounce').load();
			gAssetsManager.getSound('bounce').play();

			const xpaddle = this.paddle.getCenterX();
			const xball = this.getCenterX();

			const delta = xball - xpaddle;

			const angle = -0.02 * delta + 1.57;

			const dx = 200 * Math.cos(angle);
			const dy = -200 * Math.sin(angle);

			this.velocity.x = dx * 1.03;
			this.velocity.y = dy * 1.03;
		}
	}
	//
	edges() {
		//right
		if (this.getRight() >= this.screenWidth && this.velocity.x > 0) {
			this.removeX();
		}

		//left
		if (this.getLeft() <= 0 && this.velocity.x < 0) {
			this.removeX();
		}

		//up
		if (this.position.y <= 0 && this.velocity.y < 0) {
			this.removeY();
		}

		//down
		if (this.getBottom() >= this.screenHeight && this.velocity.y > 0) {
			this.state = 'LOCKED';
			this.score.decrementsLives();
			gAssetsManager.getSound('spawn').load();
			gAssetsManager.getSound('spawn').play();
		}
	}
	//
	update(dt) {
		this.edges();

		//
		if (this.state == 'LOCKED') {
			this.setBottom(this.paddle.getTop());
			this.setCenterX(this.paddle.getCenterX());
		}
		//
		else if (this.state == 'MOVE') {
			super.update(dt);

			this.collidePaddle();
		}
	}
	//
	render(context) {
		super.render(context);
	}
	//
}
