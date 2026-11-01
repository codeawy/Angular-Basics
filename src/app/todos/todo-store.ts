import { Service, effect, inject, signal } from '@angular/core';

import { Todo } from '../../types/todos';

import { TodoStorage } from './todo-storage';

@Service()
export class TodoStore {
  private readonly storage = inject(TodoStorage);

  private readonly _todos = signal<Todo[]>(this.storage.load());

  /** All todos, oldest first. */
  readonly todos = this._todos.asReadonly();

  constructor() {
    effect(() => this.storage.save(this._todos()));
  }

  add(title: string): void {
    const trimmed = title.trim();
    if (trimmed === '') {
      return;
    }
    this._todos.update((todos) => [
      ...todos,
      { id: nextId(todos), title: trimmed, completed: false },
    ]);
  }

  toggle(id: number): void {
    this._todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  remove(id: number): void {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  /** Renames a todo; renaming to blank deletes it. */
  rename(id: number, title: string): void {
    const trimmed = title.trim();
    if (trimmed === '') {
      this.remove(id);
      return;
    }
    this._todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmed } : todo,
      ),
    );
  }
}

function nextId(todos: Todo[]): number {
  return todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
}
