import { View } from './View';
\
export class UserForm extends View {

  eventsMap = (): { [key: string]: () => void } => ({
    'mouseenter:h1': this.onHeaderHover,
    'click:.set-age': this.onSetAgeClick,
    'click:.set-name': this.onSetNameClick,
  })

  onHeaderHover = (): void => {
    console.log('Hovered over h1');
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

}
