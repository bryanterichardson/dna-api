import cluster from 'cluster'
import debug from 'debug'
import os from 'os'

import createApp from './app.js';


const logger = debug('app:entry')

// Check if current process is master.
if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
    logger('os.cpus(): ', os.cpus());
    logger('os.cpus().length: ', os.cpus().length);
    logger('Creating forks!')
    // Get total CPU cores.
    let cpuCount = os.cpus().length;

    // Spawn a worker for every core.
    for (let j = 0; j < cpuCount; j++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger(`worker ${worker.process.pid} died`);
    });
} else {
    // This is not the master process, so we spawn the express server.
    const app = createApp()
    const port = parseInt(process.env.PORT ?? "3000");
    app.set("port", port);

    const env = process.env.NODE_ENV ?? "development";
    app.set("env", env);

    app.listen(port);
    logger('App running in fork!')
}
