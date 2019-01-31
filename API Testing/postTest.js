"use strict"

const Lab = require('lab');
const lab = (exports.lab=Lab.script());
const rp = require('request-promise');
const experiment = lab.experiment;
const test = lab.test;
const Code = require('code');
const expect = Code.expect;

var includeheaders = function(body, response) {
    return {'status': response.statusCode, 'data': body};
  };

const options = {
    method : 'POST',
    uri : 'http://dummy.restapiexample.com/api/v1/create',
    body : {
        "name":"Roz Roz",
        "salary":"9999",
        "age":"27",
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};

//Managing all the Status code scenarios within below experiment block
experiment('Validation the Status code and Body',()=>{

    //Status code validation - Test 1
    test('Status code for valid request',()=>{
        rp(options).then((response)=>{
            expect(response.status).to.equal(200)
        }).catch((err)=>{
            //Error handling using catch block
            console.log('Error with Test 1:'+err)
        })
    })

    //Content Validation - Test 2 
    test('Validating the response content for post operation',()=>{
        rp(options).then((response)=>{
        //Fetching the body content returned from the api and comparing it with the content sent in our PUT method
        expect(JSON.stringify(response.data)).to.include(JSON.stringify(options.body.name))
        expect(JSON.stringify(response.data)).to.include(JSON.stringify(options.body.salary))
        expect(JSON.stringify(response.data)).to.include(JSON.stringify(options.body.age))
        }).catch((err)=>{
            //Error handling using catch block
            console.log('Error with Test 2:'+err)
        })
    })
})