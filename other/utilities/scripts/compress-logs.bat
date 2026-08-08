@echo off
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "ZIP_EXE=%SCRIPT_DIR%..\7zr.exe"
set "ARCHIVE_DIR=%SCRIPT_DIR%..\..\logs\archive"

if not exist "%ZIP_EXE%" (
    echo Error: 7zr.exe not found at "%ZIP_EXE%"
    exit /b 1
)

if not exist "%ARCHIVE_DIR%" (
    echo Archive directory does not exist: "%ARCHIVE_DIR%"
    exit /b 0
)

set "LOG_COUNT=0"
for %%F in ("%ARCHIVE_DIR%\*.log") do (
    set /a LOG_COUNT+=1
)

if !LOG_COUNT! EQU 0 (
    echo No log files found in archive to compress.
    exit /b 0
)

for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'"') do set "TIMESTAMP=%%i"

set "ZIP_NAME=!TIMESTAMP!=!LOG_COUNT!.zip"

echo Compressing !LOG_COUNT! log file(s) into "!ZIP_NAME!"...

pushd "%ARCHIVE_DIR%"
"%ZIP_EXE%" a -sdel "!ZIP_NAME!" *.log
popd

echo Logs successfully compressed into "%ARCHIVE_DIR%\!ZIP_NAME!".
