import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // 1. Importamos o OnInit

// 2. Importamos nosso Serviço e a Interface Task de dentro do arquivo do serviço
import { Task, TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {
  // 3. Implementamos a interface OnInit

  // A lista de tarefas do componente agora começa vazia. Ela será preenchida pelo serviço.
  tasks: Task[] = [];

  // 4. INJEÇÃO DE DEPENDÊNCIA acontece aqui, no constructor!
  constructor(private taskService: TaskService) {}

  // ngOnInit é o lugar perfeito para buscar os dados iniciais.
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  // O componente agora DELEGA a responsabilidade para oo servico.
  addTask(inputElement: HTMLInputElement): void {
    const taskName = inputElement.value.trim();
    if (taskName) {
      this.taskService.addTask(taskName);
      inputElement.value = '';
      // Atualizamos a lista local para refletir a adição.
      this.tasks = this.taskService.getTasks();
    }
  }

  // O deleteTask também DELEGA a responsabilidade.
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    // Atualizamos a lista local para refletir a exclusão.
    this.tasks = this.taskService.getTasks();
  }
}
