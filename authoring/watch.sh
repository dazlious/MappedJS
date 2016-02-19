#!/bin/bash

compass watch content & pid=$!
PID_LIST+=" $pid";

/Applications/nwjs.app/Contents/MacOS/nwjs . & pid=$!
PID_LIST+=" $pid";

trap "kill $PID_LIST" SIGINT

wait $PID_LIST

echo
echo "All processes have completed";
