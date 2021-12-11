
// be instantiated with a BPM
// allow for reassigning the BPM
// control the interval of the ticks
// and broadcast to registered listeners
class Ticking {
    constructor(bpm, start = false) {
        this.currentTicking = null;
        this.bpm = bpm;
        this.tickListeners = [];
        this.playStateListeners = [];
        this.currentTickPosition = 1;
        if (start) {
            this.startPlaying();
        }
    }
    setBPM(newBpm) {
        this.bpm = newBpm;
        this.stopPlaying();
    }
    startPlaying() {
        this.currentTicking = setInterval(() => {
            const infoForThisTick = Ticking.formTickInfo(this.currentTickPosition);
            this.tickListeners.forEach(l => l(this.currentTickPosition, infoForThisTick));
            if (this.currentTickPosition === 64) {
                this.currentTickPosition = 1;
            } else {
                this.currentTickPosition = this.currentTickPosition + 1;
            }
        }, Ticking.quarterNoteBPMTo64WholeNoteSubdivisions(this.bpm));
        this.playStateListeners.forEach(l => l(true));
    }
    stopPlaying() {
        clearInterval(this.currentTicking);
        this.currentTicking = null;
        this.playStateListeners.forEach(l => l(false));
    }
    isPlaying() {
        return this.currentTicking !== null;
    }
    onTick(listener) {
        this.tickListeners.push(listener);
    }
    onPlayChange(listener) {
        this.playStateListeners.push(listener);
    }
    static bpmToMilliseconds(bpmValue) {
        // 60bpm -> 1 beat every second 
        // 30bpm -> 1 beat every 2 seconds
        // 120bpm -> 2 beats every second
        const amountOfMillisecondsInAMinute = 1000 * 60;
        return amountOfMillisecondsInAMinute / bpmValue;
    }
    static quarterNoteBPMTo64WholeNoteSubdivisions(bpmValue) {
        const msForQuarterNote = Ticking.bpmToMilliseconds(bpmValue);
        const wholeNoteMs = msForQuarterNote * 4;
        return wholeNoteMs / 64;
    }
    static tickInfos = {};
    static formTickInfo(tickPosition) {
        if (Ticking.tickInfos[tickPosition]) return Ticking.tickInfos[tickPosition];
        const t = tickPosition;
        const isQuarterNote = t % 16 === 1;
        const output = {
            isWholeNote: t === 1,
            isHalfNote: t % 32 === 1,
            isQuarterNote,
            whichQuarterNote: isQuarterNote ? Math.ceil(t / 16) : null,
            isEightNote: t % 8 === 1,
            isSixteenthNote: t % 4 === 1,
            is32ndNote: t % 2 === 1,
            is64thNote: true,
        };
        Ticking.tickInfos[tickPosition] = output;
        return output;
    }
}


window.addEventListener("DOMContentLoaded", () => {

    const audio = new Audio("https://freewavesamples.com/files/Cowbell-2.wav");
    const playClick = () => {
        audio.play();
    };

    const bpmDisplay = document.querySelector("#current-bpm-value");
    const bpmSlider = document.querySelector("#bpm-slider");
    const playControlButton = document.querySelector("#play-control-button");

    const ticker = new Ticking(60);

    ticker.onTick((whichTick) => {
        if (whichTick % 16 === 1) {
            playClick();
        }
    });

    const squares = {
        wholeNote: document.querySelector("#see-1st"),
        halfNote: document.querySelector("#see-2nd"),
        quarterNote: document.querySelector("#see-4th"),
        eightNote: document.querySelector("#see-8th"),
        sixteenthNote: document.querySelector("#see-16th"),
    };

    ticker.onTick((whichTick) => {
        if (whichTick === 1) {
            console.log("Whole note");
            squares.wholeNote.style.opacity = 1;
            setTimeout(() => {
                squares.wholeNote.style.opacity = 0;
            }, 200);
        }
        if (whichTick % 16 === 1) {
            console.log("Quarter note");
            squares.quarterNote.style.opacity = 1;
            setTimeout(() => {
                squares.quarterNote.style.opacity = 0;
            }, 200);
        }
        if (whichTick % 4 === 1) {
            squares.sixteenthNote.style.opacity = 1;
            setTimeout(() => {
                squares.sixteenthNote.style.opacity = 0;
            }, 100);
        }
    });

    ticker.onPlayChange((isPlaying) => {
        if (isPlaying) {
            playControlButton.innerHTML = "Pause";
        } else {
            playControlButton.innerHTML = "Play";
        }
    });

    playControlButton.addEventListener("click", () => {
        if (ticker.isPlaying()) {
            ticker.stopPlaying();
        } else {
            ticker.startPlaying();
        }
    });

    bpmSlider.addEventListener("change", () => {
        const bpmValue = bpmSlider.value;
        bpmDisplay.innerHTML = bpmValue;
        ticker.setBPM(parseInt(bpmValue, 10));
    });

});

