$ready('#efy_sbtheme', ()=>{

$add('div', {class: 'tc_container'}, [
  ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i', {efy_icon: 'flash'}]]]
]);

$add('div', {id: 'torch_bg_color', efy_color: 'Background .6 .37 127 1 torch_bg', efy_tabs: 'torch_bg', efy_select: '', efy_card: ''}, '', $('#efy_modules'));

$wait(.3, ()=>{
const container = [$('#torch_bg_color .efy_tabs'), 'afterbegin'];

$add('label', {for: 'torch_switch'}, 'Torch', ...container);
$add('input', {type: 'checkbox', id: 'torch_switch'}, '', ...container);
$add('button', {class: 'fullscreen efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]], ...container);

$event($('#torch_bg_color'), 'input', ()=>{
  $css_prop('--torch_bg', $('#torch_bg_color #torch_bg + label').style.background);
});

$event($('#torch_bg_color .fullscreen'), 'click', ()=>{
  document.fullscreenElement ? document.exitFullscreen() : $('html').requestFullscreen()
});

});


$wait(.5, ()=>{

const log =(msg)=> $notify('short', msg, '');

if ('mediaDevices' in navigator){
  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    if (cameras.length === 0){ log('No camera found')}

    navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}).then(stream =>{
        const track = stream.getVideoTracks()[0];

      const img_capture = new ImageCapture(track);
      img_capture.getPhotoCapabilities().then(capabilities =>{
        const btn_switch = $('#torch_switch');
        const torch_supported = !!capabilities.torch || (
          'fillLightMode' in capabilities &&
          capabilities.fillLightMode.length != 0
          && capabilities.fillLightMode != 'none'
        );

        if (torch_supported){ let torch = false;
            $event(btn_switch, 'click', ()=>{
                try { track.applyConstraints({advanced: [{torch: (torch = !torch)}]})}
                catch (err){ log(err)}
            });
        } else { log('No torch found')}

        }).catch(log)
    }).catch (log)
  }).catch (log)
}

});

}, 1);