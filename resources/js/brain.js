function test_text(){
var text_data = document.getElementById("input_text").value;

}
var title_list = [];
function save_data(){
    var text_data = document.getElementById("input_text").value;
    var title_text = document.getElementById("text_title").value;
    localStorage.setItem(title_text, text_data);
    var load_data = localStorage.getItem("notes_list");
    console.log(load_data);
    var title_list = JSON.parse(load_data);
console.log(title_list);
    title_list.push(title_text);
    var strings = JSON.stringify(title_list);
    localStorage.setItem("notes_list", strings);

}
function show_notes(){
    var x = 1;
    var notes_division = document.getElementById("notes_div");
    var input_division = document.getElementById("input_division");
    var table_body = document.getElementById("table_body");
    // if(notes_division.style.display == "none"){
        input_division.style.display = "none"
        notes_division.style.display = "block";
        var load_data = localStorage.getItem("notes_list");
        console.log(load_data);
        var lists = JSON.parse(load_data);
        console.log(lists);
        lists.forEach(element => {
            table_body.append(`<tr><td>x++</td><td>${element}</td></tr>`);
        });
}
document.getElementById("input_text").addEventListener("input", test_text);
document.getElementById("save").addEventListener("click", save_data);
document.getElementById("notes").addEventListener("click", show_notes);
