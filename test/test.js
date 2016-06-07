const app = require('../app');
const controllers = [
    require('./controllers/users')
];
/**
 * Created by eason on 5/6/16.
 */

before((done)=>app.listen(3000, done));

for(let controller of controllers){
    describe(controller.describe,()=>{
        for(let name in controller.it){
            it(name, controller.it[name]);
        }
    });
}