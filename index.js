const util = require('./util')
const fetch = require('node-fetch')

const USB_ADDRESS = '/dev/ttyACM0' // CHANGE THIS
const BAUDRATE = 115200
const ENDPOINT = "http://localhost:9090/sensors"

util.createPortSync(USB_ADDRESS, BAUDRATE, processor)

async function processor(data) {
  data = data.replace("\r", "")
  console.log(data)
  if (data.includes(' ')) return //Device can also send log data
  try {
    //console.log(data)
    await send(data)
  } catch (err) {
    console.error(err)
  }
}

async function send(msg) {
  const res = await fetch(ENDPOINT, { method: 'post', body: msg })
  if (!res.ok) throw res
}
