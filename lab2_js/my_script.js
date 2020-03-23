function add_book(){
    var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow();

    // Insert a cell in the row at index 0
    var newCell_1  = newRow.insertCell(0);
    var newCell_2  = newRow.insertCell(1);
    var newCell_3  = newRow.insertCell(2);

    // Append a text node to the cell
    var input_author = document.createElement("input")
    input_author.type = "text";
    newCell_1.appendChild(input_author);

    var input_title = document.createElement("input")
    input_title.type = "text";
    newCell_2.appendChild(input_title);

    var button_save = document.createElement("button")
    button_save.type ="button"
    button_save.innerHTML = "Save"
    newCell_3.appendChild(button_save);
    
    var button_remove = document.createElement("button")
    button_remove.type ="button"
    button_remove.innerHTML = "Remove"
    newCell_3.appendChild(button_remove);
}


// <button type="button" onclick="add_book()">Add new book</button>