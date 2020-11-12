async function getTree () {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    fetch('../code/data.json')
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  })
}

const sectionTree = document.getElementById('tree')

async function createFile () {
  const data = await getTree()

  for (const file of data) {
    const fileDiv = document.createElement('div')
    fileDiv.setAttribute('class', 'file')

    const gitStatusElement = document.createElement('p')
    gitStatusElement.setAttribute('id', 'git-status')
    const statusText = document.createTextNode(file.status[0])

    const fileNameElement = document.createElement('p')
    fileNameElement.setAttribute('id', 'file-name')
    const fileNameText = document.createTextNode(file.name)

    const labelElement = document.createElement('div')
    labelElement.setAttribute('class', 'label')

    const labelTextElement = document.createElement('p')
    const labelText = document.createTextNode(file.path)

    fileDiv.appendChild(gitStatusElement)
    fileDiv.appendChild(fileNameElement)
    fileDiv.appendChild(labelElement)

    labelElement.appendChild(labelTextElement)
    labelTextElement.appendChild(labelText)

    gitStatusElement.appendChild(statusText)
    fileNameElement.appendChild(fileNameText)

    sectionTree.appendChild(fileDiv)
  }
}

createFile()
