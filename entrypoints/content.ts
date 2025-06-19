export default defineContentScript({
  matches: ['*://careerpathways.nyc/*'],
  main() {
    console.log('Hello content.')
  },
})
