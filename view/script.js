async function getData () {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    fetch('../code/db/data.json')
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  })
}

const sectionTree = document.getElementById('tree')

async function setProjectName () {
  const data = await getData()
  const projectNameElement = document.getElementById('project-name')
  projectNameElement.innerText = `> ${data.project_name}`

  const projectVersionElement = document.getElementById('project-version')
  projectVersionElement.innerText = `v${data.project_version}`
}

async function createFileDiv () {
  const data = await getData()

  for (const file of data.tree) {
    const fileDiv = document.createElement('div')
    fileDiv.innerHTML = `
    <div class="file">
      <p id="git-status">${file.status[0]}</p>
      <p id="file-name">${file.name}</p>
      <div class="label">
          <p>${file.path}</p>
      </div>
    </div>`

    sectionTree.appendChild(fileDiv)
  }
}

setProjectName()
createFileDiv()
