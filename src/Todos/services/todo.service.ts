import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todos.schema';
import { TodoDTO } from '../dtos/todo.dto';
import { CreateTodoDTO } from '../dtos/createTodo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>){}
    
    async createTodo( todo: CreateTodoDTO): Promise<Todo> {
        
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

    async updateTodo(updatedTodo: TodoDTO[]){

        try {
            updatedTodo.forEach(async (newTodo) => {
                await this.todoModel.findByIdAndUpdate(newTodo._id , newTodo, {new: true}); 
            })
            console.log("Tab Todos :", updatedTodo)
            // setTimeout(() => {console.log("Tab Todos :", updatedTodo)}, 5000)
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


