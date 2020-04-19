import {
	Game,
	GameStageManager,
	InputManager,
	AssetsManager,
	MusicPlayer,
} from './ezLib.js';

//import { GameStage } from './game_stage.js';
import { IntroStage } from './intro_stage.js';

//
const canvas = document.getElementById('game_screen');

//
export const gMusicPlayer = new MusicPlayer();

export const gameStageManager = new GameStageManager();

export const gInputManager = new InputManager();

export const gAssetsManager = new AssetsManager();

//
const game = new Game(canvas, gameStageManager, gInputManager);

//
async function chargeAssets() {
	console.log('charge assets');

	//load images
	gAssetsManager.putImage(
		'background',
		await game.loadImage('./assets/images/background.png')
	);

	gAssetsManager.putImage(
		'ball',
		await game.loadImage('./assets/images/ball.png')
	);

	gAssetsManager.putImage(
		'paddle',
		await game.loadImage('./assets/images/paddle.bmp')
	);

	gAssetsManager.putImage(
		'bloc_blue',
		await game.loadImage('./assets/images/block_blue.png')
	);

	gAssetsManager.putImage(
		'bloc_red',
		await game.loadImage('./assets/images/block_red.png')
	);

	gAssetsManager.putImage(
		'bloc_green',
		await game.loadImage('./assets/images/block_green.png')
	);

	gAssetsManager.putImage(
		'bloc_yellow',
		await game.loadImage('./assets/images/block_yellow.png')
	);

	//load sound
	gAssetsManager.putSound(
		'spawn',
		await game.loadSound('./assets/sounds/ball_spawn.ogg', false)
	);

	gAssetsManager.putSound(
		'bounce',
		await game.loadSound('./assets/sounds/ball_bounce.ogg', false)
	);

	gAssetsManager.putSound(
		'explosion',
		await game.loadSound('./assets/sounds/explosion.ogg', false)
	);

	//
	gameStageManager.pushStage(new IntroStage(canvas.width, canvas.height));

	//
	game.start();
}

//
chargeAssets();
