const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
  }
  
  const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    next(error)
  }
  
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
  