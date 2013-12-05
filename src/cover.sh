#!/bin/bash

# Run code coverage and fail if number is below a threshold
THRESHOLD=90
OUTPUT=$(grunt cover)
STARS="**************************************************"
echo $OUTPUT | grep 'Coverage succeeded'
RC=$?
if [ $RC -eq 0 ]
	then
		COVERAGEVALUE=$(echo $OUTPUT | grep -o '.\{0\}Coverage:.\{0,3\}')
		declare -a TOKENS=( $COVERAGEVALUE )
		EXISTING=${TOKENS[1]}
		printf "\n\n\n$STARS\n"
		if [ "$EXISTING" -lt "$THRESHOLD" ]
			then
				echo "* Build failed due to overall coverage below expected value of $THRESHOLD%. Was $EXISTING%."
				echo "$STARS"
				exit 1
			else
				echo "* Build passed! Existing coverage value is $EXISTING%; max is $THRESHOLD%."
				echo "$STARS"
				exit 0
		fi
	else
		printf "\n\n\n$STARS"
		echo '* Build failed due to no coverage values!'
		echo "$STARS"
		exit 1
fi
