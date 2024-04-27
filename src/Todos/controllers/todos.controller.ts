import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TodoDTO } from '../dtos/todo.dto';
import { TodoService } from '../services/todo.service';
import { CreateTodoDTO } from '../dtos/createTodo.dto';

@Controller('todos')
export class TodosController {

    constructor( private readonly todoService: TodoService){}

    @Post('add-todo')
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

    @Put()
    async updateTodo(@Body() updatedTodo: TodoDTO[], @Res() res) {
        const modifiedTodo = await this.todoService.updateTodo(updatedTodo);
        return res.status(HttpStatus.OK).json({
            message: 'Tâche modifiée avec succès',
            todo: modifiedTodo,
          });
    }
    
    @Delete(':id')
    async deleteTodo( @Param('id') id: string, @Res() res ) {
        await this.todoService.deleteTodo(id);
        return res.status(HttpStatus.OK).json({
            message: 'Tâche supprimée avec succès',
          });
    }
}
