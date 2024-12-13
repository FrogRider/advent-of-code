import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).filter(String)

	return data.map((line) => line.split(''))
}

const hasOnlyDotsOnCol = (index) => {
	const data = transformData()

	return data.every((line) => line[index] == '.')
}

const hasOnlyDotsOnRow = (index) => {
	// whole line contains only dots
	const data = transformData()

	return !Boolean(data.at(index).includes('#'))
}

const emptyColumns = () => {
	const data = transformData()

	return data[0].reduce((acc, _, index) => {
		if (hasOnlyDotsOnCol(index)) acc = [index, ...acc]
		return acc
	}, [])
}

const emptyRows = () => {
	const data = transformData()

	return data.reduce((acc, _, index) => {
		if (hasOnlyDotsOnRow(index)) acc = [index, ...acc]

		return acc
	}, [])
}

const getCoords = () => {
	const data = transformData()

	return data.reduce((result, line, indexOfLine) => {
		line.forEach((symbol, indexOfSymbol) => {
			if (symbol == '#') {
				result.push([indexOfSymbol, indexOfLine])
			}
		})

		return result
	}, [])
}

const getPaths = () => {
	const data = getCoords()
	// console.log(data)

	return data.reduce((result, coordsA, indexOfCoordsA) => {
		// A -> B
		data.forEach((coordsB, indexOfCoordsB) => {
			const [xStart, yStart] = coordsA
			const [xEnd, yEnd] = coordsB
			// console.log(indexOfCoordsB)
			// console.log(emptyColumns())
			const emptyColumnsBetween = emptyColumns().filter(
				(col) => (col > xStart && col < xEnd) || (col < xStart && col > xEnd)
			)
			// const emptyColumnsBetween = emptyColumns().map((col) => {
			// 	if (col > xStart && col < xEnd) {
			// 		console.log({ xStart, xEnd, col })
			// 		// console.log(object);
			// 		return col
			// 	} else if (col < xStart && col > xEnd) {
			// 		return col
			// 	}
			// 	return ''
			// 	// console.log(col)
			// })
			console.log(emptyColumnsBetween)
			// console.log(emptyColumnsBetween)
			const emptyRowsBetween = emptyRows().filter(
				(row) => row > yStart && row < yEnd
			).length

			const expansion = 10

			if (indexOfCoordsB > indexOfCoordsA) {
				// console.log({ emptyColumnsBetween, emptyRowsBetween })
				const x = Math.abs(xEnd - xStart)
				const y = Math.abs(yEnd - yStart)
				const length =
					x + y + emptyColumnsBetween * expansion + emptyRowsBetween * expansion
				result.push(length)
			}
		})

		return result
	}, [])
}

const path = './full-input.txt'

//(xEnd - xStart) + (yEnd - yStart)

// console.log(emptyRows())
console.log(getPaths().reduce((acc, curr) => (acc += curr), 0))
// console.log(getPaths())
// transformData().map((line) => line.join('')).filter()

// [(1, 2)].push()
