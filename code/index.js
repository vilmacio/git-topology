const Tree = require('./tree')

async function main () {
  const tree = new Tree()
  await tree.getProjectTree()
  const files = await tree.filesList()
  tree.save(files)
}

main()
