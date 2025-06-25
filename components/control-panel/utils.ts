export async function getSchools() {
  const response = await fetch(
    '/Reporting/School/SchoolAdditionalLiteracySkillsReport',
  )
  if (!response.ok) {
    throw new Error('Failed to fetch schools')
  }
  const data = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'text/html')
  const select = doc.getElementById('selectSchool')

  if (!(select instanceof HTMLSelectElement)) {
    throw new Error('SchoolID select element not found')
  }

  const options = select.options

  if (options.length === 0) {
    throw new Error('No schools found in the select element')
  }

  const schools = Array.from(options).map((option) => ({
    value: option.value,
    text: option.textContent || '',
  })).filter((option => option.value !== ''))

  return schools
}
