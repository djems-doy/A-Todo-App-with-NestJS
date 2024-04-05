import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { todoSchema } from './models/todos.schema';
import { TodosController } from './controllers/todos.controller';
import { TodoService } from './services/todo.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Todo',
            schema: todoSchema
        }])
    ],
    controllers: [TodosController],
    providers: [TodoService]
})
export class TodoModule {}
