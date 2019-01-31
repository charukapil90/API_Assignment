"use strict"
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const rp = require('request-promise');
const test = lab.test;
const Code = require('code');
const expect = Code.expect;
var includeheaders = function(body, response) {
    return {'status': response.statusCode, 'data': body};
  };

//Declaring valid Request parameters with intention to receive Full response
const options_status = {
    method : 'GET',
    uri : 'http://dummy.restapiexample.com/api/v1/employee/15098',
    json : true,
    resolveWithFullResponse: true,
    transform: includeheaders
};

 //Managing all the Status code scenarios within experiment block
 experiment('Validating the Status code',()=>{
     
    //Status Code Scenarios - Test 1
    test('Validating success status for valid request',()=>{
        rp(options_status).then((response) =>{
        //Fetching the status code returned from the api and comparing it with the success code using expect function
        expect(response.status).to.equal(200)
        }).catch((err)=>{
        //Error handling using catch block
         console.log(err.statusCode)
        })
    });

    //Body content Verification  - Test 2
    test('Validating employee name to not be empty',()=>{
    rp(options_status).then(function(response){
    var test =  JSON.parse(JSON.stringify(response.data))     
    //Validating name not be an empty string 
    expect(test.employee_name).not.to.match(/^$/)
    }).catch((err)=>
    {
    //Error handling for invalid name
     console.log("Employee name is empty : "+err)
    })
})
});