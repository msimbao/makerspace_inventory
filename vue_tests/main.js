// var itemArr = [];

// firebase.database().ref('Items').on('value', function(snap) {
//     // console.log(snapshot.val());
//     var item = snap.val();
//     item.key = snap.key;

//     itemArr.push(item);
// });

// console.log(itemArr);

Vue.component('btn',{
  template: `<button @click="$emit('trigger')"><slot></slot></button>`,
});

Vue.component('modal',{
  template: `<p><slot></slot></p>`,
});


var answer = []

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

firebase.database().ref('/Items').on('value', function(snapshot) {
    answer = snapshotToArray(snapshot)
    console.log(answer);


    var app = new Vue ({
        el: '#app',
    
        data: {
            todos: answer,
            product: 'Socks',
            image: 'img/nextImage.jpg',
            link: 'https://google.com',
            inStock: false,
            onSale: true,
            details:["80% Cotton", "Soft", "Nice"],
            variants: [{
                variantId: 2234,
                variantColor: "green",
                variantImage: 'img/testImage.png',
            },
                        {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'img/nextImage.jpg',
                        }],
            sizes: ["2","3","434","23"],
            cart: 0,
            items: [
                {id: 1, name: 'item 1', show: false},
                {id: 2, name: 'item 2', show: false},
                {id: 3, name: 'item 3', show: false}
              ],
              showModal: false
            },
        methods: {
            addToCart: function () {
                this.cart += 1;
            },
            updateProduct: function(variantImage) {
                this.image = variantImage;
            },
            onShowModal(){
                this.showModal = true;
              }
        },
    

    })

    
});

console.log(answer)