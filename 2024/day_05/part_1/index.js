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
		return list.every((number, index) => {
			const nextNumbers = list.slice(index + 1)

			return nextNumbers.every(nextNumber => {
				return numbersAfter[number].includes(nextNumber)
			})
		})
	})

	return filtered.map(array => {
		const middleIndex = Math.ceil(array.length / 2) - 1

		return array[middleIndex]
	}).reduce((acc, curr) => acc += +curr, 0)
}

const path = './input-full.txt'
// const path = './input-sample.txt'

// console.log(transformData())
console.log(calculate())
