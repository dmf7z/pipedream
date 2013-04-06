#!/usr/bin/env bash

TPL_OUT_DIR=templates/compiled

for TPL in `find templates/ -name '*.hbs'`
do
    BASE_FILE_NAME=$(basename "$TPL")
    FILE_NAME="${BASE_FILE_NAME%.*}"    
    ./node_modules/.bin/handlebars "templates/$BASE_FILE_NAME" -f "$TPL_OUT_DIR/$FILE_NAME.js"
done

./node_modules/.bin/buildclient -c bundle.json `find -L node_modules/pipedream/pipedream.client.js client controllers libs model templates/compiled views node_modules/pipedream/lib -name '*.js' | grep -ve server` > ./public/js/client.js