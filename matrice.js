import { Bloc } from './bloc.js';
import { gAssetsManager } from './main.js';
//
export class Matrice {
	//
	constructor(screenWidth, screenHeight, score) {
		//
		this.score = score;
		this.BLOC_WIDTH = 50;
		this.BLOC_HEIGHT = 25;
		this.col = Math.floor(screenWidth / (2 * this.BLOC_WIDTH));
		this.row = 4;

		this.py = 50;
		this.blocs = new Array(this.row);

		this.createGrid();
	}

	//
	createGrid() {
		for (let i = 0; i < this.row; i++) {
			this.blocs[i] = new Array(this.col);
		}
		//
		let r = 0;
		this.createRow(r, this.py, 'BLOC_BLUE');

		//
		this.py += 50;
		r += 1;
		this.createRow(r, this.py, 'BLOC_GREEN');

		//
		this.py += 50;
		r++;
		this.createRow(r, this.py, 'BLOC_RED');

		//
		this.py += 50;
		r++;
		this.createRow(r, this.py, 'BLOC_YELLOW');
	}

	//
	newWave() {
		for (let j = 0; j < this.row; j++) {
			for (let i = 0; i < this.col; i++) {
				this.blocs[j][i].state = 'VISIBLE';
			}
		}
	}

	//
	isMatriceDestroy() {
		for (let j = 0; j < this.row; j++) {
			for (let i = 0; i < this.col; i++) {
				//
				if (this.blocs[j][i].state === 'VISIBLE') {
					return false;
				}
			}
		}
		//
		return true;
	}

	//
	collideBall(ball) {
		for (let j = 0; j < this.row; j++) {
			for (let i = 0; i < this.col; i++) {
				let item = this.blocs[j][i];
				//
				if (item && item.state === 'VISIBLE' && ball.state === 'MOVE') {
					if (ball.collides(item)) {
						item.touched();
						ball.removeX();
						ball.removeY();
						this.score.incrementsPoints(1);
						gAssetsManager.getSound('explosion').load();
						gAssetsManager.getSound('explosion').play();

						return;
					}
				}
			}
		}
	}

	//
	createRow(row, yp, type) {
		for (let i = 0; i < this.col; i++) {
			this.blocs[row][i] = new Bloc(i * this.BLOC_WIDTH * 2, yp, type);
		}
	}

	//
	render(ctx) {
		for (let j = 0; j < this.row; j++) {
			for (let i = 0; i < this.col; i++) {
				//
				let item = this.blocs[j][i];
				if (item) {
					this.blocs[j][i].render(ctx);
				}
			}
		}
	}

	//end
}
