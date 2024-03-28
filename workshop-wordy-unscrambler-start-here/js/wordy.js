export default {
	loadWords,
	findWords,
};

//var dict = [];
var dict = {};
var isWord = Symbol("is-word");
// ****************************

function loadWords(wordList) {
	// TODO: implement a data structure for the array
	// `wordList` parameter; return the number
	// of entries inserted into the data structure
	// dict = [...wordList];
	// return dict.length
	var nodeCount = 0;
	if (Object.keys(dict).length > 0) {
		dict = {};
	}
	for (let word of wordList) {
		let node = dict;
		for (let letter of word) {
			if (!node[letter]) {
				node[letter] = {
					[isWord]: false,
				};
				nodeCount++;
			}
			node = node[letter];
		}
		node[isWord] = true;
	}
	return nodeCount;
}

function findWords(input, prefix = "", node = dict) {
	// TODO: implement unscrambling/searching logic
	// for a string of uppercase letters in the
	// `input` parameter; return the array of
	// matching words
	var words = [];
	// for (let word of dict) {
	// 	if (input.length >= word.length && checkWord(input, word)) {
	// 		words.push(word);
	// 	}
	// }
	if (node[isWord]) {
		words.push(prefix);
	}
	for (let i = 0; i < input.length; i++) {
		let currentLetter = input[i];
		if (node[currentLetter]) {
			let remainingLetter = [...input.slice(0, i), ...input.slice(i + 1)];
			words.push(
				...findWords(
					remainingLetter,
					prefix + currentLetter,
					node[currentLetter]
				)
			);
		}
	}
	if (node === dict) {
		words = [...new Set(words)];
	}
	return words;
}
function checkWord(input, word) {
	return permute("", input);

	/************************** */
	function permute(prefix, remaining) {
		for (let i = 0; i < remaining.length; i++) {
			let current = prefix + remaining[i];
			if (current == word) {
				return true;
			} else if (remaining.length > 1 && current.length < word.length) {
				if (
					permute(
						current,
						remaining.slice(0, i) + remaining.slice(i + 1)
					)
				) {
					return true;
				}
			}
		}
		return false;
	}
}
