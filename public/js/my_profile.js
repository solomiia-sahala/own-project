//user id
const path = window.location.pathname.split('/');
let id = path[path.length - 1];
let userData;

// display User`s avatar
async function displayAvatar(id) {
    const url = `https://myourway.firebaseio.com/users/${id}.json`;
    let response = await fetch(url);
    if (response.ok) {
        userData = await response.json();
        fillUserData(userData);
    } else {
        alert(`Error: ${response.status}`);
    }
}


function updateAdditionalInfo(section, text) {
    section.querySelector('p').innerHTML = text ? text : 'Please, add more info...';
}

function fillUserData(json) {
    user_image.insertAdjacentHTML('beforeend', `<img src="${json.avatar}" alt="avatar">`);
    general.insertAdjacentHTML('afterbegin', `<h1><span class="colored-word">${json.name} ${json.surname}</span></h1>` +
        `<h3>Nickname:</h3>${json.nickname}<br><br>`);
    updateAdditionalInfo(about, json.about);
    updateAdditionalInfo(travelStory, json.travelStory);
    updateAdditionalInfo(hobbies, json.hobbies);
}

displayAvatar(id);

//DOTO if user updated avatar, delete old one
//change user avatar 
function changeAvatar(file) {
    let storageRef = firebase.storage().ref();

    // Create the file metadata
    let metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = storageRef.child('users_avatars/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    return new Promise(function (resolve, reject) {
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            null,
            error => reject(error.code),
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    resolve(downloadURL);
                });
            })
    })
}

async function getUserImage() {
    let image = await document.getElementById('selectedFile').files[0];
    let url = await changeAvatar(image);
    await updateAvatarLink(url);
    location.reload();
}

async function updateAvatarLink(imgUrl) {
    await fetch(`https://myourway.firebaseio.com/users/${id}.json`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'avatar': imgUrl,
        })
    })
}


// Additional info

function showEditArea(div) {
    let element = document.getElementById(div);
    if (userData[div]) {
        element.childNodes[5].childNodes[1].textContent = userData[div];
    }
    element.childNodes[3].style.display = 'none';
    element.childNodes[5].style.display = 'block';
}

async function saveInfo(div) {
    let element = document.getElementById(div);
    let data = element.querySelector('textarea').value;
    await fetch(`https://myourway.firebaseio.com/users/${id}.json`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            [div]: data,
        })
    })
    userData[div] = data;
    updateAdditionalInfo(element, userData[div]);
    element.childNodes[5].style.display = 'none';
    element.childNodes[3].style.display = 'block';
}

function cancelSaveInfo(div) {
    let element = document.getElementById(div);
    element.querySelector('textarea').value = userData[div] ? userData[div] : '';
    element.childNodes[5].style.display = 'none';
    element.childNodes[3].style.display = 'block';
}


//change password feature

function changePassword() {
    let auth = firebase.auth();
    let emailAddress = auth.currentUser.email;
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        alert('Check your email to complete password changing');
    }).catch(function (error) {
        alert(error.message);
    });
}
   