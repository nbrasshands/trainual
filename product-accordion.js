// Accordion Settings 
const accSettings = {
  speed: 300, // Animation speed
  oneOpen: true, // Close all other accordion items if true
  offsetAnchor: false, // Activate scroll to top for active item
  offsetFromTop: 360, // In pixels – Scroll to top at what distance
  scrollTopDelay: 300, // In Milliseconds – Delay before scroll to top 
  
  classes: {
  	accordion: 'accordion',
    header: 'accordion-header',
    item: 'accordion-item',
    body: 'accordion-body',
    icon: 'accordion-icon',
    active: 'active',
  }
};


const prefix = accSettings.classes

const accordion = (function(){
  const accordionElem = $(`.${prefix.accordion}`)
  const accordionHeader = accordionElem.find(`.${prefix.header}`)
  const accordionItem = $(`.${prefix.item}`)
  const accordionBody = $(`.${prefix.body}`)
  const accordionIcon = $(`.${prefix.icon}`)
  const activeClass = prefix.active
    
  return {
    // pass configurable object literal
    init: function(settings) {
      accordionHeader.on('click', function() {
        accordion.toggle($(this));
        if(accSettings.offsetAnchor) {
        	setTimeout(() => { 
        		$('html').animate({scrollTop: $(this).offset().top-accSettings.offsetFromTop}, accSettings.speed);
    			}, accSettings.scrollTopDelay);
        }
      });
      
      $.extend(accSettings, settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $(`.${prefix.item}.${activeClass}`).length > 1) {
        $(`.${prefix.item}.${activeClass}:not(:first)`).removeClass(activeClass).find(`.${prefix.header} > .${prefix.icon}`).removeClass(activeClass);
      }
      // reveal the active accordion bodies
      $(`.${prefix.item}.${activeClass}`).find(`> .${prefix.body}`).show();
      
    },
    
    toggle: function($this) {
      if(accSettings.oneOpen && $this[0] != $this.closest(accordionElem).find(`> .${prefix.item}.${activeClass} > .${prefix.header}`)[0]) {
        $this.closest(accordionElem).find(`> .${prefix.item}`).removeClass(activeClass).find(accordionBody).slideUp(accSettings.speed);
        $this.closest(accordionElem).find(`> .${prefix.item}`).find(`> .${prefix.header} > .${prefix.icon}`).removeClass(activeClass);
      }
      
      // show/hide the clicked accordion item
      $this.closest(accordionItem).toggleClass(`${activeClass}`).find(`> .${prefix.header} > .${prefix.icon}`).toggleClass(activeClass);
      $this.next().stop().slideToggle(accSettings.speed);
    }
  }
})();

$(document).ready(function(){
  accordion.init(accSettings);
});

// Function to update .img-active and .tab-active classes based on the .active class of accordions
function updateActiveClasses() {
    // Loop through each accordion number
    for (let i = 1; i <= 4; i++) {
        let accordion = document.querySelector('.accordion-' + i);
        let accordionBody = document.querySelector('.accordion-body-' + i);
        let imgAccordion = document.querySelector('.img-accordion-' + i);
        let tabInfoActive = document.querySelector('.tab-info-active-' + i);

        // Check if either the accordion or its body has the .active class
        if (accordion.classList.contains('active') || accordionBody.classList.contains('active')) {
            imgAccordion.classList.add('img-active');
            tabInfoActive.classList.add('tab-active');
        } else {
            imgAccordion.classList.remove('img-active');
            tabInfoActive.classList.remove('tab-active');
        }
    }
}

// Event listeners for each accordion
document.querySelectorAll('.accordion-1, .accordion-body-1, .accordion-2, .accordion-body-2, .accordion-3, .accordion-body-3, .accordion-4, .accordion-body-4').forEach(element => {
    element.addEventListener('click', updateActiveClasses);
});

// Set accordion 1 active
window.onload = function() {
    var accordion1 = document.querySelector('#accordion-header-1');
    if (accordion1) {
        accordion1.click();
    }
};
