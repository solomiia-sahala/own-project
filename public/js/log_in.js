var firebaseConfig = {
    apiKey: "AIzaSyCfUMs20JHDtBfXUWKFlO5FQWQqjW2xQhg",
    authDomain: "myourway.firebaseapp.com",
    databaseURL: "https://myourway.firebaseio.com",
    projectId: "myourway",
    storageBucket: "myourway.appspot.com",
    messagingSenderId: "214953978170",
    appId: "1:214953978170:web:532e1bafdd6ce62d064803"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('startSignIn').onclick = async function () {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user;
    try {
        user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
        return;
    }

    //TO DO: delete user if unsucessfull log in;
    try {
        await sendForm(user.user.uid, name, surname);
    } catch (err) {
        alert(err.message);
    }

}

// send user info to DB
async function sendForm(id, name, surname) {
    await fetch(`https://myourway.firebaseio.com/users/${id}.json`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'name': name,
            'surname': surname,
        })
    })
}

