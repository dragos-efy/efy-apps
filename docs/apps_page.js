const apps_keys = Object.keys(apps_list),
banner = $add('div', {class: 'current_app efy_hide_i', efy_searchable: '', efy_card: ''}, [], $('div[efy_content=apps]'));

$banner_card =(title, href, icon, description, tags, compatible, uncompatible)=>{
    let link_attributes = {class: 'start', role: 'button', efy_lang: 'start'}, copy_url = null;

    if (href !== ''){
        link_attributes.href = href;
        copy_url = $add('button', {class: 'copy_url efy_color_trans'}, [['i', {efy_icon: 'copy'}], ['p', {efy_lang: 'copy'}]], banner);
    }

    banner.innerHTML = '';

    $add('div', {class: 's1'}, [
        ['i', {class: 'logo', efy_icon: icon}],
        ['div', {class: 'actions'}, [
            ['div', {class: 'info'}, [
                ['div', {class: 'title_container'}, [
                    ['p', {class: 'title'}, title]
                ]],
                ['div', {class: 'description'}, description],
            ]]
        ]]
    ], banner);

    $add('div', {class: 'buttons'}, [
        ['a', link_attributes, [['i', {efy_icon: 'play'}]]],
        copy_url,
        ['button', {class: 'hide_current_app efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'chevron'}]]]
    ], banner);

    const tags_container = $add('div', {class: 'tags'}, [], banner);

    if (efy.distortion){
        $add('div', {class: 'efy-card-back'}, null, banner)
    }

    if (tags){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'Tags:'],
            ...tags.split(' ').map(tag => ['p', {tag: ''}, tag])
        ], tags_container);
    }
    if (compatible){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'Support:'],
            ...compatible.split(' ').map(tag => ['p', {tag: (tag === 'stable' || tag === 'beta' || tag === 'alpha' || tag === 'soon') ? 'color' : ''}, tag])
        ], tags_container);
    }
    if (uncompatible){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'No Support:'],
            ...uncompatible.split(' ').map(tag => ['p', {tag: ''}, tag])
        ], tags_container);
    }
};

const app_previews = $add('div', {id: 'dc_buttons', class: 'apps_page efy_asset_off', efy_searchable: ''}, [], $('div[efy_content=apps]'));

const $app_card =(i, title, href, icon, description, tags)=>{
    const id = `dc_app_${i}`;
    $add('input', {type: 'radio', app: i, id: id, name: 'dc_apps'}, [], app_previews);
    $add('label', {for: id, role: 'button', efy_card: '', efy_searchable: title.replaceAll(' ', '_')}, [
        ['div', {class: 'top'}, [
            ['i', {efy_icon: icon}],
            ['div', {class: 'column_flex'}, [
                ['p', title]
            ]]
        ]]
    ], app_previews);
};

for (let i = 0; i < apps_keys.length; i++){
    $app_card(i, apps_keys[i], ...Object.values(apps_list)[i]);
};

$event($('div[efy_content=apps]'), 'click', ()=>{
    const x = event.target,
    reset_active =()=> $all('div[efy_content=apps] [app].active').forEach(a => a.classList.remove('active'));
    if (x.matches('#dc_buttons [app]')){
        if (x.classList.contains('active')){
            banner.classList.add('efy_hide_i');
            reset_active();
        }
        else {
            reset_active(); x.classList.add('active');
            const id = x.getAttribute('app');
            $banner_card(apps_keys[id], ...Object.values(apps_list)[id]);
            banner.classList.remove('efy_hide_i');
            console.log(x);
            const gap = efy.gap ? Number(efy.gap.replace('rem', '')) : 15;
            $('.apps_page').scrollTo({top: $(`label[for="dc_app_${id}"]`).offsetTop - gap, behavior: 'smooth'});
        }
    }
    else if (x.matches('.current_app .copy_url')){
        const text = $('.current_app .start').href;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
    }
    else if (x.matches('.hide_current_app')){
        banner.classList.add('efy_hide_i'); reset_active();
    }
});