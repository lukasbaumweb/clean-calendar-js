import { CalendarEvent } from '../types/calendarEvent';
import { Localization } from './Localization.class';
import { Logger } from './Logger.class';
import { format } from 'date-fns';

export class Modal {
  parent: HTMLElement | null = null;
  wrapper: HTMLDivElement | null = null;
  modalBackground: HTMLDivElement | null = null;
  modal: HTMLDivElement | null = null;
  header: HTMLElement | null = null;
  title: HTMLDivElement | null = null;
  body: HTMLElement | null = null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
  }

  generateEventLinks(event: CalendarEvent) {
    const end = event.end ? `<span class="end">${format(event.end, 'dd.MM.yyyy hh:mm:ss')}</span>` : '';

    if (event.isAllDay) {
      return `<p>
      <span class="title">${event.title}${Localization.localize('allDay')}</span>
      </p>`;
    }

    return `<p>
      <span class="title">${event.title}</span>
      <span class="start">${format(event.start, 'dd.MM.yyyy hh:mm:ss')}</span>
      ${end}
    </p>`;
  }

  createHeader = () => {
    this.header = document.createElement('div');
    this.header.classList.add('header');

    this.title = document.createElement('div');
    this.title.classList.add('title');
    this.header.append(this.title);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('closeBtn');
    closeBtn.innerHTML = `
    <?xml version="1.0" encoding="utf-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="close">
            <path id="x" d="M18.717 6.697l-1.414-1.414-5.303 5.303-5.303-5.303-1.414 1.414 5.303 5.303-5.303 5.303 1.414 1.414 5.303-5.303 5.303 5.303 1.414-1.414-5.303-5.303z"/>
        </g>
    </svg>
    `;
    closeBtn.onclick = () => this.hide();

    this.header.append(closeBtn);

    this.modal?.append(this.header);
  };

  init(parent?: HTMLElement) {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('modal-container');

    this.modalBackground = document.createElement('div');
    this.modalBackground.classList.add('modal-background');
    this.modalBackground.onclick = () => this.hide();

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.onclick = (e) => e.stopPropagation();

    this.createHeader();

    this.body = document.createElement('div');
    this.body.classList.add('body');
    this.modal.append(this.body);

    this.modalBackground.appendChild(this.modal);
    this.wrapper.appendChild(this.modalBackground);

    (parent || this.parent)?.appendChild(this.wrapper);
  }

  setTitle = (title: string) => {
    if (this.title) this.title.innerHTML = `<p>${title}</p>`;
    else Logger.log('Modal: title not set');
  };

  showToday = (date: Date, events: CalendarEvent[]) => {
    this.setTitle(date.toLocaleDateString());
    let content = '';

    for (let i = 0; i < events.length; i++) {
      content += this.generateEventLinks(events[i]);
    }

    if (this.body) this.body.innerHTML = content;
  };

  hide() {
    this.wrapper?.classList.remove('open');
    this.parent?.classList.remove('modal-active');
  }

  show() {
    this.wrapper?.classList.add('open');
    this.parent?.classList.add('modal-active');
  }
}
