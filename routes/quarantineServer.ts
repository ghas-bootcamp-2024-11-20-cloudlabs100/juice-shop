/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path = require('path')
import { type Request, type Response, type NextFunction } from 'express'

module.exports = function serveQuarantineFiles () {
  return ({ params, query }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    const rootFolder = path.resolve('ftp/quarantine/')
    const resolvedPath = path.resolve(rootFolder, file)

    if (resolvedPath.startsWith(rootFolder) && !file.includes('/')) {
      res.sendFile(resolvedPath)
    } else {
      res.status(403)
      next(new Error('Invalid file path!'))
    }
  }
}
