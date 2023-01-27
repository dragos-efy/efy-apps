$ready_once('.efy_sidebar').then(()=>{

    /*Custom Menu*/ $append($('#efy_modules'), $add('div', {id: 'custom_sidebar_menu'}));
    for (let a = ['./index.html', './empty.html', './music.html', 'https://efy.piped.pages.dev'], b = ['Home', 'Empty Page',  'Music', 'Piped'], c = $('#custom_sidebar_menu'), i = 0; i < a.length; i++){ $append(c, $add('a', {href: a[i]}, [b[i]]))}

    /*Custom Settings
    $append($('#efy_modules'), $add('details', {id: 'demo_sidebar_settings'}, [
        $add('summary', {}, [$add('i', {efy_icon: 'dots'}), 'Demo Settings']), $add('div', {})]),
    );
    for (let a = ['option1', 'option2', 'option3'], c = $('#demo_sidebar_settings > div'), i = 0; i < a.length; i++) {
        $append(c, $add('button', {}, [a[i]]));
    } */
});

/*Icons*/ $ready_once('#dc_icons').then(()=>{

    let a = $('#dc_icons'); 'accessibility arrow audio chevron dots fullscreen globe group heart help key menu menu2 notify notify_active pause play plus reload remove search star zoom_in zoom_out user'.split(' ').map(b=>{
        $append(a, $add('div', {efy_card: ''}, [ $add('i', {efy_icon: b}), $add('p', {}, [b]) ]))
    })

});