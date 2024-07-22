$ready('#efy_sbtheme', ()=>{
    $add('div', {class: 'kb_textarea'}, [
        ['textarea', {id: 'kb_textarea', placeholder: 'Type something...'}]
    ]);
}, 1);

$ready('[efy_keyboard]', (x)=>{
    x.classList.remove('efy_hide_i'); $('body').setAttribute('efy_kb', '');
});