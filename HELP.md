Set-ExecutionPolicy Unrestricted -Scope Process

 redis-cli -a pass -h host -p port

Tuve un problema con channels y channels redis con el host redisToGo debido a que usa una version vieja 

REDIS_URL=redis://redistogo:pass@tarpon.redistogo.com:port/