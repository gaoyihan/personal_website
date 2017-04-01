var demo = {};

demo.submit = function() {   
    var ajaxResponseHandler = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            var table_content = JSON.parse(response);
            var table = document.getElementById('table');
            for (int i = 0; i < table_content.length; ++i) {
                var row = table.insertRow(i);
                for (int j = 0; j < table_content[i].length; ++j) {
                    var cell = row.insertCell(j);
                    var text = document.createTextNode(table_content[i][j]);
                    cell.appendChild(text);
                }
            }
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
            var text = document.createTextNode(response);
            document.getElementById('display').appendChild(text);
        }
    };

    var req = new XMLHttpRequest();
    req.open('GET', '/get-table');
    req.onreadystatechange = ajaxResponseHandler;
    req.send();    
    return 
};

demo.get_table();
