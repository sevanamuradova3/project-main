function fetchFollowedProfiles() {
  // JSONPlaceholder API'den kullanıcı bilgilerini al
  return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
}

function createFollowedProfilesList(profiles) {
  const followedProfilesListElement = document.getElementById('followedProfilesList');
  followedProfilesListElement.innerHTML = '';

  profiles.forEach(profile => {
      const profileListItem = document.createElement('li');
      profileListItem.innerHTML = `
          <img src="https://i.pravatar.cc/50?u=${profile.id}" alt="${profile.username} Avatar">
          <span>${profile.username}</span>
      `;
      profileListItem.addEventListener('click', () => showProfileDetails(profile.id));
      followedProfilesListElement.appendChild(profileListItem);
  });
}





fetchFollowedProfiles().then(createFollowedProfilesList);

function fetchPosts() {
    axios.get('https://65ca5a7b3b05d29307e03692.mockapi.io/posts')
      .then(response => {
        const data = response.data;
        const postsContainer = document.getElementById('posts');
        data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.setAttribute('data-post-id', post.id);

          postElement.innerHTML = `
            <div class="avatar-container">
              <img src="https://i.pravatar.cc/50?u=${post.profilePhoto}" alt="Avatar">
              <p>${post.name}</p>
            </div>
            <img src="${post.postphoto}" alt="Post Photo">
            <p>${post.caption}</p>
            <div class="buttonDiv">
            <button class="like-button" onclick="likePost(${post.id})"><i class="fa-regular fa-heart"></i></button>
            <button class="save-button" onclick="savePost(${post.id})"><i class="far fa-bookmark"></i> </button>
            <button class="comment-button" onclick="toggleCommentInput(${post.id})"><i class="far fa-comment"></i> </button>
            <input class="comment-input" type="text" placeholder="Yorumunuzu buraya girin...">
            <button class="send-comment-button" onclick="sendComment(${post.id})">Gönder</button>
           
            </div>
             <div class="comment-area"></div>
          `;

          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('There was a problem fetching the posts:', error);
      });
}

function toggleCommentInput(postId) {
    const commentInput = document.querySelector(`.post[data-post-id="${postId}"] .comment-input`);
    commentInput.style.display = 'block';
    const sendCommentButton = document.querySelector(`.post[data-post-id="${postId}"] .send-comment-button`);
    sendCommentButton.style.display = 'inline-block'; 
}

function sendComment(postId) {
    const commentInput = document.querySelector(`.post[data-post-id="${postId}"] .comment-input`);
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentArea = document.querySelector(`.post[data-post-id="${postId}"] .comment-area`);
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;
        commentArea.appendChild(commentElement);
        commentInput.value = '';

     
        const storedComments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
        storedComments.push(commentText);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(storedComments));
    }
}

function likePost(postId) {
    const likeButton = document.querySelector(`.post[data-post-id="${postId}"] .like-button`);
    likeButton.classList.add('liked');

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    likedPosts.push(postId);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
}

function savePost(postId) {
    const saveButton = document.querySelector(`.post[data-post-id="${postId}"] .save-button`);
    saveButton.classList.add('saved');

    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    savedPosts.push(postId);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
}


fetchPosts();