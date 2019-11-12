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
        sectionsColor: ['#002C53', '#FE3808', '#002C53', '#FE3808', '#002C53'],
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

  // Write JavaScript

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


  // Read Javascript

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
        '<tr class=" '+group+' table-item  "><td>' +item + '</td><td>' + location_short + '</td><td><img style="height:100px;border-radius:5px;"  src="' + image + '"></td><td><div class="close" onclick="removeItem(this)" aria-label="Delete">' +
          '  &times' +
          ' </div> </td></tr>' 
      
    );

    });
  });

    // Input Filter

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

// Remove Firebase Script

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



   // FullScreen Navigation

   function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }