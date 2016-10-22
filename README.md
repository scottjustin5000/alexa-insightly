Radar360 Alexa Stat Thingy
===================

Simple [AWS Lambda](http://aws.amazon.com/lambda) function that answers the basic questions about the NFL, powered by Radar360.

## Trigger

"Alexa, ask Insightly"

## Examples

"What meetings do I have today"

"Create a new lead for Jon Jones at jj@bones.com"

"What tasks are due this week"

"Which opportunities were created this month"

[Demo Video]()

## Setup
To run this skill you need to deploy the code in lambda, and configure the Alexa skill to use Lambda. 

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function button.
3. Name the Lambda Function whatever you want.
4. Package the code using [node-lambda](https://www.npmjs.com/package/node-lambda), which you'll need to install (via npm: `npm install -g node-lambda`). Among other things, node-lambda takes care of setting your environmental variables and zipping the project.
5. You can either manually upload the .zip created by node-lambda to the Lambda or you can have node-lambda deploy for you (`node-lambda deploy --configFile ./deploy.env`). 
6. Return to the main Lambda page, and click on "Events Sources" tab and click "Add Event Source".
7. Choose Alexa Skills Kit and click submit.
8. Copy the ARN from the upper right to be used later in the Alexa Skill Setup

### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set the skill name and "sport radar" (or whatever) as the invocation name, this is what is used to activate the skill.
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the Intent Schema from language-assets/intent-schema.json.
5. Add the custom slot types and paste the definitions from language-assets directory.

* EMAILS - email.txt
* LITERAL_DETAILS - literal-details.txt
* LASTNAMES - last-names.txt
* LITERAL_NAMES - literal-names.txt
* TIMESPANS - time-spans.txt

6. Copy the utterances from the included utterances.txt. Click Next.
7. You are now able to start testing the skill. You should be able to either go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled or test in [Echoism](https://echosim.io/).


### INSIGHTLY API


### Node-Lambda and .env

For deploy.env, the following two setting are required:

```
INSIGHTLY_TOKEN=
INSIGHTLY_URL=
ENVIRONMENT=
USER_ID=

```
The Insightly token is you API Key
The Insightly URL is the address for the Insightly API, for example I'm using https://api.insight.ly/v2.1/
Environment (local, test, production, etc)
User Id variable is your Insightly User Id. This is required only for Tasks (requirements of the api)

For .env, the following are required:

```
AWS_ENVIRONMENT=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=
AWS_ROLE_ARN=
AWS_REGION=
AWS_FUNCTION_NAME=
AWS_HANDLER=
AWS_MEMORY_SIZE=
AWS_TIMEOUT=
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs4.3
AWS_VPC_SUBNETS=
AWS_VPC_SECURITY_GROUPS=
EXCLUDE_GLOBS="event.json intents-schema.json *.txt env.js mocha.opts test.env"
PACKAGE_DIRECTORY=package
```



