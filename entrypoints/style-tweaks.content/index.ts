import './style.css'

function replaceDividerLinks () {
  console.debug('[ces-addon] style-tweaks: replaceDividerLinks() begin')

  const navLinks = document.querySelectorAll('.dropdown-menu a.nav-link')
  console.debug('[ces-addon] style-tweaks: dropdown nav links found', navLinks.length)

  const dividerLinks = Array.from(navLinks).filter(link => link.textContent === '---------------------------------')

  console.debug('[ces-addon] style-tweaks: dividers found', dividerLinks.length)

  dividerLinks.forEach(link => {
    const divider = document.createElement('div')
    divider.className = 'dropdown-divider'
    link.replaceWith(divider)
  })

  console.debug('[ces-addon] style-tweaks: divider links replaced with divider elements')

  console.debug('[ces-addon] style-tweaks: replaceDividerLinks() end')
}

export default defineContentScript({
  matches: [
    '*://careerpathways.nyc/*',
  ],
  main() {
    console.debug('[ces-addon] style-tweaks: script injected')
    
    replaceDividerLinks()
  }
})
