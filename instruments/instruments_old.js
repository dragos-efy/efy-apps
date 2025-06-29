let key_repeat_time = 100;

const audioElement = $add('audio', {src: './instruments/C3.mp3', id: 'is_audio_piano'});

const FX2 =(instrument, ...parameters)=>{ return FX.play(instrument, ...parameters)},

FX = {
    volume: .3,
    sampleRate: 44100,
    x: new AudioContext,
    audioBuffers: {},
    play: async function(instrument, ...parameters) {
        if (instrument === 'piano' || instrument === 'guitar'){
            //Piano Function?
        }
        else { return this.playSamples(this.buildSamples(...parameters))}
    },
    playSamples: function(...samples){
        // create buffer and source
        const buffer = this.x.createBuffer(samples.length, samples[0].length, this.sampleRate),
        source = this.x.createBufferSource();

        samples.map((d,i)=> buffer.getChannelData(i).set(d));
        source.buffer = buffer; source.connect(this.x.destination);
        source.start(); return source;
    },
    buildSamples: function(
        volume = 1,
        randomness = .05,
        frequency = 220,
        attack = 0,
        sustain = 0,
        release = .1,
        shape = 0,
        shape_curve = 1,
        slide = 0,
        deltaSlide = 0,
        pitch_shift = 0,
        pitch_shift_time = 0,
        repeat_time = 0,
        noise = 0,
        modulation = 0,
        bitCrush = 0,
        delay = 0,
        sustain_volume = 1,
        decay = 0,
        tremolo = 0,
        filter = 0
    ){
        // Set Parameters
        let PI2 = Math.PI * 2, sign = v => v < 0 ? -1 : 1, sampleRate = this.sampleRate,
            startSlide = slide *= 500 * PI2 / sampleRate / sampleRate,
            startFrequency = frequency *=
                (1 + randomness * 2 * Math.random() - randomness) * PI2 / sampleRate,
            b = [], t = 0, tm = 0, i = 0, j = 1, r = 0, c = 0, s = 0, f, length,

            // Biquad LP/HP Filter
            quality = 2, w = PI2 * Math.abs(filter) * 2 / sampleRate,
            cos = Math.cos(w), alpha = Math.sin(w) / 2 / quality,
            a0 = 1 + alpha, a1 = -2 * cos / a0, a2 = (1 - alpha) / a0,
            b0 = (1 + sign(filter) * cos) / 2 / a0,
            b1 = -(sign(filter) + cos) / a0, b2 = b0,
            x2 = 0, x1 = 0, y2 = 0, y1 = 0;

        // scale by sample rate
        attack = attack * sampleRate + 9; // Prevent Pop Sound
        decay *= sampleRate;
        sustain *= sampleRate;
        release *= sampleRate;
        delay *= sampleRate;
        deltaSlide *= 500 * PI2 / sampleRate**3;
        modulation *= PI2 / sampleRate;
        pitch_shift *= PI2 / sampleRate;
        pitch_shift_time *= sampleRate;
        repeat_time = repeat_time * sampleRate | 0;
        volume *= this.volume;

        // generate waveform
        for(length = attack + decay + sustain + release + delay | 0; i < length; b[i++] = s * volume){ // sample
            if (!(++c % (bitCrush * 100 | 0))){ // Bit Crush
                s = shape ? shape > 1 ? shape > 2 ? shape > 3 ? // Wave Shape
                    Math.sin(t ** 3) : // 4 Noise
                    Math.max(Math.min(Math.tan(t), 1), -1) : // 3 Tan
                    1 - (2 * t / PI2 % 2 + 2) % 2 : // 2 Saw
                    1 - 4 * Math.abs(Math.round(t / PI2) - t / PI2): // 1 Triangle
                    Math.sin(t); // 0 Sin

                s = (repeat_time ?
                    1 - tremolo + tremolo * Math.sin(PI2 * i / repeat_time) // Tremolo
                    : 1) *
                    sign(s) * (Math.abs(s) ** shape_curve) * // Curve
                    (i < attack ? i / attack : // Attack
                    i < attack + decay ? // Decay
                    1 - ((i - attack) / decay) * (1 - sustain_volume) : // Decay Falloff
                    i < attack  + decay + sustain ? // Sustain
                    sustain_volume : // Sustain Volume
                    i < length - delay ? // Release
                    (length - i - delay) / release * // Release Falloff
                    sustain_volume : // Release Volume
                    0); // Post Release

                s = delay ? s / 2 + (delay > i ? 0 : // Delay
                    (i < length - delay ? 1 : (length - i) / delay) * // Release Delay
                    b[i - delay | 0] / 2 / volume) : s; // Sample Delay

                if (filter) s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
            }

            f = (frequency += slide += deltaSlide) * // Frequency
                Math.cos(modulation * tm++); // Modulation
            t += f + f * noise * Math.sin(i ** 5); // Noise

            if (j && ++j > pitch_shift_time){
                frequency += pitch_shift; // Pitch Shift
                startFrequency += pitch_shift; // Apply at Start
                j = 0; // End Pitch Shift Time
            }

            if (repeat_time && !(++r % repeat_time)){
                frequency = startFrequency; // reset frequency
                slide = startSlide; // reset slide
                j = j || 1; // reset pitch jump time
            }
        }
        return b;
    },
    // get frequency of a musical note on a diatonic scale
    getNote: function(semitoneOffset = 0, rootNoteFrequency = 440){
        return rootNoteFrequency * 2 ** (semitoneOffset / 12);
    }
};


////////////////


$ready('#efy_sbtheme', ()=>{

$add('div', {class: 'is_nav', efy_select: ''}, [
    ['span', {id: 'instruments_container'}],
    ['div', {class: 'efy_flex'}, [
        ['div', {class: 'efy_split_btn'}, [
            ['label', {for: 'octave'}, 'Octave'],
            ['input', {type: 'number', id: 'octave', style: 'width:40rem', value: '0', min: '-3', max: '4'}]
        ]],
        ['div', {class: 'efy_split_btn'}, [
            ['label', {for: 'Y'}, 'Semitone'],
            ['input', {type: 'number', id: 'Y', style: 'width:40rem', value: '0', min: '-12', max: '12'}]
        ]],
        ['select', {id: 'wave_shape', style: 'width: 120rem'}, [
            ['option', 'sine'], ['option', 'triangle'], ['option', 'saw'], ['option', 'tan'], ['option', 'noise']
        ]],
        ['select', {id: 'repeat_time', style: 'width: 80rem'}, [
            ['option', '25'], ['option', '50'], ['option', '100'], ['option', '150'], ['option', '200'], ['option', '250'], ['option', '300']
        ]]
    ]],
    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i', {efy_icon: 'menu'}]]]
]);

$add('div', {id: 'piano', style: 'user-select:none'}, [
    ['div', {class: 'sharp'}, [['button', {class: 'empty'}]]],
    ['div', {class: 'normal'}]
]);

const instruments_container = $('#instruments_container');
I = 0; // instrument type

// instrument select

const sound_names = 'Pad, Drums, Synth, Funny, Glitchy, Metalic, Bell, Flute, Beep, Bleep'.split(', ');

for (let i = 0; i < sound_names.length; i++){ const id = `instrument_${i}`, checked = (i === 0) ? {checked: ''} : null;
    $add('input', {id: id, type: 'radio', name: I, ...checked, onclick: `I = ${i}`}, '', instruments_container);
    $add('label', {for: id}, sound_names[i], instruments_container);
};

// piano keys

const letters = 'C C# D D# E F F# G G# A A# B'.split(' ');
let letters_i = 0, letters_j = 0;

function get_frequency(note_name, octave_nr){
    // Note Names to Numbers (A4 = 69)
    const noteNumber = letters.indexOf(note_name) + (octave_nr + 1) * 12 + 12;
    const frequency = 440 * Math.pow(2, (noteNumber - 69) / 12);
    return frequency;
}

for (i = 0; i < 36; i++){

    const sharp = (`02579`.indexOf(i%12 - 1) < 0) ? '.normal' : '.sharp';
    frequency = get_frequency(letters[letters_i], letters_j + 2);

    $add('button', {
        id: `K${k = i}`, key: `${letters[letters_i]}${letters_j}`
        //, onpointerdown: ``, onpointerup: ``, onpointerout: ``
    }, `ZSXDCVGBHNJMQ2W3ER5T6Y7UI9O0P[=]`[i], $$(piano, sharp));

    if ([3, 10, 15, 22, 27].includes(i)){
        $add('button', {class: 'empty'}, '', $$(piano, sharp));
    }
    if (letters_i === 11){ letters_i = 0; letters_j++}
    else { letters_i++}
};

// keyboard key to piano key
T = i => (k = `ZSXDCVGBHNJM,L.;/Q2W3ER5T6Y7UI9O0P[=]`.indexOf(i.key.toUpperCase()), k - 5 * (k > 16));


const KEY_LAYOUT = `ZSXDCVGBHNJM,L.;/Q2W3ER5T6Y7UI9O0P[=]`;
let keysDown = {};

$event(document, 'keydown', handleKeyDown);
$event(document, 'keyup', handleKeyUp);

$event($('#repeat_time'), 'change', ()=>{ updateInterval(event.target.value)});

function handleKeyDown(event) {
    const key = event.key.toUpperCase();
    if (KEY_LAYOUT.includes(key) && !keysDown[key]){ keysDown[key] = true}
}

function handleKeyUp(event) {
    const key = event.key.toUpperCase();
    if (KEY_LAYOUT.includes(key) && keysDown[key]){ delete keysDown[key]; onkeyup2({key: key})}
}

// Function to check if a key is being held (to be used with setInterval)
function isKeyHeld(key) {
    return keysDown[key] === true;
}

function setupInterval(key_repeat_time) {
    intervalId = setInterval(() => {
        Object.keys(keysDown).forEach(key => {
            if (isKeyHeld(key)) onkeydown2({key: key});
        });
    }, key_repeat_time);
}
function updateInterval(newKeyRepeatTime) {
    if (intervalId) clearInterval(intervalId);
    setupInterval(newKeyRepeatTime);
}

setupInterval(key_repeat_time);

function changeKeyRepeatTime(key_repeat_time) {
    updateInterval(key_repeat_time);
}


// play note on key down
const onkeydown2 = i =>{ let ti = T(i), octave = 2;
    if (ti !== -1){
        if (ti >= 12 && ti < 24) {ti -= 12; octave += 1}
        else if (ti >= 24 && ti < 36) {ti -= 24; octave += 2}
        let note = letters[ti];
        const frequency = get_frequency(note, octave + Number(Number($('#octave').value) + (Number($('#Y').value) / 12))),
        key = note + (octave - 2);
        shape = wave_shape.selectedIndex;

        let sounds = [
            /*Pad*/ [,0,frequency,.15,,,shape],
            /*Drums*/ [16,0,frequency,,.15,.05,4,25,.3,,,,,,,,,0,.15,,-70],
            /*Synth*/ [,0,frequency,.01,,0,shape,0,.3,,,,,,,,,0,.06],
            /*Funny*/ [,0,frequency,.05,,.05,shape,.5,.3,,,,,,,,,,.15],
            /*Glitchy*/ [,0,frequency,,.15,0,shape,0,,,,,.05,,,.2,,.8,,1,400],
            /*Metalic*/ [.6,,frequency,.03,.07,.12,shape,.8,,,185,.05,,,48,,,.93,.01,,-562],
            /*Bell*/ [,0,frequency,,.09,.15,shape,3.6,,,,,.07,,,.1,,.6,.02],
            /*Flute*/ [2.9,0,frequency,.01,.04,.02,shape,3.6,,,,,,.7,,,.42,.59,.01,.13,405],
            /*Beep*/ [,0,frequency,,,.15,shape,1.2,,,,,,,,,,.6,.15,,400],
            /*Bleep*/ [,0,frequency,,.01,.02,shape,.7,,,,,,,,,,.89,.02]
        ];

        /*const test =()=>*/ FX2('synth', ...sounds[I]);
        const k = $(`[key="${key}"]`); k.classList.add('active');

        // test2 = setInterval(()=>{
        //     test();
        //     $wait(.3, test);
        //     $wait(.5, test);
        // }, 1000); test2;

        console.log(ti, frequency, key, note)
    }
};

// release note on key up
const onkeyup2 = i => { let ti = T(i), octave = 2;
    if (ti !== -1){
        if (ti >= 12 && ti < 24) {ti -= 12; octave += 1}
        else if (ti >= 24 && ti < 36) {ti -= 24; octave += 2}
        let note = letters[ti]; key = note + (octave - 2);

        const k = $(`[key="${key}"]`); k.classList.remove('active');
    }
};

$event($('#piano'), 'contextmenu', (event)=> event.preventDefault());

});
