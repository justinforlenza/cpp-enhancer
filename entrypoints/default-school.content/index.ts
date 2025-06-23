const emptyValues = ['0', '']

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/Students/MainIndex*',
    '*://careerpathways.nyc/Activities/MainIndex*',
    '*://careerpathways.nyc/Worksites/MainIndex*',
    '*://careerpathways.nyc/Activities/Index/0',
    '*://careerpathways.nyc/Reporting/*',
    '*://careerpathways.nyc/Schools/DataDashboard',
    '*://careerpathways.nyc/Students/BulkTrainingPlans/StartPage',
    '*://careerpathways.nyc/Students/BulkSkillsProfile/StartPage',
    '*://careerpathways.nyc/Students/BulkStudentUpload/StartPage'
  ],
  main() {
    console.debug('[ces-addon] default-school: script injected')

    const schoolSelect = document.getElementById('selectSchool') || document.getElementById('SchoolId')

    if (!(schoolSelect instanceof HTMLSelectElement)) return

    console.debug('[ces-addon] default-school: school select input found')

    console.debug('[ces-addon] default-school: current value:', schoolSelect.value)

    if (!emptyValues.includes(schoolSelect.value)) return

    console.debug('[ces-addon] default-school: school does not have a value')

    const options = Array.from(schoolSelect.options).map(option => option.value).filter(value => !emptyValues.includes(value))

    if (options.length === 0) return

    console.debug('[ces-addon] default-school: options found:', options)

    if (options.length > 1) return

    console.debug('[ces-addon] default-school: only one option found, setting it as default')

    schoolSelect.value = options[0]

    console.debug('[ces-addon] default-school: default school set to:', schoolSelect.value)

    let event = new Event('change')

    schoolSelect.dispatchEvent(event)

    console.debug('[ces-addon] default-school: change event dispatched')
  }
})
