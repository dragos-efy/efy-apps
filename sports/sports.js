const poses = [
    ['Seated Forward Bend', 30, 'seated_forward_bend'],
    ['Upward Forward Fold, Hands On Shins', 50, 'upward_forward_fold_hands_on_shins'],
    // Testing
    ['Seated Forward Bend', 30, 'seated_forward_bend'],
    ['Upward Forward Fold, Hands On Shins', 50, 'upward_forward_fold_hands_on_shins'],
    ['Seated Forward Bend', 3, 'seated_forward_bend'],
    ['Upward Forward Fold, Hands On Shins', 5, 'upward_forward_fold_hands_on_shins']
];

let currentIndex = 0, intervalId;

$ready('#efy_sbtheme', ()=>{

$add('div', {id: 'sports_app'}, [
    ['div', {class: 'container'}, [
        ['div', {id: 'active_pose'}, [
            ['div', {class: 'icon_container'}, [
                ['div', {efy_pose: ''}]
            ]],
            ['div', {class: 'name'}, 'Select a pose to start...']
        ]],
        ['div', {class: 'poses_container'}, [
            ['div', {id: 'controls'}, [
                ['div', {class: 'efy_flex'}, [
                    ['div', {id: 'secondsLeft', efy_card: '', class: 'efy_square_btn'}, '0'],
                    ['div', {id: 'totalSecondsLeft', efy_card: '', class: 'efy_square_btn'}, '0'],
                ]],
                ['div', {class: 'efy_flex'}, [
                    ['button', {id: 'startPause', class: 'efy_square_btn', title: 'Play or Pause'}, [['i', {efy_icon: 'play'}]]],
                    ['button', {id: 'reset', class: 'efy_square_btn', title: 'Reset'}, [['i', {efy_icon: 'reload'}]]],
                    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]],
                ]]
            ]],
            ['progress', {value: 0, step: 1, min: 0, max: 100, class: 'efy_hide_i'}],
            ['div', {class: 'poses'}]
        ]]
    ]]
]);

poses.map((pose,i)=>{
   $add('div', {pose: i, efy_card: ''}, [
        ['div', {class: 'icon_container'}, [['div', {efy_pose: pose[2]}]]],
        ['p', {class: 'name'}, `${i+1}. ${pose[0]}`],
        ['p', {class: 'time'}, `${pose[1]}s`]
    ], $('.poses'));
});

function updateUI() {
    const active_pose = poses[currentIndex], efy_pose = $('#active_pose [efy_pose]');
    efy_pose.setAttribute('efy_pose', active_pose[2]);
    $('#active_pose .name').textContent = active_pose[0];

    /*Animation*/ efy_pose.classList.add('efy_anim_in_out');
    $wait((efy.anim_speed || 1) * 0.2, ()=> efy_pose.classList.remove('efy_anim_in_out'));

    let [left, left2, total] = [0,0,0]; const progress = $('.poses_container progress'), pose_div = $(`[pose="${currentIndex}"]`);
    for (i = currentIndex; i <= poses.length - 1; i++){ left += poses[i][1]; left2 += poses[currentIndex][1]}
    for (i = 0; i <= poses.length; i++){ total += poses[currentIndex][1]}
    total = 100 - (left2 / total * 100);

    $('#totalSecondsLeft').textContent = `Total: ${left}`;
    $('#secondsLeft').textContent = 'Pause';
    progress.value = total;
    if (total !== 0) progress.classList.remove('efy_hide_i');

    $all('[pose]').forEach(a => a.classList.remove('active'));
    pose_div.classList.add('active');

    /*Scroll*/ const number = (efy.gap ? Number(efy.gap.replace('rem', '')) * -1 : -15) * 0.67;
    pose_div.scrollIntoView(); $('.poses').scrollBy({top: number === -0 ? 0 : number});
}

$event(document, 'click', ()=>{ x = event.target;
   if (x.matches('[pose]')){
        currentIndex = Number(x.getAttribute('pose'));
        updateUI();
        $all('[pose]').forEach(a => a.classList.remove('active'));
        x.classList.add('active');
        $('#secondsLeft').textContent = `Left: ${poses[currentIndex][1]}`;
    }
    else if (x.matches('#reset')){
        clearInterval(intervalId); currentIndex = 0; updateUI();
    }
    else if (x.matches('#startPause')){
        if (!intervalId) {
            intervalId = setInterval(() => {
                let secondsLeft = poses[currentIndex][1]; console.log(secondsLeft);
                const decrementInterval = setInterval(() => {
                    secondsLeft--;
                    $('#secondsLeft').textContent = `Left: ${secondsLeft}s`;
                    if (secondsLeft <= 0) {
                        clearInterval(decrementInterval);
                        currentIndex++;
                        if (currentIndex >= poses.length) {
                            clearInterval(intervalId);
                            currentIndex = 0; // Reset
                        }
                        updateUI();
                    }
                }, 1000); // Update every 1 second
            }, 5000); // Switch every 5 seconds
        } else {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});

});