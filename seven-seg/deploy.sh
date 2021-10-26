#!/bin/bash

ng build --prod=true --output-path dist --base-href /seven-seg/;
npx angular-cli-ghpages --dir="dist";
