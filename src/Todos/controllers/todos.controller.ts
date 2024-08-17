import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { updateTodoDTO } from '../dtos/update-todo.dto';
import { TodoService } from '../services/todo.service';
import { CreateTodoDTO } from '../dtos/create-todo.dto';

@Controller('todos')
export class TodosController {

    constructor( private readonly todoService: TodoService){}

    @Post()
    async createTodo(@Body() TodoDTO: CreateTodoDTO, @Res() res) {
        const newTodo = await this.todoService.createTodo(TodoDTO);
        console.log(newTodo);
        return res.status(HttpStatus.CREATED).json({
            message: 'Tâche créée avec succès',
            todo: newTodo,
          });
    }

    @Get()
    async getTodos(@Res() res) {
        const todos = await this.todoService.getTodos();
        return res.status(HttpStatus.OK).json({
            message: 'Liste de todos récupérée avec succès',
            todos: todos,
          });
    }

    @Get(':id')
    async getTodoById(@Param('id') id: string, @Res() res) {
        const todo = await this.todoService.getTodoById(id);
        return res.status(HttpStatus.OK).json({
            message: 'Tâche recupéré avec succès',
            todo: todo,
          });
    }

    // @Put()
    // async updateTodo(@Body() updatedTodo: TodoDTO[], @Res() res) {
    //     const modifiedTodo = await this.todoService.updateTodo(updatedTodo);
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Tâche modifiée avec succès',
    //         todo: modifiedTodo,
    //       });
    // }

    // update a specific Todo 
    @Put(':id')
    async updateTodo(@Param('id') id: string ,@Body() updatedTodo: updateTodoDTO, @Res() res) {
        try {
            const modifiedTodo = await this.todoService.updateTodo(id, updatedTodo);
            return res.status(HttpStatus.OK).json({
                message: 'Tâche modifiée avec succès',
                todo: modifiedTodo,
              });
        } catch (error) {
            if(error.code == 404)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            else 
                console.log("error: ", error);
        }

    }
    
    @Delete(':id')
    async deleteTodo( @Param('id') id: string, @Res() res ) {
        try {
            await this.todoService.deleteTodo(id);
            return res.status(HttpStatus.OK).json({
                message: 'Tâche supprimée avec succès',
              });
        } catch (error) {
            if(error.code == 404)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            else if(error.code == 500)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
            else
                console.log("error :", error)
        }

    }
}
