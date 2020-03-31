## What is required

   * GIT
   * Node
   * NVM
   * Docker
   * Yarn

 [Setup Instruction](https://moneysupermarket.atlassian.net/wiki/spaces/MCQUEEN/pages/279118401/New+Starter+Setup)

## Motor insurance Acceptance Tests

The acceptance test module runs the acceptance/e2e tests using nightwatch and selenium

### Running the Acceptance Tests

* git clone https://username@bitbucket1-eu1.moneysupermarketgroup.com/scm/insur/motor-insurance.git
* cd [PROJECT_ROOT] folder
* run the application ./gradlew bootRunDev / bootRun
* ./gradlew acceptanceTest

### Acceptance Tests npm Tasks

* git clone https://username@bitbucket1-eu1.moneysupermarketgroup.com/scm/insur/motor-insurance.git
* cd [PROJECT_ROOT]/acceptance-tests folder
* yarn
* yarn test -- Runs nightwatch tests in headless chrome
* yarn lint -- lints the acceptance test source

## Reports

   * To view acceptance tests report at [PROJECT_ROOT]/acceptance-tests/report/Index.html
   * To view failed acceptance tests screenshots are generated at [PROJECT_ROOT]/acceptance-tests/report/screenshots

## Build Pipeline

Bamboo builds a docker image for the acceptance tests. This image is used to run the tests in all environments.

Building the image from scratch takes a long time, so to make it more efficient we create a base image for the acceptance tests from the Dockerfile in docker-base.

The base image is created in a seperate build plan in Bamboo, which is triggered only when the Dockerfile in docker-base is changed, and every Monday at 7am.

The latest image is always tagged as registry1-eu1.moneysupermarket.com:5000/motor-insurance-acceptance-tests-base:latest

During the application build plan, we build the acceptance test image using the Dockerfile. This dockerfile is configured to use registry1-eu1.moneysupermarket.com:5000/motor-insurance-acceptance-tests-base:latest and will pull the latest version before building.

Note that there is no chain between the the base image being built and the acceptance test image being built. Therefore if changes are made to the base image, the acceptance test image may need to be rebuilt after the base image has been rebuilt.
