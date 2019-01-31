"use strict"

const Lab = require('lab');
const lab = (exports.lab=Lab.script());
const rp = require('request-promise');
const experiment = lab.experiment;
const test = lab.test;
const Code = require('code');
const expect = Code.expect;

//Using tranform function to receive the data in specific format
var includeheaders = function(body, response) {
    return {'status': response.statusCode, 'data': body};
  };

//Declaring valid api call parameters
const options = {
    method : 'PUT',
    uri : 'http://dummy.restapiexample.com/api/v1/update/14986',
    body : {
        "name":"Atif Aslam",
        "salary":"10",
        "age":"29",
        "id":"14986"
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};
//Declaring invalid api call parameters to simulate error
const options_invalid = {
    method : 'PUT',
    uri : 'http://dummy.restapiexample.com/api/v1/update/14986/',
    body : {
        "name":"Atif Aslam",
        "salary":"1000000",
        "age":"29",
        "id":""
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};

//Managing all the Happy scenarios within experiment block
experiment('Happy Scenarios',()=>{
    //Happy Scenarios - Test 1
    test('Status code for valid request',()=>{
        rp(options).then((response)=>{
            //Fetching the status code returned from the api and comparing it with the success code using expect function
            expect(response.status).to.equal(200)
        }).catch((err)=>{
            //Error handling using catch block
            console.log('Error with Happy scenario - Test 1:'+err)
        })
    })

    //Happy Scenarios - Test 2 
    test('Validating the body content post PUT operation',()=>{
        rp(options).then((response)=>{
            //Fetching the body content returned from the api and comparing it with the content sent in our PUT method
            expect(JSON.stringify(response.data)).to.equal(JSON.stringify(options.body))
        }).catch((err)=>{
            console.log('Error with Happy scenario - Test 2:'+err)
        })
    })
})

//Managing all the Negative scenarios within another experiment block
experiment('Negative Scenarios',()=>{
    //Negative Scenario - Test 1
    test('Status code for invalid request',()=>{
        //Sending invalid request
        rp(options_invalid).then((response)=>{
            expect(response.status).to.equal(200)
        }).catch((err)=>{
            expect(err.statusCode).to.equal(404)
            console.log('Invalid Status code returned :'+err)
        })
    })

    //Negative Scenario - Test 2
    test('Validating the body content post PUT operation',()=>{
        rp(options_invalid).then((response)=>{
            expect(JSON.stringify(response.data)).to.equal(JSON.stringify(options.body))
        }).catch((err)=>{
            expect(err.statusCode).to.equal(404)
            console.log("Content mismatch issue :"+err)
        })
    })
})