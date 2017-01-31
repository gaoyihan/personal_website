var demo = {};

demo.submit = function() {   
    var ajaxResponseHandler = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            document.getElementById('display').value = response;
        }
    };

    var req = new XMLHttpRequest();
    req.open('GET', '/Demo');
    req.setRequestHeader('Content-type', 'application/json');
    req.onreadystatechange = ajaxResponseHandler;
    req.send();    
    return 
}