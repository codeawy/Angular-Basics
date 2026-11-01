import { Component, inject } from '@angular/core';

import { TodoForm } from './todos/todo-form';
import { TodoRow } from './todos/todo-row';
import { TodoStore } from './todos/todo-store';

@Component({
  selector: 'app-root',
  imports: [TodoForm, TodoRow],
  template: `
    <main class="app">
      <h1>Todos</h1>
      <app-todo-form (added)="store.add($event)" />
      @if (store.todos().length === 0) {
        <p class="empty">Nothing yet — add your first todo above.</p>
      } @else {
        <ul class="todo-list">
          @for (todo of store.todos(); track todo.id) {
            <li>
              <app-todo-row [todo]="todo" />
            </li>
          }
        </ul>
      }
    </main>
  `,
  styles: `
    .app {
      max-width: 30rem;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 1.75rem;
      margin: 0 0 1rem;
    }

    .todo-list {
      list-style: none;
      margin: 1rem 0 0;
      padding: 0;
    }

    .empty {
      color: #6b7280;
      margin: 1rem 0 0;
    }
  `,
})
export class App {
  protected readonly store = inject(TodoStore);
}
