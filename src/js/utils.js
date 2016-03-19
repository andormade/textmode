export default class Utils {
	static getLongestRowsLength(data) {
		var length = 0;

		data.forEach(function(row) {
			if (length < row.length) {
				length = row.length;
			}
		});

		return length;
	}
}
