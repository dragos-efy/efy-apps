/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

$insert($('#efy_sbtheme'), 'beforebegin', $add('details', {id: 'ms_music_player'}, [
  $add('summary', {}, [$add('i', {efy_icon: 'audio'}), 'Music Player']),
    $add('div', {efy_select: ''}, [
      $add('details', {id: 'ms_sidebar_speed', open: ''}, [ $add('summary', {efy_lang: 'speed'}, [$add('i', {efy_icon: 'play'})]),
        $add('input', {type: 'checkbox', id: 'pitch', name: 'pitch'}), $add('label', {for: 'pitch', style: 'display: flex; align-items: center; width: fit-content'}, ['Pitch']),
        $add('div', {efy_range_text: 'Speed', efy_lang: 'speed'}, [
          $add('input', {type: 'range', id: 'rate', min: '0.25', max: '2', step: '0.05', value: '1'})
        ]),
      ]),
      $add('details', {id: 'bar_position'}, [ $add('summary', {}, [$add('i', {efy_icon: 'dots'}), 'Grid']), $add('p', {}, ['Bar Position']), $add('div', {}, [
        $add('input', {type: 'radio', id: 'bar_position_bottom', name: 'bar_position', checked: ''}), $add('label', {for: 'bar_position_bottom', efy_lang: 'down', style: 'display: flex; align-items: center; width: fit-content'}),
        $add('input', {type: 'radio', id: 'bar_position_top', name: 'bar_position'}), $add('label', {for: 'bar_position_top', efy_lang: 'up', style: 'display: flex; align-items: center; width: fit-content'})
      ]),
        $add('div', {efy_range_text: 'Columns', efy_lang: 'columns'}, [
          $add('input', {type: 'range', id: 'ms_grid_columns', min: '1', max: '4', step: '1', value: '2'})
        ])
      ])
    ])
]));

/*Speed Indicator*/ $all('.ms_speed_text').forEach(b=>{
  b.addEventListener('click', ()=>{
    $all('.efy_sidebar details').forEach(a=>{ a.removeAttribute('open')});
    $('#ms_music_player').setAttribute('open', ''); $('#ms_sidebar_speed').setAttribute('open', '');
})});


/*App Layout*/ $('#bar_position_top').addEventListener('click', ()=>{ $('[ms_app]').setAttribute('ms_app', 'top')});
$('#bar_position_bottom').addEventListener('click', ()=>{ $('[ms_app]').setAttribute('ms_app', '')});
$event($('#ms_grid_columns'), 'input', (a)=>{ $('[ms_grid]').setAttribute('ms_grid', a.target.value)});


/*Variables*/ let audios = {}, audios_title = {}, audios_artist = {}, audios_album = {}, audios_image = {}, ms_track_id = 0, i = 0, ms_no_songs = true;
const audio = $('.audio_test'), ms_playpause_btn = $('.player'), ms_prev_btn = $('.prev'), ms_next_btn = $('.next'), ms_grid = $('[ms_grid]'), ms_time_nr = $('.seeker-start-value'), ms_time_val = $('.seeker-end-value'), ms_seek_slider = $('#seeker-slider');




/*Play & Pause*/ const play_pause =()=>{let audio = $('.audio_test'); if (audio.src){
  if ($('.player i').getAttribute('efy_icon') == 'play'){ audio.playbackRate = $('#rate').value; audio.play(); $('.player i').setAttribute('efy_icon', 'pause')}
  else { audio.pause(); $('.player i').setAttribute('efy_icon', 'play')}
}},
duration_in_min =(dur, min = 0)=>{ if (dur < 60){ return dur < 10 ? `${min}:0${Math.floor(dur)}` : `${min}:${Math.floor(dur)}`}; return duration_in_min(dur - 60, (min += 1))};


/*Hightlight active audio*/ const hightlight_playing =(a)=>{ if ($('.songs .song.playing') && $('.songs .song.playing').getAttribute('ms_track_id') !== a.getAttribute('ms_track_id')){ $('.songs .song.playing').classList.remove('playing')}
  a.classList.add('playing');
};


/*Load Files*/ const load_audio =(file)=>{
	/*List tags*/ ID3.loadTags(file.name, ()=>{ i++; let tags = ID3.getAllTags(file.name);
      /*Save to memory*/ audios[i] = URL.createObjectURL(file);
      audios_title[i] = (tags.title || file.name.replace('.mp3', '').replace('.wav', '').replace('.m4a', '').replace('.flac', '').replace('.webm', '').replace('.mp4', '').replace('.ogg', ''));
      audios_artist[i] = (tags.artist || '');
      audios_album[i] = (tags.album || '');
      audios_image[i] = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA';

		/*Add Songs*/
		$append($('.songs'), $add('div', {class: 'song', efy_card: '', ms_track_id: i}, [
			$add('div', {class: 'delete'}, [ $add('button', {title: 'delete'}) ]),
			$add('p', {class: 'artist'}, [ audios_artist[i] ]),
			$add('p', {class: 'title'}, [ audios_title[i] ]),
			$add('p', {class: 'album'}, [ audios_album[i] ])
		]) );
		try {
          audios_image[i] = `data:${tags.picture.format};base64,${Base64.encodeBytes(tags.picture.data)}`;
          $insert($(`.song[ms_track_id="${i}"]`), 'afterbegin', $add('img', {src: audios_image[i], alt: 'Song image'}))
        } catch (error){/**/}

		/*Events*/
		$(`.song[ms_track_id="${i}"]`).addEventListener('click', (b)=>{ ms_track_id = b.target.getAttribute('ms_track_id');
			audio.setAttribute('src', audios[ms_track_id]); audio.playbackRate = $('#rate').value; audio.play(); $('.player i').setAttribute('efy_icon', 'pause'); hightlight_playing(b.target);
		});
		/*Play 1st song*/ if (ms_no_songs == true){ ms_track_id = 1;
          audio.setAttribute('src', audios[1]); audio.playbackRate = $('#rate').value; play_pause(); hightlight_playing($('.songs .song')); ms_no_songs = false }
	},
		{ tags: ["artist", "title", "album", "picture"], dataReader: FileAPIReader(file) });
},

read_files =(a)=>{ for (let i = 0; i < a.length; i++) { load_audio(a[i])}};


/*Upload Buttons*/ $all('#ms_upload').forEach(a=>{
  a.setAttribute('multiple', '');
  a.addEventListener('change', (event)=>{ read_files(event.target.files)});
});




/*Next*/ const next_song =()=>{ let length = Object.keys(audios).length;

  if (length - ms_track_id >= 1){ ms_track_id++}
  else {ms_track_id = 1}

  if ($('.player i').getAttribute('efy_icon') == 'play'){ play_pause()}

  audio.src = audios[ms_track_id]; audio.playbackRate = $('#rate').value; audio.play(); hightlight_playing($(`.song[ms_track_id="${ms_track_id}"]`));

};
ms_next_btn.addEventListener('click', next_song);



/*Previous*/ const prev_song =()=>{ let length = Object.keys(audios).length;

  if (ms_track_id > 1){ ms_track_id -= 1}
  else {ms_track_id = length}

  if ($('.player i').getAttribute('efy_icon') == 'play'){ play_pause()}

  audio.src = audios[ms_track_id]; audio.playbackRate = $('#rate').value; audio.play(); hightlight_playing($(`.song[ms_track_id="${ms_track_id}"]`));
};

ms_prev_btn.addEventListener('click', prev_song);


/*Speed & Pitch*/ let rate = $('#rate'), pitch = $('#pitch');

rate.addEventListener('input', ()=>{ let b = $('#rate').value; audio.playbackRate = b;
  $all('.ms_speed_text').forEach(c=>{ c.textContent = b+'X' })
});

pitch.addEventListener('change', ()=>{ audio.preservesPitch = !pitch.checked;
  if ('webkitPreservesPitch' in audio){ audio.webkitPreservesPitch = !pitch.checked; prev_song(); next_song()}
});



const update_progress =()=>{
  try {
    const seeker_max_val = Number(ms_seek_slider.getAttribute('max'));

    const audio_duration = duration_in_min(audio.duration);
    const current_time = duration_in_min(audio.currentTime);
    ms_time_val.textContent = audio_duration;
    ms_time_nr.textContent = current_time;
    const seeker_val =(seeker_max_val / audio.duration) * audio.currentTime;
    if (Number(ms_seek_slider.value) !== seeker_val){
      ms_seek_slider.value = seeker_val;
      document.documentElement.style.setProperty('--ms_song_time', `${ms_seek_slider.value * 0.1 * 10}%`);
    }
  } catch (e){}
},

seek =(e)=>{ if (audio.src){ audio.currentTime = Math.round(e.target.value / (100 / audio.duration))}},

ms_mpris =()=>{ if ('mediaSession' in navigator) { const action = (ev, fn) => navigator.mediaSession.setActionHandler(ev,fn);
  navigator.mediaSession.metadata = new MediaMetadata({ title: audios_title[ms_track_id], artist: audios_artist[ms_track_id], album: audios_album[ms_track_id], artwork: [{ src: audios_image[ms_track_id], type: 'image/png'}] });
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

/*Alpha*/for (let a =['#ms_music_player > summary'], i=0; i<a.length; i++){ $insert($(a[i]), 'beforeend', $add('mark', {efy_lang: 'alpha'}))}

});