#!/bin/bash
#Config
VERSION_FILE="version.txt"
echo "---Erstelle Commit für Github---"
current_version=$(cat "$VERSION_FILE")
git add *
sleep 1
git commit -m "Update Version 2.${current_version}"
if [ $? -ne 0 ]; then
  echo "Failed: git commit"
  exit 1
else
  echo "Success: git commit"
  new_version=$((current_version + 1))
  echo "$new_version" > "$VERSION_FILE"
fi
echo "---Führe git push aus---"
git push
if [ $? -ne 0 ];then
  echo "Failed: git push"
  exit 1
else
  echo "Success: git push"
  echo "---Git Updated!---"
fi
sleep 1
echo "---Verbinde mit Server---"
ssh goldimental@87.106.45.77 <<EOF
    echo "---Mit Server verbunden---"
    cd Home || { echo "Failed: cd Home"; exit 1; }
    sleep 1
    echo "---Führe git pull aus---"
    git pull
    sleep 1
    #echo "---Führe npm install aus---"
    #npm install
    #sleep 1
    #echo "---PM2 Neustarten---"
    #pm2 restart 0
    #sleep1
    echo "---Statusanzeige---"
    git status
    pm2 status
    sleep 1
    echo "---Verbindung mit Server trennen---"
EOF
if [ $? -ne 0 ];then
  echo "Failed: ssh goldimental@87.106.45.77"
  exit 1
fi
echo "---Update abgeschlossen---"
