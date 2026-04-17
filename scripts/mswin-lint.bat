@echo off
cd /d "%~dp0.."
echo ESLint is not configured in the modernized toolchain yet.
echo Running TypeScript typecheck instead.
npm run typecheck

pause
