module.exports = { createPort, createPortSync }
const SerialPort = require('serialport')


/******************************************************************************************************************************************
 ██████   █████  ████████ ██   ██ ███████ ██████      ███████ ███████ ██████  ██  █████  ██          ██████   █████  ████████  █████
██       ██   ██    ██    ██   ██ ██      ██   ██     ██      ██      ██   ██ ██ ██   ██ ██          ██   ██ ██   ██    ██    ██   ██
██   ███ ███████    ██    ███████ █████   ██████      ███████ █████   ██████  ██ ███████ ██          ██   ██ ███████    ██    ███████
██    ██ ██   ██    ██    ██   ██ ██      ██   ██          ██ ██      ██   ██ ██ ██   ██ ██          ██   ██ ██   ██    ██    ██   ██
 ██████  ██   ██    ██    ██   ██ ███████ ██   ██     ███████ ███████ ██   ██ ██ ██   ██ ███████     ██████  ██   ██    ██    ██   ██
******************************************************************************************************************************************/
/**
 * Create listeners to read serial data from USB createPort.
 * @param  {String}   usb_addr the port location in the file system. Use dmesg to display the port. Example: '/dev/tty/USB0'
 * @param  {number}   baudRate speed when reading the serial bits
 * @param  {Function} func     async or sync custom function to parse the data sent in the serial: A NORMAL function(data) or async NORMAL function(data), Note this is not a cb(err,data). If error here, the error is passed as parameter (sync functions) or as catchable exception (for async functions, since the error is fulfilled)
 * @param  {boolean}  isSync   [optional] execute callback AFTER the last callback was executed
 * @return {SerialPort}        the serial port object
 */
function createPort(usb_addr, baudRate, func, isSync) {
  const port = new SerialPort(usb_addr, { baudRate })
  let message = ''
  //port.pipe(new Readline({ delimiter: '\r\n' }))

  port.on('error', async err => func(new Error(err)))

  port.on('data', async function (data) {
    message += data.toString()
    if (message.includes('\n')) {
      if (isSync) port.pause()
      const index = message.lastIndexOf('\n')
      const payload = message.substring(0, index)
      message = message.substring(index + 1)
      try {
        await func(payload)
      } catch (err) {
        const error = (err instanceof Error) ? err : new Error(err)
        await func(error)
      }
      if (isSync) port.resume()
    }
  })

  return port
}

/**
 * Create listeners to read serial data from USB createPort. See the async version of the method for more info.
 *
 * This method is sync. The method does not lock the event loop,
 * but the callback is not executed (keeps reading from serial) until the  last operation is finish,
 * @param  {String}   usb_addr the port location in the file system. Use dmesg to display the port. Example: '/dev/tty/USB0'
 * @param  {number}   baudRate speed when reading the serial bits
 * @param  {Function} func     custom function to parse the data sent in the serial
 * @return {void}
 */
function createPortSync(usb_addr, baudRate, func) {
  return createPort(usb_addr, baudRate, func, true)
}