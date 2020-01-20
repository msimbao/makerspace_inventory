//=======================================================

//Name: Makerspace Inventory

//Authors: Tulsi Patel, Thien An Pham, Mphatso Simbao

//=======================================================

// ========================================================
// FireBase Database References
// ========================================================

var ref = firebase
  .app()
  .database()
  .ref();
var itemsRef = ref.child("Items");
var searchRef = ref.child("search");
var requestRef = ref.child("requests");
var usageRef = database.ref("usageTimes");

// ========================================================
// Item Filter
// ========================================================

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("array");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

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
  $("#pagepiling").pagepiling({
    menu: null,
    direction: "vertical",
    verticalCentered: true,
    sectionsColor: [
      "#002C53",
      "rgb(8, 30, 49)",
      "rgb(8, 30, 49)",
      "rgb(8, 30, 49)",
      "rgb(8, 30, 49)"
    ],
    anchors: ["home", "dashboard", "requests_section", "inventory", "insert"],
    menu: "#sidebar",
    scrollingSpeed: 700,
    easing: "swing",
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: "#000",
      bulletsColor: "#000",
      position: "right",
      tooltips: ["home", "dashboard", "requests_section", "inventory", "insert"]
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: ".section",
    animateAnchor: false,

    //events
    onLeave: function(index, nextIndex, direction) {},
    afterLoad: function(anchorLink, index) {
      //using anchorLink
      if (anchorLink == "dashboard") {
        $("#sidebar").fadeIn();
      }
    },
    afterRender: function() {}
  });
});

// ========================================================
// User Authentication
// ========================================================

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.zIndex = "11";
    document.getElementById("login_div").style.zIndex = "1";

    // var update = {
    //   height: 550,  // " "
    //   width:400,
    // };

    Plotly.Plots.resize("bounce_rate_chart");
    Plotly.Plots.resize("keyword_bar_graph");

    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.zIndex = "1";
    document.getElementById("login_div").style.zIndex = "2";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Incorrect email or password. Please try again.");

      // ...
    });
}

function logout() {
  firebase.auth().signOut();
}
// ========================================================
// Write To Database
// ========================================================

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
      alert("Image Upload Complete");
      // console.log(
      //   "Converted Base64 version is " +
      //     document.getElementById("imgTest").innerHTML
      // );
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}

function submitClick() {
  var filesSelected = document.getElementById("inputFileToLoad").files;

  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var short;
      var item = document.getElementById("item");
      var group = document.getElementById("group");
      var located_short = document.getElementById("located_short");

      var short = item.value;
      short = short.toLowerCase(); // Make item name lower case
      short = short.replace(/\s/gi, ""); // Strip the spaces from it

      var short_text = short;
      var item_text = item.value;
      var group_text = group.value;

      var located_short_text = located_short.value;
      // var located_text = located.value;

      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      var image_text = srcData;
      console.log("'" + image_text + "'");
      var firebaseRef = ref.child("Items").child(item_text);

      firebaseRef.child("item_text").set(item_text);
      firebaseRef.child("group").set(group_text);
      firebaseRef.child("short_text").set(short_text);
      firebaseRef.child("located_short_text").set(located_short_text);
      firebaseRef.child("image_text").set(image_text);

      // firebaseRef.child("located_text").set(located_text);

      // firebaseRef.push().set(messageText);
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}

// ========================================================
// Read Items From Database
// ========================================================

// Read Items From Database

$(document).ready(function() {
  // Read Items From Database

  itemsRef.on("child_added", snap => {
    var item = snap.child("item_text").val();
    var group = snap.child("group").val();
    var short = snap.child("short_text").val();
    var image = snap.child("image_text").val();
    // var location = snap.child("located_text").val(); // Not used here
    var location_short = snap.child("located_short_text").val();
    $("#array").append(
      '<tr class=" table-item" id="' +
        item +
        '"><a href="#">' +
        short +
        "</a>" +
        "<td>" +
        item +
        "</td><td>" +
        location_short +
        '</td><td><img style="height:100px;border-radius:5px;"  src="' +
        image +
        '"></td><td><div class="close" onclick="removeItem(this)" aria-label="Delete">' +
        "  &times" +
        " </div> </td></tr>"
    );
  });

  // Read Requests From Database

  requestRef.on("child_added", snap => {
    // var id = snap.val();
    var name = snap.child("name").val();
    var email = snap.child("email").val();
    var comment = snap.child("comment").val();
    $("#requests").append(
      '<tr class=" table-item " id="' +
        name +
        '"> <td>' +
        name +
        "</td><td>" +
        email +
        '</td> <td><p style="padding:5%">' +
        comment +
        '</p></td> <td style="padding-right:5%;"><div class="close" onclick="removeRequest(this)" aria-label="Delete">&times</div></td> </tr>'
    );
  });
});

// ========================================================
// Remove Item Firebase Script
// ========================================================

// console.log('Item Admin Scripts Loaded');

function removeItem(elem) {
  var itemRow = elem.parentElement.parentNode;
  var item = elem.parentElement.parentNode.id;
  var itemRef = ref.child("Items").child(item);
  alert(elem.parentNode.id + "Removed from Database");
  itemRef.remove();
  itemRow.style.display = "none";
}

// ========================================================
// Remove Request Script
// ========================================================

// console.log('Requests Scripts Loaded');

function removeRequest(elem) {
  var reqRow = elem.parentElement.parentNode;
  var req = elem.parentElement.parentNode.id;
  var reqRef = ref.child("requests").child(req);
  alert(elem.parentNode.id + "Removed from Database");
  reqRef.remove();
  reqRow.style.display = "none";
}

// ========================================================
// Blob Colors and Control
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
// Metrics Generation
// ========================================================

// Most Frequent Time for Searching

var times = [];
usageRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    times.push(childNodes.val());
  });

  var counts = {};
  var compare = 0;
  var mostFrequent;
  (function(array) {
    for (var i = 0, len = array.length; i < len; i++) {
      var word = array[i];

      if (counts[word] === undefined) {
        counts[word] = 1;
      } else {
        counts[word] = counts[word] + 1;
      }
      if (counts[word] > compare) {
        compare = counts[word];
        mostFrequent = array[i];
      }
    }
    return mostFrequent;
  })(times);

  searchTime = mostFrequent + ":00";

  $("#mostFrequent").text(searchTime);
});

//Items
var totalItems = 0;
itemsRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    totalItems += 1;
  });
  //  console.log(totalItems)
  $("#totalItems").text(totalItems);
});

//Count Searches
var totalSearches = 0;

searchRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    totalSearches += 1;
  });
  //  console.log(totalSearches)
  $("#totalSearches").text(totalSearches);
});

//Get Bounce Rate
var totalBounces = 0;

searchRef.child("bounce").once("value", function(snapshot) {
  var currentBounce = snapshot.child("value").val();

  totalBounces = currentBounce;

  // console.log("totalBounces =" + totalBounces);
});

//Count Requests
var totalRequests = 0;
requestRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    totalRequests += 1;
  });
  //  console.log(totalRequests)
  $("#totalRequests").text(totalRequests);
});

// ========================================================
// Plot Search Key Words Bar Graph
// ========================================================

barplotRef = database
  .ref("search")
  .orderByChild("count")
  .limitToLast(6);
var array = [];
var array2 = [];
barplotRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    array.push(childNodes.val().name);
    array2.push(childNodes.val().count);

    var data = [
      {
        type: "bar",
        marker: {
          color: "#FF3501",
          hoverinfo: "label"
        },
        x: array,
        y: array2,
        transforms: [
          {
            type: "sort",
            target: "y",
            order: "ascending"
          },
          {
            type: "filter",
            target: "y",
            operation: ">=",
            value: 1
          }
        ]
      }
    ];

    var layout = {
      title: "Most Popular Keywords",

      autosize: true,
      font: {
        family: "Arial",
        size: 16,
        color: "#D3D3D3"
      },
      paper_bgcolor: "#002C53",
      plot_bgcolor: "#002C53",
      margin: {
        pad: 10
      },
      xaxis: {
        autorange: true,
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: "",
        showticklabels: false,
        backgroundcolor: "rgb(255,0,0)",
        showbackground: true,
        title: {
          text: "Keywords",
          font: {
            family: "Arial, monospace",
            size: 18,
            color: "#D3D3D3"
          }
        }
      },
      yaxis: {
        autorange: true,
        showgrid: true,
        zeroline: true,
        showline: true,
        autotick: true,
        ticks: "",
        showticklabels: false,
        backgroundcolor: "rgb(255,0,0)",
        showbackground: true,
        title: {
          text: "",
          font: {
            family: "Arial, monospace",
            size: 0,
            color: "rgb(8, 30, 49)"
          }
        }
      }
    };

    Plotly.newPlot("keyword_bar_graph", data, layout, {
      displayModeBar: false,
      responsive: true
    });
  });
});

// ========================================================
// Plot Search Times Histogram
// ========================================================

// var times= [];
// usageRef.on('value', function(snap){

//    snap.forEach(function(childNodes){

//     times.push(childNodes.val());

//     var hist_data = [{
//     type: 'bar',
//     marker: {
//     color: '#00AEE0',
//     hoverinfo: 'times',

//     },
//     x: times,
//     orientation: 'v',
//   }];

// var layout = {
// title:'Histogram of Search History',
//   autosize: true,
//   font: {
//     family: 'Arial',
//     size: 16,
//     color: '#D3D3D3'
//   },
//   paper_bgcolor:'#002C53',
//   plot_bgcolor: '#002C53',
//   margin: {
//     pad: 10
//   },
//   xaxis: {
//     hoverinfo: "skip",
//     autorange: true,
//     showgrid: true,
//     zeroline: true,
//     showline: true,
//     autotick: true,
//     tickmode: 'array',
//     tickvals: [ 1, 8 , 16, 23],
//     /* Set the text displayed at the ticks position via tickvals */
//     ticktext: [ '1:00' , '8:00' , '16:00' , '23:00' ],
//     showticklabels: true,
//     backgroundcolor: "rgb(255,0,0)",
//    showbackground: true,
//     title: {
//       text: 'Time Stamp',
//       font: {
//         family: 'Arial, monospace',
//         size: 18,
//         color: '#D3D3D3'
//       }
//     },
//   },
//   yaxis: {
//     autorange: true,
//     showgrid: true,
//     zeroline: true,
//     showline: true,
//     autotick: true,
//     ticks: '',
//     showticklabels: false,
//     backgroundcolor: "rgb(255,0,0)",
//    showbackground: true,
//     title: {
//       text: '',
//       font: {
//         family: 'Arial, monospace',
//         size: 18,
//         color: 'rgb(8, 30, 49)'
//       }
//     }
//   }
// };

//   Plotly.newPlot('searchtimes_histogram', hist_data,layout,{displayModeBar: false,responsive: true});

//   });
//   });

// ========================================================
// Pie Chart
// ========================================================

var totalSearches = 0;
var totalBounces = 0;

searchRef.on("value", function(snap) {
  snap.forEach(function(childNodes) {
    totalSearches += 1;

    searchRef.child("bounce").once("value", function(snapshot) {
      var currentBounce = snapshot.child("value").val();
      totalBounces = currentBounce;

      successfulSearches = totalSearches - totalBounces;
      var bounces_rate = [successfulSearches, totalBounces];
      var data = [
        {
          values: bounces_rate,
          labels: ["Items Succesfully Found", "Items Not Found"],
          type: "pie",
          hoverinfo: "label+percent",
          hole: 0.7,
          textinfo: "none",
          marker: {
            colors: ["#00AEE0", "#FF3501"]
          }
        }
      ];

      var layout = {
        title: "Successful Searches",

        showlegend: false,
        autosize: true,
        font: {
          family: "Arial",
          size: 16,
          color: "#D3D3D3"
        },
        paper_bgcolor: "#002C53",
        plot_bgcolor: "#002C53",
        margin: {
          pad: 10
        },
        xaxis: {
          autorange: true,
          showgrid: true,
          zeroline: true,
          showline: true,
          autotick: true,
          ticks: "",
          showticklabels: false,
          backgroundcolor: "rgb(255,0,0)",
          showbackground: true,
          title: {
            text: "Keywords",
            font: {
              family: "Arial, monospace",
              size: 18,
              color: "#D3D3D3"
            }
          }
        },
        yaxis: {
          autorange: true,
          showgrid: true,
          zeroline: true,
          showline: true,
          autotick: true,
          ticks: "",
          showticklabels: false,
          backgroundcolor: "rgb(255,0,0)",
          showbackground: true,
          title: {
            text: "",
            font: {
              family: "Arial, monospace",
              size: 0,
              color: "rgb(8, 30, 49)"
            }
          }
        }
      };

      Plotly.newPlot("bounce_rate_chart", data, layout, {
        displayModeBar: false,
        responsive: true,
        showlegend: false
      });
    });

    //  console.log(totalSearches)
  });

  //Get Bounce Rate
});
