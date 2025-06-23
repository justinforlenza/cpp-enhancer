import { createModalUi } from '@/components/modal'

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/Students/Index/*',
    '*://careerpathways.nyc/Students/*',
  ],
  main(ctx) {
    console.debug('[ces-addon] popup: script injected')

    const modal = createModalUi(ctx)

    modal.mount()

    ctx.addEventListener(window, 'click', (event) => {
      console.debug('[ces-addon] popup: click handled')

      if (
        modal.mounted === undefined ||
        !(modal.mounted.firstChild instanceof HTMLDivElement)
      )
        return

      console.debug('[ces-addon] popup: modal is mounted')
      const target = event.target

      if (!(target instanceof HTMLAnchorElement)) return

      console.debug('[ces-addon] popup: is anchor element')

      if (!(['View', 'Add New'].includes(target.innerText))) return

      console.debug('[ces-addon] popup: is `View` or `Add New` link')

      if (target.getAttribute('onclick')?.includes('Download')) return

      console.debug('[ces-addon] popup: is not a `Download` link')

      const currentTabPane = document.querySelector('.tab-pane.active')

      if (currentTabPane === null) return

      const originalId = currentTabPane.id

      console.debug('[ces-addon] popup: current tab pane:', currentTabPane.id)

      currentTabPane.id = `ces-addon-${originalId}`
      console.debug('[ces-addon] popup: changed original tab id')

      modal.mounted.firstChild.id = originalId
      console.debug('[ces-addon] popup: updated modal id')
      modal.mounted.showModal()
      console.debug('[ces-addon] popup: show modal')
      console.debug('[ces-addon] popup: finished handling click')
    })
  },
})
