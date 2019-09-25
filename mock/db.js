const Mock=require('mockjs');

module.exports = function() {
    let db=Mock.mock({
        "data":{
            code:1000,
            'result|3-6':[{
                id:'@id',
                name:'@name',
                region:'@region',
                dataImage:'@ip',
                email:'@email',
                'age|18-32':1
            }]
        }
    });
    let user = {id:Mock.mock('@id')};
    db.data.result.push(user);
    return db
}
