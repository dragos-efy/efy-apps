$ready('#efy_sbtheme', ()=>{ let directoryHandle;

let files_map = [], nr = 0, current_audio;

async function playAudio(fileHandle) {
    const file = await fileHandle.getFile();
    const audioUrl = URL.createObjectURL(file);
    try { current_audio.pause()} catch {}
    current_audio = new Audio(audioUrl);
    current_audio.play().catch(error =>{ $notify('short', 'Error playing audio:', error)});
}

$event(document, 'click', ()=>{ const x = event.target;
    if (x.matches('[file_type=audio]')){
        playAudio(files_map[Number(x.getAttribute('file_nr'))]);
    }
});

$add('div', {efy_select: ''}, [
    ['button', {id: 'folder_picker'}, 'Folder'],
    ['button', {id: 'create'}, 'Create'],
    ['input', {type: 'checkbox', id: 'renameMode'}],
    ['label', {for: 'renameMode'}, 'Rename'],
    ['input', {type: 'checkbox', id: 'deleteMode'}],
    ['label', {for: 'deleteMode'}, 'Delete'],
    ['select', {value: 'file', id: 'createType'}, [
        ['option', {value: 'file'}, 'File'],
        ['option', {value: 'folder'}, 'Folder']
    ]],
    ['input', {type: 'text', id: 'fileName', placeholder: 'File Name'}],
    ['textarea', {id: 'fileContent', placeholder: 'File Content'}]
]);
$add('div', {id: 'fileList'}, [ ['ul'] ]);

$event($('#folder_picker'), 'click', async () => {
    directoryHandle = await window.showDirectoryPicker(), fileList = $('#fileList ul');
    $notify('short', 'loading');
    for await (const entry of directoryHandle.values()){
        let icon = 'circle', type = '';
        if (entry.kind === 'file'){
            if (entry.name.includes('.mp3')){ icon = 'audio'; type = 'audio'}
            else if (entry.name.includes('.svg')){ icon = 'star'}
        } else { icon = 'dots'}
        $add('li', {efy_card: '', file_type: type, file_nr: nr}, [
            ['i', {efy_icon: icon}], ['p', entry.name]
        ], fileList);
        files_map.push(entry); nr++;
    }
    $notify('short', 'Done!');
});

$event($('#create'), 'click', async () => { const type = $('#createType').value;
    const name = $('#fileName').value;
    if (type === 'file'){ const content = $('#fileContent').value;
        const file = await directoryHandle.getFileHandle(name, { create: true });
        const writable = await file.createWritable();
        await writable.write(content); await writable.close();
    } else if (type === 'folder'){
        await directoryHandle.getDirectoryHandle(name, { create: true });
    }
    $add('li', {efy_card: ''}, name, fileList);
});

$event($('#renameMode'), 'change', async () => {
    if ($('#renameMode').checked) {
        fileList.addEventListener('click', async (event) => { const target = event.target;
            if (target.tagName === 'LI'){ const newName = prompt('Enter new name:');
                if (newName) {
                    const oldFile = await directoryHandle.getFileHandle(target.textContent, { create: false });
                    const file = await oldFile.getFile();
                    const contents = await file.arrayBuffer();
                    const newFile = await directoryHandle.getFileHandle(newName, { create: true });
                    const writable = await newFile.createWritable();
                    await writable.write(contents); await writable.close();
                    await oldFile.remove();
                    /*Update file list*/ target.textContent = newName;
                }
            }
        });
    } else { fileList.removeEventListener('click')}
});

$event($('#deleteMode'), 'change', async () => {
    if ($('#deleteMode').checked) {
        fileList.addEventListener('click', async (event)=>{ const target = event.target;
            if (target.tagName === 'LI'){
                if (confirm('Are you sure you want to delete this item?')){
                    await directoryHandle.removeEntry(target.textContent);
                    target.remove();
                }
            }
        });
    } else { fileList.removeEventListener('click')}
});

}, 1);