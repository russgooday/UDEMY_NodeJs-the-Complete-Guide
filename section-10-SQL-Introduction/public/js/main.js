const backdrop = document.querySelector('.backdrop-overlay')
const sideDrawer = document.querySelector('.mobile-nav')
const menuToggle = document.querySelector('#side-menu-toggle')

function backdropClickHandler () {
  backdrop.classList.remove('visible')
  sideDrawer.classList.remove('open')
}

function menuToggleClickHandler () {
  backdrop.classList.add('visible')
  sideDrawer.classList.add('open')
}

backdrop.addEventListener('click', backdropClickHandler)
menuToggle.addEventListener('click', menuToggleClickHandler)
