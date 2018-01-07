#!/bin/bash
# create build package and deploy a new skill

# create temp zip file with build package contents
echo 'zipping up files'
zip -r kitty.zip index.js node_modules/ 
# > temp.log
echo 'build file created'

# stage the temp file in s3
aws s3 cp kitty.zip s3://purplekitty/binary/

# set which lambda function is being updated
lambdaruntime='purpleKittySkill'
echo 'deploying new function to' $lambdaruntime

# update the lambda function with the binaries that have been staged
aws lambda update-function-code --function-name "$lambdaruntime" --s3-bucket purplekitty --s3-key binary/kitty.zip
#> temp.log
