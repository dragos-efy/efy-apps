/*Storage*/ let  efy_ms = {}, $ms_save =()=>{};
try { if (localStorage.efy_ms){ efy_ms = JSON.parse(localStorage.efy_ms)} $ms_save =()=>{localStorage.efy_ms = JSON.stringify(efy_ms)}} catch {}

/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

const player_bar = ['div', {ms_bar: '', class: 'efy-glass efy_trans_filter efy_shadow_trans'}, [
    ['div', {class: 'ms_buttons'}, [
      ['div', {class: 'efy_color efy_shadow_button'}, [
        ['button', {class: 'prev efy_trans_filter_off efy_shadow_button_off', title: 'Previous'}, [ ['i', {efy_icon: 'chevron'}] ]],
        ['button', {class: 'player efy_trans_filter_off efy_shadow_button_off', title: 'Play or Pause'}, [ ['i', {efy_icon: 'play', class: 'btn-play'}] ]],
        ['button', {class: 'next efy_trans_filter_off efy_shadow_button_off', title: 'Next'}, [ ['i', {efy_icon: 'chevron'}] ]]
      ]],
      ['div', {class: 'mobile ms_buttons2'}, [
        ['button', {class: 'ms_speed_text efy_button_text_off efy-glass-off', efy_card: '', efy_sidebar_btn: '', title: 'Speed'}, '1X'],
        ['div', {class: 'efy_color efy_shadow_button'}, [
          ['label', {efy_upload: 'ms_upload, [audio/*,video/*,image/*], small, multiple', title: 'Add file', class: 'efy_shadow_button_off', 'efy-radius': 'left'}],
          ['button', {class: 'ms_filesystem efy_square_btn efy_hide_i', title: 'Add file'}, [['i', {efy_icon: 'plus'}]]],
          ['button', {class: 'ms_menu efy_square_btn efy_shadow_button_off efy_trans_filter_off', efy_sidebar_btn: '', title: 'Menu', 'efy-radius': 'right'}, [['i', {efy_icon: 'menu'}]]]
        ]]
      ]]
     ]],
    ['div', {class: 'audio_seeker'}, [
      ['canvas'],
      ['input', {type: 'range', max: '100', id: 'seeker_slider', value: '0'}],
      ['div', {class: 'ms_time_text efy-glass-off', efy_card: ''}, [ ['p', {class: 'seeker-start-value'}, '0:00'], ['p', '/'], ['p', {class: 'seeker-end-value'}, '0:00'] ]]
    ]],
    ['div', {class: 'desktop ms_buttons2'}, [
      ['button', {class: 'ms_speed_text efy_button_text_off efy-glass-off', efy_card: '', efy_sidebar_btn: '', title: 'Speed'}, '1X'],
      ['div', {class: 'efy_color efy_shadow_button'}, [
        ['label', {efy_upload: 'ms_upload, [audio/*,video/*,image/*], small, multiple', title: 'Add file', class: 'efy_shadow_button_off', 'efy-radius': 'left'}],
        ['button', {class: 'ms_filesystem efy_square_btn efy_hide_i', title: 'Add file'}, [['i', {efy_icon: 'plus'}] ]],
        ['button', {class: 'ms_menu efy_square_btn efy_shadow_button_off efy_trans_filter_off', efy_sidebar_btn: '', title: 'Menu', 'efy-radius': 'right'}, [ ['i', {efy_icon: 'menu'}] ]]
      ]]
    ]]
  ]];

/*EFY Toggle*/ $ready('[efy_toggle_tag]', (a)=>{ let array = a.getAttribute('efy_toggle_tag').split('|');
  let hide = array[0], show = array[1];
  a.addEventListener('click', ()=>{
    $all(hide).forEach(c =>{ c.classList.toggle('efy_hide_i') })
    $all(show).forEach(c =>{ c.classList.remove('efy_hide_i') })
  })});

$add('div', {ms_app: ''}, [
  ['div', {class: 'ms_loading efy_hide_i'}, 'Loading...'],
  ['div', {class: 'ms_grid_box gamepad_scroll'}, [
    ['div', {class: 'vd_video_div efy_hide_i'}, [
      ['div', {class: 'vd_gestures'}, [
          ['div', {class: 'left'}], ['div', {class: 'middle'}], ['div', {class: 'right'}]
      ]], ['video', {class: 'audio_html'}], player_bar
    ]],

  /*Tags*/ ['div', {class: 'ms_filter'}, [
    ['div', {tags: ''}, [
      ['button', {class: 'efy_square_btn tag'}, [['i', {efy_icon: 'search'}]]],
      ['button', {class: 'tab media active', efy_lang: 'media', efy_toggle: '.songs'}, [['i', {efy_icon: 'play'}]]],
      ['button', {class: 'tab sounds', efy_lang: 'sounds', efy_toggle: '.songs'}, [['i', {efy_icon: 'audio'}]]],
      ['button', {class: 'efy_square_btn efy_hide_i'}, [['i', {efy_icon: 'reload'}]]],
      ['input', {type: 'text', id: 'custom_tags_add', class: 'efy_hide_i', placeholder: 'Add Tag...'}],
      ['button', {class: 'efy_square_btn efy_hide_i confirm'}, [['i', {efy_icon: 'check'}]]]
    ]],
    ['div', {class: 'bar'}, [
    ]]
  ]],
    /*Grids*/
    /*Songs*/ ['div', {ms_grid: '', class: 'songs'}],
    /*Sounds*/ ['div', {ms_grid: '', class: 'songs nature efy_hide_i'}]
  ]],
  player_bar
]);

$add('details', {id: 'ms_music_player', class: 'eos_menu'}, [
  ['summary', [ ['i', {efy_icon: 'audio'}], ['p', {efy_lang: 'media'}], ['mark', {efy_lang: 'beta'}] ]],
    ['div', {efy_tabs: 'ms_menu', efy_select: 'efy_select, margin0'}, [
    ['div', {class: 'efy_tabs'}, [
        ['input', {type:'radio', id: 'md_tab_effects', efy_tab: 'effects', efy_active: ''}],
        ['label', {for: 'md_tab_effects', efy_lang: 'effects'}],
        ['input', {type:'radio', id: 'md_tab_grid', efy_tab: 'grid'}],
        ['label', {for: 'md_tab_grid', efy_lang: 'grid'}],
        ['input', {type:'radio', id: 'md_tab_tags', efy_tab: 'tags'}],
        ['label', {for: 'md_tab_tags', efy_lang: 'tags'}],
        ['input', {type:'radio', id: 'md_tab_backup', efy_tab: 'backup'}],
        ['label', {for: 'md_tab_backup', efy_lang: 'storage'}]
    ]],
    ['div', {efy_content: 'effects', efy_select: '', id: 'ms_sidebar_speed', efy_active: ''}, [
      ['div', {class: 'ms_flex'}, [
        ['input', {type: 'checkbox', id: 'ms_nature_status', name: 'ms_nature_status'}],
        ['label', {for: 'ms_nature_status', efy_lang: 'nature_effects'}],
        ['input', {type: 'checkbox', id: 'pitch', name: 'pitch'}],
        ['label', {for: 'pitch', efy_lang: 'pitch'}]
      ]],
      ['div', {efy_range_text: 'Speed', efy_lang: 'speed'}, [
        ['input', {type: 'range', id: 'rate', min: '0.25', max: '2', step: '0.05', value: '1'}]
      ]],
      ['div', {efy_range_text: 'Volume', efy_lang: 'music_volume', style: 'margin: 5rem 0 0 0; display: flex; flex-flow: wrap;'}, [
        ['input', {type: 'range', id: 'volume_music', class: 'volume_music', min: 0, max: 1, step: 0.05, value: 1}]
      ]]
    ]],
    ['div', {efy_content: 'grid', efy_select: '', id: 'bar_position'}, [
      ['p', {efy_lang: 'bar_position'}], ['div', [
        ['input', {type: 'radio', id: 'bar_position_bottom', name: 'bar_position', checked: ''}],
        ['label', {for: 'bar_position_bottom', efy_lang: 'down', style: 'display: flex; align-items: center; width: fit-content'}],
        ['input', {type: 'radio', id: 'bar_position_top', name: 'bar_position'}],
        ['label', {for: 'bar_position_top', efy_lang: 'up', style: 'display: flex; align-items: center; width: fit-content'}]
      ]],
      ['div', {efy_range_text: 'Columns', efy_lang: 'columns'}, [
        ['input', {type: 'range', id: 'ms_grid_columns', min: '1', max: '4', step: '1', value: '2'}]
      ]]
    ]],
    ['div', {efy_content: 'tags', efy_select: '', id: 'items'}, [
      ['div', [
        ['div', {class: 'efy_flex'}, [
          ['input', {type: 'checkbox', id: 'ms_song_info_image', name: 'song_info', checked: ''}],
          ['label', {for: 'ms_song_info_image', efy_lang: 'image'}],
          ['input', {type: 'checkbox', id: 'ms_song_info_artist', name: 'song_info', checked: ''}],
          ['label', {for: 'ms_song_info_artist', efy_lang: 'artist'}],
          ['input', {type: 'checkbox', id: 'ms_song_info_title', name: 'song_info', checked: ''}],
          ['label', {for: 'ms_song_info_title', efy_lang: 'title'}],
          ['input', {type: 'checkbox', id: 'ms_song_info_album', name: 'song_info', checked: ''}],
          ['label', {for: 'ms_song_info_album', efy_lang: 'album'}],
          ['input', {type: 'checkbox', id: 'ms_song_info_number', name: 'song_info'}],
          ['label', {for: 'ms_song_info_number', efy_lang: 'number'}],
          ['input', {type: 'checkbox', id: 'ms_song_info_custom_tags', name: 'song_info'}],
          ['label', {for: 'ms_song_info_custom_tags', efy_lang: 'tags'}],
        ]],
        ['div', {efy_range_text: 'Image Size', efy_lang: 'img_size'}, [
          ['input', {type: 'range', id: 'ms_img_size', min: '25', max: '65', step: '1', value: '50'}]
        ]]
      ]]
    ]],
    ['div', {efy_content: 'backup', efy_select: '', id: 'md_backup'}, [
      ['div', {id: 'md_storage_api'}, [
        ['input', {type: 'radio', id: 'file_reader', name: 'md_storage_api'}],
        ['label', {for: 'file_reader'}, 'File Reader'],
        ['input', {type: 'radio', id: 'filesystem_access', name: 'md_storage_api'}],
        ['label', {for: 'filesystem_access'}, 'File System Access']
      ]],
      ['div', {class: 'api_options efy_hide_i'}, [
        ['div', {class: 'efy_hr_div'}, [ ['p', 'API Options'],  ['hr']]],
        ['div', {class: 'efy_flex'}, [
          ['input', {type: 'checkbox', id: 'md_storage_restore'}],
          ['label', {for: 'md_storage_restore'}, 'Restore'],
          ['input', {type: 'checkbox', id: 'filesystem_access_dir'}],
          ['label', {for: 'filesystem_access_dir'}, 'Directory']
        ]]
      ]]
    ]]
  ]]
], $('#efy_sbtheme'), 'beforebegin');

$add('style', {class: 'efy_3d_back_ms'}, [], $head);
$add('div', {class: 'test_thumbs'});


/*Variables*/ let audios = {}, audios_title = {}, audios_artist = {}, audios_album = {}, audios_image = {}, audios_type = {},
ms_track_id = 0, i = 0, ms_no_songs = true, img_time = 10, img_time_interval;
const audio = $('.audio_html'), video_div = $('.vd_video_div'), ms_grid = $('[ms_grid]'), ms_grid_box = $('.ms_grid_box'),
songs = $('.songs'), rate = $('#rate'), pitch = $('#pitch'), img_size = $('#ms_img_size');

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

'image artist title album number custom_tags'.split(' ').map(a=>{
  if (typeof efy_ms[`tag_${a}`] !== 'undefined'){ $(`#ms_song_info_${a}`).checked = efy_ms[`tag_${a}`]}
});

/*Add Nature Sounds*/ if (typeof efy_ms.nature !== 'undefined'){
  let nature_nr = 0, audio_nature = [];
  $('#ms_nature_status').checked = efy_ms.nature;

  $add('div', {class: 'song nature', efy_card: '', ms_track_id_nature: 'music_volume'}, [
      ['div', {class: 'left'}, [
        ['button', {class: 'image', title: 'Play or Pause'}, [ ['i', {efy_icon: 'audio'}] ]],
        ['div', {class: 'text'}, [ ['p', {class: 'title'}, 'Music'] ]],
      ]],
      ['input', {class: 'volume_music volume',  title: 'Volume', type: 'range', value: 1, step: 0.05, min: 0, max: 1}, 'a']
    ], $('.songs.nature'));

  'dreamy fireworks forest people rain underwater waves'.split(' ').map((a, i)=>{ nature_nr++;

    const src = `./assets/${a}.webm`;
    $add('audio', {src: src, loop: '', class: 'efy_hide_i'});

    $add('div', {class: 'song nature', efy_card: '', ms_track_id_nature: i}, [
      ['div', {class: 'left'}, [
        ['button', {class: 'image', title: 'Play or Pause'}, [ ['i', {efy_icon: 'play'}] ]],
        ['div', {class: 'text'}, [ ['p', {class: 'title'}, a] ]],
      ]],
      ['input', {class: 'volume',  title: 'Volume', type: 'range', value: 1, step: 0.05, min: 0, max: 1}, a]
    ], $('.songs.nature'));

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

/*Play & Pause*/ const play_pause =()=>{ if (audio.src){
  if ($('.player i').getAttribute('efy_icon') == 'play'){
    if (audios_type[ms_track_id] === 'image'){
      clearInterval(img_time_interval); img_time_interval = setInterval(next_song, img_time * 1000)
    }
    else { clearInterval(img_time_interval);
      audio.playbackRate = efy_ms.speed || 1; let play = audio.play();
      if (play !== undefined){ play.catch(()=>{
        $all('.player i').forEach(a=>{ a.setAttribute('efy_icon', 'play') });
      });}

    }
    $all('.player i').forEach(a=>{ a.setAttribute('efy_icon', 'pause') });
    $wait(3, ()=>{
      if ($('.player i').getAttribute('efy_icon') == 'play') $('.vd_video_div [ms_bar]').classList.add('efy_hide_i');
    })
  }
  else { clearInterval(img_time_interval); audio.pause();
    $all('.player i').forEach(a=>{ a.setAttribute('efy_icon', 'play') });
    $('.vd_video_div [ms_bar]').classList.remove('efy_hide_i');
  }
}},
duration_in_min =(dur, min = 0)=>{ if (dur < 60){ return dur < 10 ? `${min}:0${Math.floor(dur)}` : `${min}:${Math.floor(dur)}`}; return duration_in_min(dur - 60, (min += 1))};


/*Hightlight active audio*/ const hightlight_playing =(a)=>{ const i = a.getAttribute('ms_track_id'), type = audios_type[i];
  if ($('.songs .song.playing') && $('.songs .song.playing').getAttribute('ms_track_id') !== i){
    $('.songs .song.playing').classList.remove('playing')
  }
  a.classList.add('playing');
  if (type === 'video' || type === 'image'){
    $('.vd_video_div').classList.remove('efy_hide_i');
    $all('[ms_bar]')[1].classList.add('efy_hide_i');
    ms_grid_box.scrollTo(0, 0);
  } else {
    $('.vd_video_div').classList.add('efy_hide_i');
    $all('[ms_bar]')[1].classList.remove('efy_hide_i');
    if (ms_grid_box.clientHeight < songs.scrollHeight - a.offsetTop){
      const number = efy.gap ? Number(efy.gap.replace('rem', '')) * -1 : -15;
      a.scrollIntoView(); ms_grid_box.scrollBy({top: number === -0 ? 0 : number});
    }
  }

  if (type === 'image'){
    [audio, video_div].forEach(a=> a.style.backgroundImage = `url(${audios[i]})`);
    audio.classList.add('image');
  } else {audio.classList.remove('image')}
};



const openDB =()=>{ return new Promise((resolve, reject)=>{
  const request = window.indexedDB.open('efy_music', 1);
  request.onerror =(event)=>{ reject(event.target.error)};
  request.onsuccess =(event)=>{ resolve(event.target.result)};
  request.onupgradeneeded =(event)=>{ const db = event.target.result;
    db.createObjectStore('files', { keyPath: 'id' });
    db.createObjectStore('tags', { keyPath: 'id' });
  };
})};

const clearDB =(db)=>{ return new Promise((resolve, reject) => {
  const transaction = db.transaction('files', 'readwrite'),
  objectStore = transaction.objectStore('files'),
  clearRequest = objectStore.clear();
  clearRequest.onsuccess =()=>{ resolve() };
  clearRequest.onerror =(event)=>{ reject(event.target.error)};
})};

const addFileToDB = (db, file) => { const name = file.name;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    const objectStore = transaction.objectStore('files');

    const transaction_tags = db.transaction('tags', 'readwrite');
    const objectStore_tags = transaction_tags.objectStore('tags');

    const addRequest = objectStore.add({ id: name, file });
    const get_tags = objectStore_tags.get(name);

      get_tags.onsuccess = () => { const tags = get_tags.result;
        if (!tags) {
          // TODO: Add tags to iDB, get them from user input in dom
          /*TEMPORARY*/ /*objectStore_tags.add({id: name, value: 'rock indie alternative'})*/
        }
      };
      get_tags.onerror =(event)=>{ console.error(event.target.error)};

    addRequest.onsuccess =()=>{ resolve()};
    addRequest.onerror =(event)=>{ reject(event.target.error)};
  });
};
const $update_tag = (name, tagss, remove) => {
  return new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open('efy_music', 1);

    openRequest.onsuccess = function(e) {
      const db = e.target.result;
      const transaction = db.transaction('tags', 'readwrite');
      const store = transaction.objectStore('tags');
      const get_tags = store.get(name);

      get_tags.onsuccess = function() {
        const tags = get_tags.result;
        if (!tags) {
          if (remove !== 'remove') {
            store.add({id: name, value: tagss});
          }
          resolve();
        } else {
          if (remove === 'remove') {
            const newTags = tags.value.split(' ').filter(tag => tag !== tagss).join(' ');
            if (newTags) {
              store.put({id: name, value: newTags});
            } else {
              store.delete(name);
            }
          } else {
            store.put({id: name, value: tagss});
          }
          resolve();
        }
      };
      get_tags.onerror = function(event){ console.error(event.target.error)};
    };
    openRequest.onerror = function(e){ console.error("Error", e.target.error)};
  });
};

  const process_song =(file, custom_tags = '')=>{
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
      let thumbnail; const type = file.type;

      /*Add Songs*/
      $add('div', {class: 'song', efy_card: '', ms_track_id: i}, [
        ['div', {class: 'info'}, [
          ['div', {class: 'delete'}, [ ['button', {title: 'delete'}] ]],
          ['div', {class: 'text'}, [
            ['p', {class: 'number efy_hide_i'}, [`${i}. `]],
            ['p', {class: 'artist'}, [ audios_artist[i] ]],
            ['p', {class: 'separator title'}, [ artist_line ]],
            ['p', {class: 'title'}, [ audios_title[i] ]],
            ['p', {class: 'separator album'}, [ album_line ]],
            ['p', {class: 'album'}, [ audios_album[i] ]]
          ]]
        ]], ['div', {class: 'custom_tags'}]
      ], $('.songs'));



// Visualizer
//////
//    var ctx = new(window.AudioContext || window.webkitAudioContext)();
//    var audioSrc = ctx.createMediaElementSource(audio);
//    var analyser = ctx.createAnalyser();
//    audioSrc.connect(analyser);
//    analyser.connect(ctx.destination);
//    analyser.fftSize = 256;
//    var bufferLength = analyser.frequencyBinCount;
//    var dataArray = new Uint8Array(bufferLength);
//    var canvasCtx = $all('.audio_seeker canvas')[1].getContext('2d');
//
//    var offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, 44100 * 40, 44100);
//    var analyser = offlineCtx.createAnalyser();
//    analyser.fftSize = 256;
//    var bufferLength = analyser.frequencyBinCount;
//    var dataArray = new Uint8Array(bufferLength);
//
//    var reader = new FileReader();
//    reader.onload = function(e) {
//        offlineCtx.decodeAudioData(e.target.result, function(buffer) {
//            var source = offlineCtx.createBufferSource();
//            source.buffer = buffer;
//            source.connect(analyser);
//            analyser.connect(offlineCtx.destination);
//            source.start();
//            offlineCtx.startRendering().then(function(renderedBuffer) {
//                analyser.getByteTimeDomainData(dataArray);
//                draw();
//            });
//        });
//    };
//    reader.readAsArrayBuffer(file);
//
// function draw() {
//     var canvas = $all('.audio_seeker canvas')[1];
//     if (!canvas) return;
//
//     var canvasCtx = canvas.getContext('2d');
//     var bars = 150;
//     var barWidth = (canvasCtx.canvas.width / bars) - 1; // Subtract 2 to create a gap between the bars
//     var barSpacing = (canvasCtx.canvas.width / bars) + 1; // Add 2 to create a gap between the bars
//
//     canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
//
//     for(var i = 0; i < bars; i++) {
//         var index = Math.round(i * (bufferLength / bars));
//         var v = dataArray[index] / 128.0;
//         var y = v * canvasCtx.canvas.height;
//         canvasCtx.fillStyle = '#fff3';
//         canvasCtx.fillRect(i * barSpacing, canvasCtx.canvas.height - y, barWidth, y);
//     }
// }
//
//
//  if (!audio.src || audio.paused) { $wait(.1, ()=>{
//
//      audio.onloadedmetadata = function() {
//          // audio.play();
//          draw();
//      };
//  })
//  }

/////



      /*Variables*/
      const current_track = $(`.song[ms_track_id="${i}"]`),
      c_track = `.song[ms_track_id="${i}"]`,
      info = $$(current_track, '.info');

      $add('div', {tag: '', class: 'add', efy_toggle: '.ms_filter .confirm, #custom_tags_add'}, [ ['i', {efy_icon: 'plus'}] ], $$(current_track, '.custom_tags'));
      $add('div', {tag: '', class: 'remove'}, [ ['i', {efy_icon: 'remove'}] ], $$(current_track, '.custom_tags'));

      if (!custom_tags == ''){ let filter_tags = $('.ms_filter [tags]');
        current_track.setAttribute('tags', custom_tags);
        custom_tags.split(' ').map( tag =>{ let tags_attribute = filter_tags.getAttribute('tags');
          $add('div', {tag: tag}, tag, $$(current_track, '.custom_tags'));
          $$(current_track, '.custom_tags').setAttribute('tags', custom_tags);
          if (! tags_attribute.includes(tag)) {
            $add('button', {tag: tag, efy_toggle: `.song:not([tags*=${tag}])`, onClick: `this.classList.toggle('active');`}, tag, $('.ms_filter [tags]'));
            filter_tags.setAttribute('tags', `${tags_attribute} ${tag}`);
          }
        })
      };

      if (type.startsWith('audio')){ audios_type[i] = 'audio';
        try { let byteCharacters = atob(Base64.encodeBytes(tags.picture.data)), byteArrays = [], len = byteCharacters.length;

          for (let offset = 0; offset < len; offset += 512){
            let slice = byteCharacters.slice(offset, offset + 512),
            byteNumbers = Array.from(slice).map(char => char.charCodeAt(0)),
            byteArray = new Uint8Array(byteNumbers); byteArrays.push(byteArray);
          }

          let blob = new Blob(byteArrays, {type: 'image/png'}), url = URL.createObjectURL(blob);
          const img = new Image(); img.src = url;

          img.onload = function(){ const canvas = document.createElement('canvas');
            canvas.width = img.width / img.height * 80; canvas.height = 80;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            let thumbnail = canvas.toDataURL('image/webp');
            $add('div', {class: 'image efy_shadow_trans', style: `background: url(${thumbnail})`, title: 'Song image'}, [], info, 'afterbegin');
            audios_image[i] = thumbnail;
          };
        } catch { $add('div', {class: 'ms_empty image efy_shadow_trans'}, [ $add('i', {efy_icon: 'audio'}) ], info, 'afterbegin') }
      }
      else if (type.startsWith('image')){ audios_type[i] = 'image';
        const blob = new Blob([file], {type: file.type}), url = URL.createObjectURL(blob),
        img = new Image(); img.src = url;

        $event(img, 'load', ()=>{ const canvas = document.createElement('canvas');
          canvas.width = img.width / img.height * 80; canvas.height = 80;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          thumbnail = canvas.toDataURL('image/webp');
          $add('div', {class: 'image efy_shadow_trans', style: `background: url(${thumbnail})`, title: 'Song image'}, [], info, 'afterbegin')
        });
      } else if (type.startsWith('video') || file.name.endsWith('.mkv') || file.name.endsWith('.mov')){ audios_type[i] = 'video';
        const blob = new Blob([file], {type: file.type}), url = URL.createObjectURL(blob),

        video = document.createElement('video'),
        snapImage =()=>{ const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth / video.videoHeight * 80; canvas.height = 80;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbnail = canvas.toDataURL('image/webp');
          $add('div', {class: 'image efy_shadow_trans', style: `background: url(${thumbnail})`, title: 'Song image'}, [], info, 'afterbegin')
          const success = thumbnail.length > 100000; if (success){ URL.revokeObjectURL(url)}; return success;
        };
        video.addEventListener('canplaythrough', ()=>{ if (snapImage()){ video.pause()} });
        video.preload = 'metadata'; video.src = url; video.muted = true; video.playsInline = true; video.play();
      }

      /*Tags - Checked*/
      for (let a = 'image artist title album number custom_tags'.split(' '), i = 0; i < a.length; i++){
        if ($(`#ms_song_info_${a[i]}`).checked){
          $all(c_track + ` .${a[i]}`).forEach(b=>{ b.classList.remove('efy_hide_i') })
        } else {
          $all(c_track + ` .${a[i]}`).forEach(b=>{ b.classList.add('efy_hide_i') })
        }
      }

/*Media Playback*/ $event(current_track, 'click', (e)=>{ let target = e.target;
  ms_track_id = current_track.getAttribute('ms_track_id'); const url = audios[ms_track_id];
  if ((! target.matches(`${c_track} .remove`)) && (! target.matches(`${c_track} [tag]`)) ){

    if (audios_type[ms_track_id] === 'image'){
      audio.pause(); audio.src = '';
      [audio, video_div].forEach(a=> a.style.backgroundImage = `url(${url})`);
      audio.classList.add('image');
    }
    else {
      [audio, video_div].forEach(a=> a.style.backgroundImage = '');
      audio.classList.remove('image');
      audio.src = url; audio.playbackRate = efy_ms.speed || 1; audio.play();
    }

    $all('.player i').forEach(a=>{ a.setAttribute('efy_icon', 'pause') });
    hightlight_playing(current_track); song_bg();
}});

/*Add & Remove Tags*/
$event($('[ms_app]'), 'click', function(e){ let target = e.target,
  filter_tags = $('.ms_filter [tags]'), tags_attribute = filter_tags.getAttribute('tags'),
  custom_tags = $(`${c_track} .custom_tags`), add_tags = `${c_track}.add_tags`;

  function addTag(tag) {
    try {
      $add('div', {tag: tag}, tag, $(`${c_track}.add_tags .custom_tags`) );
      $(add_tags).setAttribute('tags', `${$(add_tags).getAttribute('tags')} ${tag}`);
      if (! tags_attribute.includes(tag)){
        $add('button', {tag: tag, efy_toggle: `.song[tags*=${tag}]`}, tag, filter_tags);
        filter_tags.setAttribute('tags', `${tags_attribute} ${tag}`);
      }
      $update_tag(file.name, `${custom_tags.getAttribute('tags')} ${tag}`);
    } catch {
      console.log('efy media: tag added too quickly')
    }
  }

  if (target.matches('.ms_filter .confirm')) {
    let tag2 = $('#custom_tags_add').value;
    if (tag2 !== ''){ addTag(tag2) }
  }
  else if (target.matches(`.ms_filter [tag]`)) {
    addTag(target.textContent, target);
  }
  else if (target.matches(`${c_track} .add`)){
    $(`${c_track}`).classList.toggle('add_tags');
    $(`${c_track} .add`).classList.toggle('active')
  }
  else if (target.matches(`${c_track} .remove`)){
    $all(`.song .remove.active:not(${c_track} .remove)`).forEach(a => a.classList.remove('active'))
    $(`${c_track} .remove`).classList.toggle('active')
  }
  else if (target.matches(`${c_track} [tag]`) && $(`${c_track} .remove`).classList.contains('active')) {
      try { $update_tag(file.name, target.getAttribute('tag'), 'remove'); target.remove()} catch {/**/}
  }
});

      /*Play 1st song*/ if (ms_no_songs == true){ ms_track_id = 1;
          audio.setAttribute('src', audios[1]); audio.playbackRate = efy_ms.speed || 1; play_pause(); hightlight_playing($('.songs .song')); ms_no_songs = false; song_bg() }
    },
        { tags: ["artist", "title", "album", "picture"], dataReader: FileAPIReader(file) });
  }


  const restore_songs = async ()=>{
    const db = await openDB(), transaction = db.transaction('files', 'readonly'),
    objectStore = transaction.objectStore('files'), getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = (event) => {
      $('.ms_loading').classList.remove('efy_hide_i');
      const storedFiles = event.target.result;
      if (storedFiles.length > 0) { let i = 0;
        filesToUse = storedFiles.map(storedFile => storedFile.file);
        names = storedFiles.map(id => id.id);
        // Process the files retrieved from IndexedDB...
        for (const file of filesToUse) { let tags = '';
          const get_tags = db.transaction('tags', 'readwrite').objectStore('tags').get(names[i]);
          get_tags.onsuccess =()=>{
            if (get_tags.result){ tags = get_tags.result.value; process_song(file, tags)}
            else { process_song(file)}
          }; get_tags.onerror =(event)=>{ console.error(event.target.error)};
        i++}
      }; $('.ms_loading').classList.add('efy_hide_i');
    };

    getAllRequest.onerror =(event)=>{ console.error(event.target.error)};
  };

/*Load Files*/ const load_audio = async (file) => {
  let filesToUse = []; $('.ms_loading').classList.remove('efy_hide_i');

  if (efy_ms.filesystem){
    if (efy_ms.filesystem === 'directory'){
      const dirHandle = await window.showDirectoryPicker();
      for await (const entry of dirHandle.values()){
        if (entry.kind === 'file'){ filesToUse.push(await entry.getFile())}
      }
    } else {
      const fileHandles = await window.showOpenFilePicker({ multiple: true });
      filesToUse = await Promise.all(fileHandles.map(fileHandle => fileHandle.getFile()));
    }
    const db = await openDB(); /*await clearDB(db)*/
    for (const file of filesToUse){ await addFileToDB(db, file)}
  }
  else { filesToUse = [file]}
  for (const file of filesToUse){ process_song(file)}
  $('.ms_loading').classList.add('efy_hide_i');
},


read_files = async (a)=>{ for (let i = 0; i < a.length; i++) { await load_audio(a[i])}};

if (efy_ms.restore == true){
  restore_songs(); $('#md_storage_restore').checked = true;
}

if (efy_ms.filesystem){ $ready('.ms_filesystem', (b)=>{
    $('#filesystem_access').checked = true;
    $('.api_options').classList.remove('efy_hide_i');
    $all('[efy_upload*=ms_upload]').forEach(a=>{ a.classList.add('efy_hide_i')});
    b.classList.remove('efy_hide_i');
    $event(b, 'click', async ()=>{ load_audio()})
    if (efy_ms.filesystem === 'directory') $('#filesystem_access_dir').checked = true;
})} else { $wait(1, ()=>{
  $all('#ms_upload').forEach(a=>{
    $event(a, 'change', async (event)=>{ read_files(event.target.files)})
  });
  $('#file_reader').checked = true;
})}

$event($('#md_storage_restore'), 'change', (event)=>{
  (event.target.checked === true) ? efy_ms.restore = true : delete efy_ms.restore;
  $ms_save(); location.reload();
});

$event($('[efy_tabs=ms_menu] [efy_content=backup]'), 'change', (event)=>{ target = event.target;
  if ($('#filesystem_access').checked && $('#filesystem_access_dir').checked) efy_ms.filesystem = 'directory'
  else if ($('#filesystem_access').checked) efy_ms.filesystem = 'files';
  else if ($('#file_reader').checked) delete efy_ms.filesystem;
  $ms_save(); location.reload();
});

const prev_next =(i)=>{
  if (audios_type[i] === 'image'){
    clearInterval(img_time_interval); img_time_interval = setInterval(next_song, img_time * 1000)
    audio.pause(); audio.src = ''; audio.classList.add('image');
    [audio, video_div].forEach(a=> a.style.backgroundImage = `url(${audios[i]})`);
  }
  else { clearInterval(img_time_interval);
    [audio, video_div].forEach(a=> a.style.backgroundImage = '');
    audio.classList.remove('image');
    audio.src = audios[i]; audio.playbackRate = efy_ms.speed || 1; audio.play();
  }
  if ($('.player i').getAttribute('efy_icon') == 'play'){ play_pause()}
  hightlight_playing($(`.song[ms_track_id="${i}"]`)); song_bg()
};

/*Previous*/ const prev_song =()=>{ let length = Object.keys(audios).length;
  if (ms_track_id > 1){ ms_track_id -= 1} else {ms_track_id = length}
  prev_next(ms_track_id)
};

/*Next*/ const next_song =()=>{ let length = Object.keys(audios).length;
  if (length - ms_track_id >= 1){ ms_track_id++} else {ms_track_id = 1}
  prev_next(ms_track_id)
};

$all('.prev').forEach(a=>{ $event(a, 'click', prev_song) });
$all('.next').forEach(a=>{ $event(a, 'click', next_song) });

/*Speed & Pitch*/
rate.addEventListener('input', ()=>{ let b = rate.value; audio.playbackRate = b;
  $all('.ms_speed_text').forEach(c=>{ c.textContent = b+'X' }); efy_ms.speed = b; $ms_save();
});
pitch.addEventListener('change', ()=>{ let a = !pitch.checked; audio.preservesPitch = a;
  if ('webkitPreservesPitch' in audio){ audio.webkitPreservesPitch = a; prev_song(); next_song()}
  efy_ms.pitch = !a; $ms_save();
});


const update_progress =()=>{ try { const ms_seek_slider = $('#seeker_slider');
    const seeker_max = Number(ms_seek_slider.getAttribute('max')), audio_duration = duration_in_min(audio.duration), current_time = duration_in_min(audio.currentTime);
    $all('.seeker-start-value').forEach(a=> a.textContent = current_time);
    $all('.seeker-end-value').forEach(a=> a.textContent = audio_duration);
    $all('.seeker-end-value').forEach(a=> a.textContent = audio_duration);
    const value = (seeker_max / audio.duration) * audio.currentTime;
    if (Number(ms_seek_slider.value) !== value){ $all('#seeker_slider').forEach(a=> a.value = value)}
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

$all('#seeker_slider').forEach(a=>{
  $event(a, 'change', seek)
});
$event(audio, 'ended', next_song);
$event(audio, 'timeupdate', update_progress);
$event(audio, 'play', ms_mpris); $event(audio, 'pause', ms_mpris);
$all('.player').forEach(a=>{ $event(a, 'click', play_pause) });


/*Search Songs*/ $add('input', {id: 'ms_search', type: 'text', placeholder: 'Search Songs...', efy_search_input:''}, [], $('[efy_about]'), 'afterend');
$body.setAttribute('id','ms_app'); $body.setAttribute('efy_search','.songs > .song');


for (let a = 'image artist title album number custom_tags'.split(' '), i = 0; i < a.length; i++){
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

$all('.vd_gestures div').forEach(a =>{ $event(a, 'click', ()=>{ play_pause() }) });
$event($('.vd_gestures .middle'), 'dblclick', ()=>{ if (document.fullscreenElement){ document.exitFullscreen()} else {$('.vd_video_div').requestFullscreen()} });
$event($('.vd_gestures .left'), 'dblclick', ()=>{ audio.currentTime = Math.round(audio.currentTime - 10) });
$event($('.vd_gestures .right'), 'dblclick', ()=>{ audio.currentTime = Math.round(audio.currentTime + 10) });

/*Video Player - Click & Hover Events*/

$event(document, 'pointermove', (event)=>{
  if ($('.vd_video_div').contains(event.target)){
    $('.vd_video_div [ms_bar]').classList.remove('efy_hide_i');
  }
});

$event(document, 'pointerup', (event)=>{
  if ($('.vd_video_div').contains(event.target)){
    $wait(2, ()=> $('.vd_video_div [ms_bar]').classList.add('efy_hide_i'));
  }
});

let player_focused = false,
keys = {ArrowDown: false, ArrowLeft: false, ArrowRight: false, ArrowUp: false};

function handleKeydown(event){ keys[event.key] = true}
function handleKeyup(event){ keys[event.key] = false}
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyup);

const speed_arrows =(multiply)=>{
  speed = (audio.playbackRate + (0.05 * multiply)).toFixed(2);
  audio.playbackRate = speed; rate.value = speed; efy_ms.speed = speed; $ms_save();
  $all('.ms_speed_text').forEach(c => c.textContent = speed + 'X');
  $('[efy_range_text="Speed"] .efy_range_text_p').value = speed;
};

function checkSimultaneousKeys(event){
  event.preventDefault();

  const level_nofify =(text)=>{
    $all('.audio_level').forEach(x => x.remove());
    $notify(1, text, '', '', 'audio', (x)=>{ x.forEach(y => y.classList.add('audio_level'))});
  };

  if (keys.ArrowDown && keys.ArrowLeft){ prev_song()}
  else if (keys.ArrowDown && keys.ArrowRight){ next_song()}
  else if (keys.ArrowUp && keys.ArrowLeft){
    if (audio.playbackRate > 0.25) speed_arrows(-1);
    level_nofify(`Speed - ${audio.playbackRate}X`);
  }
  else if (keys.ArrowUp && keys.ArrowRight){
    if (audio.playbackRate < 2) speed_arrows(1);
    level_nofify(`Speed - ${audio.playbackRate}X`);
  }
  else if (keys.ArrowDown){
    if (audio.volume > 0) audio.volume = (audio.volume - 0.05).toFixed(2);
    level_nofify(`Volume - ${audio.volume}`);
  }
  else if (keys.ArrowUp){
    if (audio.volume < 1) audio.volume = (audio.volume + 0.05).toFixed(2);
    level_nofify(`Volume - ${audio.volume}`);
  }
  else if (keys.ArrowLeft){
    if (audio.classList.contains('image')){ prev_song()}
    else { audio.currentTime = (audio.currentTime < 10) ? 0 : Math.round(audio.currentTime - 10)}
  }
  else if (keys.ArrowRight){
    if (audio.classList.contains('image')){ next_song()}
    else { (audio.currentTime < (audio.duration - 10)) ? audio.currentTime = Math.round(audio.currentTime + 10) : next_song()}
  }
}

$event(document, 'click', (event)=>{ const target = event.target;
  player_focused = $('[ms_app]').contains(target)
});

$event(document, 'keydown', (event) =>{
    if (player_focused){
      switch (event.key){
          case ' ': event.preventDefault(); play_pause(); break;
          case 'ArrowDown': checkSimultaneousKeys(event); break;
          case 'ArrowUp': checkSimultaneousKeys(event); break;
          case 'ArrowLeft': checkSimultaneousKeys(event); break;
          case 'ArrowRight': checkSimultaneousKeys(event); break;
          case 'f':
            event.preventDefault();
            let final = 'on', d = $root.getAttribute('efy_sidebar'), e = '';
            if ($root.hasAttribute('efy_sidebar')){
              if (['left', 'right'].some(s => d.includes(s))) e = d.replace('on_', '');
              final = d.includes('on') ? e : 'on_' + e;
            };
            $root.setAttribute('efy_sidebar', final); $('.efy_sidebar #ms_search').focus();
            player_focused = false;
          break;
          default: break;
      }
    }
    else {
      if (event.key === ' '){
        $root.setAttribute('efy_sidebar', '');
        $('[efy_sidebar_btn]').focus();
      }
    }
}, false);

/*Current Song Image as Background*/
$add('label', {for: 'ms_song_bg', efy_lang: 'song_image'}, [], $('label[for="trans_window"]'), 'afterend');
$add('input', {id: 'ms_song_bg', type: 'checkbox'}, [], $('label[for="trans_window"]'), 'afterend');

if (efy_ms.song_bg == true){ $('#ms_song_bg').checked = true}

$event($('#ms_song_bg'), 'change', ()=>{ let a = $('#ms_song_bg').checked; efy_ms.song_bg = a; $ms_save(); song_bg()});

song_bg =()=>{ let a = $('.efy_3d_back_ms');
    console.log(audios_image[ms_track_id]);
    console.log(audios_image);
  if ((efy_ms.song_bg === true) && (audios_image[ms_track_id] !== 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA')){
    a.textContent = `.efy_3d_bg, html.trans_window .efy_3d_bg {background: url(${audios_image[ms_track_id]})!important; background-repeat: no-repeat!important; background-size: cover!important}`;
  }
  else {a.textContent = ''}
}

/*Video Thumbnail*/ $wait(2, ()=>{

$all('#ms_upload').forEach(a=>{ a.addEventListener('change', function(event) {
  var file = event.target.files[0];
  var fileReader = new FileReader();
  if (file.type.match('image')) {
    fileReader.onload = function() {
      var img = document.createElement('img');
      img.src = fileReader.result;
      $('.test_thumbs').appendChild(img);
    };
    fileReader.readAsDataURL(file);
  } else {
    fileReader.onload = function() {
      var blob = new Blob([fileReader.result], {type: file.type});
      var url = URL.createObjectURL(blob);
      var video = document.createElement('video');
      var timeupdate = function() {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      video.addEventListener('loadeddata', function() {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
        }
      });
      var snapImage = function() {
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        var image = canvas.toDataURL();
        var success = image.length > 100000;
        if (success) {
          var img = document.createElement('img');
          img.src = image;
          $('.test_thumbs').appendChild(img);
          URL.revokeObjectURL(url);
        }
        return success;
      };
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = url;
       // document.querySelector('.vid').src = url;   <-- video url
      // Load video in Safari / IE11
      video.muted = true;
      video.playsInline = true;
      video.play();
    };
    fileReader.readAsArrayBuffer(file);
  }
}); });

});

}, 1);