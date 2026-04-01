if [ ! -f "./data/.env" ]; then
  bun --bun ./server.js
else
  set -a && source ./data/.env && set +a && bun --bun ./server.js
fi