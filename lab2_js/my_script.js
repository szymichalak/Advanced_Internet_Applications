function add_book(){
    // insert a row in the table at the last row
    var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow();

    // get amount of rows and set color
    var rowCount = document.getElementById('table_body').rows.length - 1;
    newRow.id = "tr"+rowCount;
    if(rowCount % 2 == 0){
        newRow.className = "gray";
    }
    else{
        newRow.className = "white"
    }

    // insert cells
    var newCell_1  = newRow.insertCell(0);
    var newCell_2  = newRow.insertCell(1);
    var newCell_3  = newRow.insertCell(2);

    // create input fields 
    var input_author = document.createElement("input")
    input_author.type = "text";
    input_author.id = "author" + rowCount;
    newCell_1.appendChild(input_author);
    var input_title = document.createElement("input")
    input_title.type = "text";
    input_title.id = "title" + rowCount;
    newCell_2.appendChild(input_title);

    // configure save button
    var button_save = document.createElement("button")
    button_save.type ="button"
    button_save.id = "save" + rowCount;
    button_save.innerHTML = "Save"
    button_save.setAttribute('onclick', 'save_function('+ rowCount +')');
    newCell_3.appendChild(button_save);
    
    // configure remove button
    var button_remove = document.createElement("button")
    button_remove.type ="button" 
    button_remove.id = "remove" + rowCount;
    button_remove.innerHTML = "Remove"
    button_remove.setAttribute('onclick', 'remove_function('+ rowCount +')');
    newCell_3.appendChild(button_remove);    
}

function save_function(row){
    // get values
    var title = document.getElementById("title"+row).value;
    var author = document.getElementById("author"+row).value;

    // remove input fields
    document.getElementById("author" + row).remove();
    document.getElementById("title" + row).remove();

    // add text to cell
    var author_text = document.createTextNode(author);
    var newCell_1 = document.getElementById("table_body").rows[row].cells[0];
    newCell_1.appendChild(author_text);
    var title_text = document.createTextNode(title);
    var newCell_2 = document.getElementById("table_body").rows[row].cells[1];
    newCell_2.appendChild(title_text);

    // set button
    var current_button = document.getElementById("save"+row);
    current_button.innerHTML = "Edit";
    current_button.id = "edit"+row;
    current_button.setAttribute('onclick', 'edit_function('+ row +')');
}

function edit_function(row){
    // get current values
    var current_author = document.getElementById("table_body").rows[row].cells[0].innerHTML;
    var current_title = document.getElementById("table_body").rows[row].cells[1].innerHTML;

    // remove text and set input
    var input_author = document.createElement("input")
    input_author.type = "text";
    input_author.id = "author" + row;
    input_author.value = current_author;
    document.getElementById("table_body").rows[row].cells[0].innerHTML="";
    document.getElementById("table_body").rows[row].cells[0].appendChild(input_author);

    var input_title = document.createElement("input")
    input_title.type = "text";
    input_title.id = "title" + row;
    input_title.value = current_title;
    document.getElementById("table_body").rows[row].cells[1].innerHTML="";
    document.getElementById("table_body").rows[row].cells[1].appendChild(input_title);

    // set button
    var current_button = document.getElementById("edit"+row);
    current_button.innerHTML = "Save";
    current_button.id = "save"+row;
    current_button.setAttribute('onclick', 'save_function('+ row +')');
}

function next_save(row){
    // set button
    var current_button = document.getElementById("save"+row);
    current_button.innerHTML = "Edit";
    current_button.id = "edit"+row;
    current_button.setAttribute('onclick', 'edit_function('+ row +')');
}

function remove_function(row){
    // delete every cell in selected row and mark it as removed
    for(let i=0; i<3; i++){
        document.getElementById("table_body").rows[row].cells[0].remove();
    }
    document.getElementById("table_body").rows[row].className = "removed";

    // update colors
    var colors = ["gray", "white"];
    var current_color = colors[0];
    var table = document.getElementById("table_body");
    for (var j = 0, row; row = table.rows[j]; j++) {
        if (row.className != "removed"){
            row.className = current_color;
            current_color = colors[1 - colors.indexOf(current_color)];
        }
    }
}