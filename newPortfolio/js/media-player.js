
document.addEventListener("DOMContentLoaded", () => {initializeMediaPlayer()});

let mediaPlayer, textTrack, subtitles;

const playPauseBtn = document.getElementById('play-pause-button');
const stopBtn = document.getElementById('stop-button');
const muteBtn = document.getElementById('mute-button');
const replayBtn = document.getElementById('replay-button');
const volumeUpBtn = document.getElementById('volume-inc-button');
const volumeDownBtn = document.getElementById('volume-dec-button');
const subtitleButton = document.getElementById('cc-button');
const chaptersTrack = document.getElementById('chapters-track');

const player = document.querySelector('#media-player');
const video = player.querySelector('#media-video');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('.player__slider');

let mousedown = false;
var videoTracks = [].slice.call(video.textTracks);

initializeMediaPlayer = () => {
    mediaPlayer = document.getElementById('media-video');
    
    mediaPlayer.controls = false;
    
    addEventListener(mediaPlayer, 'timeupdate', handleProgress);
    addEventListener(mediaPlayer, 'ended', () => {mediaPlayer.pause()});
    
    addEventListener(video, 'click', togglePlayPause);
    addEventListener(video, 'timeupdate', handleProgress);

    addEventListener(playPauseBtn, 'click', togglePlayPause);
    addEventListener(playPauseBtn, 'click', handleProgress);
    
    addEventListener(replayBtn, 'click', replayMedia);
    addEventListener(replayBtn, 'click', handleProgress);
    
    addEventListener(stopBtn, 'click', stopPlayer);
    addEventListener(stopBtn, 'click', handleProgress);

    addEventListener(muteBtn, 'click', handleProgress);
    addEventListener(muteBtn, 'click', toggleMute);
    addEventListener(volumeUpBtn, 'click', () => {changeVolume("up")});
    addEventListener(volumeUpBtn, 'click', handleProgress);
    addEventListener(volumeDownBtn, 'click', () => {changeVolume("down")});
    addEventListener(volumeDownBtn, 'click',  handleProgress);

    ranges.forEach(range => addEventListener(range, 'change', handleRangeUpdate));
    ranges.forEach(range => addEventListener(range, 'mousemove', handleRangeUpdate));
    
    addEventListener(progress, 'click', scrub);
    addEventListener(progress, 'mousemove', () => mousedown && scrub);
    addEventListener(progress, 'mousedown', () => mousedown = true);
    addEventListener(progress, 'mouseup', () => mousedown = false);
    addEventListener(progress, 'change', handleProgress);

    chaptersTrack.onload = () => displayChapters(chaptersTrack);
    
    addEventListener(subtitleButton, 'click', setSubtitlesMode);

    window.onkeyup = (event) => {if(event.keyCode == 32){togglePlayPause()}}

    videoTracks.forEach(videoTrack =>{
        if(videoTrack.kind === 'subtitles'){
            subtitles = videoTrack;
            subtitles.mode = 'hidden';
        }}
    );
}

setSubtitlesMode = () => {
    if (subtitles) {subtitles.mode = (subtitles.mode == 'showing' ? 'hidden' : 'showing');}
}

addEventListener = (elementToAppendEL, eventName, functionToRun) => {    
    elementToAppendEL.addEventListener(eventName, functionToRun);
}

togglePlayPause = () => {
    if (mediaPlayer.paused || mediaPlayer.ended) {
        changeButtonType(playPauseBtn, 'pause');
        mediaPlayer.play();
    }
    else {
        changeButtonType(playPauseBtn, 'play');
        mediaPlayer.pause();
    }
}

stopPlayer = () => {
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
}

changeVolume = (direction) => {
    if (direction === 'up') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
    else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

toggleMute = () => {
    if (mediaPlayer.muted === true) {
        changeButtonType(muteBtn, 'mute');
    }
    else if (mediaPlayer.muted === false) {
        changeButtonType(muteBtn, 'unmute');
    }
    mediaPlayer.muted = !mediaPlayer.muted;
}

replayMedia = () => {
    resetPlayer();
    mediaPlayer.play();
    if (mediaPlayer.paused || mediaPlayer.ended) {
        changeButtonType(playPauseBtn, 'pause');
    }
    else {
        changeButtonType(playPauseBtn, 'play');
    }
}

changeButtonType = (btn, value) => {
    if(btn && value){
        btn.title = value;

        if(btn.classList.contains('play')){
            buttonStyling(btn, 'play', 'play', 'pause');
        }
        else if (btn.classList.contains('pause')){
            buttonStyling(btn, 'play', 'pause', 'play');
        }
        
        if(btn.classList.contains('mute')){
            buttonStyling(btn, 'mute', 'mute', 'unmute');
        }
        else if (btn.classList.contains('unmute')){
            buttonStyling(btn, 'mute', 'unmute', 'mute');

        }
    }
}

buttonStyling = (btn, title, value1, value2) => {
    const buttonImage = document.getElementById(title + '-img');
    buttonImage.src = "img/video/" + value2 + ".png";
    btn.classList.add(value2);
    btn.classList.remove(value1);
}

resetPlayer = () => {
    progressBar.value = 0;
    video.currentTime = 0;
    changeButtonType(playPauseBtn, 'play');
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

displayChapters = (trackElement) => {
    if ((trackElement) && (textTrack = trackElement.track)){
        if (textTrack.kind === "chapters"){
            textTrack.mode = 'hidden';
            let chapterName, start;

            for (let x = 0; x < textTrack.cues.length; ++x) {
                chapterName = textTrack.cues[x].text;
                start = textTrack.cues[x].startTime;

                newChapterListItem = document.createElement("li");
                const chapterDescription = document.createTextNode(chapterName);
                newChapterListItem.setAttribute('id', start);
                newChapterListItem.appendChild(chapterDescription);

                chaptersList.append(newChapterListItem);
                let chaptersListItems = chaptersList.getElementsByTagName('li');

                // loop through li items and add click event listener
                for (let x = 0; x < chaptersListItems.length; x++){
                    addEventListener(chaptersListItems[x], 'click', () => {setCurrentChapterStyle(chaptersListItems[x])});
                    chaptersListItems[x].style.fontFamily = 'Cascadia';
                    chaptersListItems[x].style.padding = '4%';
                }
            }
            addEventListener(textTrack, 'cuechange', setCurrentChapter);
        }
    }
}

setCurrentChapterStyle = (currentChapter) =>{
    document.getElementById('media-video').currentTime = currentChapter.id;
    currentChapter.style.textShadow = "-1px 1px 0 #340a67, 1px 1px 0 #340a67, 1px -1px 0 #340a67; -1px -1px 0 #340a67";
}

setCurrentChapter = () => {
    if(!mediaPlayer.ended) {
        var currentChapter = textTrack.activeCues[0].startTime;
        if (chapter = document.getElementById(currentChapter)) {
            var videoChapters = [].slice.call(document.querySelectorAll("#chapters li"));
            videoChapters.forEach(videoChapter => {videoChapter.classList.remove("current");});
            chapter.classList.add("current");
            chaptersList.style.top = "-"+chapter.parentNode.offsetTop+"px";
        }
    }
}

scrub = (event) => {video.currentTime = ((event.offsetX / progress.offsetWidth) * video.duration)};

const chaptersList = document.getElementById("chapters");
const trackElement = video.getElementsByTagName("track")[0];