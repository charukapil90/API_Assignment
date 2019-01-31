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

    //Declaring valid Request parameters
    const options_status = {
        method : 'GET',
        uri : 'http://dummy.restapiexample.com/api/v1/employees',
        json : true,
        resolveWithFullResponse: true,
        transform: includeheaders
    };
    //Declaring invalid api call parameters to simulate error
    const options_invalid = {
        method : 'GET',
        uri : 'http://dummy.restapiexample.com/api/v1/employees/',
        resolveWihFullResponse : true,
        json : true,
    };
    
    //Managing all the Status code scenarios within experiment block
    experiment('Validating the Status code',()=>{

        //Status Code Scenarios - Test 1
        test('Validating success status for valid request',()=>{
            rp(options_status).then(function(response){
            //Fetching the status code returned from the api and comparing it with the success code using expect function
            expect(response.status).to.equal(200)
            }).catch((err)=>{
            //Error handling using catch block
             console.log(err)
            })
        })

        //Status Code Scenarios - Test 2
        test('Validating failure status for invalid request',()=>{
            rp(options_invalid).then((response)=>{
            //Fetching the status code returned from the api for invalid request and comparing it with 404 NOt found response
            expect(response.statusCode).to.equal(200)
            }).catch((err)=>{
            //Fetching error code and comparing it with expected error
            expect(err.statusCode).to.equal(404)
            })
        })
    });
  
    //Managing all the content verification scenarios within this experiment block
    experiment('Validating the body content',{ timeout: 1000 },()=>{

        //Content Verification - Test 1
        test('Validate Employee Name to contain only Alphabets and Space',()=>{
            rp(options_status).then(function(response){
            var test =  JSON.parse(JSON.stringify(response.data))
            var len = test.length;        
            for(var i=1;i<len;i++)
            {
            //Validating Employee names
            expect(test[i].employee_name).to.match(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/)
            }   
            }).catch((err)=>{
            //Catching error for invalid names
             console.log("Invalid Name : "+err)
            })
        })

        //Content Verification - Test 2
        test('Validating employee salary to be non-zero',()=>{
            rp(options_status).then(function(response){
            var test =  JSON.parse(JSON.stringify(response.data))
            var len = test.length;        
            for(var i=0;i<len;i++)
            {
            //Checking salary to be above 0
            expect(parseInt(test[i].employee_salary)).to.be.above(0)
            }
            }).catch((err)=>
            {//catching error for invalid salary
             console.log("Salaray is invalid : "+err)
            })
        })
    });