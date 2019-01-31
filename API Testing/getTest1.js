"use strict"
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const rp = require('request-promise');
const test = lab.test;
const Code = require('code');
const expect = Code.expect;
  
    const options = {
        method : 'GET',
        uri : 'http://dummy.restapiexample.com/api/v1/employees',
        json : true,
        };
    const options_status = {
        method : 'GET',
        uri : 'http://dummy.restapiexample.com/api/v1/employees',
        json : true,
        resolveWithFullResponse: true
    };

    experiment('Validating the Status code',()=>{

        test('Validating success status',()=>{
            rp(options_status).then(function(response){
            expect(response.statusCode).to.equal(200)
            }).catch((err)=>
            {
             console.log(err)
            })
        })
        test('Validating no. of records returned',()=>{
            rp(options).then(function(response){
            expect(response.length).to.equal(62)
            }).catch((err)=>
            {
             console.log(err)
            })
        })
    });
  
    
    experiment('Validating the body content',()=>{

        test('Validate Employee Name',()=>{
            rp(options).then(function(response){
            var arr =  JSON.stringify(response)
            var test =  JSON.parse(arr)
            var len = test.length;        
            for(var i=0;i<len;i++)
            {
            //console.log('Actual Details :'+test[i].id+' '+test[i].employee_name+' '+test[i].employee_salary+' '+test[i].employee_age)
            }   

            }).catch(function(err)
            {
            console.log('API Failed !!! : '+err);
            }).catch((err)=>
            {
             console.log(err)
            })
        })

        test('Validating body content',()=>{
            rp(options).then(function(response){
            var arr =  JSON.stringify(response)
            var test =  JSON.parse(arr)
            expect(test[0]).to.include('id')
            }).catch((err)=>
            {
             console.log(err)
            })
        })
    });