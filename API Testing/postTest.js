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
        "age":"27"
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};

experiment('Validation the Status code',()=>{
    test('Status code for valid request',()=>{
        rp(options).then((res)=>{
            expect(res.data).to.equal('{"name":"Roz Roz","salary":"9999","age":"27","id":"15258"}')
            expect(res.status).to.equal(200)
        }).catch((err)=>{
            console.dir('Error :'+err)
        })
    })
})