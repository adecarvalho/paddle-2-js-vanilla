import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Matrice } from './matrice.js';

import { Stage, ScoreManager } from './ezLib.js';

import {
	gameStageManager,
	gInputManager,
	gAssetsManager,
	gMusicPlayer,
} from './main.js';

import { ConcluStage } from './conclu_stage.js';

//
export class GameStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.score = new ScoreManager(this.screenWidth, this.screenHeight);

		this.paddle = new Paddle(this.screenWidth, this.screenHeight);
		//
		this.ball = new Ball(
			this.screenWidth,
			this.screenHeight,
			this.paddle,
			this.score
		);
		//
		this.matrice = new Matrice(this.screenWidth, this.screenHeight, this.score);
	}

	//
	onEnter(params = undefined) {
		if (params) {
			console.log(params.name);
			this.score.setName(params.name);
		}
		//
		gMusicPlayer.play('./assets/musics/song.ogg', 0.5, true);
	}

	//
	onExit() {
		gMusicPlayer.stop();
	}

	//
	update(dt) {
		//input
		if (gInputManager.isKeyPressed('Space')) {
			this.ball.setMouvement();
			gAssetsManager.getSound('bounce').play();
		}
		//
		if (gInputManager.isKeyPressed('ArrowLeft')) {
			this.paddle.moveLeft();
		}
		//
		else if (gInputManager.isKeyPressed('ArrowRight')) {
			this.paddle.moveRight();
		}
		//
		if (gInputManager.isKeyReleased('ArrowLeft')) {
			this.paddle.stop();
		}
		//
		else if (gInputManager.isKeyReleased('ArrowRight')) {
			this.paddle.stop();
		}
		//
		this.ball.update(dt);

		//
		this.matrice.collideBall(this.ball);

		this.paddle.update(dt);
		//
		if (this.matrice.isMatriceDestroy()) {
			//
			this.ball.state = 'LOCKED';
			this.matrice.newWave();
		}
		//
		//gameOver
		if (this.score.isGameOver()) {
			//
			const datas = {
				name: this.score.getName(),
				points: this.score.getPoints(),
			};

			//
			gameStageManager.changeStage(
				new ConcluStage(this.screenWidth, this.screenHeight),
				datas
			);
		}
	}

	//
	render(ctx) {
		//
		ctx.drawImage(gAssetsManager.getImage('background'), 0, 0);

		this.score.render(ctx);

		this.paddle.render(ctx);

		this.ball.render(ctx);

		this.matrice.render(ctx);
	}
	//end stage
}
