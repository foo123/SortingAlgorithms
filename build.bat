@echo off

REM ###################################################
REM #
REM #   The buildtools repository is at:
REM #   https://github.com/foo123/scripts/buildtools
REM #
REM ###################################################

REM to use the python build tool do:
REM python ..\scripts\buildtools\build.py --deps ".\dependencies"
REM python ..\scripts\buildtools\build.py --deps ".\dependencies.ini" --compiler yui
REM python ..\scripts\buildtools\build.py --deps ".\dependencies.yml"
REM python ..\scripts\buildtools\build.py --deps ".\dependencies.json"
REM python ..\scripts\buildtools\build.py --deps ".\dependencies" --compiler yui
REM python ..\scripts\buildtools\build.py

REM to use the php build tool do:
REM php -f ..\scripts\buildtools\build.php -- --deps=".\dependencies"
REM php -f ..\scripts\buildtools\build.php -- --deps=".\dependencies.ini" --compiler closure
REM php -f ..\scripts\buildtools\build.php -- --deps=".\dependencies.yml"
REM php -f ..\scripts\buildtools\build.php -- --deps=".\dependencies.json"
REM php -f ..\scripts\buildtools\build.php -- --deps=".\dependencies" --compiler=closure
REM php -f ..\scripts\buildtools\build.php -- --help --deps=".\dependencies" --compiler=closure

REM to use the node build tool do:
node ..\scripts\buildtools\build.js --deps ".\dependencies"
REM node ..\scripts\buildtools\build.js --deps ".\dependencies.ini"
REM node ..\scripts\buildtools\build.js --deps ".\dependencies.yml"
REM node ..\scripts\buildtools\build.js --deps ".\dependencies.json"
REM node ..\scripts\buildtools\build.js --deps ".\dependencies" --compiler yui
REM node ..\scripts\buildtools\build.js
