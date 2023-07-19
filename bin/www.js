#! /usr/bin/env node
const { Command } = require('commander')

const commands = require('./commands')
const multiLineTailwindcss = require('../src/index')

const program = new Command()

for (let i = 0, l = commands.length; i < l; i++) {
  const { option, descriptor } = commands[i]

  program.option(option, descriptor)
}

const cwd = process.cwd()
const { maxLength = 80, tabLength = 2 } = program.parse()._optionValues

multiLineTailwindcss(cwd, maxLength, tabLength)
