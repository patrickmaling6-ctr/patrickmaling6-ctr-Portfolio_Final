@echo off
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  start "Vince Portfolio" http://localhost:5500/index.html
  py -m http.server 5500
  goto :eof
)
where python >nul 2>&1
if %errorlevel%==0 (
  start "Vince Portfolio" http://localhost:5500/index.html
  python -m http.server 5500
  goto :eof
)
echo Python was not found. Please use VS Code Live Server instead.
pause
