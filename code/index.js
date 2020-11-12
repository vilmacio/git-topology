const Tree = require('./tree')

async function main () {
  const tree = new Tree()
  await tree.getProjectTree()
  const files = await tree.filesList()
  await tree.save(files)
}

main()
