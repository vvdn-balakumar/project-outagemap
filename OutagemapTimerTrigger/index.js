var outagecontroller = require('./controllers/outagecontroller.js');
var dbCon = require('./dao/mongodaoimpl');

module.exports = function (context, myTimer) {
    context.log('Outage map initiated');
    outagecontroller.processOutages(context, function (err, obj) {
        context.log('Error processOutages', err);
        //dbCon.closeConnection();
        context.done();
    });
};