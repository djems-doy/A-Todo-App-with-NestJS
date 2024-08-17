import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todos.schema';
import { updateTodoDTO } from '../dtos/update-todo.dto';
import { CreateTodoDTO } from '../dtos/create-todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>){}
    
    async createTodo( todo: CreateTodoDTO): Promise<Todo> {
        
        try {
            const newTodo = await new this.todoModel(todo);
            newTodo.save();
            return newTodo;
        } catch (error) {
            console.log('error in the service with message: ', error.message)
    }
}

    async getTodos(): Promise<Todo[]> {
        try {
            return await this.todoModel.find();
        } catch (error) {
            console.log('error in the service with message: ', error.message)
        }
    }

    async getTodoById( id: string): Promise<Todo> {

        try {
            const todo = await this.todoModel.findById({'_id': id});
            if(!todo) {
                throw new HttpException(`Le todo possédant l'id ${id} est introuvable`, HttpStatus.NOT_FOUND)
            }
            return todo;
        } catch (error) {
            console.log('error in the service with message: ', error.message)
        }
  
    }

    async updateTodo(id:string , updatedTodo: updateTodoDTO){

        try {
            return await this.todoModel.findOneAndUpdate({"_id": id}, updatedTodo)
        } catch (error) {
            console.log('error in the service with message: ', error.message) 
        }
    }

    async deleteTodo( id: string) {
        try {
            const todo = await this.todoModel.findById(id);
            if (!todo) {
              throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'La tâche n\'existe pas',
              }, HttpStatus.NOT_FOUND);
            }
            
            await this.todoModel.findByIdAndDelete(id); 
        } catch (error) {
            console.log('error in the service with message: ', error.message)
        }
    }
}


