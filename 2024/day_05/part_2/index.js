import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)
	const separateByIndex = data.indexOf('')

	const rules = data.slice(0, separateByIndex).map(el => el.split('|'))
	const lists = data.slice(separateByIndex+1).map(el => el.split(','))

	const uniqueNumbersSet = new Set()

	rules.forEach(rule => {
		// console.log(rule[0]);
		uniqueNumbersSet.add(rule[0])
		uniqueNumbersSet.add(rule[1])
		// console.log(uniqueNumbersSet);
	})

	const uniqueNumbers = Array.from(uniqueNumbersSet.values())

	const numbersAfter = {}
	uniqueNumbers.forEach(number => {
		numbersAfter[number] = rules.filter(rule => rule[0] == number).map(rule => rule[1])
	})

	return {rules, lists, numbersAfter}
}

const calculate = () => {
	const {rules, lists, numbersAfter} = transformData()

	const filtered =  lists.filter(list => {
		return list.some((number, index) => {
			const nextNumbers = list.slice(index + 1)

			return !nextNumbers.every(nextNumber => {
				return numbersAfter[number].includes(nextNumber)
			})
		})
	})

	return filtered.map(array => {
		const fromMiddleToEnd = array.slice(Math.ceil(array.length / 2)).length // marks that the element is a middle of the correctly sorted array
		return array.filter((number, index) => {
			const restOfNumbers = [...array.slice(0,index), ...array.slice(index + 1)]
			const correctlyOrdered = restOfNumbers.filter(leftOver => numbersAfter[number].includes(leftOver)).length
			console.log({number, restOfNumbers, correctlyOrdered});
			return correctlyOrdered == fromMiddleToEnd
		})
	}).reduce((acc, curr) => acc += +curr[0], 0)
}

const path = './input-full.txt'
// const path = './input-sample.txt'

// console.log(transformData().numbersAfter)
console.log(calculate()) 
//75,97,47,61,53
