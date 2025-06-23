export default defineContentScript({
  matches: ['*://careerpathways.nyc/*'],
  main(ctx) {
    console.debug('[cpp-addon] control-panel: script injected')

    const userDropdown = document.querySelector('#dropdown + .dropdown-menu')

    if (!(userDropdown instanceof HTMLElement)) return

    console.debug('[cpp-addon] control-panel: user dropdown found')

    const divider = document.createElement('div')
    divider.className = 'dropdown-divider'
    userDropdown.appendChild(divider)

    console.debug('[cpp-addon] control-panel: divider added to user dropdown')

    const settingsBtn = document.createElement('a')
    settingsBtn.href = '#'
    settingsBtn.className = 'nav-link text-dark'
    settingsBtn.textContent = 'Enhancer Control Panel'
    userDropdown.appendChild(settingsBtn)

    console.debug(
      '[cpp-addon] control-panel: open button added to user dropdown',
    )

    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault()
      console.debug('[cpp-addon] control-panel: settings button clicked')
    })
  },
})
