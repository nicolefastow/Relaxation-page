const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    
    //sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //outline length
    const outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 120;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // choose sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // select duration button
    timeSelect.forEach(timeButton => {
        timeButton.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //play and pause sounds function
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }
   
    //circle animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //circle animation blue bar
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //update time text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        //stopping song and video when timer is done
        if(currentTime >= fakeDuration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
        }
    };

}



app();