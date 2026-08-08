@echo off
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "ARCHIVE_DIR=%SCRIPT_DIR%..\..\logs\archive"

if not exist "%ARCHIVE_DIR%" (
    echo Archive directory does not exist: "%ARCHIVE_DIR%"
    exit /b 0
)

set "LOG_COUNT=0"
for %%F in ("%ARCHIVE_DIR%\*.log") do (
    set /a LOG_COUNT+=1
)

set "ZIP_COUNT=0"
for %%F in ("%ARCHIVE_DIR%\*.zip") do (
    set /a ZIP_COUNT+=1
)

set /a TOTAL_COUNT=LOG_COUNT+ZIP_COUNT

if !TOTAL_COUNT! EQU 0 (
    echo No log files or zip archives found in archive to clear.
    exit /b 0
)

echo Deleting !LOG_COUNT! log file(s) and !ZIP_COUNT! zip archive(s) from "%ARCHIVE_DIR%"...
if !LOG_COUNT! GTR 0 del /f /q "%ARCHIVE_DIR%\*.log"
if !ZIP_COUNT! GTR 0 del /f /q "%ARCHIVE_DIR%\*.zip"
echo Successfully cleared all logs and archives from "%ARCHIVE_DIR%".
