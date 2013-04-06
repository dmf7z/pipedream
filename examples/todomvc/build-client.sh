#!/usr/bin/env bash

TPL_OUT_DIR=templates/compiled

for TPL in `find templates/ -name '*.hbs'`
do
    BASE_FILE_NAME=$(basename "$TPL")
    FILE_NAME="${BASE_FILE_NAME%.*}"    
    ./node_modules/.bin/handlebars "templates/$BASE_FILE_NAME" -f "$TPL_OUT_DIR/$FILE_NAME.js"
done

./node_modules/.bin/buildclient -c bundle.json `find -L node_modules/pipedream/pipedream.client.js client controllers libs models collections templates/compiled views node_modules/pipedream/lib/build node_modules/pipedream/lib/router/client node_modules/pipedream/lib/view/client node_modules/pipedream/lib/model/client node_modules/pipedream/lib/collection/client -name '*.js' | grep -ve server` > ./public/js/client.js