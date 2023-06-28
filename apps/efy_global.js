$ready('#efy_sbtheme', ()=>{
    /*Custom Menu*/ $add('div', {id: 'custom_sidebar_menu'}, [
        $add('a', {href: `./index.html`}, ['Home']),
        $add('a', {href: `./music.html`}, ['Music']),
        $add('a', {href: `./planner.html`}, ['Planner']),
        $add('a', {href: `./money.html`}, ['Money']),
    ], $('#efy_modules'));
}, 1);