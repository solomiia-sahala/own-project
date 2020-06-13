// get user id 

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
        displayArticles(id);
    } else {
        alert(`Error: ${response.status}`);
    }
}

function updateAdditionalInfo(section, text) {
    if (text) {
        section.querySelector('p').innerHTML = text;
    } else {
        section.style.display = 'none';
    }
}

function fillUserData(json) {
    user_image.insertAdjacentHTML('beforeend', `<img src="${json.avatar}" alt="avatar">`);
    nameSurname.insertAdjacentHTML('afterbegin', `<h1><span class="colored-word">${json.name} ${json.surname}</span></h1>`);
    updateAdditionalInfo(about, json.about);
    updateAdditionalInfo(travelStory, json.travelStory);
    updateAdditionalInfo(hobbies, json.hobbies);
}

displayAvatar(id);

// articles 

function createElem(article, key) {
    grid_articles.insertAdjacentHTML('beforeend', '<div class="all_data"><article class="post">'
        + `<div class="picture"><img src="${article.image}" alt="article-2"></div>`
        + `<div><h3>${article.header}</h3>`
        // + `<p>${article.description}</p>`
        + `<button id="${key}" class="btn readMe_button">Read More...</button></div></article></div>`);

    document.getElementById(key).onclick = function () {
        window.location.pathname = `read_me/${key}`;
    }
}

async function displayArticles(id) {
    if (!userData.articles) return;
    let response = await fetch(`https://myourway.firebaseio.com/trip-articles.json?orderBy="author/id"&equalTo="${id}"`);
    if (response.ok) {
        let data = await response.json();
        Object.keys(data).forEach(key => {
            createElem(data[key], key);
        })
    } else {
        alert(`Error: ${response.status}`);
    }
}

// back button
function backButton() {
    window.location.pathname = '/';
}
