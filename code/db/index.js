const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const path = require('path')
const dfSource = path.join(__dirname, 'data.json')

module.exports = (dbSource = dfSource) => {
  const parentDir = path.dirname(dbSource)
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(path.join(parentDir))
  }
  const adapter = new FileSync(dbSource)
  const low = lowdb(adapter)
  low.defaults({ project_name: '', tree: [], branch: [] }).write()
  return low
}
