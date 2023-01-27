let aud64 = ''; $ready('#efy_sbtheme', ()=>{

$insert($('#efy_sbtheme'), 'beforebegin', $add('details', {id: 'ms_music_player'}, [
  $add('summary', {}, [$add('i', {efy_icon: 'play'}), 'Music Player']),
    $add('div', {efy_select: ''}, [
      $add('input', {type: 'checkbox', id: 'pitch', name: 'pitch'}), $add('label', {for: 'pitch', style: 'display: flex; align-items: center; width: fit-content'}, ['Pitch']),
      $add('div', {efy_range_text: 'Speed', efy_lang: 'speed'}, [
        $add('input', {type: 'range', id: 'rate', min: '0.25', max: '2', step: '0.05', value: '1'})
      ])
    ])
]))

$('.ms_speed_text').addEventListener('click', ()=>{
  $all('.efy_sidebar details').forEach(a=>{ a.removeAttribute('open')});
  $('#ms_music_player').setAttribute('open', '');
});


/*Variables*/
const mediaSourceFiles = [],
audio = document.createElement('audio'),
ms_playpause_btn = $('.player'),
ms_prev_btn = $('.prev'), ms_next_btn = $('.next'),
ms_grid = $('[ms_grid]'),
loader = $('.ms_loader'),
input = $('#ms_upload'),
ms_time_nr = $('.seeker-start-value'), ms_time_val = $('.seeker-end-value'),
ms_seek_slider = $('#seeker-slider');

let ms_track_id = 0;

input.setAttribute('multiple', '');


/*Hightlight playing audio*/
const highlightPlaying =(trackId)=>{
  const ms_grid_rows = [...ms_grid.children];

  ms_grid_rows
    .filter((tr) => tr.classList.contains('playing'))
    .forEach((tr) => (tr.classList.remove('playing')));

  ms_grid_rows[trackId].classList.add('playing');
};

/*Play & Pause*/
const playPauseTrack =()=>{ if (audio.src){
  if ($('.player i').getAttribute('efy_icon') == 'play'){ audio.play(); $('.player i').setAttribute('efy_icon', 'pause')}
  else { audio.pause(); $('.player i').setAttribute('efy_icon', 'play')}
  ms_playpause_btn.addEventListener('click', playPauseTrack);
}};

const nextTrack =()=>{
  if (mediaSourceFiles.length){
    let newTrack = null;
    ms_track_id += 1;

    if (mediaSourceFiles.length - ms_track_id >= 1){
      newTrack = mediaSourceFiles[ms_track_id];
    } else {
      ms_track_id = 0;
      newTrack = mediaSourceFiles[ms_track_id];
    }

    if ($('.player i').getAttribute('efy_icon') == 'play'){
      playPauseTrack();
    }

    audio.src = newTrack.path; audio.playbackRate = $('#rate').value;
    audio.play();

    highlightPlaying(ms_track_id);
  }
};
ms_next_btn.addEventListener('click', nextTrack);



const prevTrack =()=>{
  let prevTrack = null;

  if (ms_track_id > 0){
    ms_track_id -= 1;
  } else {
    ms_track_id = mediaSourceFiles.length - 1;
  }

  if ($('.player i').getAttribute('efy_icon') == 'play'){
    playPauseTrack();
  }

  prevTrack = mediaSourceFiles[ms_track_id];

  audio.src = prevTrack.path; audio.playbackRate = $('#rate').value;
  audio.play();
  highlightPlaying(ms_track_id);
};

ms_prev_btn.addEventListener('click', prevTrack);


let rate = $('#rate'), pitch = $('#pitch');

rate.addEventListener('input', ()=>{ let b = $('#rate').value; audio.playbackRate = b; $('.ms_speed_text').textContent = b+'X'; });

pitch.addEventListener('change', ()=>{ audio.preservesPitch = pitch.checked
  /*webkit  if ('webkitPreservesPitch' in audio){ audio.webkitPreservesPitch = pitch.checked} */
});



const loadTrack =(source)=>{ audio.load(); audio.src = source; playPauseTrack(); highlightPlaying(ms_track_id)},

convertToUnit =(fileSize)=>{ const [gb, mb, kb, b] = [{value: 10 ** 9, unit: 'GB'}, {value: 10 ** 6, unit: 'MB'}, {value: 10 ** 3, unit: 'KB'}, {value: 10 * 2, unit: 'Bytes'}];
  if (typeof fileSize == 'number'){
    [gb, mb, kb, b].forEach((memory)=>{
      if (Math.floor(fileSize / memory.value)){ fileSize = Math.floor(fileSize / memory.value) + memory.unit}
    }); return fileSize;
  } else {fileSize = Number(fileSize); return convertToUnit(fileSize)}
},
getYear =(dateInStr)=>{ return dateInStr.match(/\d{4}/)[0]},
audioDurInMin =(dur, min = 0)=>{ if (dur < 60){ return dur < 10 ? `${min}:0${Math.floor(dur)}` : `${min}:${Math.floor(dur)}`}; return audioDurInMin(dur - 60, (min += 1))},

// Structure a table for the data read
structureTableUI =(data)=>{
  if (!data.length){
    loader.style.display = 'none';
    loadTrack(`${mediaSourceFiles[0].path}`);
    return;
  }

let  i = 0;
  data[0].forEach((file)=>{ i = $all('[ms_track_id]').length;
    const fileYearModified = getYear(file.lastModifiedDate.toString());
    const fileSize = convertToUnit(file.size);




  $append(ms_grid, $add('div', {ms_track_id: i, class: 'efy_trans_filter'}, [
    $add('p', {}, [file.name.replace('.mp3', '')]),
    $add('div', {class: 'ms_song_info'}, [
      $add('p', {}, [fileYearModified]),
      $add('p', {}, [fileSize]),
      $add('p', {class: 'td_time'})
    ])
  ]));
  });

  setTimeout(()=>{ structureTableUI(data.slice(1))}, 2500);

  $all('[ms_track_id]').forEach(a=>{
    a.addEventListener('click', ()=>{ index = a.getAttribute('ms_track_id'); audio.addEventListener('loadedmetadata', (b)=>{$(`[ms_track_id].playing .td_time`).textContent = audioDurInMin(b.target.duration)});
      if ($('.player i').getAttribute('efy_icon') == 'play'){ playPauseTrack()}
      audio.src = mediaSourceFiles[index].path; audio.playbackRate = $('#rate').value; audio.play(); highlightPlaying(index);
  })})

},

truncateArray =(array, start, end)=>{
  if (Array.isArray(array) && Number.isInteger(start) && Number.isInteger(end)){
    let copy = array;
    if (copy.length >= end)
      return [copy.splice(start, end)].concat(truncateArray(array, start, end));
    return [copy];
  } else {
    return `${Array.isArray(array) ? '' : array + 'must be an Array'} \n ${
      Number.isInteger(start) ? '' : start + 'must be a number'
    } \n ${Number.isInteger(end) ? '' : end + 'must be a number'}`;
  }
};

input.addEventListener('change', async (e)=>{
  loader.style.display = 'flex';

  try {
    const localData = Object.values(e.target.files);
    const result = await read(localData);

    if (Array.isArray(result)){
      const data = result;
      mediaSourceFiles.push(...data);
      const pairedData = truncateArray(data, 0, 2);
      structureTableUI(pairedData);
    }
  } catch (e){
    console.error(e);
  }
});

const dropArea = input;

dropArea.addEventListener('dragover', (e)=>{
  e.stopPropagation();
  e.preventDefault();

  e.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', async (e)=>{
  e.stopPropagation();
  e.preventDefault();

  dropArea.style.display = 'none';

  loader.style.display = 'flex';

  try {
    const localData = Object.values(e.dataTransfer.files);
    const result = await read(localData);

    if (Array.isArray(result)){
      const data = result;
      mediaSourceFiles.push(...data);
      const pairedData = truncateArray(data, 0, 2);
      structureTableUI(pairedData);
    }
  } catch (e){
    console.error(e);
  }
});

const read = async (files)=>{
  try {
    if (!files.length) return [];

    const file = await readFiles(...files.slice(0, 1));
    return [file, ...(await read(files.slice(1)))];
  } catch (e){
    console.error(e);
  }
};

const readFiles = async (file)=>{
  try {
    const reader = new FileReader();
    const promise = new Promise((resolve, _)=>{
      reader.readAsDataURL(file);

      reader.addEventListener('loadend', function (e){
        if (reader.readyState == 2){
          file.path = e.target.result; aud64 = e.target.result;
          resolve(file);
        }
      });
    });

    const result = await promise;
    return result;
  } catch (e){
    console.error(e);
  }
};

const updateProgress =()=>{
  try {
    const sliderSeekerMaxVal = Number(ms_seek_slider.getAttribute('max'));

    const audioDur = audioDurInMin(audio.duration);
    const currTime = audioDurInMin(audio.currentTime);
    ms_time_val.textContent = audioDur;
    ms_time_nr.textContent = currTime;
    const seekerVal =(sliderSeekerMaxVal / audio.duration) * audio.currentTime;
    if (Number(ms_seek_slider.value) !== seekerVal){
      ms_seek_slider.value = seekerVal;
      document.documentElement.style.setProperty(
        '--seeker-val',
        `${ms_seek_slider.value * 0.1 * 10}%`
      );
    }
  } catch (e){}
},

seek =(e)=>{ if (audio.src){ audio.currentTime = Math.round(e.target.value / (100 / audio.duration))}};

ms_seek_slider.addEventListener('change', seek);
audio.addEventListener('ended', nextTrack);
audio.addEventListener('timeupdate', updateProgress);



});