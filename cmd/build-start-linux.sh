#!/bin/bash

#must have gwsl installed for this to work
# vcxserver
# export DISPLAY="$(grep nameserver /etc/resolv.conf | sed 's/nameserver //'):0"

# normal
export DISPLAY=:0

npm run b 
./out/forge-linux-x64/forge