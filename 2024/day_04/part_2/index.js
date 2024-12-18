import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return {data, xWide: data[0].length, yWide: data.length}
}

const countInDiagonals = () => {
	const {data, xWide, yWide} = transformData();
	const wordLength = 'MAS'.length

	const slices = []

	data.forEach((line, lineIndex) => {
		slices.push([])
		line.split('').forEach((letter, letterIndex) => {
			if (letterIndex + wordLength <= xWide) {
				slices.at(-1).push(line.split('').splice(letterIndex, wordLength))
			}
		})
	})

	 const columns = new Array(xWide + 1 - wordLength).fill().map(el => [])

	 slices.forEach((slicesRow) => {
		slicesRow.forEach((slice, sliceIndex) => {
			columns[sliceIndex].push(slice)
		})
	 })

	const squares = columns.reduce((acc, column) => {
		column.forEach((slice, index) => {
			if (index < (column.length - 2)) {
				acc.push([...column].splice(index, 3))
			}
		})

		return acc
	}, [])

	const diagonals = squares.reduce((acc, square) => {
		const diagonals = [[square[0][0], square[1][1], square[2][2]].join(''), [square[0][2], square[1][1], square[2][0]].join('')]
		acc.push(diagonals)
		return acc
	}, [])



	return diagonals.filter(diagonal => {
		return (diagonal[0] == "MAS" || diagonal[0] == "SAM") && (diagonal[1] == "MAS" || diagonal[1] == "SAM")
	}).length
}

const path = './input-full.txt'
// const path = './input-sample.txt'

console.log(countInDiagonals());