var demo = {};

demo.submit = function() {   
    var ajaxResponseHandler = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            var text = document.createTextNode(response);
            document.getElementById('display').appendChild(text);
        }
    };

    var req = new XMLHttpRequest();
    req.open('GET', '/catamaran/extract-from-string');
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
    req.open('GET', '/catamaran/get-table');
    req.onreadystatechange = ajaxResponseHandler;
    req.send();    
    return 
};

demo.get_table();