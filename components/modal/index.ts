import type { ContentScriptContext } from '#imports'

import './style.css'

export function createModalUi(
  ctx: ContentScriptContext,
  preventClose = false,
  id = '',
) {
  const ui = createIntegratedUi(ctx, {
    position: 'inline',
    anchor: 'body',
    onMount: (container) => {
      const dialog = document.createElement('dialog')
      dialog.id = id
      dialog.className = 'cpp-addon-modal'

      const modalContent = document.createElement('div')
      modalContent.className = 'cpp-addon-modal-content'

      const contentContainer = document.createElement('div')
      contentContainer.className = 'cpp-addon-modal-body'

      modalContent.appendChild(contentContainer)
      dialog.appendChild(modalContent)

      dialog.addEventListener('cancel', (e) => {
        if (preventClose) {
          e.preventDefault()
          return
        }
        dialog.close()
      })

      dialog.addEventListener('click', (e) => {
        if (!preventClose && e.target === dialog) dialog.close()
      })

      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (preventClose) {
            e.preventDefault()
            return
          }
          dialog.close()
        }
      })

      // Add to document body
      container.appendChild(dialog)

      return dialog
    },
    onRemove: (root) => {
      root?.remove()
    },
  })

  return ui
}
