#!/usr/bin/env node
'use strict'
const cac = require('cac')
const merge = require('./')

const cli = cac()

cli
  .usage('image-merge <images> [options]')
  .command('*', 'Merge images', (input, flags) => {
    if (input.length === 0) {
      cli.showHelp()
    } else {
      merge(input, flags).then(dest => {
        console.log(`Successfully merged into ${dest}`)
      }).catch(err => {
        console.log(err.message)
        process.exit(1)
      })
    }
  })
  .option('lr, left-to-right', 'Append image from left to right')
  .option('o, output', 'The output path')
  .parse()
