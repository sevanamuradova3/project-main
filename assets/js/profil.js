var userProfile = {
    profilePicture: '',
    username: '',
    bio: ''
};


function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function updateProfile() {
    var newUsername = document.getElementById('new-username').value;
    var newBio = document.getElementById('new-bio').value;
    var newProfilePicture = document.getElementById('new-profile-picture').files[0];

    document.getElementById('current-username').innerText = newUsername;
    document.getElementById('current-bio').innerText = newBio;

    if (newProfilePicture) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-picture').src = e.target.result;

            userProfile.username = newUsername;
            userProfile.bio = newBio;
            userProfile.profilePicture = e.target.result;

            saveUserProfile();
        };
        reader.readAsDataURL(newProfilePicture);
    }

    closeEditModal();
}
var followingUsers = [];
function searchUsers() {
    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchInput === '') {

        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            var searchResults = users.filter(user => user.name.toLowerCase().includes(searchInput));
            displaySearchResults(searchResults);
            document.getElementById('searchInput').value = '';
        })
        .catch(error => console.error('Arama sırasında bir hata oluştu: ', error));
}


function displaySearchResults(results) {
    var searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(user => {
        var userElement = document.createElement('div');
        userElement.className = ('users')
        userElement.textContent = user.name;

        var followButton = document.createElement('button');
        followButton.textContent = 'Follow';
        followButton.onclick = function () {
            followUser(user);
        };

        userElement.appendChild(followButton);
        searchResultsContainer.appendChild(userElement);
    });
}

function followUser(user) {
    if (!followingUsers.some(u => u.id === user.id)) {
        followingUsers.push(user);
        saveFollowingList();
        updateFollowingCount();
    }
}

function saveFollowingList() {
    localStorage.setItem('followingUsers', JSON.stringify(followingUsers));
}

function loadFollowingList() {
    var storedFollowing = localStorage.getItem('followingUsers');
    if (storedFollowing) {
        followingUsers = JSON.parse(storedFollowing);
        updateFollowingCount();
    }
}

function updateFollowingCount() {
    document.getElementById('followingCount').textContent = '(' + followingUsers.length + ')';
}

function showFollowingList() {
    var followingListContainer = document.getElementById('followingUsers');
    followingListContainer.innerHTML = '';

    followingUsers.forEach(user => {
        var listItem = document.createElement('li');
        listItem.textContent = user.name;
        followingListContainer.appendChild(listItem);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    loadFollowingList();
});


function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

function loadUserProfile() {
    var storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        renderUserProfile();
    }
}

function renderUserProfile() {
    document.getElementById('current-username').textContent = userProfile.username;
    document.getElementById('current-bio').textContent = userProfile.bio;

    if (userProfile.profilePicture) {
        document.getElementById('profile-picture').src = userProfile.profilePicture;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
});


var userPosts = [];




function addNewPost() {
    var imageInput = document.getElementById('post-image-input');
    var title = document.getElementById('post-title').value;

    if (imageInput.files.length > 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imageUrl = e.target.result;

            var newPost = {
                imageUrl: imageUrl,
                title: title,
                likes: 0,
                saves: 0,
                comments: []
            };

            userPosts.push(newPost);
            renderUserPosts();
            hideCreatePostForm();

            saveToLocalStorage();
        };

        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Please select an image file.");
    }
}

function deletePost(index) {
    userPosts.splice(index, 1);
    renderUserPosts();
    saveToLocalStorage();
}

function likePost(index) {
    userPosts[index].likes++;
    renderUserPosts();
    saveToLocalStorage();
}

function savePost(index) {
    userPosts[index].saves++;
    renderUserPosts();
    saveToLocalStorage();
}

function commentOnPost(index, comment) {
    userPosts[index].comments.push(comment);
    renderUserPosts();
    saveToLocalStorage();
} function renderUserPosts() {
    var postContainer = document.getElementById('posts-container');

    postContainer.innerHTML = '';

    userPosts.forEach(function (post, index) {
        var postElement = document.createElement('div');
        postElement.className = 'post';

        var postImage = document.createElement('img');
        postImage.src = post.imageUrl;
        postImage.alt = 'User Post Image';

        var postTitle = document.createElement('p');
        postTitle.className = 'post-title';
        postTitle.textContent = post.title;

        var postActions = document.createElement('div');
        postActions.className = 'post-actions';

        var likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="fa-regular fa-heart"></i>  ' + post.likes + '';
        likeButton.onclick = function () {
            likePost(index);
        };

        var saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="far fa-bookmark"></i>  ' + post.saves + ' ';
        saveButton.onclick = function () {
            savePost(index);
        };

        var commentButton = document.createElement('button');
        commentButton.innerHTML = '<i class="far fa-comment"></i> ';
        commentButton.onclick = function () {
            var comment = prompt('adad to a comment');
            commentOnPost(index, comment);
        };

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> ';
        deleteButton.onclick = function () {
            deletePost(index);
        };

        postActions.appendChild(likeButton);
        postActions.appendChild(saveButton);
        postActions.appendChild(commentButton);
        postActions.appendChild(deleteButton);

        postElement.appendChild(postImage);
        postElement.appendChild(postTitle);
        postElement.appendChild(postActions);

        postContainer.appendChild(postElement);
    });
}


function showCreatePostForm() {
    var createPostForm = document.getElementById('create-post-form');
    createPostForm.style.display = 'block';
}

function hideCreatePostForm() {
    var createPostForm = document.getElementById('create-post-form');
    createPostForm.style.display = 'none';

    document.getElementById('post-image-input').value = '';
    document.getElementById('post-title').value = '';
}

function saveToLocalStorage() {
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
}

function loadFromLocalStorage() {
    var storedPosts = localStorage.getItem('userPosts');
    var storedProfile = localStorage.getItem('userProfile');

    if (storedPosts) {
        userPosts = JSON.parse(storedPosts);
        renderUserPosts();
    }

    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        renderUserProfile();
    }
}

function renderUserProfile() {
    document.getElementById('current-username').textContent = userProfile.username;
    document.getElementById('current-bio').textContent = userProfile.bio;

    if (userProfile.profilePicture) {
        document.getElementById('profile-picture').src = userProfile.profilePicture;
    }
}


function loadUserProfile() {
    var storedProfile = localStorage.getItem('userProfile');

    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        renderUserProfile();
    }
}

function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

loadUserProfile();

document.addEventListener('DOMContentLoaded', function () {
    loadFromLocalStorage();
    loadFollowingList();

});



