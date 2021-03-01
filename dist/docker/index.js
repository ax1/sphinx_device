const fetch = require('node-fetch')
const { readFile } = require('fs').promises

const ENDPOINT = "http://localhost:9090/sensors"

async function send(msg) {
  const res = await fetch(ENDPOINT, { method: 'post', body: msg })
  if (!res.ok) throw res
}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

async function main() {
  const lines = (await readFile('log.txt', { encoding: 'utf-8' })).split('\n')
  for (let line of lines) {
    await sleep(1000)
    console.log(line)
  }
}

main().catch(console.error)
