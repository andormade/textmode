import Utils from './utils';

export default class TextPage {
	constructor(options) {
		this.characterSetMap = options.characterSetMap,
		this.backgroundColors = options.backgroundColors,
		this.foregroundColors = options.foregroundColors,
		this.colors = options.colors,
		this.text = options.text
		this.rows = options.text.length;
		this.cols = Utils.getLongestRowsLength(options.text);
	}

	getCharacterCode(row, col) {
		if (
			this.text[row] &&
			this.text[row][col]
		) {
			// TODO
			return this.text[row][col].charCodeAt(0);
		}
		else {
			return 0;
		}
	}

	getCharacterSet(row, col) {
		return this.characterSetMap[row][col];
	}

	getBackgroundColor(row, col) {
		return this.colors[this.backgroundColors[row][col]];
	}

	getForegroundColor(row, col) {
		return this.colors[this.foregroundColors[row][col]];
	}
}
