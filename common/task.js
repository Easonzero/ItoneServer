const schedule = require("node-schedule");
const updateOrderlistTask = require('../task/updateOrderlistTask');
const updateRankTask = require('../task/updateRankTask');
/**
 * Created by eason on 6/16/16.
 */
const tasklist = {
    updateOrderlistTask:updateOrderlistTask,
    updateRankTask:updateRankTask
};

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 23;
rule.minute = 0;

for(let task in tasklist){
    schedule.scheduleJob(rule, ()=>{
        tasklist[task].run((err)=>{
		if(err){
			console.dir(err);
		}
	});
    });
}
