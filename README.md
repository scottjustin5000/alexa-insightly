Insightly Alexa Thingy
===================

Simple [AWS Lambda](http://aws.amazon.com/lambda) that integrates with your Insightly CRM (via their API).

### Trigger

"Alexa, ask Insightly to.."

"Get my meetings for today"

"Create a new lead for Jon Jones from bones company at jj@bones.com"

"What tasks are due this week"

"Find opportunity 'some opportunity'"

Also, you can also say 'help' for some examples of how to engage with Alexa.

I created an--albeit hastily thrown together-[demo](https://youtu.be/rltn4ak9eIo)

### Prerequisites

To run this skill you'll need several things: 
An [Insightly](https://www.insightly.com/) account.
Your Insightly API Key.
Your Insightly User Id (the User Id is required when creating tasks through the Insightly API).
Deploy the code to AWS Lambda. 
Configure the Alexa skill to use Lambda. 

### INSIGHTLY API

The skill is backed by Insightly's RESTful API.  The API is capable of doing a lot more than what the skill is currently using. To extend the skill the Insightly [docs](https://api.insight.ly/v2.1/) should be consulted.  For the most part things are straight forward, but there are some details to be aware of (required casing, fields, routes, etc). 

As mentioned above, you'll need your Insighly API key and Insightly User Id for this skill.  Once those are retrieved, you will set them in your .env files (deploy.env, .env, and .env-test).

```
INSIGHTLY_URL= //this is the url to the api
INSIGHTLY_TOKEN= //your insightly api key
USER_ID= //your insightly user id

```

One thing to note is that Lambda does not actual support setting environment variables, but we get to avoid hard-coding by cheating using [node-lambda](https://www.npmjs.com/package/node-lambda). Locally the env files are required for development and testing, the deploy.env is used by node-lambda.

### Node-Lambda

In addition to the deploy.env settings above, node-lamdba requires settings in your .env. Some of these are required to package your code for Lambda while others are optional and used if you auto deploy.

For deploy.env, the following setting are required:

```
INSIGHTLY_TOKEN=
INSIGHTLY_URL=
ENVIRONMENT=
USER_ID=

```
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

For convenience I have added the package command to package.json scripts. 
```
npm run package
```


### AWS Lambda
1. Go to the AWS Console and click on the Lambda link. 
2. Click on the Create a Lambda Function.
3. Name the Lambda Function whatever you want.
4. Package the code using [node-lambda](https://www.npmjs.com/package/node-lambda), which you'll need to install (via npm: `npm install -g node-lambda`). 
5. You can either manually upload the .zip created by node-lambda to the Lambda or you can have node-lambda deploy for you (`node-lambda deploy --configFile ./deploy.env`). 
6. Return to the main Lambda page, and click on Events Sources and Add Event Source.
7. Choose Alexa Skills Kit.
8. Notice the ARN in the top right, you'll need this later in the configuration step for the Alexa Skill.

### Alexa Skill
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set the skill name to whatever you'd like.  Similarly set the as the invocation name (this will be the trigger word for Alexa) to whatever you'd like.
3. Click Next or 'Interaction Model' from the nav.
4. Copy the Intent Schema from language-assets/intent-schema.json.
5. Add the custom slot types and paste the definitions from language-assets directory.

* EMAILS - email.txt
* LITERAL_DETAILS - literal-details.txt
* LASTNAMES - last-names.txt
* LITERAL_NAMES - literal-names.txt
* TIMESPANS - time-spans.txt
* PRIORITIES - priorities.txt

6. Copy the utterances from the included utterances.txt. Alexa uses these uttereances to undertsand what you are saying, what information should be collected, and what intent should be used. 
7. Click Save or 'Configuration from the nav.  
8. Select ARN as your endpoint, select your region, and paste the ARN from the top right of your Lambda.
9. Click Save or select 'Test' from the navigation.  You can now start your testing.

While the above testing done in the screen mentioned above is ok, it is not sufficient (and is a lot more accurate than when you try talking to Alexa). To do more robust testing, the skill will be available to you on your Alexa device or in [Echoism](https://echosim.io/). At this point the skill is considered in staging. Skills that are in staging can be accessed by a device signed on with the same development account. So, the skill is available you your account (and Alexa) and nowhere else (until published).

As of this writting, everything 'works', but things are pretty rough.  A lot of the intents are similiar--and are collecting a lot of information--and Alexa can easily get tripped up.


### Testing

To run all tests, run the following...

```
npm test
```

which equals:

```
./node_modules/mocha/bin/mocha test/**/*.js
```
To run tests, .env-test is required, which should have the following...
```
INSIGHTLY_TOKEN=
INSIGHTLY_URL=
ENVIRONMENT=
USER_ID=
```

### Install NPM Dependencies

Aside from the dependencies listed above, the rest of the dependencies are installed via `npm`, the [node package manager][npm] Run the following command...

```
npm install
```





