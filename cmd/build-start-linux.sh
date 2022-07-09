#!/bin/bash

#must have gwsl installed for this to work
export DISPLAY="$(grep nameserver /etc/resolv.conf | sed 's/nameserver //'):0"

npm run b 
./out/forge-linux-x64/forge