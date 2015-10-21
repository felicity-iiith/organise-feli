var mdText = '',
    origFile,
    file_md_edit,
    file_md, file_name_edit,
    file_slug_edit,
    dummyText,
    ignore_change;
function setHeight(fieldId){
    dummyText.value = file_md_edit.value;

    file_md_edit.style.height = (dummyText.scrollHeight + 20) + 'px';
}
function updateMD () {
    // Update ignore changes button
    if (origFile.name != escapeHtml(file_name_edit.value) ||
        origFile.slug != escapeHtml(file_slug_edit.value) ||
        origFile.data != escapeHtml(file_md_edit.value)
    ) {
        ignore_change.innerHTML = "(Discard changes)";
    } else {
        ignore_change.innerHTML = "";
    }
    // Set height of textarea
    setHeight();
    // Convert markdown
    if (mdText == file_md_edit.value) return;
    mdText = file_md_edit.value;
    mdText = magicWords.process(mdText);
    file_md.innerHTML = marked(mdText);
}
function setupEdit() {
    file_md_edit = document.getElementById('file_md_edit');
    file_md = document.getElementById('file_md');
    file_name_edit = document.getElementById('editname');
    file_slug_edit = document.getElementById('editslug');
    dummyText = document.getElementById('dummyTextarea');
    ignore_change = document.getElementById('ignore_change');
    origFile = {
        name: document.getElementById('orig_file_name').innerHTML,
        slug: document.getElementById('orig_file_slug').innerHTML,
        data: document.getElementById('orig_file_data').innerHTML,
    };
    file_md_edit.addEventListener('keypress', setHeight);
    file_md_edit.addEventListener('keyup', setHeight);

    updateMD();
    window.setInterval(updateMD, 1000);

    if (!window.location.hash) {
        file_md_edit.focus();
    }
}
