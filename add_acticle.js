const path = '/Users/ssahala/Documents/own-project/';

// send user form with nessesary data for article
async function sendForm() {
    let response = await fetch('https://myourway.firebaseio.com/trip-articles.json', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'header': document.getElementById('header-name').value,
            'description': document.getElementById('description').value,
            'image': 'https://images.pexels.com/photos/2894836/pexels-photo-2894836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        })
    })
}

function uploadImage(file) {
    // Create the file metadata
let metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
}

// localStorage.setItem('article_' + (localStorage.length + 1), JSON.stringify({
//     'header': document.getElementById('header-name').value,
//     'description': document.getElementById('description').value,
//     // 'image': './img/' + document.getElementById('image').files[0].name,
//     'image': 'https://images.pexels.com/photos/2894836/pexels-photo-2894836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// }))
//}

// document.getElementById('submit-form').onclick = async function () {
//     await sendForm();
//     window.location.pathname = path + 'index.html';
// }

