import { createModalUi } from '@/components/modal'

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/Students/Index/*',
    '*://careerpathways.nyc/Students/*',
  ],
  main(ctx) {
    console.debug('[cpp-addon] popup: script injected')

    const modal = createModalUi(ctx)

    modal.mount()

    ctx.addEventListener(window, 'click', (event) => {
      console.debug('[cpp-addon] popup: click handled')

      if (
        modal.mounted === undefined ||
        !(modal.mounted.firstChild instanceof HTMLDivElement)
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

      modal.mounted.firstChild.id = originalId
      console.debug('[cpp-addon] popup: updated modal id')
      modal.mounted.showModal()
      console.debug('[cpp-addon] popup: show modal')
      console.debug('[cpp-addon] popup: finished handling click')
    })
  },
})
