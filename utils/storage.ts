const popupsEnabled = storage.defineItem<boolean>(
  'local:enablePopups',
  {
    fallback: true,
  },
)

const defaultSchool = storage.defineItem<string>(
  'local:defaultSchool',
  {
    fallback: '',
  },
)

const defaultSchoolEnabled = storage.defineItem<boolean>(
  'local:defaultSchoolEnabled',
  {
    fallback: true,
  },
)

const styleTweaksEnabled = storage.defineItem<boolean>(
  'local:styleTweaksEnabled',
  {
    fallback: true,
  }
)


export {
  popupsEnabled,
  defaultSchool,
  defaultSchoolEnabled,
  styleTweaksEnabled
}