const modal = document.getElementById("festivalModal");
const span = document.getElementsByClassName("close")[0];
var myData = "";
 var globalVariable={
       x: 'hello'
    };

function createCard(playlist) {
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
    </div>
    <button class="middle-part" liked="false" onclick="toggleLike(this)">
      <i class="fa-solid fa-heart"></i> ${playlist.likes}
    </button>
  `;

  const upperPart = newCard.querySelector('.upper-part');
  upperPart.addEventListener('click', () => openModal(playlist));
  return newCard;
}




function loadCards() {
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
     // globalVariable = data;
      const row1 = document.querySelector('.row1');
      data.forEach(playlist => {
         console.log("play list" + playlist);

        const card = createCard(playlist);
        row1.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading JSON:', err));
}

document.addEventListener('DOMContentLoaded', loadCards);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sButton').addEventListener('click', shuffleSongs);
});


function openModal(festival) {
   // top image
   document.getElementById('festivalName').innerText = festival.name;
   document.getElementById('festivalImage').src = festival.imageUrl;
   document.getElementById('playlist-name').innerText = festival.playlistName;
   document.getElementById('creator-name').innerText = festival.creator; 
   // first song
   document.getElementById('festivalImageCenter1').src = festival.imageCenter1;
   document.getElementById('song-title1').innerText = festival.songTitle1; 
   document.getElementById('artist-name1').innerText = festival.songArtist1; 
   document.getElementById('minutes1').innerText = festival.duration1; 
   // second song
   document.getElementById('festivalImageCenter2').src = festival.imageCenter2;
   document.getElementById('song-title2').innerText = festival.songTitle2; 
   document.getElementById('artist-name2').innerText = festival.songArtist2; 
   document.getElementById('minutes2').innerText = festival.duration2; 
   // third song
   document.getElementById('festivalImageCenter3').src = festival.imageCenter3;
   document.getElementById('song-title3').innerText = festival.songTitle3; 
   document.getElementById('artist-name3').innerText = festival.songArtist3;
   document.getElementById('minutes3').innerText = festival.duration3; 
   modal.style.display = "block";
}

function shuffleSongs() {
    const songs = [
        {
            image: document.getElementById('festivalImageCenter1').src,
            title: document.getElementById('song-title1').innerText,
            artist: document.getElementById('artist-name1').innerText,
            duration: document.getElementById('minutes1').innerText
        },
        {
            image: document.getElementById('festivalImageCenter2').src,
            title: document.getElementById('song-title2').innerText,
            artist: document.getElementById('artist-name2').innerText,
            duration: document.getElementById('minutes2').innerText
        },
        {
            image: document.getElementById('festivalImageCenter3').src,
            title: document.getElementById('song-title3').innerText,
            artist: document.getElementById('artist-name3').innerText,
            duration: document.getElementById('minutes3').innerText
        }
    ];

    // Shuffle
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    // Update modal with shuffled songs
    const updateSong = (index, song) => {
        document.getElementById(`festivalImageCenter${index}`).src = song.image;
        document.getElementById(`song-title${index}`).innerText = song.title;
        document.getElementById(`artist-name${index}`).innerText = song.artist;
        document.getElementById(`minutes${index}`).innerText = song.duration;
    };

    updateSong(1, songs[0]);
    updateSong(2, songs[1]);
    updateSong(3, songs[2]);
}


function toggleLike(button) {
	const isLiked = button.getAttribute('liked') === 'true';
	let likesCount = parseInt(button.textContent.match(/\d+/)[0], 10);
	if (isLiked) {
		likesCount -= 1;
		button.innerHTML = `<i class="fa-solid fa-heart"></i> ${likesCount}`;
		button.setAttribute('liked', 'false');
	} else {
		likesCount += 1;
		button.innerHTML = `<i class="fa-solid fa-heart"></i> ${likesCount}`;
		button.setAttribute('liked', 'true');
	}
}

function shuffleCard() {
   const shuffleButton = document.querySelector('sButton'); 
   upperPart.addEventListener('click', () => print("pulsed"));
}


span.onclick = function() {
   modal.style.display = "none";
}

window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

