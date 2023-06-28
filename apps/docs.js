/*Storage*/ let  efy_dc = {}, $dc_save =()=>{}; try { if (localStorage.efy_dc){ efy_dc = JSON.parse(localStorage.efy_dc)} $dc_save =()=>{localStorage.efy_dc = JSON.stringify(efy_dc)}} catch {}

/*Menu*/ $ready('#efy_sbtheme', ()=>{

$add('details', {id: 'dc_sidebar_menu'}, [
  $add('summary', {}, [$add('i', {efy_icon: 'dots'}), $add('p', {efy_lang: 'docs'}), $add('mark', {efy_lang: 'beta'})]),
    $add('div', {efy_tabs: 'ms_menu', efy_select: ''}, [

    $add('button', {efy_tab: 'tags', efy_lang: 'launcher_mode', efy_active: ''}),
    $add('button', {efy_tab: 'effects', efy_lang: 'effects'}),
    $add('button', {efy_tab: 'grid', efy_lang: 'grid'}),

    $add('div', {efy_content: 'tags', efy_select: '', id: 'items', efy_active: ''}, [ $add('div', {}, [
        $add('input', {type: 'checkbox', id: 'dc_launcher_on', name: 'dc_launcher_on'}), $add('label', {for: 'dc_launcher_on', efy_lang: 'active'}),
        $add('input', {type: 'checkbox', id: 'dc_unreleased', name: 'dc_unreleased', checked: ''}), $add('label', {for: 'dc_unreleased', efy_lang: 'unreleased'}),

        $add('div', {efy_lang: 'align_items'}),
        $add('input', {type: 'radio', id: 'dc_launcher_align_start', name: 'dc_launcher_align', value: 'start'}), $add('label', {for: 'dc_launcher_align_start', efy_lang: 'left'}),
        $add('input', {type: 'radio', id: 'dc_launcher_align_center', name: 'dc_launcher_align', value: 'center', checked: ''}), $add('label', {for: 'dc_launcher_align_center', efy_lang: 'center'}),
        $add('input', {type: 'radio', id: 'dc_launcher_align_end', name: 'dc_launcher_align', value: 'end'}), $add('label', {for: 'dc_launcher_align_end', efy_lang: 'right'}),

        $add('div', {efy_range_text: 'Max Width', efy_lang: 'max_width'}, [ $add('input', {type: 'range', id: 'dc_launcher_width', min: '500', max: '2000', step: '50', value: '800'}) ])
      ]) ]),
    $add('div', {efy_content: 'effects', efy_select: '', id: 'ms_sidebar_speed', efy_lang: 'coming_soon'}),
    $add('div', {efy_content: 'grid', efy_select: '', id: 'bar_position', efy_lang: 'coming_soon'})
  ])
], $('#efy_sbtheme'), 'beforebegin');

/*Restore Settings*/
if (efy_dc.dash == 'on'){ $('#dc_launcher_on').checked = true; $('[efy_sidebar_btn=absolute]').classList.remove('efy_hide_i'); $('body').setAttribute('dc_dash', 'on')}
if (efy_dc.soon_off == 'on'){ $('#dc_unreleased').checked = false; $('[efy_content="0"] div:last-of-type #dc_buttons').classList.add('soon_off')}
if (efy_dc.dash_width){ let a = efy_dc.dash_width; $('#dc_launcher_width').value = a.replace('rem', ''); $('[dc_dash]').style.setProperty(`--dc_dash_width`, a)}
if (efy_dc.dash_align){ let a = efy_dc.dash_align; $(`#dc_launcher_align_${a}`).checked = true; $('[dc_dash]').style.setProperty(`--dc_dash_align`, a)}

/*Events*/
$event($('#dc_launcher_on'), 'change', (a)=>{ let b = $('[efy_sidebar_btn=absolute]'), c = $('body');
    if (a.target.checked){ b.classList.remove('efy_hide_i'); c.setAttribute('dc_dash', 'on'); efy_dc.dash = 'on'}
    else { b.classList.add('efy_hide_i'); c.setAttribute('dc_dash', 'off'); efy_dc.dash = 'off'}
$dc_save()});

$event($('#dc_unreleased'), 'change', (a)=>{ let b = $('[efy_content="0"] div:last-of-type #dc_buttons');
    if (a.target.checked){ b.classList.remove('soon_off'); efy_dc.soon_off = 'off'} else { b.classList.add('soon_off'); efy_dc.soon_off = 'on'}
$dc_save()});

$event($('#dc_launcher_width'), 'input', (a)=>{ let b = a.target.value + 'rem'; $('[dc_dash]').style.setProperty(`--dc_dash_width`, b); efy_dc.dash_width = b; $dc_save()});

$all('[name=dc_launcher_align]').forEach(a =>{ $event(a, 'click', ()=>{ let b = a.value; $('[dc_dash]').style.setProperty(`--dc_dash_align`, b); efy_dc.dash_align = b; $dc_save()})});

/*Icons*/ $ready('#dc_icons', ()=>{ let a = $('#dc_icons'); 'accessibility arrow audio copy check chevron dots edit fullscreen globe group heart help key menu menu2 notify notify_active paste pause play plus reload remove search star zoom_in zoom_out user'.split(' ').map(b=>{ $add('div', {efy_card: ''}, [ $add('i', {efy_icon: b}), $add('p', {}, [b]) ], a)})}, 1);
}, 1);