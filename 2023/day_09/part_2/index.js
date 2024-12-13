import { readFile } from '../../../read-file.js'

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

		pathToZero.push(minus(pathToZero.at(-1)))

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
