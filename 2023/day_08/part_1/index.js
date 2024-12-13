import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	const instruction = data[0].split('')

	const transformations = data.splice(2).reduce((result, el) => {
		const parenContent = el
			// get elements in parentheses
			.match(/\(([^)]+)\)/)[1] // => 'BBB, BBB'
			.split(',')
			.map((part) => part.trim())

		const [L, R] = parenContent

		result[el.split('=')[0].trim()] = { L, R } // => AAA: { left: 'BBB', right: 'BBB' }

		return result
	}, {})

	return { instruction, transformations }
}

const findPath = () => {
	const data = transformData()

	const { instruction, transformations } = data
	const keyToFind = 'ZZZ'

	let currentKey = 'AAA'
	let steps = 0

	for (let i = 0; i <= instruction.length; i++) {
		// check if we have already reached searched element
		if (currentKey == keyToFind) break

		// if we have already passed through all the instructions and have not found - loop through instructions again
		if (i == instruction.length && currentKey != keyToFind) i = 0

		const currentDirection = instruction[i]

		// each transformation looks like this: AAA: { L: 'BBB', R: 'CCC' }
		// so transformations['AAA']['R'] => 'CCC'
		currentKey = transformations[currentKey][currentDirection]
		steps += 1
	}

	return steps
}

const path = './full-input.txt'

console.log(findPath())
