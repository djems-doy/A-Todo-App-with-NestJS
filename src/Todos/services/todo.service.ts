import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todos.schema';
import { TodoDTO } from '../dtos/todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>){}
    
    async createTodo( todo: TodoDTO): Promise<Todo> {
        
        try {
            const newTodo = await new this.todoModel(todo);
            newTodo.save();
            return newTodo;
        } catch (error) {
            throw new HttpException(
                {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erreur lors de la création de la tâche',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getTodos(): Promise<Todo[]> {

        const todos = await this.todoModel.find();
        return todos;
    }

    async getTodoById( id: string): Promise<Todo> {

        const todo = await this.todoModel.findById({'_id': id});
        if(!todo) {
            throw new HttpException(`Le todo possédant l'id ${id} est introuvable`, HttpStatus.NOT_FOUND)
        }
        return todo;
    }

    async updateTodo( id: string, updatedTodo: TodoDTO): Promise<Todo> {

        try {
            let todo = this.todoModel.findByIdAndUpdate(id, {...updatedTodo}, {new: true}); 
            return todo;
        } catch (error) {
            throw new HttpException(
                {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erreur lors de la modification de la tâche',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR);  
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
            throw new HttpException(
                {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erreur lors de la suppréssion de la tâche',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR);  
        }
    }
}


