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
    method : 'PUT',
    uri : 'http://dummy.restapiexample.com/api/v1/update/14946',
    body : {
        "name":"LifeGood",
        "salary":"10000000",
        "age":"29",
        "id":"14946"
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};
const options_invalid = {
    method : 'PUT',
    uri : 'http://dummy.restapiexample.com/api/v1/update/14946/',
    body : {
        "name":"LifeGood",
        "salary":"1000000",
        "age":"29",
        "id":""
    },
    resolveWihFullResponse : true,
    json : true,
    transform: includeheaders
};

experiment('Happy Scenarios',()=>{
    test('Status code for valid request',()=>{
        rp(options).then((response)=>{
            expect(response.status).to.equal(200)
        }).catch((err)=>{
            console.dir('Error :'+err)
        })
    })

    test('Validating the body content post PUT operation',()=>{
        rp(options).then((response)=>{
            expect(JSON.stringify(response.data)).to.equal(JSON.stringify(options.body))
        }).catch((err)=>{
            console.dir('Error :'+err)
        })
    })
})

experiment('Negative Scenarios',()=>{
    test('Status code for invalid request',()=>{
        rp(options_invalid).then((response)=>{
            expect(response.status).to.equal(200)
        }).catch((err)=>{
            console.dir('Error :'+err)
        })
    })

    test('Validating the body content post PUT operation',()=>{
        rp(options_invalid).then((response)=>{
            expect(JSON.stringify(response.data)).to.equal(JSON.stringify(options.body))
        }).catch((err)=>{
            expect(err).to.be.error()
        })
    })
})