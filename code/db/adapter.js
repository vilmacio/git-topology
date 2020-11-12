const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const path = require('path')

module.exports = (dbSource) => {
  const parentDir = path.dirname(dbSource)
  if (!fs.existsSync(parentDir)) {
    console.log(fs.existsSync(dbSource))
    fs.mkdirSync(path.join(parentDir))
  }
  const adapter = new FileSync(dbSource)
  return lowdb(adapter)
}
