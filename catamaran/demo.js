var demo = {};

demo.popluate = function() {
    var tbl = document.getElementById('myTable');
    for (i = 0; i < table_content.length; ++i) {
        var row = table.insertRow();
        for (j = 0; j < table_content[i].length; ++j) {
            var cell = row.insertCell();
            var text = document.createTextNode(table_content[i][j]);
            cell.appendChild(text);
        }
    }
}

demo.submit = function() {   
    var ajaxResponseHandler = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            var table_content = JSON.parse(response);
            demo.populate(table_content);
        }
    };

    var req = new XMLHttpRequest();
    req.open('GET', '/extract-from-string');
    req.onreadystatechange = ajaxResponseHandler;
    req.send();    
    return 
};

demo.get_table = function() {   
    var ajaxResponseHandler = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            var table_content = JSON.parse(response);
            demo.populate(table_content);
        }
    };

    var req = new XMLHttpRequest();
    req.open('GET', '/get-table');
    req.onreadystatechange = ajaxResponseHandler;
    req.send();    
    return 
};

demo.get_table();
