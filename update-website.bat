@echo off
echo =======================================================
echo          Infinity Solution - Website Updater
echo =======================================================
echo.

echo [1/3] Saving all your latest changes...
git add .

echo.
echo [2/3] Packing up the updates...
git commit -m "Auto-update website"

echo.
echo [3/3] Sending updates to the cloud (GitHub & Vercel)...
git push

echo.
echo =======================================================
echo SUCCESS! Your code has been sent.
echo.
echo Vercel is now building your website in the background.
echo Your changes will be live in about 1-2 minutes at:
echo https://infinity-mds.vercel.app
echo =======================================================
pause
