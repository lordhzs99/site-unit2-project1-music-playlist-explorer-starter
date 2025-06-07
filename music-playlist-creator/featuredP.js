let cardList = []; 

// Create a single card element (for use if needed)
function createCard(playlist) {
    console.log(playlist.singerName); 
  const newCard = document.createElement('div');
  newCard.className = 'card1';
  newCard.innerHTML = `
    <div class="upper-part">
      <div class="song-image">
        <img class="albumCover" src="${playlist.songImage}" />
      </div>
      <div class="song-info">
        <h3 class="song-name">${playlist.songName}</h3>
        <p class="singer-name">${playlist.singerName}</p>
      </div>
      <div>
        <h2 class="artist-name">${playlist.singerName}</h2>
      </div>
    </div>
    <button class="middle-part" liked="false" onclick="toggleLike(this)">
      <i class="fa-solid fa-heart"></i> ${playlist.likes}
    </button>
  `;
  return newCard;
}

// Shuffle utility function
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

// New function to render album cover and 3 songs list side by side
function renderAlbumWithSongs(album, songs) {
  const container = document.getElementById('featuredPage');
  container.innerHTML = ''; // Clear previous content

  const albumContainer = document.createElement('div');
  albumContainer.className = 'album-container';

  // Album cover left side
  const coverDiv = document.createElement('div');
  coverDiv.className = 'album-cover';
  coverDiv.innerHTML = `<img src="${album.songImage}" alt="Album Cover" />`;

  // Songs list right side
  const listDiv = document.createElement('div');
  listDiv.className = 'song-list';

  const ul = document.createElement('ul');
  songs.slice(0, 3).forEach(song => {
    const li = document.createElement('li');
    li.textContent = song.songName;
    ul.appendChild(li);
  });

  listDiv.appendChild(ul);

  albumContainer.appendChild(coverDiv);
  albumContainer.appendChild(listDiv);

  container.appendChild(albumContainer);
}

// Main function to open featured page
function openFeaturedPage() {
  if (!cardList.length) return;

  // Shuffle songs
  shuffle(cardList);

  // Show album cover (first song) and 3 songs from the rest
  renderAlbumWithSongs(cardList[0], cardList.slice(1));
}

// Load data from JSON and initialize
document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      cardList = data;
      openFeaturedPage();
    })
    .catch(err => console.error('Error loading JSON:', err));

  // Shuffle button
  const shuffleBtn = document.getElementById('shuffleBtn');
  shuffleBtn.addEventListener('click', () => {
    openFeaturedPage();
  });
});
