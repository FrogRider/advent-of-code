import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return data.join('')
}

function hasOnlyNumbersAndOneComma(input) {
    // Check if the string matches the required pattern
    const regex = /^\d{1,3},\d{1,3}$/;
    return regex.test(input);
}


const makeCalculations = () => {
	const data = transformData().split('mul(').map(part => part.split(')')).flat()
	// const data = transformData()
	// return data

	return data.filter(el => hasOnlyNumbersAndOneComma(el)).map(input => {
		const numbers = input.split(',')
		return numbers[0] * numbers[1]
	}).reduce((acc, curr) => acc += curr, 0)
}
const path = './input-full.txt'
// const path = './input-sample.txt'

console.log(makeCalculations())
