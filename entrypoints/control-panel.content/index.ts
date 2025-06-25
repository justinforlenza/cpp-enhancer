import { createControlPanel } from "@/components/control-panel"

export default defineContentScript({
  matches: ['*://careerpathways.nyc/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
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
    settingsBtn.textContent = '✨ Enhancer Control Panel'
    userDropdown.appendChild(settingsBtn)

    console.debug(
      '[cpp-addon] control-panel: open button added to user dropdown',
    )

    const ui = await createControlPanel(ctx)

    ui.mount()

    console.debug('[cpp-addon] control-panel: ui mounted')

    settingsBtn.addEventListener('click', (event) => {
      console.debug('[cpp-addon] control-panel: settings button clicked')

      event.preventDefault()
      if (ui.mounted === undefined || !(ui.mounted.panel instanceof HTMLDialogElement)) return

      console.debug('[cpp-addon] control-panel: dialog is ready')

      ui.mounted.panel.showModal()

      console.debug('[cpp-addon] control-panel: dialog displayed')

    })
  },
})
