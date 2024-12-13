import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map(el => el.split('   ')).map(array => array.map(el => +el))

	return data
}

const makeCalculations = () => {
	const sides = {first: [], last: []}

	const data = transformData();

	data.forEach(array => {
		sides.first.push(array[0])
		sides.last.push(array[1])
	})

	const result = sides.first.reduce((acc, curr) => {
		const amountInLast = sides.last.filter(el => el === curr).length

		return acc += (curr * amountInLast)
	}, 0)

	return result
}

const path = './input-full.txt'
// const path = './input-sample.txt'

console.log(makeCalculations())
// console.log(transformData())
