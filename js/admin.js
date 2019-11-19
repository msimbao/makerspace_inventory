//=======================================================

//Name: Audio Inventory

//Author: Tulsi Patel, Thien An Pham, Mphatso Simbao

//=======================================================


   // ========================================================
   // Sidebar Navigation
   // ========================================================
   function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


// ========================================================
// pagepiling animated scrolling
// ========================================================
$(document).ready(function() {
	$('#pagepiling').pagepiling({
	    menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['#002C53', 'rgb(8, 30, 49)', 'rgb(8, 30, 49)', 'rgb(8, 30, 49)', 'rgb(8, 30, 49)'],
        anchors: ['home', 'dashboard', 'inventory', 'insert'],
        menu: '#mainMenu',
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


// ========================================================
// User Authentication
// ========================================================


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
     
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Incorrect email or password. Please try again.");
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
// ========================================================  
// Write To Database 
// ========================================================
  var item = document.getElementById("item");
var group = document.getElementById("group");
var short = document.getElementById("short");
var image = document.getElementById("image");
var located = document.getElementById("located");
var located_short = document.getElementById("located_short");
var srcData;

function encodeImageFileAsURL() {
  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement("img");
      newImage.src = srcData;

      document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      alert(
        "Image Upload Complete" 
      );
      console.log(
        "Converted Base64 version is " +
          document.getElementById("imgTest").innerHTML
      );
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}

var submitBtn = document.getElementById("submit");
// prints "started" in the browser's dev tools console to help me know that the first part has gone through
console.log("started");

function submitClick() {
  var item_text = item.value;
  var short_text = short.value;
  var group_text = group.value;
  var located_text = located.value;
  var located_short_text = located_short.value;
  var filesSelected = document.getElementById("inputFileToLoad").files;

  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement("img");

      var image_text = srcData;
      // prints "working" in the browser's dev tools console to help me know that the second part has gone through

      var ref = firebase.app().database().ref();
      var firebaseRef = ref.child('Items').child(item_text);

      window.alert("Item Inserted!");

      firebaseRef.child("item_text").set(item_text);
      firebaseRef.child("group").set(group_text);
      firebaseRef.child("short_text").set(short_text);
      firebaseRef.child("image_text").set(image_text);
      firebaseRef.child("located_text").set(located_text);
      firebaseRef.child("located_short_text").set(located_short_text);
      // firebaseRef.push().set(messageText);
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}

// ========================================================
// Read From Database
// ========================================================
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
        '<a href="#">' +
        item +
        '</a><tr class=" '+group+' table-item  "><td>' +item + '</td><td>' + location_short + '</td><td><img style="height:100px;border-radius:5px;"  src="' + image + '"></td><td><div class="close" onclick="removeItem(this)" aria-label="Delete">' +
          '  &times' +
          ' </div> </td></tr>' 
      
    );

    });
  });

// ========================================================
// Input Filter
// ========================================================
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

// ========================================================
// Remove Firebase Script
// ========================================================

console.log('Admin Scripts Loaded');
 
 function removeItem(elem)
{
var item = elem.parentNode.id;
var ref = firebase.app().database().ref();
var itemRef = ref.child('Items').child(item);
alert(elem.parentNode.id + "Removed from Database");
itemRef.remove();  
window.location.reload();
}





// ========================================================
// Blob Colors and Control
// ========================================================
const colors = ['#FE3808','#002C53','#00AEE0'];
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

// ========================================================
// Plot Search Key Words Bar Graph
// ========================================================

barplotRef = database.ref("search").orderByValue().limitToFirst(6);
var array= [];
var array2 = [];
barplotRef.on('value', function(snap){

   snap.forEach(function(childNodes){

    array.push(childNodes.val().name);
    array2.push(childNodes.val().count);

    var data = [{
    type: 'bar',
    marker: {
    color: '#FF3501',

    },
    x: array,
    y: array2,
        transforms: [{
    type: 'sort',
    target: 'y',
    order: 'ascending'
  }, {
    type: 'filter',
    target: 'y',
    operation: '>=',
    value: 1
  }]
  }];
     
     
var layout = {
title:'Bar Plot of Most Popular Keywords',
  height: 550,
  font: {
    family: 'Arial',
    size: 16,
    color: '#fff'
  },
  paper_bgcolor:'#002C53',
  plot_bgcolor: '#002C53',
  margin: {
    pad: 10
  },
  xaxis: {
    autorange: true,
    showgrid: true,
    zeroline: true,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false,
    backgroundcolor: "rgb(255,0,0)",
   showbackground: true,
    title: {
      text: 'Keywords',
      font: {
        family: 'Arial, monospace',
        size: 18,
        color: '#fff'
      }
    },
  },
  yaxis: {
    autorange: true,
    showgrid: true,
    zeroline: true,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false,
    backgroundcolor: "rgb(255,0,0)",
   showbackground: true,
    title: {
      text: '',
      font: {
        family: 'Arial, monospace',
        size: 0,
        color: 'rgb(8, 30, 49)'
      }
    }
  }
};
     
     
  Plotly.newPlot('keyword_bar_graph', data,layout,{displayModeBar: false});


      console.log(array);
      console.log(array2);

  });
  });


// ========================================================
// Plot Search Times Histogram
// ========================================================

histogramRef = database.ref("usageTimes");
var times= [];
var list =[4, 5, 1, 25, 5, 7, 16, 22, 24, 2, 25, 21, 23, 17, 17, 8, 5, 16, 16, 13, 3, 15, 24, 22, 5, 16, 11, 25, 12, 23, 20, 21, 5, 23, 19, 21, 7, 8, 18, 11, 4, 16, 15, 13, 5, 22, 11, 14, 1, 4, 24, 9, 23, 10, 8, 17, 10, 6, 8, 3, 16, 10, 9, 18, 11, 15, 23, 19, 14, 15, 11, 21, 24, 12, 14, 7, 7, 25, 24, 9, 21, 3, 18, 24, 23, 4, 7, 21, 3, 1, 20, 6, 19, 19, 3, 21, 18, 8, 11, 21, 2, 11, 18, 20, 6, 3, 9, 1, 12, 24, 16, 8, 9, 11, 21, 4, 5, 19, 12, 19, 12, 5, 11, 19, 19, 10, 24, 24, 20, 25, 1, 9, 20, 2, 7, 21, 24, 6, 20, 12, 17, 10, 16, 15, 7, 12, 25, 12, 10, 15, 1, 5, 2, 24, 9, 6, 18, 7, 10, 1, 23, 15, 8, 11, 24, 13, 9, 10, 3, 19, 10, 23, 23, 24, 5, 3, 13, 8, 5, 15, 4, 19, 11, 24, 20, 22, 21, 2, 5, 7, 22, 9, 25, 14, 16, 1, 6, 9, 20, 10];
histogramRef.on('value', function(snap){

   snap.forEach(function(childNodes){

    times.push(childNodes.val());

    var hist_data = [{
    type: 'bar',
    marker: {
    color: '#00AEE0',

    },
    x: list,
    orientation: 'v',
  }];
     
     
var layout = {
title:'Histogram of Search History',
  height: 550,
  font: {
    family: 'Arial',
    size: 16,
    color: '#fff'
  },
  paper_bgcolor:'#002C53',
  plot_bgcolor: '#002C53',
  margin: {
    pad: 10
  },
  xaxis: {
    autorange: true,
    showgrid: true,
    zeroline: true,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false,
    backgroundcolor: "rgb(255,0,0)",
   showbackground: true,
    title: {
      text: 'Time Stamp',
      font: {
        family: 'Arial, monospace',
        size: 18,
        color: '#fff'
      }
    },
  },
  yaxis: {
    autorange: true,
    showgrid: true,
    zeroline: true,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false,
    backgroundcolor: "rgb(255,0,0)",
   showbackground: true,
    title: {
      text: '',
      font: {
        family: 'Arial, monospace',
        size: 18,
        color: 'rgb(8, 30, 49)'
      }
    }
  }
};
     
     
  Plotly.newPlot('searchtimes_histogram', hist_data,layout,{displayModeBar: false});

  });
  });



// ========================================================
// Count Total Inventory, Searches and Requests So Far
// ========================================================

//Items
    var inventoryRef = firebase.app().database().ref();
    var itemsRef = inventoryRef.child('Items');

    var totalItems= 0;

    itemsRef.on('value', function(snap){

       snap.forEach(function(childNodes){
          totalItems += 1

       }); 
       console.log(totalItems)
       $('#totalItems').text(totalItems);
     });

//Count Searches
        var searchesRef = firebase.app().database().ref();
    var searchRef = searchesRef.child('search');

    var totalSearches= 0;

    searchRef.on('value', function(snap){

       snap.forEach(function(childNodes){
          totalSearches += 1

       }); 
       console.log(totalSearches)
       $('#totalSearches').text(totalSearches);

        });

//Count Requests
        var requestsRef = firebase.app().database().ref();
    var requestRef = requestsRef.child('usageTimes');

    var totalRequests= 0;

    requestRef.on('value', function(snap){

       snap.forEach(function(childNodes){
          totalRequests += 1

       }); 
       console.log(totalRequests)
       $('#totalRequests').text(totalRequests);
     });

