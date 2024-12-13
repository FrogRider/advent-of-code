import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return data
}

// const path = './input-full.txt'
const path = './input-sample.txt'

console.log(transformData())
