export default defineContentScript({
  matches: ['*://careerpathways.nyc/*'],
  main() {
    console.debug('[ces-addon] settings: script injected')

    const userDropdown = document.querySelector('#dropdown + .dropdown-menu')

    if (!(userDropdown instanceof HTMLElement)) return

    console.debug('[ces-addon] settings: user dropdown found')

    const settingsBtn = document.createElement('a')
    settingsBtn.href = '#'
    settingsBtn.className = 'nav-link text-dark'
    settingsBtn.textContent = 'Settings'

    userDropdown.appendChild(settingsBtn)
    
    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault()
      console.debug('[ces-addon] settings: settings button clicked')
    })
  },
})