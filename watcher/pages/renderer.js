const data = {
  selectedDir: null,
  streaming: false
}

const watchFileInput = () => {
  const fileInput = document.querySelector('.input-file')
  const fileLabel = fileInput.querySelector('.input-file__text')

  fileInput.addEventListener('click', () => {
    window.mapi.selectFolder().then((path) => {
      if (!path) {
        return
      }

      fileLabel.innerHTML = path
      data.selectedDir = path
    })
  })
}

const watchForm = () => {
  const form = document.querySelector('form')
  const submitButton = form.querySelector('input[type=submit]')
  const result = document.querySelector('.result')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (data.streaming) {
      return
    }

    submitButton.disabled = true
    submitButton.innerHTML = 'Starting Stream...'
    result.classList.remove('error')
    result.classList.add('hidden')

    window.mapi.startUpload(data.selectedDir)
      .then((res) => {
        if (res && res.error) {
          throw res.error
        }

        data.streaming = true
        submitButton.disabled = false
        submitButton.innerHTML = 'Streaming'
        result.classList.remove('hidden')
        result.innerHTML = "We are watching the selected directory for segments and streaming them."
      })
      .catch((err) => {
        submitButton.disabled = false
        submitButton.innerHTML = 'Upload'
        result.classList.add('error')
        result.classList.remove('hidden')
        result.innerHTML = err && err || "Something went wrong, try again in a few seconds."
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

const logUploadMessage = () => {
  window.mapi.onUploadMessage(({message, ...rest}) => {
    const log = document.querySelector('.log')
    log.classList.remove('hidden')
    log.innerHTML += `<p>${new Date().toString()} ${message} ${rest ? JSON.stringify(rest) : rest}</p>`
  })
}

document.addEventListener('DOMContentLoaded', () => {
  watchFileInput()
  watchForm()
  activateHelpButton()
  logUploadMessage()
})
