import { createModalUi } from '@/components/modal'

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/Students/Index/*',
    '*://careerpathways.nyc/Students/*',
  ],
  main(ctx) {
    const modal = createModalUi(ctx)

    modal.mount()

    ctx.addEventListener(window, 'click', (event) => {
      if (
        modal.mounted === undefined ||
        !(modal.mounted.firstChild instanceof HTMLDivElement)
      )
        return

      console.debug('ces-addon: student-profile.content: click handled')
      const target = event.target

      if (!(target instanceof HTMLAnchorElement)) return

      console.debug('ces-addon: student-profile.content: is anchor element')

      if (target.innerText !== 'View') return

      console.debug('ces-addon: student-profile.content: is `View` link')

      const currentTabPane = document.querySelector('.tab-pane.active')

      if (currentTabPane === null) return

      const originalId = currentTabPane.id

      console.debug(
        'ces-addon: student-profile.content: current tab pane:',
        currentTabPane.id,
      )

      currentTabPane.id = `ces-addon-${originalId}`
      console.debug(
        'ces-addon: student-profile.content: changed original tab id',
      )

      modal.mounted.firstChild.id = originalId
      console.debug('ces-addon: student-profile.content: updated modal id')
      modal.mounted.showModal()
      console.debug('ces-addon: student-profile.content: show modal')
      console.debug(
        'ces-addon: student-profile.content: finished handling click',
      )
    })
  },
})
