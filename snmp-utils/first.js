// Example code for node-snmp-native.
// ----

// This file contains examples of how to use the library.

// Basic setup
// -----
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();
// The snmp object is the main entry point to the library.
var snmp = require('snmp-native');

var util = require('util');

var host = '10.8.7.99';
var community = 'read';

// A session is required to communicate with an agent.
// var session = new snmp.Session({ host: host, community: community });
var session = new snmp.Session({ host: host });

// All OIDs are represented as integer arrays.
// There is no interpretation of string or MIB names.
// This here is the OID for sysDescr.0.
var oid = [1,3,6,1,4,1,1950,1,1,1,1,4,0];

// Getting a single value
// -----

for(var x = 0; x < 10000; x++) {
    // console.log(x);
// This is how you issue a simple get request.
session.get({ oid: oid }, function (err, varbinds) {
    var vb;

    if (err) {
        // If there is an error, such as an SNMP timeout, we'll end up here.
        console.log(err);
    } else {
        vb = varbinds[0];
        console.log('The system description is "' + vb.valueRaw.toString('utf8') + '"');
    }

    // The session must be closed when you're done with it.
    if (10000 === x){
        //session.close();
    }
});
}
        

