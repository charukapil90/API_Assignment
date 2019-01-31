var rp = require('request-promise');

var options = {
    method : 'GET',
    uri : 'http://dummy.restapiexample.com/api/v1/employee/99999',
    json : true,
   // resolveWithFullResponse: true
};

rp(options).then(function(response) {
    //console.log(response.statusCode)
    var arr =  JSON.stringify(response)
    var test = JSON.parse(arr)
    console.log(test.id)
}).catch(function(err) {
    console.log('Error :' + err)
})