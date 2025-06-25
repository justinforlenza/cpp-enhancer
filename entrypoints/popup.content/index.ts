import { createModalUi } from '@/components/modal'

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/Students/Index/*',
    '*://careerpathways.nyc/Students/*',
  ],
  async main(ctx) {
    console.debug('[cpp-addon] popup: script injected')

    const enabled = await popupsEnabled.getValue()

    if (!enabled) return

    console.debug('[cpp-addon] popup: feature enabled')

    const ui = createModalUi(ctx, {preventClose: true})

    ui.mount()

    ctx.addEventListener(window, 'click', (event) => {
      console.debug('[cpp-addon] popup: click handled')

      if (
        ui.mounted === undefined ||
        !(ui.mounted.modal instanceof HTMLDialogElement) ||
        !(ui.mounted.modal.firstChild instanceof HTMLDivElement)
      )
        return

      console.debug('[cpp-addon] popup: modal is mounted')
      const target = event.target

      if (!(target instanceof HTMLAnchorElement)) return

      console.debug('[cpp-addon] popup: is anchor element')

      if (!['View', 'Add New'].includes(target.innerText)) return

      console.debug('[cpp-addon] popup: is `View` or `Add New` link')

      if (target.getAttribute('onclick')?.includes('Download')) return

      console.debug('[cpp-addon] popup: is not a `Download` link')

      const currentTabPane = document.querySelector('.tab-pane.active')

      if (currentTabPane === null) return

      const originalId = currentTabPane.id

      console.debug('[cpp-addon] popup: current tab pane:', currentTabPane.id)

      currentTabPane.id = `cpp-addon-${originalId}`
      console.debug('[cpp-addon] popup: changed original tab id')

      ui.mounted.modal.firstChild.id = originalId
      console.debug('[cpp-addon] popup: updated modal id')
      ui.mounted.modal.showModal()
      console.debug('[cpp-addon] popup: show modal')
      console.debug('[cpp-addon] popup: finished handling click')
    })
  },
})
