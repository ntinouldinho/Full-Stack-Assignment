var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var firestore = null;


init();

async function create(id, title, author, isbn) {
    var result = 0;
    var book = firestore.collection('favourites').doc(id.toString());

    await book.get().then((doc) => {
        if (doc.exists) {
            result = 409;
        } else {
            book.set({
                id: id,
                title: title,
                author: author,
                isbn: isbn,
                review: ''
            })
            result = 201;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        result = 500;
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
            data = doc.data();
        } else {
            throw Error;
        }
    }).catch((error) => {
        data = { id: -1 }
    });

    return data;
}

async function deleteById(id) {
    let result = 200;

    try {
        await firestore.collection('favourites').doc(id.toString()).delete();
    } catch (error) {
        result = 409;
    }

    return result;
}

function update(id, title, author, review) {
    let result = 200;

    try {
        await firestore.collection('favourites').doc(id.toString()).update({
            title: title,
            author: author,
            review: review
        })
    } catch (error) {
        result = 409;
    }

    return result;
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