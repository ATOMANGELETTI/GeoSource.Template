@echo off
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "ARCHIVE_DIR=%SCRIPT_DIR%..\..\logs\archive"

if not exist "%ARCHIVE_DIR%" (
    echo Archive directory does not exist: "%ARCHIVE_DIR%"
    exit /b 0
)

set "COUNT=0"
for %%F in ("%ARCHIVE_DIR%\*.log") do (
    set /a COUNT+=1
)

if !COUNT! EQU 0 (
    echo No uncompressed log files found in archive to clear.
    exit /b 0
)

echo Deleting !COUNT! uncompressed log file(s) from "%ARCHIVE_DIR%"...
del /f /q "%ARCHIVE_DIR%\*.log"
echo Successfully cleared !COUNT! uncompressed log file(s).
