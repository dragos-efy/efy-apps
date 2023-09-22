/*Storage*/ let  efy_ms = {}, $ms_save =()=>{};
try { if (localStorage.efy_ms){ efy_ms = JSON.parse(localStorage.efy_ms)} $ms_save =()=>{localStorage.efy_ms = JSON.stringify(efy_ms)}} catch {}

/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

$add('div', {ms_app: ''}, [
  $add('audio', {class: 'audio_html', controls: ''}),
  $add('div', {class: 'ms_loading efy_hide_i'}, ['Loading...']),
  /*Songs*/ $add('div', {class: 'ms_grid_box'}, [ $add('div', {ms_grid: '', class: 'songs'}) ]),
  /*Player*/ $add('div', {ms_bar: '', class: 'efy_trans_filter efy_shadow_trans'}, [
    $add('div', {class: 'ms_buttons'}, [
      $add('div', {}, [
        $add('button', {class: 'prev efy_square_btn', title: 'Previous'}, [ $add('i', {efy_icon: 'chevron'}) ]),
        $add('button', {class: 'player efy_square_btn', title: 'Play or Pause'}, [ $add('i', {efy_icon: 'play', class: 'btn-play'}) ]),
        $add('button', {class: 'next efy_square_btn', title: 'Next'}, [ $add('i', {efy_icon: 'chevron'}) ])
      ]),
      $add('div', {class: 'mobile ms_buttons2'}, [
        $add('button', {class: 'ms_speed_text efy_button_text_off', efy_card: '', efy_sidebar_btn: '', title: 'Speed'}, ['1X']),
        $add('label', {efy_upload: 'ms_upload,audio/*, small, multiple', title: 'Add file'}),
        $add('button', {class: 'ms_filesystem efy_square_btn efy_hide_i', title: 'Add file'}, [$add('i', {efy_icon: 'plus'})]),
        $add('button', {class: 'ms_menu efy_square_btn', efy_sidebar_btn: '', title: 'Menu'}, [ $add('i', {efy_icon: 'menu'}) ])
      ])
     ]),
    $add('div', {class: 'audio_seeker'}, [
      $add('input', {type: 'range', max: '100', id: 'seeker_slider', value: '0'}),
      $add('div', {class: 'ms_time_text', efy_card: ''}, [ $add('p', {class: 'seeker-start-value'}, ['0:00']), $add('p', {}, ['/']), $add('p', {class: 'seeker-end-value'}, ['0:00']) ])
    ]),
    $add('div', {class: 'desktop ms_buttons2'}, [
      $add('button', {class: 'ms_speed_text efy_button_text_off', efy_card: '', efy_sidebar_btn: '', title: 'Speed'}, ['1X']),
      $add('label', {efy_upload: 'ms_upload,audio/*, small, multiple', title: 'Add file'}),
      $add('button', {class: 'ms_filesystem efy_square_btn efy_hide_i', title: 'Add file'}, [$add('i', {efy_icon: 'plus'})]),
      $add('button', {class: 'ms_menu efy_square_btn', efy_sidebar_btn: '', title: 'Menu'}, [ $add('i', {efy_icon: 'menu'}) ])
    ])
  ])
], $body);

$add('details', {id: 'ms_music_player', class: 'eos_menu'}, [
  $add('summary', {}, [$add('i', {efy_icon: 'audio'}), $add('p', {efy_lang: 'music_player'}), $add('mark', {efy_lang: 'beta'})]),
    $add('div', {efy_tabs: 'ms_menu', efy_select: ''}, [

    $add('button', {efy_tab: 'effects', efy_lang: 'effects', efy_active: ''}),
    $add('button', {efy_tab: 'grid', efy_lang: 'grid'}),
    $add('button', {efy_tab: 'tags', efy_lang: 'tags'}),

    $add('div', {efy_content: 'effects', efy_select: '', id: 'ms_sidebar_speed', efy_active: ''}, [
      $add('div', {class: 'ms_flex'}, [
        $add('input', {type: 'checkbox', id: 'ms_nature_status', name: 'ms_nature_status'}),
        $add('label', {for: 'ms_nature_status', efy_lang: 'nature_effects'}),
        $add('input', {type: 'checkbox', id: 'pitch', name: 'pitch'}),
        $add('label', {for: 'pitch', efy_lang: 'pitch'})
      ]),
      $add('div', {efy_range_text: 'Speed', efy_lang: 'speed'}, [
        $add('input', {type: 'range', id: 'rate', min: '0.25', max: '2', step: '0.05', value: '1'})
      ]),
      $add('div', {efy_range_text: 'Volume', efy_lang: 'music_volume', style: 'margin: 5rem 0 0 0; display: flex; flex-flow: wrap;'}, [
        $add('input', {type: 'range', id: 'volume_music', class: 'volume_music', min: 0, max: 1, step: 0.05, value: 1})
      ])
    ]),

    $add('div', {efy_content: 'grid', efy_select: '', id: 'bar_position'}, [
      $add('p', {efy_lang: 'bar_position'}), $add('div', {}, [
        $add('input', {type: 'radio', id: 'bar_position_bottom', name: 'bar_position', checked: ''}), $add('label', {for: 'bar_position_bottom', efy_lang: 'down', style: 'display: flex; align-items: center; width: fit-content'}),
        $add('input', {type: 'radio', id: 'bar_position_top', name: 'bar_position'}), $add('label', {for: 'bar_position_top', efy_lang: 'up', style: 'display: flex; align-items: center; width: fit-content'})
      ]),
        $add('div', {efy_range_text: 'Columns', efy_lang: 'columns'}, [ $add('input', {type: 'range', id: 'ms_grid_columns', min: '1', max: '4', step: '1', value: '2'}) ])
      ]),

    $add('div', {efy_content: 'tags', efy_select: '', id: 'items'}, [ $add('div', {}, [
        $add('input', {type: 'checkbox', id: 'ms_song_info_image', name: 'song_info', checked: ''}), $add('label', {for: 'ms_song_info_image', efy_lang: 'image'}),
        $add('input', {type: 'checkbox', id: 'ms_song_info_artist', name: 'song_info', checked: ''}), $add('label', {for: 'ms_song_info_artist', efy_lang: 'artist'}),
        $add('input', {type: 'checkbox', id: 'ms_song_info_title', name: 'song_info', checked: ''}), $add('label', {for: 'ms_song_info_title', efy_lang: 'title'}),
        $add('input', {type: 'checkbox', id: 'ms_song_info_album', name: 'song_info', checked: ''}), $add('label', {for: 'ms_song_info_album', efy_lang: 'album'}),
        $add('input', {type: 'checkbox', id: 'ms_song_info_number', name: 'song_info'}), $add('label', {for: 'ms_song_info_number', efy_lang: 'number'}),
        $add('div', {efy_range_text: 'Image Size', efy_lang: 'img_size'}, [ $add('input', {type: 'range', id: 'ms_img_size', min: '25', max: '65', step: '1', value: '50'}) ])
      ]) ])
  ])
], $('#efy_sbtheme'), 'beforebegin');

$add('style', {class: 'efy_3d_back_ms'}, [], $head);

/*Variables*/ let audios = {}, audios_title = {}, audios_artist = {}, audios_album = {}, audios_image = {}, ms_track_id = 0, i = 0, ms_no_songs = true;
const audio = $('.audio_html'), ms_playpause_btn = $('.player'), ms_prev_btn = $('.prev'), ms_next_btn = $('.next'), ms_grid = $('[ms_grid]'), ms_time_nr = $('.seeker-start-value'), ms_time_val = $('.seeker-end-value'), ms_seek_slider = $('#seeker_slider'), rate = $('#rate'), pitch = $('#pitch'), img_size = $('#ms_img_size');

/*Speed Indicator*/ $all('.ms_speed_text').forEach(b=>{
  b.addEventListener('click', ()=>{
    $all('.efy_sidebar details').forEach(a=>{ a.removeAttribute('open')});
    $('#ms_music_player').setAttribute('open', ''); $('#ms_sidebar_speed').setAttribute('open', '');
})});

/*Restore Settings*/
if (efy_ms.columns){ let a = efy_ms.columns; $('#ms_grid_columns').value = a; $('[ms_grid]').setAttribute('ms_grid', a)}
if (efy_ms.speed){ let a = efy_ms.speed; rate.value = a; audio.playbackRate = a; $all('.ms_speed_text').forEach(b=>{ b.textContent = a+'X' })}
if (efy_ms.pitch){ let a = efy_ms.pitch; pitch.checked = a; audio.preservesPitch = !a; if ('webkitPreservesPitch' in audio){ audio.webkitPreservesPitch = !a; prev_song(); next_song()}}
if (efy_ms.bar_position){ let a = efy_ms.bar_position; $('[ms_app]').setAttribute('ms_app', a); $(`#bar_position_${a}`).checked = true}
if (efy_ms.img_size){ let a = efy_ms.img_size; img_size.value = a.replace('rem', ''); $root.style.setProperty('--ms_thumb_height', a) }

'image artist title album number'.split(' ').map(a=>{
  if (typeof efy_ms[`tag_${a}`] !== 'undefined'){ $(`#ms_song_info_${a}`).checked = efy_ms[`tag_${a}`]}
});

/*Add Nature Sounds*/ if (typeof efy_ms.nature !== 'undefined'){
  let nature_nr = 0, audio_nature = [];
  $('#ms_nature_status').checked = efy_ms.nature;

  $add('div', {class: 'song nature', efy_card: '', ms_track_id_nature: 'music_volume'}, [
      $add('div', {class: 'left'}, [
        $add('button', {class: 'image', title: 'Play or Pause'}, [ $add('i', {efy_icon: 'audio'}) ]),
        $add('div', {class: 'text'}, [ $add('p', {class: 'title'}, ['Music']) ]),
      ]),
      $add('input', {class: 'volume_music volume',  title: 'Volume', type: 'range', value: 1, step: 0.05, min: 0, max: 1}, ['a'])
    ], $('.songs'));

  'dreamy fireworks forest people rain underwater waves'.split(' ').map((a, i)=>{ nature_nr++;

    const src = `./apps/assets/${a}.webm`;
    $add('audio', {src: src, loop: '', class: 'efy_hide_i'});

    $add('div', {class: 'song nature', efy_card: '', ms_track_id_nature: i}, [
      $add('div', {class: 'left'}, [
        $add('button', {class: 'image', title: 'Play or Pause'}, [ $add('i', {efy_icon: 'play'}) ]),
        $add('div', {class: 'text'}, [ $add('p', {class: 'title'}, [a]) ]),
      ]),
      $add('input', {class: 'volume',  title: 'Volume', type: 'range', value: 1, step: 0.05, min: 0, max: 1}, [a])
    ], $('.songs'));

    const audio = $(`[src="${src}"]`); audio_nature[i] = audio, volume = $(`[ms_track_id_nature="${i}"] .volume`);

    $event($(`[ms_track_id_nature="${i}"] .image`), 'click', (b)=>{ let icon = $$(b.target, 'i');
      if (audio.paused){ audio.play(); audio.volume = volume.value; icon.setAttribute('efy_icon', 'pause')}
      else { audio.pause(); icon.setAttribute('efy_icon', 'play')}
    });
    $event(volume, 'input', (b)=>{ audio.volume = b.target.value });
})}


/*App Layout*/

for (let a = ['top', 'bottom'], i = 0; i < a.length; i++){
  $event($(`#bar_position_${a[i]}`), 'click', ()=>{ $('[ms_app]').setAttribute('ms_app', a[i]); efy_ms.bar_position = a[i]; $ms_save()})
}

$event($('#ms_grid_columns'), 'input', (a)=>{ let b = a.target.value;
  $('[ms_grid]').setAttribute('ms_grid', b); efy_ms.columns = b; $ms_save()
});

$event(img_size, 'input', (a)=>{ let b = a.target.value + 'rem'; $root.style.setProperty('--ms_thumb_height', b); efy_ms.img_size = b; $ms_save(); });


/*Current Song Image as Background*/
$add('label', {for: 'ms_song_bg', efy_lang: 'song_image'}, [], $('label[for="trans_window"]'), 'afterend');
$add('input', {id: 'ms_song_bg', type: 'checkbox'}, [], $('label[for="trans_window"]'), 'afterend');

if (efy_ms.song_bg == true){ $('#ms_song_bg').checked = true}

$event($('#ms_song_bg'), 'change', ()=>{ let a = $('#ms_song_bg').checked; efy_ms.song_bg = a; $ms_save(); song_bg()});

song_bg =()=>{ let a = $('.efy_3d_back_ms');
  if ((efy_ms.song_bg == true) && (audios_image[ms_track_id] !== 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA')){
    a.textContent = `.efy_3d_back, html.trans_window .efy_3d_back {background: url(${audios_image[ms_track_id]})!important; background-repeat: no-repeat!important; background-size: cover!important}`;
  }
  else {a.textContent = ''}
}

/*Play & Pause*/ const play_pause =()=>{ if (audio.src){
  if ($('.player i').getAttribute('efy_icon') == 'play'){ audio.playbackRate = $('#rate').value; audio.play(); $('.player i').setAttribute('efy_icon', 'pause')}
  else { audio.pause(); $('.player i').setAttribute('efy_icon', 'play')}
}},
duration_in_min =(dur, min = 0)=>{ if (dur < 60){ return dur < 10 ? `${min}:0${Math.floor(dur)}` : `${min}:${Math.floor(dur)}`}; return duration_in_min(dur - 60, (min += 1))};


/*Hightlight active audio*/ const hightlight_playing =(a)=>{ if ($('.songs .song.playing') && $('.songs .song.playing').getAttribute('ms_track_id') !== a.getAttribute('ms_track_id')){ $('.songs .song.playing').classList.remove('playing')}
  a.classList.add('playing');
};




const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('efy_music', 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('files', { keyPath: 'id' });
    };
  });
};

const clearDB = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    const objectStore = transaction.objectStore('files');
    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = () => {
      resolve();
    };

    clearRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const addFileToDB = (db, file) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    const objectStore = transaction.objectStore('files');
    const addRequest = objectStore.add({ id: file.name, file });

    addRequest.onsuccess = () => {
      resolve();
    };

    addRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

  const process_song =(file)=>{
  /*List tags*/
  ID3.loadTags(file.name, () => { i++;
      let tags = ID3.getAllTags(file.name), artist_line = '', album_line = '';

      /*Save to memory*/
      audios[i] = URL.createObjectURL(file);
      audios_title[i] = (tags.title || file.name.replace(/\.(mp3|wav|m4a|flac|webm|mp4|ogg)$/g, ''));
      audios_artist[i] = (tags.artist || '');
      if (audios_artist[i] !== ''){ artist_line = ' - '}
      audios_album[i] = (tags.album || '');
      if (audios_album[i] !== ''){ album_line = ' - '}
      audios_image[i] = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA';

      /*Add Songs*/
      $add('div', {class: 'song', efy_card: '', ms_track_id: i}, [
			$add('div', {class: 'delete'}, [ $add('button', {title: 'delete'}) ]),
            $add('div', {class: 'text'}, [
              $add('p', {class: 'number efy_hide_i'}, [`${i}. `]),
              $add('p', {class: 'artist'}, [ audios_artist[i] ]), $add('p', {class: 'separator title'}, [ artist_line ]),
              $add('p', {class: 'title'}, [ audios_title[i] ]), $add('p', {class: 'separator album'}, [ album_line ]),
              $add('p', {class: 'album'}, [ audios_album[i] ])
            ])
		], $('.songs'));

      /*Variables*/
      const current_track = $(`.song[ms_track_id="${i}"]`),
      c_track = `.song[ms_track_id="${i}"]`;

      /*Image*/
      try { audios_image[i] = `data:${tags.picture.format};base64,${Base64.encodeBytes(tags.picture.data)}`;
        $add('div', {class: 'image efy_shadow_trans', style: `background: url(${audios_image[i]})`, title: 'Song image'}, [], current_track, 'afterbegin')
      } catch (error){ $add('div', {class: 'ms_empty image efy_shadow_trans'}, [ $add('i', {efy_icon: 'audio'}) ], current_track, 'afterbegin')}

      /*Tags - Checked*/
      for (let a = 'image artist title album number'.split(' '), i = 0; i < a.length; i++){
        if ($(`#ms_song_info_${a[i]}`).checked){
          $all(c_track + ` .${a[i]}`).forEach(b=>{ b.classList.remove('efy_hide_i') })
        } else {
          $all(c_track + ` .${a[i]}`).forEach(b=>{ b.classList.add('efy_hide_i') })
        }
      }

      /*Events*/
      $event(current_track, 'click', (b)=>{ ms_track_id = b.target.getAttribute('ms_track_id');
        audio.setAttribute('src', audios[ms_track_id]); audio.playbackRate = $('#rate').value; audio.play(); $('.player i').setAttribute('efy_icon', 'pause'); hightlight_playing(b.target); song_bg()
    });

      /*Play 1st song*/ if (ms_no_songs == true){ ms_track_id = 1;
          audio.setAttribute('src', audios[1]); audio.playbackRate = $('#rate').value; play_pause(); hightlight_playing($('.songs .song')); ms_no_songs = false; song_bg() }
    },
        { tags: ["artist", "title", "album", "picture"], dataReader: FileAPIReader(file) });
  }


  const restore_songs = async ()=>{
    const db = await openDB(), transaction = db.transaction('files', 'readonly'),
    objectStore = transaction.objectStore('files'), getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = (event) => {
      $('.ms_loading').classList.remove('efy_hide_i');
      const storedFiles = event.target.result;
      if (storedFiles.length > 0) {
        filesToUse = storedFiles.map(storedFile => storedFile.file);
        // Process the files retrieved from IndexedDB...
        for (const file of filesToUse) {
            process_song(file)
        }
      }; $('.ms_loading').classList.add('efy_hide_i');
    };

    getAllRequest.onerror =(event)=>{ console.error(event.target.error)};
  }; if (efy_ms.restore == true){ restore_songs()}

/*Load Files*/ const load_audio = async (file) => {
  let filesToUse = []; $('.ms_loading').classList.remove('efy_hide_i');

  if (efy_ms.filesystem == true) {
    if (efy_ms.filesystem_dir == true) {
      const dirHandle = await window.showDirectoryPicker();
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') { filesToUse.push(await entry.getFile())}
      }
    } else {
      const fileHandles = await window.showOpenFilePicker({ multiple: true });
      filesToUse = await Promise.all(fileHandles.map(fileHandle => fileHandle.getFile()));
    }

    const db = await openDB();
    // await clearDB(db);
    for (const file of filesToUse) { // process each file...
      await addFileToDB(db, file);
    }

  } else { filesToUse = [file] }

  for (const file of filesToUse) { // process each file
    process_song(file);
  }
  $('.ms_loading').classList.add('efy_hide_i');
},


read_files = async (a)=>{ for (let i = 0; i < a.length; i++) { await load_audio(a[i])}};

if (efy_ms.filesystem == true){ $ready('.ms_filesystem', (b)=>{
    $all('[efy_upload*=ms_upload]').forEach(a=>{ a.classList.add('efy_hide_i')});
    b.classList.remove('efy_hide_i');
    $event(b, 'click', async ()=>{ load_audio()})
})} else { console.log('file reader mode'); $wait(1, ()=>{
  $all('#ms_upload').forEach(a=>{ $event(a, 'change', async (event)=>{ read_files(event.target.files)})}); });
}



/*Next*/ const next_song =()=>{ let length = Object.keys(audios).length;

  if (length - ms_track_id >= 1){ ms_track_id++} else {ms_track_id = 1}
  if ($('.player i').getAttribute('efy_icon') == 'play'){ play_pause()}

  audio.src = audios[ms_track_id]; audio.playbackRate = rate.value; audio.play(); hightlight_playing($(`.song[ms_track_id="${ms_track_id}"]`)); song_bg()
};
ms_next_btn.addEventListener('click', next_song);



/*Previous*/ const prev_song =()=>{ let length = Object.keys(audios).length;

  if (ms_track_id > 1){ ms_track_id -= 1} else {ms_track_id = length}
  if ($('.player i').getAttribute('efy_icon') == 'play'){ play_pause()}

  audio.src = audios[ms_track_id]; audio.playbackRate = rate.value; audio.play(); hightlight_playing($(`.song[ms_track_id="${ms_track_id}"]`)); song_bg()
};

ms_prev_btn.addEventListener('click', prev_song);


/*Speed & Pitch*/
rate.addEventListener('input', ()=>{ let b = rate.value; audio.playbackRate = b;
  $all('.ms_speed_text').forEach(c=>{ c.textContent = b+'X' }); efy_ms.speed = b; $ms_save();
});
pitch.addEventListener('change', ()=>{ let a = !pitch.checked; audio.preservesPitch = a;
  if ('webkitPreservesPitch' in audio){ audio.webkitPreservesPitch = a; prev_song(); next_song()}
  efy_ms.pitch = !a; $ms_save();
});


const update_progress =()=>{ try {
    const seeker_max = Number(ms_seek_slider.getAttribute('max')), audio_duration = duration_in_min(audio.duration), current_time = duration_in_min(audio.currentTime);
    ms_time_val.textContent = audio_duration;
    ms_time_nr.textContent = current_time;
    const value = (seeker_max / audio.duration) * audio.currentTime;
    if (Number(ms_seek_slider.value) !== value){ ms_seek_slider.value = value}
  } catch (e){}},

seek =(e)=>{ if (audio.src){ audio.currentTime = Math.round(e.target.value / (100 / audio.duration))}},

ms_mpris =()=>{ if ('mediaSession' in navigator) { const action = (ev, fn) => navigator.mediaSession.setActionHandler(ev,fn);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: audios_title[ms_track_id],
    artist: audios_artist[ms_track_id],
    album: audios_album[ms_track_id],
    artwork: [{ src: audios_image[ms_track_id], type: 'image/png'}]
  });
  action('play', play_pause); action('pause', play_pause);
  action('previoustrack', prev_song); action('nexttrack', next_song);
  action('stop', ()=>{}); action('seekto', ()=>{});
  action('seekbackward', ()=>{}); action('seekforward', ()=>{});
}};

$event(ms_seek_slider, 'change', seek);
$event(audio, 'ended', next_song);
$event(audio, 'timeupdate', update_progress);
$event(audio, 'play', ms_mpris); $event(audio, 'pause', ms_mpris);
$event(ms_playpause_btn, 'click', play_pause);


/*Search Songs*/ $add('input', {id: 'ms_search', type: 'text', placeholder: 'Search Songs...', efy_search_input:''}, [], $('[efy_about]'), 'afterend');
$body.setAttribute('id','ms_app'); $body.setAttribute('efy_search','.songs > .song');


for (let a = 'image artist title album number'.split(' '), i = 0; i < a.length; i++){
  $event($(`.efy_sidebar #ms_song_info_${a[i]}`), 'click', ()=>{ let b = $(`#ms_song_info_${a[i]}`), c = $all(`.songs .song .${a[i]}`);
    if (b.checked){ c.forEach((a)=>{ a.classList.remove('efy_hide_i') }) }
    else { c.forEach((a)=>{ a.classList.add('efy_hide_i') }) }
    efy_ms[`tag_${a[i]}`] = b.checked; $ms_save();
  });
}

$all(`.volume_music`).forEach(a=>{
  $event(a, 'input', ()=> audio.volume = a.value)
})

$event($('#ms_nature_status'), 'change', (e)=>{
  e.target.checked ? efy_ms.nature = true : delete efy_ms.nature;
  $ms_save(); location.reload()
})

}, 1);