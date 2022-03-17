function _(query) {
  return document.querySelector(query);
}

function _all(query) {
  return document.querySelectorAll(query);
}

let songList = [
  
  {
    thumbnail: "//images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4NTAyNjctaW1hZ2Uta3d5bzlweDkuanBn.jpg?s=LyPV_Faqv9PbxJirPBKV6j1Vzk_gynTSCRl_XGngXBc",
    audio: "//us3freenew.listen2myradio.com/live.mp3?typeportmount=s1_30289_stream_350862419",
    songname: "Orlando - EUA",
    artistname: "Rádio ECD FM",
  },
  
  {
    thumbnail: "//www.redeencontro.com.br/wp-content/uploads/sites/6/2022/02/ecd-sao-paulo.jpg",
    audio: "//streaming05.zas.media:9029/live",
    songname: "BRASIL",
    artistname: "Rádio ECD FM",
  }
  
];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(".player .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
};

toggleSongList.addEventListener("click", function() {
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex) {
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="https:${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i = 0; i < songListItems.length; i++) {
	songListItems[i].addEventListener("click", function() {
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","https:" + song.thumbnail);
  
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("https:${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";
  
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","https:" + song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay", function() {
		main.audio.play();
    
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
      
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click", function() {
	currentSongIndex--;
	if(currentSongIndex < 0) {
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});

main.nextControl.addEventListener("click", function() {
	currentSongIndex = (currentSongIndex + 1) % songList.length;
	loadSong(currentSongIndex);
});

main.playPauseControl.addEventListener("click", function() {
	if(main.audio.paused) {
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});

main.seekbar.addEventListener("change", function() {
	main.audio.currentTime = main.seekbar.value;
});

_(".player .main .controls .repeat-control").addEventListener("click", function(){
     loadSong(currentSongIndex);
});

loadSong(currentSongIndex);

/*FullScreen Mode*/
let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    }
    else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
});