
const classDecorator = (constructor: typeof Boat): void => {
  console.log(constructor);
}

const parameterDecorator = (target: any, key: string, index: number): void => {
  console.log(key, index);
}

const testDecorator = (target: any, key: string): void => {
  console.log(key);
}

const logError = (errorMessage: string) => (target: any, key: string, desc: PropertyDescriptor): void => {
  const method = desc.value;

  desc.value = () => {
    try {
      method();
    } catch (e) {
      console.warn(errorMessage, e);
    }
  }
}


@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @logError('OOpsie!')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('Vroooom');
    } else {
      console.log('no pilot here, Maaaan');
    }
  }
}

