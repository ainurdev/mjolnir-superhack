const watchFileInput = () => {
  const fileInput = document.querySelector('.input-file input')
  const fileLabel = document.querySelector('.input-file__text')

  fileInput.addEventListener('change', (e) => {
    // show selected directory
    const path = e.target.value.split('\\')
    fileLabel.innerHTML = path[path.length - 1]
  })
}

const watchForm = () => {
  const form = document.querySelector('form')
  const submitButton = form.querySelector('input[type=submit]')
  const fileInput = form.querySelector('.input-file input')
  const fileLabel = form.querySelector('.input-file__text')
  const result = document.querySelector('.result')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    submitButton.disabled = true
    submitButton.innerHTML = 'Uploading...'
    result.classList.remove('error')

    const formData = new FormData()
    formData.append('file', fileInput.files[0])

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        submitButton.disabled = false
        submitButton.innerHTML = 'Upload'
        fileInput.value = ''
        fileLabel.innerHTML = 'Select directory'
        result.innerHTML = res.message
      })
      .catch((err) => {
        submitButton.disabled = false
        submitButton.innerHTML = 'Upload'
        fileInput.value = ''
        fileLabel.innerHTML = 'Select directory'
        result.classList.add('error')
        result.innerHTML = err.message
      })
  })
}

const activateHelpButton = () => {
  const helpButton = document.getElementById('help-button')

  helpButton.addEventListener('click', (e) => {
    const help = document.querySelector('.help-container')
    help.classList.toggle('hidden')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  watchFileInput()
  watchForm()
  activateHelpButton()
})
