@echo off
echo.
echo *** Script om bestanden voor Units 8, 9, en 10 aan te maken ***
echo.

REM Controleer of het template-bestand bestaat
IF NOT EXIST "_template.html" (
    echo FOUT: Het bestand _template.html niet gevonden!
    echo Zorg ervoor dat dit bestand in dezelfde map staat.
    pause
    GOTO:EOF
)

FOR /L %%i IN (8,1,10) DO (
    echo --- Bezig met Unit %%i ---
    
    REM Maak de image map aan
    IF NOT EXIST "images\unit%%i" (
        mkdir "images\unit%%i"
        echo  - Map 'images\unit%%i' aangemaakt.
    )

    REM Roep de subroutine aan om de bestanden te maken
    FOR %%t IN (vocabulary grammar practice supplementary workbook videos) DO (
        CALL :CreateFiles %%i %%t
    )
    echo  - Bestanden voor Unit %%i aangemaakt.
    echo.
)

echo *** KLAAR! ***
pause
GOTO:EOF

:CreateFiles
SET "UNIT_NUM=%1"
SET "TYPE=%2"
SET "JS_FILE=unit%UNIT_NUM%-%TYPE%.js"
SET "HTML_FILE=unit%UNIT_NUM%-%TYPE%.html"

REM Maak leeg JS-bestand
type nul > "%JS_FILE%"

REM Kopieer en hernoem het template
copy "_template.html" "%HTML_FILE%" > nul
GOTO:EOF