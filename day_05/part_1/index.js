import { readFile } from '../../read-file.js'

const transformData = () => {
	const data = readFile(path).filter((number) => number != '')

	const result = data.reduce((acc, curr, index) => {
		if (index == 0) {
			// define seeds
			const seeds = curr
				.split(': ')
				.splice(1)[0]
				.split(' ')
				.filter((number) => number != '')
			acc.seeds = seeds
			acc.mappings = []
		}

		if (curr.includes(':') && index != 0) {
			acc.mappings.push([])
		}

		if (index != 0 && !curr.includes(':')) {
			acc.mappings.at(-1).push(curr)
		}
		return acc
	}, {})

	return result
}

const mutateNumbers = () => {
	const dataToMutate = transformData().seeds
	const mappings = transformData().mappings
	const result = []

	dataToMutate.forEach((numberToMutate, indexToMutate) => {
		mappings.forEach((mapping, mappingIndex) => {
			const resultsForMapping = []
			mapping.forEach((range) => {
				const splittedRange = range.split(' ').map((number) => +number)
				const [destination, source, rangeLength] = splittedRange

				const hasMutation =
					numberToMutate >= source && numberToMutate <= source + rangeLength

				const mutatedNumber = hasMutation
					? destination + +numberToMutate - source
					: +numberToMutate

				if (hasMutation && resultsForMapping.length == 0) {
					numberToMutate = mutatedNumber
					resultsForMapping.push(mutatedNumber)
				}
			})
			if (mappingIndex == mappings.length - 1) {
				result.push(numberToMutate)
			}
		})
	})

	return result.sort((a, b) => a - b)[0]

	// destination / source / range
	// if number (seed) >= souse && number <= source + length -> destination + (number - source)
}

const path = './sample-input.txt'

console.log(mutateNumbers())
// console.log('==============================')
