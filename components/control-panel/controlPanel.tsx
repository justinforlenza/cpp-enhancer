import { Modal } from '../modal'

import './styles.css'
import { getSchools } from './utils'

function ControlPanel() {
  const [data] = createResource(getSchools)

  const [enableStyles] = createResource(styleTweaksEnabled.getValue)
  const [enablePopups] = createResource(popupsEnabled.getValue)
  const [enableDefaultSchool] = createResource(defaultSchoolEnabled.getValue)
  const [defaultSchool] = createResource(defaultSchoolValue.getValue)

  const selectDisabled = createMemo(() => {
    if (data() === undefined) return true
    if (data.loading) return true
    if (data.error) return true
    return false
  })

  return (
    <Modal
      title="Addon Control Panel"
      description="Manage the Career Pathways Enhancer addon settings"
    >
      <fieldset>
        <legend>Style Tweaks</legend>
        <div>Minor style tweaks to enhance the user experience</div>

        <input
          type="checkbox"
          id="enableStyles"
          checked={enableStyles()}
          on:change={(e) => styleTweaksEnabled.setValue(e.target.checked)}
        />
        <label for="enableStyles">Enabled </label>
      </fieldset>
      <fieldset>
        <legend>Popup Windows</legend>
        <div>Popup windows for when editor student records</div>

        <input
          type="checkbox"
          id="enablePopups"
          checked={enablePopups()}
          on:change={(e) => popupsEnabled.setValue(e.target.checked)}
        />
        <label for="enablePopups">Enabled </label>
      </fieldset>

      <fieldset>
        <legend>Default School</legend>
        <div>Automatic school selector for your convenience</div>

        <input
          type="checkbox"
          id="enableDefaultSchool"
          checked={enableDefaultSchool()}
          on:change={(e) => defaultSchoolEnabled.setValue(e.target.checked)}
        />
        <label for="enableDefaultSchool">Enabled </label>
        <Show when={data() !== undefined && (data()?.length ?? 0) > 1}>
          <br /> <label for="defaultSchool">Default School:</label> <br />
          <select
            id="defaultSchool"
            disabled={selectDisabled() || !enableDefaultSchool()}
            on:change={e => defaultSchoolValue.setValue(e.target.value)}
          >
            <option disabled selected={!defaultSchool()}>Select a school</option>
            <For each={data()}>
              {(school) => <option value={school.value} selected={defaultSchool() === school.value}>{school.text}</option>}
            </For>
          </select>
        </Show>
      </fieldset>
    </Modal>
  )
}

export { ControlPanel }
