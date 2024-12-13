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

	const startingFrom = Object.keys(transformations).filter(
		(key) => key[2] == 'A'
	)

	return { startingFrom, instruction, transformations }
}

const findPath = () => {
	const data = transformData()

	const { instruction, transformations } = data
	const endsWith = 'Z'

	let { startingFrom: currentKeys } = data
	// let currentKey = 'AAA'
	let steps = 0

	for (let i = 0; i <= instruction.length + 1; i++) {
		const goalReached = currentKeys.every((el) => el[2] == endsWith)

		// check if we have already reached searched element
		if (goalReached) break
		// if we have already passed through all the instructions and have not found - loop through instructions again
		if (i == instruction.length && !goalReached) i = 0
		const currentDirection = instruction[i]
		// each transformation looks like this: AAA: { L: 'BBB', R: 'CCC' }
		// so transformations['AAA']['R'] => 'CCC'
		// currentKey = transformations[currentKey][currentDirection]
		currentKeys = currentKeys.map(
			(currentKey) => transformations[currentKey][currentDirection]
		)
		console.log(currentKeys)
		console.log(steps)
		steps += 1
	}

	// console.log(currentKeys)
	return steps
}

const path = './full-input.txt'

console.log(findPath())
