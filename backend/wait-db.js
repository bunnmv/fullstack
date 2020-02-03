const pool = require('./src/controllers/db.controller');

let databaseReady = false;

function verifyDatabase(){
    pool.query('SELECT NOW()', (err, res) => {
        if(res){
            databaseReady = true;
            console.log('\x1b[32m%s\x1b[0m', '● DATABASE CONNECTED');
        } else {
            databaseReady = false;
            // console.log('● db not ready. Sleeping.... \n', err);
            console.log('\x1b[31m%s\x1b[0m', '● DATABASE NOT READY. APPLICATION SERVER SLEEPING....');
        }
    });
}


async function init(){
   while (!databaseReady) {
       verifyDatabase();
       await sleep(5000);
   }
    process.exit(0);
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

init();
