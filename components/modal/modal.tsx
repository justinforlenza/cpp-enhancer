import type { ParentComponent } from 'solid-js'

export interface ModalProps {
  id?: string
  preventClose?: boolean
  title?: string
  description?: string
}

import './styles.css'

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
      id={props.id}
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
        <Show when={props.title}>
          <div class="cpp-addon-modal-header">
            <div class="cpp-addon-modal-title">{props.title}</div>
            <Show when={props.description}>
              <p class="ces-addon-modal-description">{props.description}</p>
            </Show>
          </div>
        </Show>
        <div class="cpp-addon-modal-body">{props.children}</div>
      </div>
    </dialog>
  )
}
