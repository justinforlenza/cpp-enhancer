import { render } from 'solid-js/web'
import type { ContentScriptContext } from '#imports'

import { Modal, type ModalProps } from './modal'

function createModalUi(ctx: ContentScriptContext, props: ModalProps = {}) {
  const ui = createIntegratedUi(ctx, {
    position: 'inline',
    anchor: 'body',
    onMount: (container) => {
      const modal = <Modal {...props} />

      const unmount = render(() => modal, container)

      return {
        modal,
        unmount,
      }
    },
    onRemove: (ui) => {
      ui?.unmount?.()
    },
  })

  return ui
}

export { createModalUi, Modal, type ModalProps }
