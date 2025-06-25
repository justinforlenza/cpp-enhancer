import type { ParentComponent } from 'solid-js'

import type { ContentScriptContext } from '#imports'

import { render } from 'solid-js/web'

interface ModalProps {
  id?: string
  preventClose?: boolean
}

export const Modal: ParentComponent<ModalProps> = (props) => {
  let dialog!: HTMLDialogElement

  const close = () => {
    if (props.preventClose) {
      return
    }
    dialog.close()
  }

  return (
    <dialog
      class="cpp-addon-modal"
      ref={dialog}
      on:cancel={close}
      on:click={(e) => {
        if (e.target === dialog) close()
      }}
      on:keydown={(e) => {
        if (e.key === 'Escape') {
          close()
        }
      }}
    >
      <div class="cpp-addon-modal-content">
        <div class="cpp-addon-modal-body">{props.children}</div>
      </div>
    </dialog>
  )
}

export function createModalUi(
  ctx: ContentScriptContext,
  preventClose = false
) {
  const ui = createIntegratedUi(ctx, {
    position: 'inline',
    anchor: 'body',
    onMount: (container) => {
      const modal = <Modal preventClose={preventClose} />

      const unmount = render(() => modal, container)

      return {
        modal,
        unmount
      }
    },
    onRemove: (ui) => {
      ui?.unmount?.()
    },
  })

  ui.mount()

  return ui
}
