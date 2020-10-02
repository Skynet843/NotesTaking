showNote()
let btnAddNote = document.getElementById('add-note');
var editSearch=document.getElementById('search_bar');
editSearch.addEventListener("input",function (e) {
    text=editSearch.value;
    text=text.toLowerCase();
    console.log(text);
    showNote(text);
    });
btnAddNote.addEventListener('click', function (e) {
    let editNote = document.getElementById('note_box');
    let titleNote = document.getElementById('note_title')
    e.preventDefault()
    let note = editNote.value;
    let noteTitleText = titleNote.value;
    if (note == "" || noteTitleText == "") {
        alert("Please Put some before saving note.")
    } else {
        let noteList = localStorage.getItem('note_list');
        let noteTitleList = localStorage.getItem('note_title_list');
        if (noteList == null || noteTitleList == null || noteTitleList == "" || noteList == "") {
            let newNote = [];
            let newNoteTitle = [];
            newNote.push(note);
            newNoteTitle.push(noteTitleText);
            newNote = JSON.stringify(newNote);
            newNoteTitle = JSON.stringify(newNoteTitle)
            localStorage.setItem('note_list', newNote)
            localStorage.setItem('note_title_list', newNoteTitle)
        } else {
            noteList = JSON.parse(noteList);
            noteTitleList = JSON.parse(noteTitleList);
            noteList.push(note);
            noteTitleList.push(noteTitleText)
            noteList = JSON.stringify(noteList)
            noteTitleList = JSON.stringify(noteTitleList)
            localStorage.setItem('note_list', noteList)
            localStorage.setItem('note_title_list', noteTitleList)
        }
    }
    editNote.value = "";
    titleNote.value = "";
    showNote();
})

function createElement(title, note, id) {
    let elem = document.createElement('div')
    elem.className = 'col-lg-4 col-md-4 col-12 mb-3';
    let cardText = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <hr>
      <p class="card-text">${note}</p>
      <a href="#" onclick="deleteNote(${id})" class="btn btn-danger">DELETE NOTE</a>
    </div>
  </div>`;
    elem.innerHTML = cardText;
    return elem;
}

function showNote(text="") {
    console.log('started showNote')
    let notesList = localStorage.getItem('note_list');
    let notesTitleList = localStorage.getItem('note_title_list');
    var noteArea = document.getElementById('note_area');
    noteArea.innerHTML = "";
    if (notesList == null || notesTitleList == null || notesTitleList == "" || notesList == "") {
        noteArea.innerHTML = `<h4 class="text-secondary" >no note data available. Please add some note.</h4>`
    } else {
        noteList = JSON.parse(notesList);
        noteTitleList = JSON.parse(notesTitleList)
        for (let i = 0; i < noteList.length; i++) {
            if(noteList[i].toLowerCase().indexOf(text)!=-1){
            let elem = createElement(noteTitleList[i], noteList[i], i);
            noteArea.appendChild(elem);
        }
        }
    }
}
function removeItemOnce(arr, id) {
    var index = id;
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function deleteNote(id) {
    console.log("delete note")
    let noteList = localStorage.getItem('note_list');
    let noteTitleList = localStorage.getItem('note_title_list');
    noteList = JSON.parse(noteList);
    noteTitleList = JSON.parse(noteTitleList);
    noteList=removeItemOnce(noteList,id);
    noteTitleList=removeItemOnce(noteTitleList,id);
    noteList = JSON.stringify(noteList);
    noteTitleList = JSON.stringify(noteTitleList);;
    localStorage.setItem('note_list', noteList);
    localStorage.setItem('note_title_list', noteTitleList);
    showNote();
}