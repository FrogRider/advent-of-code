// import { readFile } from '../../../read-file.js'

// const transformData = () => {
// 	const data = readFile(path)

// 	return {data, xWide: data[0].length, yWide: data.length}
// }

// function countOccurrences(input, substring) {
// 	let count = 0;
// 	let index = input.indexOf(substring);

// 	while (index !== -1) {
// 		count++;
// 		index = input.indexOf(substring, index + 1); // Search for the next occurrence
// 	}

// 	return count;
// }

// const countInRows = () => {
// 	const word1 = transformData().data.reduce((acc, curr) => acc += countOccurrences(curr, 'XMAS'),0)
// 	const word2 = transformData().data.reduce((acc, curr) => acc += countOccurrences(curr, 'SAMX'),0)

// 	return word1 + word2
// }

// const countInColumns = () => {
// 	const data = transformData().data.map(line => line.split(''))

// 	const columnsToLines = data[0].map((letter, index) => {
// 		letter = data.map(el => el[index])
// 		return letter
// 	}).map(arr => arr.join(''))

// 	const word1 = columnsToLines.reduce((acc, curr) => acc += countOccurrences(curr, 'XMAS'),0)
// 	const word2 = columnsToLines.reduce((acc, curr) => acc += countOccurrences(curr, 'SAMX'),0)

// 	return word1 + word2

// }

// const countInDiagonals = () => {
// 	const {data, xWide, yWide} = transformData();
// 	const wordLength = 'XMAS'.length

// 	const slices = []

// 	data.forEach((line, lineIndex) => {
// 		if (lineIndex + wordLength <= yWide) {
// 			slices.push([])
// 			line.split('').forEach((letter, letterIndex) => {
// 				if (letterIndex + wordLength <= xWide) {
// 					slices.at(-1).push(line.split('').splice(letterIndex, wordLength))
// 				}
// 			})
// 		}
// 	 })

// 	 const columns = new Array(xWide + 1 - wordLength).fill([])

// 	 slices.forEach((slicesRow) => {
// 		slicesRow.forEach((slice, sliceIndex) => {
// 			columns[sliceIndex].push(slice)
// 			// console.log(slice, sliceIndex);
// 		})
// 	 })

// 	 return columns
// }

// const makeCalculations = () => {
	

// 	console.log(countInRows() + countInColumns());
// }


// // const word1 = 'XMAS';
// // const word2 = 'SAMX';

// // const path = './input-full.txt'
// const path = './input-sample.txt'

// console.log(countInDiagonals())
// // countInDiagonals()
// // console.log(transformData().data)


const arrayOfArrays = new Array(7).fill([])
const arrayOfArrays2 = [[], [], [], [], [], [], []]
const arrayOfArrays3 = new Array(7).fill().map(el => [])
console.log("arrayOfArrays", arrayOfArrays)
console.log("arrayOfArrays2", arrayOfArrays2)
console.log("arrayOfArrays3", arrayOfArrays3)

arrayOfArrays.forEach((el, index) => el.push(index))
arrayOfArrays2.forEach((el, index) => el.push(index))
arrayOfArrays3.forEach((el, index) => el.push(index))
console.log("arrayOfArrays", arrayOfArrays)
console.log("arrayOfArrays2", arrayOfArrays2)
console.log("arrayOfArrays3", arrayOfArrays3)