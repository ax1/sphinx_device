const fetch = require('node-fetch')
const readline = require('readline')
const { createReadStream } = require('fs')

const ENDPOINT = "http://localhost:9090/sensors"

async function send(msg) {
  const res = await fetch(ENDPOINT, { method: 'post', body: msg })
  if (!res.ok) throw res
}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

async function main() {
  const rl = readline.createInterface({
    input: createReadStream('log.txt'),
    /*output: process.stdout,
    terminal: false*/
  })

  for await (const line of rl) {
    console.log(line)
    rl.pause()
    sleep(10000).then(() => rl.resume()).catch(() => rl.resume())
  }

  // rl.on('line', async line => {
  //   console.log(line)
  //   rl.pause()
  //   sleep(10000).then(() => rl.resume()).catch(() => rl.resume())
  // })

}

main().catch(console.error)
