# A-Todo-App-with-NestJS
  #This mini project are done with the framework NestJS for a simple CRUD Todo App
# URLs use in the app :
  #"http://localhost:3000/todos/"    :use (with the Post http verb) to create a todo 
  #"http://localhost:3000/todos"     :use (with the Get http verb) to get all the todos saved on the app
  #"http://localhost:3000/todos/:id" :use (with the Get http verb) to get a specific todo 
  #"http://localhost:3000/todos/:id" :use (with the Delete http verb) to delete a specific todo 
  #"http://localhost:3000/todos/:id" :use (with the Put http verb) to update a specific todo and for this endpoint (URL) you have to pass the update object and his id.
# Models à utiliser :
{
  name: string,
  description: string,
  category: string;
  startDate: Date;
  endDate: Date,
  do: boolean
}
