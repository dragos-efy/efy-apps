$ready('#efy_sbtheme', ()=>{

$add('div', {class: 'nav'}, [
    ['div', {class: 'search_container'}, [
        ['div', {class: 'search_box'}, [
            ['input', {type: 'text', id: 'search_input', placeholder: 'Enter City', autofocus: ''}],
            ['button', {id: 'search_btn', class: 'efy_square_btn', type: 'submit', title: 'search'}, [['i', {efy_icon: 'search'}]]]
        ]]
    ]],
    ['button', {class: 'efy_square_btn', efy_sidebar_btn: '', title: 'menu'}, [['i', {efy_icon: 'menu'}]]]
]);
$add('div', {class: 'glance efy_hide_i'}, [
    ['div', {efy_card: ''}, [
        ['div', [ ['i', {efy_icon: 'globe'}], ['p', {class: 'city', id: 'city'}] ]],
        ['hr'],
        ['div', [ ['i', {efy_icon: 'arrow'}], ['p', 'Now:'], ['p', {class: 'temp_now'}] ]],
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
$add('div', {class: 'graph efy_hide_i'});

let metric = true, flag = 0; const apikey = atob('OTIxNTgyYzhkMDZhOGIyMzY4YzdmOGNiYTJmMTEyNDI=');
const graph = $('.graph'), search = $('#search_input'), search_btn = $('#search_btn'),
city = $('#city'), imagedes = $('.img_des'), temp_now = $('.temp_now'), feels_like = $('#feels_like'),
humidity = $('#humidity'), pressure = $('#pressure'), wind_speed = $('#wind_speed'), sun = $('#sun'),
moon = $('#moon'), days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');

const send_wether_request =()=>{
    if (search.value != ''){ flag = 1; api_call(search.value)}
    else { $notify('short', 'Write something', '')}
};

$event(search_btn, 'click', send_wether_request);
$event(search, 'keydown', (event)=>{ if (event.key === 'Enter') send_wether_request()});

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
    let dt = data.list.dt, day_container;

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
            day_container = $add('div', {class: 'day_container'}, [
                ['p', time_convert(dt, timezone, 'day')]
            ], graph);
        }
        $add('div', {class: 'bar'}, [
            ['div', {class: 'level', style: `height: calc(${a}% - 154.6rem)`}],
            ['div', {efy_card: ''}, [
                ['div', {class: 'time'}, hour],
                ['i', {efy_icon: vibe_icon(day)}],
                ['div', {class: 'temp'}, temp[i] + degrees]
            ]]
        ], day_container);
    });
    $all('.glance, .graph').forEach(a => a.classList.remove('efy_hide_i'));
};

},1);