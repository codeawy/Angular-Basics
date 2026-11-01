import { Component, output, signal } from '@angular/core';

import { inputValue } from './input-value';

@Component({
  selector: 'app-todo-form',
  template: `
    <form class="todo-form" (submit)="submit($event)">
      <label class="visually-hidden" for="new-todo-title">New todo title</label>
      <input
        id="new-todo-title"
        name="title"
        type="text"
        autocomplete="off"
        placeholder="What needs doing?"
        [value]="title()"
        (input)="onInput($event)"
      />
      <button type="submit">Add</button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      gap: 0.5rem;
    }

    input[type='text'] {
      flex: 1;
    }
  `,
})
export class TodoForm {
  readonly added = output<string>();

  private readonly title = signal('');

  protected onInput(event: Event): void {
    this.title.set(inputValue(event));
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const title = this.title().trim();
    if (title === '') {
      return;
    }
    this.added.emit(title);
    this.title.set('');
  }
}
