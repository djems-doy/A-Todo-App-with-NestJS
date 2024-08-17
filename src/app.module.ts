import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './Todos/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb+srv://chrispin:Mnopq2005%40@cluster0.uhv8z7y.mongodb.net/')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
