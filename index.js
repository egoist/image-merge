'use strict'
const path = require('path')
const gm = require('gm')

module.exports = function (images, opts) {
  return new Promise((resolve, reject) => {
    if (!images || images.length < 2) {
      return reject(new Error('You should provide at lease 2 images to merge!'))
    }
    opts = opts || {}
    if (!opts.output) {
      return reject(new Error('Please provide a output path to write the merged image!'))
    }
    const merged = gm(images[0])
    merged.append.apply(merged, images.slice(1).concat([opts.leftToRight]))
    const dest = path.resolve(opts.output)
    merged.write(dest, err => {
      if (err) reject(err)
      else resolve(dest)
    })
  })
}
