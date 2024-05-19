$event($('#dc_notify_test'), 'click', ()=>{
    $notify('short', 'Short Notification', 'Disappears in 5s');
});

$('[efy_tabs=demo_color_picker] [efy_color] [efy_tab="1"]').click();