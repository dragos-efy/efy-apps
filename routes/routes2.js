$ready('#efy_sbtheme', ()=>{

const signals = {signal: rm_listeners.routes.signal};

$add('div', {class: 'routes_body'}, [
    ['button', {class: 'routes_test'}, 'Routes Test']
]);

$event($('.routes_test'), 'click', ()=>{ $notify('short', 'routes')}, signals);

}, 1);