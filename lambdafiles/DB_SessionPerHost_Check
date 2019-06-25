var AWS = require('aws-sdk')
var ecs = new AWS.ECS({region: process.env.region});
var cluster=process.env.ecscluster;
var taskDefinition=process.env.ecstaskdefinition;

function runecsfargate()
{
          var params = {
                        taskDefinition: taskDefinition,
                        cluster: cluster,
                         launchType: 'FARGATE',
                        count: 1,
                         networkConfiguration: {
                            awsvpcConfiguration: {
                              subnets: [ /* required */
                                process.env.taskSubnet,
                              ],
                              assignPublicIp: "DISABLED",
                              securityGroups: [
                                process.env.taskSG,
                              ]
                            }
                          },
                        overrides: {
                           "containerOverrides": 
                           [{
	                    	"name": process.env.containeroverride
                              
                           }   ]
                        }
                    }
                 return params;
               
}

exports.handler = (event, context, callback) => {
    ecs.runTask(runecsfargate(), function(err, data) 
                        {
                            if (err) {
                                console.log(err, err.stack); 
                                  const response = {
                                 body: JSON.stringify(err.stack)
                                  }
                                callback(err,response);
                                }// an error occurred
                            else {
                                  const response = {
                                statusCode: 200,
                                 body: JSON.stringify(data)
                                  }
                              callback(null,response);
                            }           
                        })
 
};
