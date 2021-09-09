class ResultHandler {
  Success(res, data) {
    res.status(200).json({success: true, data})
  }
  Created(res, data) {
    res.status(201).json({success: true, data})
  }
  BadRequest(res, message) {
    res.status(400).json({success: false, errorMessage: message ? message : 'bad request'})
  }
  Unauthorized(res, message) {
    res.status(401).json({success: false, errorMessage: message ? message : 'unauthorized'})
  }
  NotFound(res, message) {
    res.status(404).json({success: false, errorMessage: message ? message : 'not found'})
  }
}

module.exports = ResultHandler