const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');


// Add an EventListener to toggle the show class off and on 
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show')
    navlinks.classList.toggle('show')

});