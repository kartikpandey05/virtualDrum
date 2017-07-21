$("#submitbtn").click(function(){																								
	  var userName = $("input").val();																							//checking input box for more than 2 characters while login
	if(userName.length > 2)
	{
	$("p.user-name").append(userName);											//showing the contents of input box to the main body as a welcome message
    $('#main').removeClass('hidden');
	$('.welcome').addClass('hidden');
	}
	else{
	$("#input-name").addClass("error");
	alert('Name should be more than 3 characters')					//if characters less than 3, shows error
	}
});

$("input").keyup(function(event){
    if(event.keyCode == 13){																													//hit enter to click the Go button 
        $("#submitbtn").click();
    }
});


//songs Detials
var songs = [
	
    {
        'name': 'Animals',
        'artist': 'Martin Garrix',
        'album': 'Dutch DJ',
        'duration': '3:11',
        'fileName': 'song1.mp3',
        'image': 'movie1.jpg'
    },
    {
        'name': 'Bhar do jholi Meri',
        'artist': 'Pritam',
        'album': 'Bajrangi bhaijaan',
        'duration': '8:19',
        'fileName': 'song2.mp3',
        'image': 'movie2.jpg'
    },
    {
        'name': 'Chal Wahaan Jaate Hain',
        'artist': 'Amaal Malik',
        'album': 'Chal Wahaan Jaate Hain',
        'duration': '5:26',
        'fileName': 'song3.mp3',
        'image': 'movie3.jpg'
    },
    {
        'name': 'Manali Trance',
        'artist': 'Neha Kakkar, Lil Golu',
        'album': 'The Shaukeens',
        'duration': '3:23',
        'fileName': 'song4.mp3',
        'image': 'movie4.jpg'
    }
    ]
   
	window.onload = function (){
		changeCurrentSongDetails(songs[0]);
	 	for(var i = 0; i < songs.length; i++) {
	        var obj = songs[i];
	        var name = '#song' + (i+1);
	        var song = $(name);
	        song.find('.song-name').text(obj.name);							//find the song name from object
	        song.find('.song-artist').text(obj.artist);						//find the artist name
	        song.find('.song-album').text(obj.album);			     		//find the album name
	        song.find('.song-length').text(obj.duration);			    	//find song length
	        addSongNameClickEvent(obj, i + 1);
    	}
    	$('#songs').DataTable({					                            //search bar
    		paging: false,
    	});
        updateCurrentTime();
	}
	
	function toggleSong() {
		var song = document.querySelector('audio'); 				    	//toggle song play/pause on click
		if(song.paused) {
			song.play();	
		} else {
			song.pause();
		}
	}
	function addSongNameClickEvent(songObj, id) {							//playing song from the song object
		var songName = songObj.name;
		var fileName = songObj.fileName
		var id = '#song' + id;
		function onClick(event){
		
			var song = document.querySelector('audio');
			var currentSong = song.src;
			if (currentSong.search(fileName) != -1) {
				toggleSong();
			} else {
				changeCurrentSongDetails(songObj);
				song.src = fileName; 
				song.play();	
			}
		}
		
		$(id).on('click', onClick);
	}
	function changeCurrentSongDetails(songObj) {
		var songPath = 'img/' + songObj.image;
	    $('.current-song-image').attr('src', songPath)
	    $('.current-song-name').text(songObj.name)
	    $('.current-song-album').text(songObj.album)
         $('.current-song-duration').text(songObj.duration)
	}

function addSongEventListener(songName, position){
	var id = '#song' + position;
	
	$(id).on('click', function(event){
		var song = document.querySelector('audio');
		var currentSong = song.src;
		
		if(currentSong.search(songName) != -1){
			toggleSong();
		}else{ 
          song.src = songName;
			song.play();
		}
		
	});
}


$('body').on('keypress',function(event) {
								var target = event.target;
								if (event.keyCode == 32 && target.tagName != 'INPUT' )
								{
											var song = document.querySelector('audio');
											if(song.paused == true) {
											console.log('Playing');
													$('.fa-play').removeClass('fa-play').addClass('fa-pause');
													song.play();
								}
								else {
								console.log('Pausing');
											$('.fa-pause').removeClass('fa-pause').addClass('fa-play');
											song.pause();
							}
				}
});


///// current time in second 

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}




function updateCurrentTime(){
    arr = $('.audio-song');
   
    time2 = ~~(arr[0].currentTime);
    time2 = fancyTimeFormat(time2);
    $('.current-time').text( time2 + " seconds");
}



$('.song').on('click',function(){
    setInterval(function(){
        updateCurrentTime(); 
    }, 1000);
});