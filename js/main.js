
$(document).ready(function() {
	$('#pagepiling').pagepiling({
	    menu: null,
        direction: 'vertical',
        verticalCentered: true,
        anchors: [],
        scrollingSpeed: 400,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
       	normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

		//events
		onLeave: function(index, nextIndex, direction){},
		afterLoad: function(anchorLink, index){},
		afterRender: function(){},
    
    //User Interface
    sectionsColor: ['#5214ff', '#ffffff','#ECCED6','#F2C6BD'],
	});
});
