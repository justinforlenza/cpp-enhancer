import { render } from 'solid-js/web'
import type { ContentScriptContext } from '#imports'

import { ControlPanel } from './controlPanel'

async function createControlPanel(ctx: ContentScriptContext) {
  const ui = createShadowRootUi(ctx, {
    name: 'control-panel',
    position: 'inline',
    anchor: 'body',
    onMount: (container) => {
      const panel = <ControlPanel />

      const unmount = render(() => panel, container)

      return {
        panel,
        unmount,
      }
    },
    onRemove: (ui) => {
      ui?.unmount?.()
    },
  })

  return ui
}

export { createControlPanel }
