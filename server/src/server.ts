import { app } from './app';
import { env } from './config/env';
import { startSchedulers } from './services/scheduler';

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});

startSchedulers();
