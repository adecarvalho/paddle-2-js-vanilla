import { gAssetsManager } from './main.js';
import { Entity } from './ezLib.js';

//
export class Bloc extends Entity {
	//
	constructor(xp, yp, type) {
		//
		switch (type) {
			case 'BLOC_BLUE':
				super(xp, yp, gAssetsManager.getImage('bloc_blue'));
				break;

			case 'BLOC_GREEN':
				super(xp, yp, gAssetsManager.getImage('bloc_green'));
				break;

			case 'BLOC_YELLOW':
				super(xp, yp, gAssetsManager.getImage('bloc_yellow'));
				break;

			case 'BLOC_RED':
				super(xp, yp, gAssetsManager.getImage('bloc_red'));
				break;

			default:
				break;
		}
		//
		this.state = 'VISIBLE';
		this.inflate(5, 5);
	}

	//
	touched() {
		this.state = 'TOUCHED';
	}

	//
	render(ctx) {
		if (this.state === 'VISIBLE') {
			super.render(ctx);
			//super.renderDebug(ctx);
		}
	}

	//end
}
