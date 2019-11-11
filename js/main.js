

// pagepiling

$(document).ready(function() {
	$('#pagepiling').pagepiling({
	    menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['#002C53', '#FE3808', '#002C53', '#FE3808', '#333333'],
        anchors: [],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': ['section1', 'section2', 'section3', 'section4']
        },
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
	});
});

// Blob Colors and Control

const colors = ['#fff','#fff','#fff'];
const numLines = 3;
var currCount = numLines;
const texts = document.querySelectorAll("#textClip text");
const blobs = document.querySelectorAll("#background path");

function colorBlobs() {
    blobs.forEach(blob => {
        blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
    });
}

function nextIteration() {
    // Change the color of all the blobs
    colorBlobs();

    // Hide the old set of lines
    let startVal = currCount - numLines;
    if(startVal < 0) {
        startVal = texts.length - numLines;
    }
    for(let i = startVal; i < startVal + numLines; i++) {
        texts[i].style.display = "none";
    }
    // Show new set of lines
    for(let j = currCount; j < currCount + numLines; j++) {
        texts[j].style.display = "inline";
    }
    currCount += numLines;
    if(currCount >= texts.length) {
        currCount = 0;
    }
}

// Since all of our blobs are using the same animation, we only
// need to listen to one of them
blobs[0].addEventListener("animationiteration", nextIteration);

colorBlobs();



// Speech Controls
var speech  = function(){
var x = "lol";

var recognition = new webkitSpeechRecognition();
 recognition.continuous = true;
 recognition.interimResults = true;

recognition.onresult = function(event) {
 var colour = event.results[event.results.length - 1][0].transcript;
 // make it lowercase
 colour = colour.toLowerCase();
 // strip the spaces out of it
 colour = colour.replace(/\s/gi,'');
 $('.section').css('background',colour);
 $('h4').text(colour);
 if (colour == 'pencils') {
	 $('#intro').animate({opacity:0},1000, function() {
		  $('#pencils').animate({opacity:1},1000, function() {
				$('#pencils').delay(4000).animate({opacity:0},1000, function() {
					$('#intro').animate({opacity:1},1000)
				})
			})
	 })

 }
}

recognition.start();

}

if (!('webkitSpeechRecognition' in window)) {
alert("Sorry you require a browser that supports speech recognition");
}
else {
speech();
}
