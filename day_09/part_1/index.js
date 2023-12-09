import { readFile } from '../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return data.map((el) => el.split(' ').map((number) => +number))
}

const minus = (input) => {
	if (input.every((number) => number == 0)) return input

	const result = input.reduce((acc, el, index) => {
		if (input.length > 1) {
			if (index >= 1) {
				acc.push(+el - +input[index - 1])
			}
		}
		return acc
	}, [])

	return result
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

const getNextElements = () => {
	const data = getPathsToZero()

	return data.map((path) => {
		return path
			.map((array, index) => {
				if (index == 0) array.push(0)
				else {
					const newElement = +array.at(-1) + +path[index - 1].at(-1)
					array.push(newElement)
				}

				return array
			})
			.map((el) => el.at(-1))
	})
}

const path = './full-input.txt'

console.log(
	getNextElements()
		.map((array) => array.at(-1))
		.reduce((acc, curr) => (acc += curr), 0)
)
