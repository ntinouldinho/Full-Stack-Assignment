var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var firestore = null;


init();

class FavouriteBook {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

async function create(id, title, author) {
    var result = 0;
    var book = firestore.collection('favourites').doc(id.toString());

    await book.get().then((doc) => {
        if (doc.exists) {
            result = 2;
        } else {
            book.set({
                id: id,
                title: title,
                author: author,
                review:''
            })
           result = 1;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        return 0;
    });

    return result;
}

async function findAll() {
    const favourites = await firebase.firestore().collection('favourites').get();
    return favourites.docs.map(doc => doc.data());
}


async function findById(id) {
    var docRef = firestore.collection('favourites').doc(id.toString());

    var data = null;

    await docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            data= doc.data();
        } else {
            throw Error;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        return 0;
    });

    return data;
}

function deleteById(id) {
    firestore.collection('favourites').doc(id.toString()).delete();
}

function update(id,title,author,review){
    firestore.collection('favourites').doc(id.toString()).update({
        title:title,
        author:author,
        review: review
    })
}

function init() {


    var firebaseConfig = {
        apiKey: "AIzaSyAmW5UKGwH0TIm3hqAvZ8U0YUa2DiuZhYE",
        authDomain: "istos-61314.firebaseapp.com",
        projectId: "istos-61314",
        storageBucket: "istos-61314.appspot.com",
        messagingSenderId: "371214728681",
        appId: "1:371214728681:web:4ccaa574b7bfd3660ddf78",
        measurementId: "G-VYWXGYQWYE"
    };

    firebase.initializeApp(firebaseConfig);

    firestore = firebase.firestore();
}
module.exports = {
    "create": create,
    "findAll": findAll,
    "findById": findById,
    "deleteById": deleteById,
    "update": update
}