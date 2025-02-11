import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

//   // Enable CORS (if needed)
//   app.enableCors({
//     origin: 'http://localhost:3000', // Change this to your frontend URL
//     credentials: true,
//   });

  // Use global validation pipes for DTO validation
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,  // Removes extra properties not defined in DTOs
    forbidNonWhitelisted: true, // Throws an error if extra properties are sent
    transform: true,  // Automatically transforms request payloads to DTO instances
  }));

  // Middleware for handling cookies
//   app.use(cookieParser());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();
