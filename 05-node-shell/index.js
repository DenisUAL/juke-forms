'use strict'
const fs = require('fs')
const debug = require('debug')('shell')
const clear = require('clear')

function parse(input) {
  return input.toString().trim()
    .split('|')
    .map(cmd => cmd
      .trim()
      .split(/\s+/)
      .map(word => {   
        if (word.startsWith('$')) {
          // Perform interpolation          
          return process.env[word.slice(1)]
        }
        return word
      })
    )
}

/**
 * command(args: [...String],
 *         stdin: String,
 *         done: (err: Error?, data: String?) -> ())
 */
const commands = {
  echo(args, stdin, done) {
    done(null, args.join(' '))
  },

  clear(args, stdin, done) {
    clear()
    process.nextTick(done)
  },

  date(args, stdin, done) {
    done(null, new Date().toString())
  },

  grep([regex], stdin, done) {
    const re = new RegExp(regex)
    done(null, stdin
      .split('\n')
      .filter(line => re.test(line))
      .join('\n'))
  },

  ls(args, stdin, done) {
    return fs.readdir('.', (err, files) => {
      if (err) return done(err)
      done(null, files.join('\n'))
    })
  },

  cat(files, stdin, done, forEachFile=buffer => buffer.toString()) {
    // If standard in was provided, return immediately with it.
    if (stdin) { return done(null, stdin) }

    const buffers = []
    let outstandingReads = files.length
    files.forEach((file, index) =>
      fs.readFile(file, (err, data) => {
        buffers[index] = err || data
        if (--outstandingReads === 0) {
          done(null, buffers
            .map(forEachFile)
            .join('\n'))
        }
      }))
  },

  head(files, stdin, done) {
    this.cat(files, stdin, done,
      buffer => buffer
        .toString()
        .split('\n')
        .slice(0, 10)
        .join('\n'))
  },

  upcase(files, stdin, done) {
    done(null, stdin.toUpperCase())
  },

  tail(files, stdin, done) {
    this.cat(files, stdin, done,
      buffer => buffer
        .toString()
        .split('\n')
        .slice(-10)
        .join('\n'))
  },
}

function runPipe(pipeline, stdin=null, done) {
  if (!pipeline.length) {
    return done(null, stdin)
  }
  const [[cmd, ...args], ...restOfTheCommands] = pipeline
  if (cmd in commands) {
    commands[cmd](args, stdin, (err, data) => {
      if (err) return done(err)
      runPipe(restOfTheCommands, data, done)
    })
  } else {
    done(`${cmd}: command not found`)
  }
}

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

rl.on('line', data => {
  const commands = parse(data)
  debug(commands)
  const done = (err, data) => {
    if (err) console.error(err)
    if (data) console.log(data)
    rl.prompt()
  }  
  runPipe(commands, null, done)
})
rl.prompt()