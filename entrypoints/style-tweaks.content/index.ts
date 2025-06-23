import './style.css'

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/*',
  ],
  main() {
    console.debug('[ces-addon] style-tweaks: script injected')
    const navLinks = document.querySelectorAll('.dropdown-menu a.nav-link')
    console.debug('[ces-addon] style-tweaks: dropdown nav links found', navLinks.length)
  }
})
