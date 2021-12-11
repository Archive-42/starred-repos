window.onGatsbyRouteUpdate = function() {
// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Mobile menu
var menuToggle = document.querySelectorAll('.menu-toggle');

for (var i = 0; i < menuToggle.length; i++) {
  menuToggle[i].addEventListener('click', function(e){
    document.body.classList.toggle('menu--opened');
    e.preventDefault();
  },false);
}

document.body.classList.remove('menu--opened');

window.addEventListener('resize', function () {
  if (menuToggle.offsetParent === null) {
    document.body.classList.remove('menu--opened');
  }
}, true);

// Accordion
var accordions = document.querySelectorAll('.faq-accordion');
Array.from(accordions).forEach((accordion) => {
  var ba = new BadgerAccordion(accordion, {
    headerClass: '.accordion-trigger',
    panelClass: '.accordion-panel',
    panelInnerClass: '.accordion-content',
    openMultiplePanels: true
  });
});

};