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
    let nickname = document.getElementById('nickname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user;
    if (name && surname && nickname && email && password) {
        try {
            user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (err) {
            alert(err.message);
            return;
        }

        //TO DO: delete user if unsucessfull log in;
        try {
            await sendForm(user.user.uid, name, surname, nickname);
            window.location.pathname = '';
        } catch (err) {
            alert(err.message);
        }
    } else {
        alert('Please, fill all forms correctly');
    }

}

// send user info to DB
async function sendForm(id, name, surname, nickname) {
    await fetch(`https://myourway.firebaseio.com/users/${id}.json`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'name': name,
            'surname': surname,
            'nickname': nickname, 
            'avatar': 'https://firebasestorage.googleapis.com/v0/b/myourway.appspot.com/o/users_avatars%2FNo-Image-Available.png?alt=media&token=369243a1-1842-4e82-b2c2-c816b5407cb5',
        })
    })
}

document.getElementById('back-btn').onclick = function () {
    window.location.pathname = `/`;
}


