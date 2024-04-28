$ready('#efy_sbtheme', ()=>{

    // Menu Entry for Metric / Feet, Celsius / Farenheit
    // $add()

let metric = true, flag = 0; const apikey = atob('OTIxNTgyYzhkMDZhOGIyMzY4YzdmOGNiYTJmMTEyNDI='),
graph = $('.graph'), search = $('#search_input'), search_btn = $('#search_btn'),
city = $('#city'), imagedes = $('.img_des'), daynighttemp = $('.day_night_temp'),
humidity = $('#humidity'), pressure = $('#pressure'), wind_speed = $('#wind_speed'),
days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
sun = $('#sun'), moon = $('#moon');

/*Get Current location*/
// const geolocation =()=>{
//     if (navigator.geolocation) navigator.geolocation.getCurrentPosition(geolocation_success);
// },
// geolocation_success =(position)=>{
//     let {latitude, longitude} = position.coords;
//     api_call(latitude, longitude);
// };

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
    imagedes.innerHTML = ''; daynighttemp.innerHTML = '';
    graph.innerHTML = '';

    city.innerHTML = `${data.city.name}, ${data.city.country}`;

    let dt = data.list.dt;

    /*Today*/
    const { id, description } = data.list[0].weather[0],
    timezone = data.city.timezone;
    $add('i', {efy_icon: vibe_icon(data.list[0])}, [], imagedes);
    $add('div', {class: 'des'}, description, imagedes);

    humidity.innerHTML = data.list[0].main.humidity + '%';
    pressure.innerHTML = data.list[0].main.pressure + '	hPa';
    wind_speed.innerHTML = `${data.list[0].wind.speed} ${metric ? 'meter/sec' : 'miles/hour'}`;

    sun.innerHTML = time_convert(data.city.sunrise, timezone);
    moon.innerHTML = time_convert(data.city.sunset, timezone);

    /*Update Hours & Days*/

    const temp = []; const normalize =(arr)=>{
        let min = Math.min(...arr), max = Math.max(...arr), range = max - min;
        return arr.map(value => ((value - min) / range) * 60 + 40);
    };

    data.list.forEach((day, i)=> temp.push(day.main.temp));
    const normalized = normalize(temp);

    normalized.forEach((a,i)=>{ const day = data.list[i], dt = day.dt;
        $add('div', {class: 'bar'}, [
            ['div', {class: 'level', style: `height: calc(${a}% - 154.6rem)`}],
            ['div', {efy_card: ''}, [
                ['div', {class: 'time'}, time_convert(dt, timezone)],
                ['div', {class: 'day'}, time_convert(dt, timezone, 'day')],
                ['i', {efy_icon: vibe_icon(day)}],
                ['div', {class: 'temp'}, `${temp[i]}${metric ? '°C' : '°F'}`]
            ]]
        ], graph);
    });
    $all('.glance, .graph').forEach(a => a.classList.remove('efy_hide_i'));
};

},1);