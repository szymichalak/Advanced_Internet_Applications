function add_book(){
    var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    // insert a row in the table at the last row
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

    // create inputs fields 
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
    newCell_3.appendChild(button_save);
    button_save.onclick = function(){
        // alert(rowCount);
        var author = input_author.value;
        var title = input_title.value;

        document.getElementById("author" + rowCount).remove();
        document.getElementById("title" + rowCount).remove();

        var author_text = document.createTextNode(author)
        newCell_1.appendChild(author_text);
        var title_text = document.createTextNode(title)
        newCell_2.appendChild(title_text);

        button_save.innerHTML = "Edit"
    }
    
    // configure remove button
    var button_remove = document.createElement("button")
    button_remove.type ="button" 
    button_remove.id = "remove" + rowCount;
    button_remove.innerHTML = "Remove"
    newCell_3.appendChild(button_remove);
    button_remove.onclick = function(){
        tableRef.deleteRow(rowCount);

        var table = document.getElementById("table_body");
        for (var i = 0, row; row = table.rows[i]; i++) {
            row.id = "tr"+i;
            if(i % 2 == 0){
                row.className = "gray";
            }
            else{
                row.className = "white"
            }
        }
    }
    
}
