$ready_once('.efy_sidebar').then(()=>{

    /*Custom Menu*/ $add('div', {id: 'custom_sidebar_menu'}, [], $('#efy_modules'));
    for (let a = ['./index.html', './music.html', './money.html', 'https://efy.piped.pages.dev'], b = ['Home', 'Music', 'Money', 'Piped'], c = $('#custom_sidebar_menu'), i = 0; i < a.length; i++){ $append(c, $add('a', {href: a[i]}, [b[i]]))}

});

/*Icons*/ $ready_once('#dc_icons').then(()=>{

    let a = $('#dc_icons'); 'accessibility arrow audio chevron dots fullscreen globe group heart help key menu menu2 notify notify_active pause play plus reload remove search star zoom_in zoom_out user'.split(' ').map(b=>{
        $add('div', {efy_card: ''}, [ $add('i', {efy_icon: b}), $add('p', {}, [b]) ], a)
    })

});