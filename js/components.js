// ========================================================
// Vue Script and Components
// ========================================================


function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

firebase.database().ref().on('value', function(snapshot) {
    var answer = snapshotToArray(snapshot)
    allItems = answer[0]
    allRequests = answer[1]
    delete allItems['key'];
    delete allRequests['key'];
    console.log(allItems);


    var app = new Vue ({
        el: '#app',
        data: {
            items: allItems,
            requests: allRequests,
              showModal: false
            },
        methods: {
            onShowModal(){
                this.showModal = true;
              },
            submit(){
                document.getElementById("searchButton").click();
            }
        },
    

    })

    
});