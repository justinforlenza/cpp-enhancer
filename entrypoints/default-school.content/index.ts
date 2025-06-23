const emptyValues = ['0', '']

const schoolSelectors = [
  'SchoolID',
  'ddlSchool',
  'ddlSchoolID',
  'SchoolId',
  'thisSearch.SchoolID',
]
  .map((name) => `select[name="${name}"]`)
  .join(', ')

export default defineContentScript({
  matches: ['*://careerpathways.nyc/*'],
  main() {
    console.debug('[cpp-addon] default-school: script injected')

    const schoolSelect = document.querySelector(schoolSelectors)

    console.debug('[cpp-addon] default-school: selects found:', schoolSelect)

    if (!(schoolSelect instanceof HTMLSelectElement)) return

    console.debug('[cpp-addon] default-school: school select input found')

    console.debug(
      '[cpp-addon] default-school: current value:',
      schoolSelect.value,
    )

    if (!emptyValues.includes(schoolSelect.value)) return

    console.debug('[cpp-addon] default-school: school does not have a value')

    const options = Array.from(schoolSelect.options)
      .map((option) => option.value)
      .filter((value) => !emptyValues.includes(value))

    if (options.length === 0) return

    console.debug('[cpp-addon] default-school: options found:', options)

    if (options.length > 1) return

    console.debug(
      '[cpp-addon] default-school: only one option found, setting it as default',
    )

    schoolSelect.value = options[0]

    console.debug(
      '[cpp-addon] default-school: default school set to:',
      schoolSelect.value,
    )

    schoolSelect.dispatchEvent(new Event('change'))

    console.debug('[cpp-addon] default-school: change event dispatched')
  },
})
