import Utils from './utils';

export default class TextPage {
	constructor(options) {
		this.characterSetMap = options.characterSetMap,
		this.backgroundColors = options.backgroundColors,
		this.foregroundColors = options.foregroundColors,
		this.colors = options.colors,
		this.text = this.parseText(options.text);
		this.rows = options.text.length;
		this.cols = Utils.getLongestRowsLength(options.text);
	}

	parseText(text) {
		text.forEach(function(row) {
			if (typeof row === 'string') {
				row = row.split('');
			}
			if (Array.isArray(row)) {
				row.forEach(function(character, index) {
					if (typeof character === 'string') {
						row[index] = character.charCodeAt(0);
					}
					else if (typeof character === 'number') {
					}
					else {
						throw new Error(); // TODO
					}
				});
			}
			else {
				throw new Error(); // TODO
			}
		});

		return text;
	}

	getCharacterCode(row, col) {
		if (
			this.text[row] &&
			this.text[row][col]
		) {
			return this.text[row][col];
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

	setBackgroundColor(row, col, backgroundColor) {
		this.backgroundColors[row][col] = backgroundColor;
	}

	setForegroundColor(row, col, foregroundColor) {
		this.foregroundColors[row][col] = foregroundColor;
	}

	setCharacterSet(row, col, characterSet) {
		this.characterSetMap[row][col] = characterSet;
	}
}
