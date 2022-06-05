import dgram from 'node:dgram'
import logger from '../config/logger.config'

const socket = dgram.createSocket('udp4')

socket.on('error', (err) => {
  logger.info(`Server error:\n${err.stack}`)
  socket.close()
})

socket.on('message', (msg, rinfo) => {
  logger.info(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
})

socket.on('listening', () => {
  const address = socket.address()
  logger.info(`Server listening ${address.address}:${address.port}`)
})

socket.bind({
  address: '127.0.0.1',
  port: 9191,
})

export default socket
