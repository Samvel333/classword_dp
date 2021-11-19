const {connection} = require('./connection')

async function getData(queryString){
    const promise = new Promise(((resolve, reject) => {
        connection.query(queryString, function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    }))
}
function getUserByEmail(email) {
    return getData(`SELECT * FROM members WHERE email = '${email}'`);
}
