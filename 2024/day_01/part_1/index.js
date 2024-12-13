import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map(el => el.split('   ')).map(array => array.map(el => +el))

	return data
}

//3 4 2 1 3 3

const makeCalculations = () => {
	const sides = {first: [], last: []}

	const data = transformData();

	data.forEach(array => {
		// split numbers by sides
		sides.first.push(array[0])
		sides.last.push(array[1])
	})

	sides.first.sort()
	sides.last.sort()

	const result = sides.first.reduce((acc, curr, index) => {
		const distance = Math.abs(curr - sides.last[index])
		return acc += distance
	}, 0)

	return result
}

const path = './input-full.txt'
// const path = './input-sample.txt'

console.log(makeCalculations())
// transformData()
