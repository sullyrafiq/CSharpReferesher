## What is required

   * GIT
   * Node
   * NVM
   * Docker
   * Yarn

  
## Motor insurance Acceptance Tests

The acceptance test module runs the acceptance/e2e tests using nightwatch and selenium

### Running the Acceptance Tests

 * cd [PROJECT_ROOT] folder
* run the application ./gradlew bootRunDev / bootRun
* ./gradlew acceptanceTest

### Acceptance Tests npm Tasks

 * cd [PROJECT_ROOT]/acceptance-tests folder
* yarn
* yarn test -- Runs nightwatch tests in headless chrome
* yarn lint -- lints the acceptance test source

## Reports

   * To view acceptance tests report at [PROJECT_ROOT]/acceptance-tests/report/Index.html
   * To view failed acceptance tests screenshots are generated at [PROJECT_ROOT]/acceptance-tests/report/screenshots

## Build Pipeline

