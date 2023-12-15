const fs = require('fs')
const path = require('path')

const getKeys = () => {
  const imagesDir = path.join(__dirname, 'images')
  try {
    const files = fs.readdirSync(imagesDir)
    return files.filter(file => /\.(png|jpe?g|gif)$/i.test(file)).map(file => file.replace(/\..+$/, ''))
  } catch (err) {
    console.error('Error reading images directory:', err)
    return []
  }
};

module.exports = { getKeys }