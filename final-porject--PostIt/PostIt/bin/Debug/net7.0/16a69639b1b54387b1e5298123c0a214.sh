function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 1121;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 1121 > /dev/null;
done;

for child in $(list_child_processes 1127);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/pasindujayawardana/RiderProjects/PostIt/PostIt/bin/Debug/net7.0/16a69639b1b54387b1e5298123c0a214.sh;
