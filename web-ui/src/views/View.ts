import { Model } from '../models/Model';
import { RegionMap, RegionsMap, EventMap } from '../lib/types';
export abstract class View<T extends Model<K>, K> {
  regions: RegionMap = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap = (): RegionsMap => ({})

  eventsMap = (): EventMap => ({})

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();
    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();

    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender = (): void => {}

  render = (): void => {
    this.parent.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = this.template();

    this.bindEvents(template.content);
    this.mapRegions(template.content);

    this.onRender();
    this.parent.append(template.content);
  }
}
