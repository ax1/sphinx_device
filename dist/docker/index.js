const fetch = require('node-fetch')
const { readFile } = require('fs').promises

const HOSPITAL_ADDR = process.env.HOSPITAL_ADDR ?? "http://localhost:9090"
const ENDPOINT = HOSPITAL_ADDR + "/sensors"

async function send(msg) {
  const res = await fetch(ENDPOINT, { method: 'post', body: msg })
  if (!res.ok) throw res
}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

async function main() {
  const lines = (await readFile('log.txt', { encoding: 'utf-8' })).split('\n')
  let r = 0;
  for (let line of lines) {
    await sleep(1000)
    send(line).then(() => console.log(++r)).catch(console.error)
    //console.log(line)
  }
}

main().catch(console.error)
