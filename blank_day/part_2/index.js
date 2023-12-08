import { readFile } from '../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	return data
}

const path = './sample-input.txt'

console.log(transformData())
