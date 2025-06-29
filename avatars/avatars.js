/*Storage*/ let efy_sp = {}, $sp_save =()=>{};
try {
    if (localStorage.efy_sp){ efy_sp = JSON.parse(localStorage.efy_sp)}
    $sp_save =()=>{ localStorage.efy_sp = JSON.stringify(efy_sp)}
} catch {}


$ready('#efy_sbtheme', ()=>{

let human_colors = (efy_sp.human_colors) ? String(efy_sp.human_colors) :
'skin 0.7 0 0 1,hair 0.5 0 178 1,eye 1 0 68 0,eye2 0 0 0 1,mouth 0 0 0 1,shirt 0.8 0.3 0 1,underwear 1 0.37 95 1,skirt 0.7 0.3 180 1,pants 0.63 0.26 29 1,glasses 0.63 0.26 29 1';

const set_human_colors =(colors = human_colors)=>{
    colors.replaceAll(', ', ',').split(',').map((a, i)=>{ a = a.split(' ');
        let tag = [a[0], `${a[1]} ${a[2]} ${a[3]}`, a[4]];
        $root.style.setProperty(`---${tag[0]}_bg`, `${tag[1]} / ${tag[2]}`);
        $root.style.setProperty(`---${tag[0]}_bg_alpha`, `${tag[1]} / ${(tag[2] / 3).toFixed(2)}`);
    });
}; set_human_colors();

$add('details', {id: 'av_settings', class: 'av_settings'}, [
    ['summary', [
        ['i', {efy_icon: 'star'}],
        ['p', 'Avatars'],
        ['mark', {efy_lang: 'alpha'}]
    ]],
    ['div', {efy_tabs: 'pn_menu', efy_select: ''}, [
        ['div', {class: 'efy_tabs'}, [
            ['input', {type:'radio', id: 'pn_tab_colors', efy_tab: 'colors', efy_active: ''}],
            ['label', {for: 'pn_tab_colors', efy_lang: 'colors'}],
            ['input', {type:'radio', id: 'pn_tab_backup', efy_tab: 'backup'}],
            ['label', {for: 'pn_tab_backup', efy_lang: 'backup'}]
        ]],
        ['div', {efy_content: 'colors', efy_select: '', id: 'pn_theme', efy_active: ''}, [
            ['div', {efy_color: human_colors}]
        ]],
        ['div', {efy_content: 'backup', efy_select: '', id: 'pn_backup'}, [
            ['a', {role: 'button', class: 'pn_localstorage_export', efy_lang: 'save'}, [['i', {efy_icon: 'arrow_down'}]]],
            ['label', {efy_upload: 'pn_localstorage_import, .json'}],
            ['button', {class: 'pn_localstorage_reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]],
        ]]
    ]]
], $('#efy_sbtheme'), 'beforebegin');

$event($('#pn_theme'), 'input', ()=>{
    let final = [], names = [], content = [];
    $all('#pn_theme [efy_content]').forEach(tag =>{
        let values = [];
        $$all(tag, '[type=range]').forEach(val =>{
            values.push(val.value);
        });
        content.push(`${values[2]} ${values[1]} ${values[0]} ${values[3]}`);
    });
    $all('#pn_theme [efy_tab] + label').forEach((tag, i) =>{
        final.push(`${tag.textContent} ${content[i]}`);
    });
    efy_sp.human_colors = String(final);
    $sp_save();
    set_human_colors(efy_sp.human_colors);
});

['', 'img'].map(x =>{
  $add('div', {class: `container efy-glass efy_trans_filter ${x}`}, [
    ['div', {class: 'human girl'}, [
      ['div', {class: 'head'}, [
        ['div', {efy_pose: 'hair_long0'}],
        ['div', {class: 'eye1'}], ['div', {class: 'eye2'}],
        ['div', {class: 'mouth'}]
      ]],
      ['div', {class: 'neck'}],
      ['div', {class: 'body'}, [
        ['div', {class: 'arm_left'}, [
          ['div', {class: 'shirt_left'}],
          ['div', {class: 'arm_left2'}, [
            ['div', {class: 'arm_left3'}]
          ]]
        ]],
        ['div', {class: 'arm_right'}, [
          ['div', {class: 'shirt_right'}],
          ['div', {class: 'arm_right2'}, [
            ['div', {class: 'arm_right3'}]
          ]]
        ]],
        ['div', {class: 'leg_left'}, [['div', {class: 'leg_left2'}]]],
        ['div', {class: 'leg_right'}, [['div', {class: 'leg_right2'}]]],

        ['div', {class: 'boob_left'}],
        ['div', {class: 'boob_right'}],
        ['div', {class: 'shirt_chest'}],
        ['div', {class: 'shirt_neck'}],
        ['div', {class: 'underwear'}],
        ['div', {class: 'skirt'}],
      ]],
      ['div', {class: 'support'}]
    ]]
  ]);
});

const controls_container = $add('div', {class: 'efy_flex', style: 'place-content: center'}, [
  ['div', {class: 'warning efy_trans_filter', efy_card: ''}, [
    ['p', 'Avatars is in Pre-Alpha. Expect LOTS of bugs!']
  ]]
]);

const controls = $add('div', {class: 'controls efy_trans_filter', efy_select: '', efy_card: ''}, [], controls_container);

['default', 'mountain', 'side_stretch', 'side_stretch_flex', 'star', 'triangle', 'half_moon', /*'pose2'*/].map(pose =>{
  $add('input', {type: 'radio', id: `ppt_${pose}`, name: 'ppt_pose'}, [], controls)
  $add('label', {for: `ppt_${pose}`}, pose, controls);
});

$add('label', {efy_sidebar_btn: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']], controls);

$('#ppt_default').checked = true;

$event(document, 'input', ()=>{ const x = event.target;
  // if (x.matches('[name=ppt_pose]')) $('.human').setAttribute('pose', x.id.replace('ppt_', ''));
  if (x.matches('[name=ppt_pose]')){
    $all('.human').forEach(a =>{ a.setAttribute('pose', x.id.replace('ppt_', '')) })
  }
})

}, 1);