import cluster from 'cluster'
import debug from 'debug'
import os from 'os'

import createApp from './app.js';


const debug_logger = debug('app:entry')

// Check if current process is master.
if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
    debug_logger('os.cpus(): ', os.cpus());
    debug_logger('os.cpus().length: ', os.cpus().length);
    debug_logger('Creating forks!')
    // Get total CPU cores.
    let cpuCount = os.cpus().length;

    // Spawn a worker for every core.
    for (let j = 0; j < cpuCount; j++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        debug_logger(`worker ${worker.process.pid} died`);
    });
} else {
    // This is not the master process, so we spawn the express server.
    const app = createApp()
    const port = parseInt(process.env.PORT ?? "3000");
    app.set("port", port);

    const env = process.env.NODE_ENV ?? "development";
    app.set("env", env);

    app.listen(port);
    debug_logger('App running in fork!')
}
