import {
  Component,
  ElementRef,
  afterRenderEffect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { Todo } from '../../types/todos';

import { TodoStore } from './todo-store';
import { inputValue } from './input-value';

@Component({
  selector: 'app-todo-row',
  host: { '[class.completed]': 'todo().completed' },
  template: `
    <input
      type="checkbox"
      [checked]="todo().completed"
      [attr.aria-label]="todo().completed ? todo().title + ' — mark not completed' : todo().title + ' — mark completed'"
      (change)="store.toggle(todo().id)"
    />
    @if (editing()) {
      <input
        #editInput
        class="todo-edit"
        type="text"
        aria-label="Edit todo title"
        [value]="draft()"
        (input)="onInput($event)"
        (keydown.enter)="commit()"
        (keydown.escape)="cancel()"
        (blur)="commit()"
      />
    } @else {
      <button type="button" class="todo-title" (click)="startEdit()">
        {{ todo().title }}
      </button>
      <button
        type="button"
        class="todo-delete"
        [attr.aria-label]="'Delete ' + todo().title"
        (click)="store.remove(todo().id)"
      >
        Delete
      </button>
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.5rem 0;
    }

    .todo-title {
      flex: 1;
      text-align: left;
    }

    :host(.completed) .todo-title {
      text-decoration: line-through;
      color: #6b7280;
    }

    .todo-edit {
      flex: 1;
    }

    .todo-delete {
      color: #6b7280;
    }

    .todo-delete:hover {
      color: #dc2626;
    }
  `,
})
export class TodoRow {
  readonly todo = input.required<Todo>();

  protected readonly store = inject(TodoStore);

  private readonly editing = signal(false);
  private readonly draft = signal('');

  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    afterRenderEffect(() => {
      this.editInput()?.nativeElement.focus();
    });
  }

  protected startEdit(): void {
    this.draft.set(this.todo().title);
    this.editing.set(true);
  }

  protected onInput(event: Event): void {
    this.draft.set(inputValue(event));
  }

  protected commit(): void {
    if (!this.editing()) {
      return;
    }
    this.store.rename(this.todo().id, this.draft());
    this.editing.set(false);
  }

  protected cancel(): void {
    this.editing.set(false);
  }
}
