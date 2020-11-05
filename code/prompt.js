const childProcess = require('child_process')

module.exports = {
  execute: (command, callback) => {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      return callback(stdout)
    })
  }
}
