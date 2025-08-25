import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  private tasks: Task[] = [
    { id: 1, name: 'Aprender os fundamentos do Angular', completed: true },
    { id: 2, name: 'Criar a estrutura HTML do componente', completed: true },
    { id: 3, name: 'Estilizar o componente com CSS profissional', completed: true },
    { id: 4, name: 'Criar a lista de tarefas no TypeScript', completed: false },
    { id: 5, name: 'Exibir a lista de tarefas dinamicamente', completed: false },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(taskName: string) {
    // <--- CORRIGIDO AQUI
    const name = taskName.trim();
    if (name) {
      const newTask: Task = {
        id: Date.now(),
        name: name,
        completed: false,
      };
      this.tasks.push(newTask);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // --- NOSSO NOVO MÉTODO ---
  toggleTaskCompleted(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
}
