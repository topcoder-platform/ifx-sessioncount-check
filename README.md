# ifx-sessioncount-check
Check informix session count and trigger alert 

How setup.

1) create env.list with relevant informix credentials and sql query
2) Build the Docker: docker-compose -f docker/docker-compose.yml build ifx-sessioncount-check
3) Run the docker : docker run -ti --rm --env-file <path to env.list> ifx-sessioncount-check:latest
  
  Note: LambdaFile folder is not part of Docker Setup.
  
  Lambdafile Setup
  
  I) DB_SessionPerHost_Check
  A) Setup lambda function DB_SessionPerHost_Check
  B) Set env variable
  containeroverride, ecscluster, ecstaskdefinition,region,taskRoleArn, taskSG,taskSubnet

  
  II) ifx_DbCount_Cloudwatch 
  A) Setup lambda function ifx_DbCount_Cloudwatch
  B) Set env variable
  slackChannel = "ChannelName" 
  slackchannel_url ="https://hooks.slack.com/......"

