import type { ContentScriptContext } from '#imports'

import './style.css'

export function createModalUi(ctx: ContentScriptContext) {
  const ui = createIntegratedUi(ctx, {
    position: 'inline',
    anchor: 'body',
    onMount: (container) => {
      const dialog = document.createElement('dialog')
      dialog.className = 'cpp-addon-modal'

      // Create modal content wrapper
      const modalContent = document.createElement('div')
      modalContent.className = 'cpp-addon-modal-content'

      // Create content container
      const contentContainer = document.createElement('div')
      contentContainer.className = 'cpp-addon-modal-body'

      // Assemble the modal
      modalContent.appendChild(contentContainer)
      dialog.appendChild(modalContent)

      // Close on Escape key (native behavior, but can be customized)
      dialog.addEventListener('cancel', (e) => {
        e.preventDefault()
      })

      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
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
