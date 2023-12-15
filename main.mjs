//Run "node main.mjs" to parse any images in ./images folder

import { cropAndRecognizeImage } from "./cropAndLook.mjs"
import { mkConfig, generateCsv, asString } from "export-to-csv"
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const startTime = performance.now()

let imageKeys = []

const people = []

const loadMyFunction = async () => {
  const module = await import('./imageKeys.js')
  const { getKeys } = module
  imageKeys = getKeys()
}

const parseData = (text) => {
  const newArr = text.split('\n')
  const sanArr = []
  for (let i=0;i<newArr.length;i++) {
    if (newArr[i].length > 0) {
      sanArr.push(newArr[i])
    }
  }
  if (sanArr[0].indexOf(' - ') !== -1 || sanArr[1].indexOf(' - ') === -1 || (sanArr[0].split(' ').length>3 && sanArr[0].indexOf(' - ') !== -1)) {
    sanArr.shift()
  }
  for (let i=0;i<sanArr.length;i++) {
    if (sanArr[i+1] !== undefined) {
      const hyphenDex = sanArr[i+1].indexOf(' - ')
      const company = sanArr[i+1].slice(0, hyphenDex)
      const role = sanArr[i+1].slice(hyphenDex+3)

      const personIndex = people.findIndex(obj => obj.full_name === sanArr[i])
      if (personIndex === -1) {
        people.push({
          full_name: sanArr[i],
          company: company,
          role: role
        })
        i++
      } else {
        people[personIndex].company = company
        people[personIndex].role = role
        i++
      }
    }
  }
};

const toCSV = (peopleArray) => {
  const csvConfig = mkConfig({ useKeysAsHeaders: true })

  const csv = generateCsv(csvConfig)(peopleArray)
  const filename = `${csvConfig.filename}.csv`
  const csvBuffer = new Uint8Array(Buffer.from(asString(csv)))

  writeFile(filename, csvBuffer, (err) => {
    if (err) throw err
    console.log("CSV Saved In Root Directory As: ", filename)
    console.log(`Ran in ${(performance.now() - startTime)/1000}s`)
  });
}

const processImages = async () => {
  await loadMyFunction()

  for (const key of imageKeys) {
    const imagePath = `./images/${key}.png`
    const cropOptions = { left: 152, top: 335, width: 800, height: 1268 }

    try {
      const text = await cropAndRecognizeImage(imagePath, cropOptions)
      parseData(text)
    } catch (error) {
      console.error('Error processing image:', error)
    }
  }

  console.log(`Number of People Found: ${people.length}`)

  toCSV(people)
}

processImages()