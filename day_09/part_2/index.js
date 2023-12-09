import { readFile } from '../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return data.map((el) => el.split(' ').map((number) => +number))
}

// console.log(transformData())

// accepts array of numbers
const minus = (input) => {
	if (input.every((number) => number == 0)) return input

	const result = input.reduce((acc, el, index) => {
		// console.log(el)
		if (input.length > 1) {
			if (index >= 1) {
				// console.log(el, index)
				acc.push(+el - +input[index - 1])
			}
		}
		return acc
	}, [])

	return result
	// return result
}

const getPathsToZero = () => {
	const data = transformData(path)

	const result = data.map((input) => {
		const pathToZero = [input]

		const lastElement = pathToZero.at(-1)

		pathToZero.push(minus(lastElement))

		while (!pathToZero.at(-1).every((el) => el == 0)) {
			pathToZero.push(minus(pathToZero.at(-1)))
		}

		return pathToZero.reverse()
	})

	return result
}

const getPreviousElements = () => {
	const data = getPathsToZero()

	return data.map((path) => {
		return path
			.map((array, index) => {
				if (index == 0) array.unshift(0)
				else {
					const newElement = +array[0] - +path[index - 1][0]
					array.unshift(newElement)
				}

				return array
			})
			.map((el) => el.at(0))
	})
}

const path = './full-input.txt'

console.log(
	getPreviousElements().reduce((acc, current) => (acc += current.at(-1)), 0)
)
