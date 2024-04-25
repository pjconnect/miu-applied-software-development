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

ps 9961;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 9961 > /dev/null;
done;

for child in $(list_child_processes 9984);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/pasindujayawardana/Desktop/APSD/miu-applied-software-development/final-porject--PostIt/PostIt/bin/Debug/net7.0/492e83006ec5493db53326557fef5e2f.sh;
