// ============== by default ==============

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

// bootstrap();

// ============== fastify ==============
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();

// ============== multithread ==============
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// import { NestFactory } from "@nestjs/core"
// import { AppModule } from "./app.module"
// const cluster = require("cluster")
// const numCPUs = require("os").cpus().length

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`)
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork()
//     }

//     cluster.on("exit", (worker, code, signal) => {
//       console.log(`worker ${worker.process.pid} died`)
//     })
//   } else {
//     await app.listen(process.env.PORT || 3000)
//     console.log(`Worker ${process.pid} started`)
//   }
// }
// bootstrap()
