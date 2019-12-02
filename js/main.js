//=======================================================

//Name: Audio Inventory

//Author: Tulsi Patel, Thien An Pham, Mphatso Simbao

//=======================================================

// Author's Note: There are several commented out alert notes. These are for testing the Javascript to let the page tell me whether certain functions have been carried out and what their outputs. 
// If the output of a function is what is intuitively expected, e.g for a function to increase database search count entries by 1, then that function has passed the test. Else, it has failed


// ========================================================
// Filter Search
// ========================================================

function searchFunction() {
  // Declare General Variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");


  // Handle Enter Key Press
  var input = document.getElementById("myInput");
  input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("searchButton").click();
  }
});



  // Keyword Related Variables

  var searchterm = document.getElementById("myInput");
  var searchterm = searchterm.value;
  // alert(searchterm);
  searchRef = database.ref("search");

  // Time Related Variables

  timeRef = database.ref("usageTimes");
  var date = new Date();
  var hours = date.getHours();

  // Record Time of Search

  timeRef.push(hours);

  // Collect Search Keyword Data

  searchRef.child(searchterm).once("value", function(snapshot) {
    if (snapshot.exists()) {
      // alert("exists");
      var currentValue = snapshot.child("count").val();
      // alert("currentValue:" + currentValue);
      var newValue = currentValue + 1;
      // alert("NewValue:" + newValue);
      searchRef
        .child(searchterm)
        .child("count")
        .set(newValue);
      // searchRef.child(searchterm).set(newValue);
    } else {
      // alert("absent");
      var newValue = 1;
      searchRef
        .child(searchterm)
        .child("name")
        .set(searchterm);
      searchRef
        .child(searchterm)
        .child("count")
        .set(newValue);
    }
  });

  var counter = 0 
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.opacity = "1";
      item = li[i] 
      $(item).fadeIn(1000);
      counter += 1;
      // alert(counter)
    } else {
      item = li[i] 
      $(item).fadeOut(500); 
      counter += 0;
      // alert(counter)
    }
  }
  if (counter == 0){
    //Add Update Bounce Counts
    searchRef.child("bounce").once("value", function(snapshot) {
        var currentBounce = snapshot.child("value").val();
        console.log("currentBounce =" + currentBounce);
        // alert("currentValue:" + currentValue);
        var newBounce = currentBounce + 1;
        console.log( "newBounce =" + newBounce);
        // alert("NewValue:" + newValue);
        searchRef.child("bounce").child("value").set(newBounce);

    });

    //Show To Staff Button
    // alert(counter)
    $("#toStaff").fadeIn(1000);
  }
}





 // Clear Search to call back all items
function recall() {

  $("#toStaff").fadeOut(500);

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
    li[i].style.display = "";
  }
}

// ========================================================
// pagepiling animated scrolling
// ========================================================
$(document).ready(function() {
  $("#pagepiling").pagepiling({
    menu: null,
    direction: "vertical",
    verticalCentered: true,
    sectionsColor: ["#FE3808", "#002C53", "#FE3808", "#002C53", "#002C53"],
    anchors: ["search", "map", "about", "staff", "contact"],
    menu: "#mainMenu",
    scrollingSpeed: 700,
    easing: "swing",
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: "#000",
      bulletsColor: "#000",
      position: "right",
      tooltips: ["section1", "section2", "section3", "section4"]
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: ".section",
    animateAnchor: false,

    //events
    onLeave: function(index, nextIndex, direction) {},
    afterLoad: function(anchorLink, index) {},
    afterRender: function() {}
  });
});

// ========================================================
// Splash Screen Controls
// ========================================================

const colors = ["#FE3808", "#002C53", "#00AEE0"];
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
  if (startVal < 0) {
    startVal = texts.length - numLines;
  }
  for (let i = startVal; i < startVal + numLines; i++) {
    texts[i].style.display = "none";
  }
  // Show new set of lines
  for (let j = currCount; j < currCount + numLines; j++) {
    texts[j].style.display = "inline";
  }
  currCount += numLines;
  if (currCount >= texts.length) {
    currCount = 0;
  }
}

// Since all of our blobs are using the same animation, we only
// need to listen to one of them
blobs[0].addEventListener("animationiteration", nextIteration);

colorBlobs();

// ========================================================
// // Speech Controls
// ========================================================

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






$(document).ready(function() {
  var inventoryRef = firebase
    .app()
    .database()
    .ref();
  var itemsRef = inventoryRef.child("Items");

  itemsRef.on("child_added", snap => {
    var item = snap.child("item_text").val();
    var group = snap.child("group").val();
    var short = snap.child("short_text").val();
    var image = snap.child("image_text").val();
    // var location = snap.child("located_text").val();
    var location_short = snap.child("located_short_text").val();

    $("#array").append(
      '<li>' +
        '<div class="col-md-4">' +
        '<a href="#">' +
        item +
        '</a><div class="dbitem mb-4 box-shadow"  data-toggle="modal" data-target="#' +
        short +
        '"  >' +
        '<div class="card-img-top" style="width:970px;">' +
        '</div><div class="card-body ' +
        group +
        '">' +
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
      '<div class="modal" id="' +
        short +
        '" >' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        //The Extra cards behind the main one
        '<div class="random_cards '+group+'_cards ">' +
        '<div class="color-div"></div> <div class="color-div"></div> <div class="color-div"></div> <div class="color-div"></div>' +
        '</div>' +

        '<div class=" test  '+group+' ">' +
        '<ul class="modal_controls">' +
        ' <li data-dismiss="modal" aria-label="Close">&times;</li>' +
        ' <li class="btn-next controller" onclick="next(this)" aria-label="Next"><i class="fa fa-hand-o-right" "></i></li>' +
        ' <li class="btn-prev controller" onclick="prev(this)" aria-label="Prev"><i class="fa fa-hand-o-left" "></i></li>' +
        '</ul>' +
        '<div class="modal-words">' +
        "<h5 style='font-size:30px;color:#333333'><b>" +
        item +
        "</b></h5>" +
        "<h5> <u>Group:  </u>" +
        group +
        "</h5>" +
        "<h5> <u> Location:  </u>" +
        location_short +
        "</h5><br>" +
        '<a href="#map"><div  style="text-align:center"><button class="toMap" style="padding:3px;">Map</button></div></a>'+
        "</div>" +
        '<div class="col-lg-6 item-images">' +
        '<div class="image"><img src=" ' +image +' " class="image_inner" alt="" /><div>' +
        '<img src=" ' +image +' " class="shadow" alt="" />' +
        "</div>" +
        "</div>"+
        '</div>'+
        '</div>'+
        "</div>"
    );
  });
});

$('#toMap').on('click' , function() { 
  $('.modal').modal('hide')
});


// ========================================================
// Modal Carousel
// ========================================================


// Experimental Really Bad Code ._. need help to patch this up
 
  //click next
  function next(e){
    console.log('Showing Next Modal');
    var currentModal = $(e).parent().parent().parent().parent().parent();
    var nextModal = currentModal.next();

    if (nextModal != null){
      currentModal.modal('toggle').delay(1000);
      nextModal.modal('toggle'); 
    } else {
      currentModal.modal('toggle');
      console.log('No Next Modal');
    }

  };


    //click next
  function prev(e){
    console.log('Showing Previous Modal');
    var currentModal = $(e).parent().parent().parent().parent().parent();
    var prevModal = currentModal.prev();

    if (prevModal != null){
      currentModal.modal('toggle').delay(1000);
      prevModal.modal('toggle'); 
    } else {
      currentModal.modal('toggle');
      console.log('No Previous Modal');
    }

  };


// ========================================================
// Modal Random Colors
// ========================================================

// var myArray = ['red', 'green', 'blue'];    
// var rand = myArray[Math.floor(Math.random() * myArray.length)];
// // document.getElementsByClassName("tech").style.background = rand;

// var randAngle = Math.random()
// // document.getElementsByClassName("test").style.transform = "rotate(7deg)";
// $(".tech").css({"background": "red"});



$(document).ready(function() {
  var colors = ['red', 'blue', 'green', 'yellow', 'cyan', 'orange'];
  var new_color = colors[Math.floor(Math.random() * colors.length)];
  $('.color-div').css('background-color', new_color);
});



// ========================================================
// NavBar
// ========================================================
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// ========================================================
// Contact Bar
// ========================================================

function openContact() {
  document.getElementById("contactNav").style.width = "50%";
  document.getElementById("contactNav").style.opacity = "1";
  document.getElementById("close_request").style.opacity = "1";
  
}

function closeContact() {
  document.getElementById("contactNav").style.opacity = "0";
  document.getElementById("contactNav").style.width = "0%";
  document.getElementById("close_request").style.opacity = "0";
}

// ========================================================
// Write Reuqests To Database
// ========================================================
var first_name = document.getElementById("first_name");
var email_address = document.getElementById("email_address");
var comments = document.getElementById("comments");
var srcData;

var submitBtn = document.getElementById("submit");
// prints "started" in the browser's dev tools console to help me know that the first part has gone through
console.log("started request submission");

function contactSubmit() {
  var name = first_name.value;
  var email = email_address.value;
  var comment = comments.value;

  var ref = firebase
    .app()
    .database()
    .ref();
  var requestRef = ref.child("requests").child(email);

  window.alert(
    "Thank you for sending your request! we will get back to you soon!"
  );

  requestRef.child("name").set(name);
  requestRef.child("email").set(email);
  requestRef.child("comment").set(comment);
  // firebaseRef.push().set(messageText);
}

// ========================================================
// Google Script for Request Data via email
// ========================================================

(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;
    var fields = Object.keys(elements)
      .filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      })
      .map(function(k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
    var formData = {};
    fields.forEach(function(name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;
      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });
    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSend = form.dataset.email || ""; // no email by default
    return { data: formData, honeypot: honeypot };
  }
  function handleFormSubmit(event) {
    // handles form submit without any jquery
    event.preventDefault(); // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;
    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }
    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        var formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data)
      .map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);
  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
