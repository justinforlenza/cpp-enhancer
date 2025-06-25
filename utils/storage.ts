const popupsEnabled = storage.defineItem<boolean>(
  'local:enablePopups',
  {
    fallback: true,
  },
)

const defaultSchoolValue = storage.defineItem<string | null>(
  'local:defaultSchoolValue',
  {
    fallback: null,
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
  defaultSchoolValue,
  defaultSchoolEnabled,
  styleTweaksEnabled
}