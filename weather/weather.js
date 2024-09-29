/*Storage*/ let  efy_wt = {}, $wt_save =()=>{};
try {
    if (localStorage.efy_wt){ efy_wt = JSON.parse(localStorage.efy_wt)}
    else { efy_wt = {locations: ['Amsterdam', 'Berlin', 'London', 'Tokyo']}}
    $wt_save =()=>{ localStorage.efy_wt = JSON.stringify(efy_wt)}
} catch {}

$ready('#efy_sbtheme', ()=>{

let locations = [];

efy_wt.locations.map(name =>{
    locations.push(
        ['input', {id: name, type: 'radio', name: 'wt_suggestions'}],
        ['label', {for: name, class: 'efy_shadow_trans'}, name]
    );
});

$add('div', {class: 'nav'}, [
    ['div', {class: 'search_container'}, [
        ['div', {class: 'search_box'}, [
            ['input', {type: 'text', id: 'search_input', placeholder: 'Enter City', autofocus: ''}],
            ['button', {id: 'search_btn', class: 'efy_square_btn', type: 'submit', title: 'search'}, [['i', {efy_icon: 'search'}]]],
            ['button', {id: 'search_suggestions', class: 'efy_square_btn', title: 'Suggestions', efy_toggle: '.wt_suggestions'}, [['i', {efy_icon: 'location'}]]]
        ]]
    ]],
    ['button', {class: 'efy_square_btn', efy_sidebar_btn: '', title: 'menu'}, [['i', {efy_icon: 'menu'}]]],
    ['div', {class: `wt_suggestions${efy_wt.suggestions_start ? ' efy_hide_i' : ''}`, efy_select: '', efy_card: ''}, [
        ['div', {class: 'options'}, [
            ['h5', 'Locations'],
            ['div', {class: 'efy_flex'}, [
                ['button', {id: 'add_location', class: 'efy_hide_i'}, [['i', {efy_icon: 'plus'}], ['p', 'Save']]],
                ['input', {id: 'remove_locations', type: 'checkbox'}],
                ['label', {for: 'remove_locations'}, [['i', {efy_icon: 'remove'}], ['p', 'Remove']]]
            ]]
        ]],
        ['div', {class: 'locations'}, locations]
    ]]
]);
$add('div', {class: 'glance efy_hide_i'}, [
    ['div', {efy_card: ''}, [
        ['div', [ ['i', {efy_icon: 'location'}], ['p', {class: 'city', id: 'city'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'arrow'}], ['p', 'Temperature:'], ['p', {class: 'temp_now'}] ]],
        ['hr'],
        ['div', {class: 'img_des'}]
    ]],
    ['div', {efy_card: ''}, [
        ['div', [ ['i', {efy_icon: 'rain'}], ['p', 'Humidity:'], ['div', {id: 'humidity'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'arrow_up'}], ['p', 'Pressure:'], ['div', {id: 'pressure'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'cloud'}], ['p', 'Wind Speed:'], ['div', {id: 'wind_speed'}] ]],
    ]],
    ['div', {efy_card: ''}, [
        ['div', [ ['i', {efy_icon: 'sun'}], ['p', 'Sunrise:'], ['p', {id: 'sun'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'moon'}], ['p', 'Sunset:'], ['p', {id: 'moon'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'group'}], ['p', 'Feels Like:'], ['p', {id: 'feels_like'}] ]]
    ]]
]);
$add('div', {class: 'graph gamepad_scroll efy_hide_i'});

let metric = true, flag = 0; const apikey = atob('OTIxNTgyYzhkMDZhOGIyMzY4YzdmOGNiYTJmMTEyNDI=');
const graph = $('.graph'), search = $('#search_input'), search_btn = $('#search_btn'),
city = $('#city'), imagedes = $('.img_des'), temp_now = $('.temp_now'), feels_like = $('#feels_like'),
humidity = $('#humidity'), pressure = $('#pressure'), wind_speed = $('#wind_speed'), sun = $('#sun'),
moon = $('#moon'), suggestions = $('.wt_suggestions'),
days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');

const send_weather_request =()=>{
    if (search.value != ''){ flag = 1; api_call(search.value)}
    else { $notify('short', 'Write something', '')}
},
empty_add_location =()=>{
    (search.value === '') ? $('#add_location').classList.add('efy_hide_i') : $('#add_location').classList.remove('efy_hide_i');
};

$event(suggestions, 'input', (event)=>{ const target = event.target;
    if (target.matches('#remove_locations')){
        $('.locations').classList.toggle('remove')
    }
    else if (target.matches('.locations.remove input')){
        const id = target.getAttribute('id');
        efy_wt.locations = efy_wt.locations.filter(x => x !== id);
        $(`.locations #${id} + label`).remove(); target.remove(); $wt_save();
    }
    else if (target.matches('.locations input')){
        try { search.value = $('[name=wt_suggestions]:checked + label').textContent} catch {}
        $('.wt_suggestions').classList.add('efy_hide_i');
        $wait(.1, send_weather_request);
    }
});
$event(suggestions, 'keydown', (event)=>{ const key = event.key;
    if ((key === 'Enter') || (key === ' ')) send_weather_request();
});
$event(suggestions, 'click', (event)=>{ const target = event.target;
    if (target.matches('#add_location') && search.value !== ''){
        const name = search.value, locations = $('.locations');
        efy_wt.locations.push(search.value); $wt_save();
        $add('input', {id: name, type: 'radio', name: 'wt_suggestions'}, [], locations);
        $add('label', {for: name, class: 'efy_shadow_trans'}, name, locations);
    }
});
$event(search_btn, 'click', send_weather_request);
$event(search, 'keydown', (event)=>{
    empty_add_location();
    if (event.key === 'Enter') send_weather_request();
});
$event(search, 'keyup', empty_add_location);

const api_call =(city)=>{
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric ? 'metric' : 'imperial'}&appid=${apikey}`;
    try { fetch(api).then(res => res.json()).then(data => details(data))}
    catch { $notify('short', 'No such city', '')}
},

vibe_icon =(a)=>{ const vibe = a.weather[0].main;
    return ['Clouds', 'Rain', 'Snow'].includes(vibe) ? vibe.replace('Clouds', 'cloud').toLowerCase() : 'sun';
},

time_convert = (unix, timezone = 0, format)=>{
    const date = new Date((unix - timezone) * 1000);
    if (format === 'day'){ return days[date.getDay()]}
    else {
        const hours = date.getHours(), minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}},

/*Fill Weather Details*/ details =(data)=>{ console.log(data);
    /*Empty Before Updating Content*/ imagedes.innerHTML = ''; graph.innerHTML = '';
    const degrees = '°' + (metric ? 'C' : 'F');
    let dt = data.list.dt, day_container, day_nr = 0;

    /*Today*/

    const { id, description } = data.list[0].weather[0],
    timezone = data.city.timezone;
    $add('i', {efy_icon: vibe_icon(data.list[0])}, [], imagedes);
    $add('div', {class: 'des'}, description, imagedes);

    city.textContent = `${data.city.name}, ${data.city.country}`;
    temp_now.textContent = data.list[0].main.temp + degrees;
    humidity.textContent = data.list[0].main.humidity + '%';
    pressure.textContent = data.list[0].main.pressure + '	hPa';
    wind_speed.textContent = `${data.list[0].wind.speed} ${metric ? 'meter/sec' : 'miles/hour'}`;
    sun.textContent = time_convert(data.city.sunrise, timezone);
    moon.textContent = time_convert(data.city.sunset, timezone);
    feels_like.textContent = data.list[0].main.feels_like + degrees;

    /*Update Hours & Days*/

    const temp = []; const normalize =(arr)=>{
        let min = Math.min(...arr), max = Math.max(...arr), range = max - min;
        return arr.map(value => ((value - min) / range) * 60 + 40);
    };

    data.list.forEach((day, i)=> temp.push(day.main.temp));
    const normalized = normalize(temp);

    normalized.forEach((a,i)=>{
        const day = data.list[i], dt = day.dt, hour = time_convert(dt, timezone);
        if ((i === 0) || (hour === '00:00') || (hour === '01:00') || (hour === '02:00')){
            day_container = $add('div', {class: 'day_container efy_trans_filter efy_shadow_trans'}, [
                ['p', time_convert(dt, timezone, 'day')]
            ], graph); day_nr++;
        }
        const id = `bar_${i}`;
        $add('input', {id: id, type: 'radio', name: `bars_${day_nr}`}, [], day_container);
        $add('label', {for: id, class: 'bar'}, [
            ['div', {class: 'level efy_shadow_button', style: `height: calc(${a}% - 154.6rem)`}],
            ['div', {efy_card: ''}, [
                ['div', {class: 'time'}, hour],
                ['i', {efy_icon: vibe_icon(day)}],
                ['div', {class: 'temp'}, temp[i] + degrees]
            ]]
        ], day_container);
    });
    $all('.glance, .graph').forEach(a => a.classList.remove('efy_hide_i'));

    const update_bar =(event)=>{
        const target = event.target;
        if (target.matches('.day_container [type=radio]')){
            const nr = Number(target.getAttribute('id').replace('bar_', ''));
            temp_now.textContent = data.list[nr].main.temp + degrees;
            humidity.textContent = data.list[nr].main.humidity + '%';
            pressure.textContent = data.list[nr].main.pressure + '	hPa';
            wind_speed.textContent = `${data.list[nr].wind.speed} ${metric ? 'meter/sec' : 'miles/hour'}`;
            feels_like.textContent = data.list[nr].main.feels_like + degrees;
            $$(imagedes, '.des').textContent = data.list[nr].weather[0].description;
            $$(imagedes, 'i').setAttribute('efy_icon', vibe_icon(data.list[nr]));
        }
    };
    $event($body, 'click', ()=> update_bar(event));

};

},1);