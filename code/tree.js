const fs = require('fs').promises
const path = require('path')
const prompt = require('./prompt')
const db = require('./db')

class Tree {
  constructor () {
    this.projectDir = path.join(__dirname, '..')
    this.resultPrompt = null
    this.tree = []
  }

  async getProjectTree (dir) {
    this.tree = await recursiveReading(dir = this.projectDir)

    async function recursiveReading (dir) {
      const dirents = await fs.readdir(dir, {
        withFileTypes: true
      })
      const files = await Promise.all(dirents.map(dirent => {
        if (dir.search('\\.git') > 0 || dir.search('node_modules') > 0) {
          return undefined
        }
        const result = path.resolve(dir, dirent.name)
        return dirent.isDirectory() ? recursiveReading(result) : result
      }))

      const allFiles = files.filter(file => file !== undefined)
      return Array.prototype.concat(...allFiles)
    }
  }

  saveProjectName () {
    const projectPath = path.join(__dirname, '..').split('\\')
    const projectName = projectPath[projectPath.length - 1]
    db().set('project_name', projectName).write()
  }

  async getReturnFromPrompt (filePath) {
    return new Promise(resolve => {
      prompt.execute('git status ' + filePath + ' -s', (result) => {
        resolve(result)
      })
    })
  }

  async statusVerificator (filePath) {
    const result = await this.getReturnFromPrompt(JSON.stringify(filePath))
    if (result.includes('A ')) {
      return 'Added'
    }
    if (result.includes('M ')) {
      return 'Modified'
    }
    if (result.includes('?? ')) {
      return 'Untracked'
    }
    return '--'
  }

  async filesList () {
    const files = await Promise.all(this.tree.map(async (path) => {
      const splitedItem = path.split('\\')
      const fileName = splitedItem[splitedItem.length - 1]
      return {
        name: fileName,
        path: path,
        status: await this.statusVerificator(path)
      }
    }))
    return Array.prototype.concat(...files)
  }

  save (data) {
    db().set('tree', data).write()
  }
}

module.exports = Tree
