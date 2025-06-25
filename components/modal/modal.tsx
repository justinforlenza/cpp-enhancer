import type { ParentComponent } from "solid-js"

export interface ModalProps {
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
        <div class="cpp-addon-modal-body">{props.children}</div>
      </div>
    </dialog>
  )
}