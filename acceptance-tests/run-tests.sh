#!/bin/bash

NPM_TARGET="${NPM_TARGET:-test}"
MSMID_ENV="${MSMID_ENV:-pr-builder}"
TAGS="${TAGS}"
S3_BUCKET="${S3_BUCKET}" # Used for monitoring
BUILD_KEY="${BUILD_KEY}"


# don't retry for live monitoring
if [[ ! -z "$TAGS"  && "$TAGS" == 'live-monitoring' ]]; then
  SUITE_RETRIES=0
else
  SUITE_RETRIES=2
fi

# Build command as an array. This allows args to be appended to the command, e.g. tag
RUN_TESTS_CMD=(npm run "${NPM_TARGET}" -- --env "${MSMID_ENV}" --suiteRetries "$SUITE_RETRIES")

# If tags are set, append them to the test command
if [[ ! -z "$TAGS" ]]; then RUN_TESTS_CMD+=(--tag "$TAGS"); fi

# Execute the test command and capture the exit code
"${RUN_TESTS_CMD[@]}" || RESULT="$?"

# Generate the html reports, this preserves the junit-xml reports for the CICD tool
yarn report

RESULT="${RESULT:-0}"

if [ ! -z "$BUILD_KEY" ] && [ ! -z "$S3_BUCKET" ]; then
  # If it's a cicd build and S3 Bucket is set
  # Upload results to s3 for collection by CICD tool
  echo "uploading ./reports to s3://${S3_BUCKET}/${BUILD_KEY}"
  aws s3 cp --quiet --sse AES256 --recursive ./reports "s3://${S3_BUCKET}/${BUILD_KEY}/acceptance-tests" 2>&1
  echo "done"
elif [ "$RESULT" != 0 ] && [ ! -z "$S3_BUCKET" ]; then
  # If tests have failed and S3 bucket is defined. This is for live monitoring
  REPORT_NAME=report-$(date +%Y%m%d_%H%M%S)
  zip -r "${REPORT_NAME}.zip" ./reports
  echo "uploading ${REPORT_NAME}.zip to s3://${S3_BUCKET}/${REPORT_NAME}"
  aws s3 cp --quiet --sse AES256 "${REPORT_NAME}.zip" "s3://${S3_BUCKET}/${REPORT_NAME}.zip" 2>&1
  aws s3 presign "s3://${S3_BUCKET}/${REPORT_NAME}.zip"
  echo "done"
fi

exit "$RESULT"
