const gkHost = $add('div', {class: 'gk-host'}, [], $body);
const textarea = $add('textarea', {class: 'textarea'}, [], $body);

const buttonData = [
    ['o', 't', 'a', 'e'],
    ['c', 'r', 'd', 'l'],
    ['n', 's', 'h', 'i'],
    ['g', 'y', 'p', 'b'],
    ['f', 'u', 'w', 'm'],
    ['v', 'k', 'j', 'x'],
    ['q', 'z', '.', ','],
    ["'", '-', ':', '"']
],
top_buttons = [
    ['Numbers', 'BackSpace'],
    ['Shift', 'Space']
],
directions = 'up right_up right right_down down left_down left left_up'.split(' '),
directions2 = ['up', 'right', 'left', 'down'];

// . , ' ) - :  " ?  / ( + ! & %

buttonData.forEach((group, i) => {
    const wing = $add('div', {class: 'gk-wing'}, [], gkHost);
    const sector0 = $add('div', {class: 'gk-sector'}, [
        ['div', {character_group: `${directions[i]}`, class: 'efy_card_filter'}]
    ], wing);

    const sector = $(`[character_group=${directions[i]}]`);

    group.forEach((char, j) => {
        const index = i * 4 + j;
        $add('div', {class: `gk-button ${directions2[j]}`}, [
            ['span', char]
        ], sector);
    });
});

// top_buttons.forEach((group, i) => {
//     group.forEach(x =>{
//
//     });
// });

$add('div', {class: 'help-text efy_card_filter'}, [
    ['div', [['code', 'Left Stick'], ['p', '- Select Group']]],
    ['div', [['code', 'Right Stick'], ['p', '- Select Character']]]
], gkHost);


////////////////

/*Temporary Fix*/ try { if (gamepad_maps){}} catch { gamepad_maps = {ok: ['', ''], yes: ['', ''], no: ['', '']} }

let stick_L = false, stick_R = false;

restore_gamepad_maps =()=>{
    gamepad_maps.functions = 'shade';
    gamepad_maps.speed_buttons = 0.2;
    gamepad_maps.speed_stick_l = 0.01;
    gamepad_maps.speed_stick_r = 0.2;
    gamepad_maps.global_before =()=>{
        stick_L = false; stick_R = false;
    };
    gamepad_maps.global_after =()=>{
        console.log(stick_L, stick_R);

        if (stick_L){
            $all('[character_group], .gk-button').forEach(x => x.classList.remove('active'));
            $(`[character_group=${stick_L}]`).classList.add('active');
        }
        if (stick_R){
            $all('.gk-button').forEach(x => x.classList.remove('active'));
            let key = $(`[character_group].active .gk-button.${stick_R}`)
            key.classList.add('active');
            textarea.value += key.textContent;
        }
    };
    gamepad_maps.ok[2] =()=>{};
    gamepad_maps.l1[2] =()=>{ textarea.value = textarea.value.slice(0, -1)};
    gamepad_maps.r1[2] =()=>{ textarea.value += ' '};

    gamepad_maps.l_left_down =()=>{ stick_L = 'left_down'};
    gamepad_maps.l_left_up =()=>{ stick_L = 'left_up'};
    gamepad_maps.l_right_down =()=>{ stick_L = 'right_down'};
    gamepad_maps.l_right_up =()=>{ stick_L = 'right_up'};

    gamepad_maps.l_down =()=>{ stick_L = 'down'};
    gamepad_maps.l_left =()=>{ stick_L = 'left'};
    gamepad_maps.l_right =()=>{ stick_L = 'right'};
    gamepad_maps.l_up =()=>{ stick_L = 'up'};

    gamepad_maps.r_down =()=>{ stick_R = 'down'};
    gamepad_maps.r_left =()=>{ stick_R = 'left'};
    gamepad_maps.r_right =()=>{ stick_R = 'right'};
    gamepad_maps.r_up =()=>{ stick_R = 'up'};

    gamepad_maps.yes[2] =()=>{};
}; restore_gamepad_maps();