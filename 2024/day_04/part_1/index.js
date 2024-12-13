import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return {data, xWide: data[0].length, yWide: data.length}
}

function countOccurrences(input, substring) {
	let count = 0;
	let index = input.indexOf(substring);

	while (index !== -1) {
		count++;
		index = input.indexOf(substring, index + 1); // Search for the next occurrence
	}

	return count;
}

const countInRows = () => {
	const word1 = transformData().data.reduce((acc, curr) => acc += countOccurrences(curr, 'XMAS'),0)
	// const word2 = transformData().data.reduce((acc, curr) => acc += countOccurrences(curr, 'SAMX'),0)

	// return word1 + word2
	return word1
}

const countInColumns = () => {
	const data = transformData().data.map(line => line.split(''))

	const columnsToLines = data[0].map((letter, index) => {
		letter = data.map(el => el[index])
		return letter
	}).map(arr => arr.join(''))

	const word1 = columnsToLines.reduce((acc, curr) => acc += countOccurrences(curr, 'XMAS'),0)
	// const word2 = columnsToLines.reduce((acc, curr) => acc += countOccurrences(curr, 'SAMX'),0)

	// return word1 + word2
	return word1

}

const countInDiagonals = () => {
	const {data, xWide, yWide} = transformData();
	const wordLength = 'XMAS'.length

	const slices = []

	data.forEach((line, lineIndex) => {
		// if (lineIndex + wordLength <= yWide) {
			slices.push([])
			line.split('').forEach((letter, letterIndex) => {
				if (letterIndex + wordLength <= xWide) {
					slices.at(-1).push(line.split('').splice(letterIndex, wordLength))
				}
			})
		// }
	 })

	 const columns = new Array(xWide + 1 - wordLength).fill().map(el => [])

	 slices.forEach((slicesRow) => {
		slicesRow.forEach((slice, sliceIndex) => {
			columns[sliceIndex].push(slice)
			// console.log(slice, sliceIndex);
		})
	 })

	const squares = columns.reduce((acc, column) => {
		column.forEach((slice, index) => {
			// console.log(index, slice);
			if (index < (column.length - 3)) {
				acc.push([...column].splice(index, 4))
				// console.log(index);
			}
		})

		return acc
	}, [])

	const countXmas = squares.reduce((acc, square) => {
		const word1 = [square[0][0], square[1][1], square[2][2], square[3][3]].join('')
		const word2 = [square[0][3], square[1][2], square[2][1], square[3][0]].join('')

		// const words = [word1, word1.split('').reverse().join(''), word2, word2.split('').reverse().join('')]
		// acc += words.filter(el => el == "XMAS").length + words.filter(el => el == "SAMX").length
		const words = [word1, word2]
		acc += words.filter(el => el == "XMAS").length

		return acc
	}, 0)

	 return countXmas
}

const makeCalculations = () => {
	

	console.log(countInDiagonals());
}


// const word1 = 'XMAS';
// const word2 = 'SAMX';

// const path = './input-full.txt'
const path = './input-sample.txt'

// console.log(countInDiagonals())
makeCalculations()
// console.log(transformData().data)
