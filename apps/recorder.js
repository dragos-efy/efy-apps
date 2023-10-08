const video_grid = $('.video_grid'), videoElement = $('video.camera'), videoSelect = $('#videoSource'),
audioSelect = $('#audioSource'), mediaSelect = $('#mediaSelect'),
recordToggle = $('#recordToggle'), cameraToggle = $('#cameraToggle'), microphoneToggle = $('#microphoneToggle');
let mediaRecorder, recordedBlobs, snapshot,
screenShareToggle = $('#screenShareToggle'), screenShareElement = $('video.screen_sharing');

/*Functions*/
const toggleRecording =()=>{ recordToggle.checked ? stopRecording() : startRecording()};

navigator.mediaDevices.enumerateDevices()
    .then(gotDevices).catch(error => {console.error('Error getting device s', error) });

$event(videoSelect, 'change', getStream);
$event(audioSelect, 'change', getStream);
$event(recordToggle, 'change', toggleRecording);
$event(cameraToggle, 'change', toggleCamera);
$event(microphoneToggle, 'change', toggleCamera);
$event(screenShareToggle, 'change', toggleScreenSharing);

/*Fullscreen*/ $event($('#fullscreen'), 'click', ()=>{
    if (document.fullscreenElement){ document.exitFullscreen()} else {document.documentElement.requestFullscreen()};
    if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}
});

function gotDevices(deviceInfos) { for (let i = 0; i !== deviceInfos.length; ++i){
    const deviceInfo = deviceInfos[i], option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
        audioSelect.appendChild(option);
    }
}}

function getStream() {
    if (window.stream){ window.stream.getTracks().forEach(track => { track.stop()})}
    const videoSource = videoSelect.value, audioSource = audioSelect.value,
    constraints = {
        video: { deviceId: videoSource ? { exact: videoSource } : undefined },
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream =>{ window.stream = stream; videoElement.srcObject = stream })
        .catch(error =>{ console.error('Error getting media stream', error)});
}

function captureSnapshot() { let canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth; canvas.height = videoElement.videoHeight;
  canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/png');
}

function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]),
  mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
  ab = new ArrayBuffer(byteString.length), ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++){ ia[i] = byteString.charCodeAt(i)}
  return new Blob([ab], {type: mimeString});
}

function toggleScreenSharing() {
  if (screenShareToggle.checked) {
    navigator.mediaDevices.getDisplayMedia()
      .then(stream => { window.screenStream = stream;
        screenShareElement.srcObject = stream;
        screenShareElement.classList.toggle('efy_hide');
        video_grid.classList.toggle('columns2');
      })
      .catch(error => { console.error('Error getting screen stream', error);
        screenShareToggle.checked = false;
      });
  } else if (window.screenStream) {
    window.screenStream.getTracks().forEach(track => {
      track.stop();
    });
    window.screenStream = null;
    screenShareElement.srcObject = null;
    screenShareElement.classList.toggle('efy_hide');
    video_grid.classList.toggle('columns2');
  }
}

function startRecording(){ recordedBlobs = []; let options;
  switch (mediaSelect.value) {
    // case 'video': options = { mimeType: 'video/webm' }; break;
    case 'audio': options = { mimeType: 'audio/webm' }; break;
    case 'video': options = { mimeType: 'video/webm;codecs=vp9,opus' }; break;
    case 'image': snapshot = captureSnapshot(); break;
  }

    if ((mediaSelect.value === 'image' || mediaSelect.value === 'video') && screenShareToggle.checked){
        let combinedStream = new MediaStream([...(window.stream ? window.stream.getTracks() : []), ...(window.screenStream ? window.screenStream.getTracks() : [])]);
        try { mediaRecorder = new MediaRecorder(combinedStream, options)}
        catch (e) { console.error('Exception while creating MediaRecorder:', e); return}
    } else {
        try { mediaRecorder = new MediaRecorder(window.stream, options)}
        catch (e){ console.error('Exception while creating MediaRecorder:', e); return}
    }

  mediaRecorder.onstop = (event) =>{ let blob, mime = 'webm';
    if (mediaSelect.value === 'image'){
      blob = new Blob([dataURItoBlob(snapshot)], { type: 'image/png' }); mime = 'png';
    } else { blob = new Blob(recordedBlobs, { type: 'video/webm' })}
    const url = window.URL.createObjectURL(blob),
    a = $add('a', {href: url, download: `test.${mime}`, class: 'efy_hide'}); a.click();
    $wait(0.1, () => { a.remove(); window.URL.revokeObjectURL(url) });
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
}

function handleDataAvailable(event) {
    if (mediaSelect.value !== 'image' && event.data && event.data.size > 0){ recordedBlobs.push(event.data)}
}

function stopRecording(){ mediaRecorder.stop()}

function toggleCamera(){ if (window.stream){
    window.stream.getVideoTracks().forEach(a =>{ a.enabled = !cameraToggle.checked });
    window.stream.getAudioTracks().forEach(a =>{ a.enabled = !microphoneToggle.checked });
}}

getStream();