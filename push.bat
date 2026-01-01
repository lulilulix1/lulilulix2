@echo off
echo 🚀 Duke push-uar në GitHub...
git add .
git commit -m "Update %date% %time%"
git push
echo ✅ U push-ua!
pause