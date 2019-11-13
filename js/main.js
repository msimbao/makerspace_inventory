//=======================================================

//Name: Audio Inventory

//Author: Tulsi Patel, Thien An Pham, Mphatso Simbao

//=======================================================


// Live Search

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}




// pagepiling

$(document).ready(function() {
	$('#pagepiling').pagepiling({
	    menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['#FE3808', '#002C53', '#FE3808', '#002C53', '#002C53'],
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



// // Speech Controls
// var speech  = function(){
// var x = "lol";

// var recognition = new webkitSpeechRecognition();
//  recognition.continuous = true;
//  recognition.interimResults = true;

// recognition.onresult = function(event) {
//  var colour = event.results[event.results.length - 1][0].transcript;
//  // make it lowercase
//  colour = colour.toLowerCase();
//  // strip the spaces out of it
//  colour = colour.replace(/\s/gi,'');
//  $('.section').css('background',colour);
//  $('.lock').text(colour);
//  if (colour == 'pencils') {
// 	 $('#pagepiling').animate({opacity:0},500, function() {
// 		  $('#whiteboard').animate({opacity:1},300, function() {
// 				$('#whiteboard').delay(3000).animate({opacity:0},1000, function() {
// 					$('#pagepiling').animate({opacity:1},500)
// 					 $('h3').text("I am listening");
// 				})
// 			})
// 	 })

//  }
// }

// recognition.start();

// }

// if (!('webkitSpeechRecognition' in window)) {
// alert("Sorry you require a browser that supports speech recognition");
// }
// else {
// speech();
// }




   // Inventory Reading

   $(document).ready(function() {
    var ref = firebase.app().database().ref();
    var itemsRef = ref.child('Items');
  
    itemsRef.on("child_added", snap => {
      var item = snap.child("item_text").val();
      var group = snap.child("group").val();
      var short = snap.child("short_text").val();
      var image = snap.child("image_text").val();
      var location = snap.child("located_text").val();
      var location_short = snap.child("located_short_text").val();

     $("#array").append(
      "<li>" +
        '<div class="col-md-4">' +
        '<a href="#">' +
        item +
        '</a><div class="dbitem mb-4 box-shadow"  data-toggle="modal" data-target="#' +
        short +
        '"  >' +
       '<div class="card-img-top" style="width:970px;">'+
        '</div><div class="card-body '+ group +'">' +
        ' <p class="card-text"><h6>' +
        item +
        "</h6></p>" +
        ' <div class="d-flex justify-content-between align-items-center">' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" 
      
    );

    $("#modals").append(
        '<div class="modal" id="'+ short +'">' +
    '<div class="row about-extra pop-row test">' +
      '<div class="col-lg-6">' +
        '<h4>'+
          item +
        '</h4>' +
        '<p> Location: ' + 
          location_short +
        '</p>' +
        '<p> Please ask an idea lab staff member for more help incase the item as been moved</p>' +
      '</div>' +
      '<div class="col-lg-6 wow fadeInUp">'+
        ' <img src="'+image+'" class="img-fluid item-images" alt="" />'+
      '</div>'+
    '</div></div>'
    );
  });
});

   // Inventory Reading

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

