import { CalendarEvent } from '../types/calendarEvent';
import { CalendarOptions, Elements, HTMLElementProps } from '../types/calendar';
import { Day } from '../types/day';
import { Helper } from './Helper.class';
import { Localization } from './Localization.class';
import { Modal } from './Modal.class';
import { TileOptions } from '../types/tileOptions';
import { Logger } from './Logger.class';
import { getWeek } from 'date-fns';
import { CalendarToday, ChevronLeft, ChevronRight } from '../icons';

const MAX_DISPLAY_EVENTS_PER_DAY = 3;

const createElement = (props: HTMLElementProps) => {
  const element = document.createElement(props.type);

  element.innerHTML = props.content || '';

  element.onclick = props.onclick || null;

  if (Array.isArray(props.classes)) {
    props.classes?.forEach((cls) => {
      element.classList.add(cls);
    });
  } else if (props.classes) {
    element.classList.add(props.classes);
  }

  if (props.id) element.id = props.id;

  return element;
};

export class Calendar {
  initDate = new Date();
  elements = {
    root: null,
    header: null,
    headerContainer: null,
    body: null,
    innerBody: null,
    toolbar: {
      root: null,
      btnGroundContainer: null,
      prevBtn: null,
      nextBtn: null,
      todayBtn: null,
      current: null,
      viewChangerContainer: null,
    },
    rows: [],
    footer: null,
  } as Elements;
  days: Day[] = [];
  currentDate = new Date();

  modal: Modal | null = null;

  // Default options
  options: CalendarOptions = {
    locale: 'en_US',
    events: [] as CalendarEvent[],
    disableTooltip: true,
    readonly: false,
    onClick: ({ date }: { date: Day }) => {
      Logger.log(`Calendar: onClick event triggered:${JSON.stringify(date)}`);
    },
    onEventClick: (calendarEvent: CalendarEvent) => {
      Logger.log(`Calendar: onEventClick event triggered. Target: ${calendarEvent.title}`);
    },
    maxEventsPerDay: MAX_DISPLAY_EVENTS_PER_DAY,
    showDebugLogs: false,
    hideCopyright: false,
  };

  constructor(element: HTMLElement | string, options?: CalendarOptions) {
    this.elements.root = element instanceof HTMLElement ? element : document.querySelector(element);
    this.options = Object.assign(this.options, options);

    if (this.options.showDebugLogs) Logger.showDebugLog = true;
    if (this.options.locale) Localization.locale = this.options.locale;
    if (!this.options.maxEventsPerDay) this.options.maxEventsPerDay = MAX_DISPLAY_EVENTS_PER_DAY;

    if (this.options.events) this.options.events = Helper.parseCalendarEvents(this.options.events);

    this.initModal();
  }

  initModal = () => {
    this.modal = new Modal(this.elements.root);
    this.modal.init();
  };

  createToolbar() {
    this.elements.toolbar.root = createElement({
      type: 'div',
      classes: 'toolbar',
    });

    this.elements.toolbar.btnGroundContainer = createElement({
      type: 'div',
      classes: 'btnGroupContainer',
    });

    this.elements.toolbar.prevBtn = createElement({
      type: 'button',
      classes: ['btn', 'prev'],
      content: ChevronLeft,
      onclick: this.previous(),
    }) as HTMLButtonElement;

    this.elements.toolbar.todayBtn = createElement({
      type: 'button',
      classes: ['btn', 'today'],
      content: CalendarToday,
      onclick: this.today(),
    }) as HTMLButtonElement;

    this.elements.toolbar.nextBtn = createElement({
      type: 'button',
      classes: ['btn', 'next'],
      content: ChevronRight,
      onclick: this.next(),
    }) as HTMLButtonElement;

    this.elements.toolbar.current = createElement({
      type: 'h3',
      classes: 'current',
      content: `${Localization.localize('loading')}...`,
    });

    this.elements.toolbar.viewChangerContainer = createElement({
      type: 'div',
      classes: 'viewChangerContainer',
    });

    this.elements.toolbar.btnGroundContainer.appendChild(this.elements.toolbar.prevBtn);
    this.elements.toolbar.btnGroundContainer.appendChild(this.elements.toolbar.todayBtn);
    this.elements.toolbar.btnGroundContainer.appendChild(this.elements.toolbar.nextBtn);

    this.elements.toolbar.root.appendChild(this.elements.toolbar.btnGroundContainer);
    this.elements.toolbar.root.appendChild(this.elements.toolbar.current);
    this.elements.toolbar.root.appendChild(this.elements.toolbar.viewChangerContainer);
    this.elements.root?.appendChild(this.elements.toolbar.root);
  }

  createFooter() {
    if (!this.options.hideCopyright) {
      this.elements.footer = createElement({
        type: 'div',
        classes: 'footer',
        content: `<h6>&copy; ${new Date().getFullYear()} <a href="https://clean-calendar.baum-lukas.de" target="_blank">Clean Calendar</a></h6>`,
      });

      this.elements.body?.appendChild(this.elements.footer);
    }
  }

  previous() {
    return () => {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      this.update();
    };
  }

  today() {
    return () => {
      const sameMonth =
        this.currentDate.getMonth() === this.initDate.getMonth() &&
        this.currentDate.getFullYear() === this.initDate.getFullYear();
      if (!sameMonth) {
        this.currentDate = this.initDate;
        this.update();
      }
    };
  }

  next() {
    return () => {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      this.update();
    };
  }

  createElements() {
    this.createToolbar();

    this.elements.header = createElement({ type: 'div', classes: ['header'] });

    this.elements.innerBody = createElement({
      type: 'div',
      classes: 'innerBody',
    });

    this.elements.body = createElement({ type: 'div', classes: ['body'] });

    this.elements.body.appendChild(this.elements.header);
    this.elements.body.appendChild(this.elements.innerBody);
    this.elements.root?.appendChild(this.elements.body);
  }

  createDay = (day: Day, options?: TileOptions) => {
    const classes = ['tile', 'day'];

    if (options?.isSelected) {
      classes.push('selected');
    }

    if (!this.options.readonly && !(day?.isNextMonth || day?.isPrevMonth)) {
      classes.push('editable');
    }

    if (Helper.isToday(this.initDate, day.date)) {
      classes.push('today');
    }

    const el = createElement({
      type: 'div',
      content: `<span class="date">${day.date.getDate()}</span>`,
      classes,
    });

    el.onclick = () => {
      this.options.onClick &&
        this.options.onClick({
          date: day,
        });

      this.currentDate = day.date;
    };

    if (options?.addWeekNumber && options.index % 7 === 0) {
      const weekElement = document.createElement('span');
      weekElement.classList.add('weekNumber');
      weekElement.innerHTML = '' + getWeek(day.date);
      el.append(weekElement);
    }

    if (day?.isNextMonth || day?.isPrevMonth) {
      el.classList.add('outerMonth');
    }

    return el;
  };

  calculateDays = () => {
    this.days = [];

    const days = Helper.daysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());

    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const lastMonth = Helper.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const date = new Date(
        this.currentDate.getFullYear(),
        (this.currentDate.getMonth() - 1) % 11,
        lastMonth + i - firstDayOfMonth.getDay() + 1
      );

      this.days.push({
        date,
        isPrevMonth: true,
        children: [],
        events: [],
      } as Day);
    }

    for (let i = 0; i < days; i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i + 1);

      this.days.push({
        date,
        isCurrentMonth: true,
        children: [],
        events: [],
      } as Day);
    }

    for (let i = 1; i < 7 - lastDayOfMonth.getDay(); i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, i);
      this.days.push({
        date,
        isNextMonth: true,
        children: [],
        events: [],
      } as Day);
    }
  };

  render() {
    if (this.elements.innerBody === null || this.days == undefined) return;
    this.elements.innerBody.innerHTML = '';
    for (let i = 0; i < this.days.length; i++) {
      const dayHTML = this.createDay(this.days[i], {
        addWeekNumber: true,
        index: i,
      });
      this.days[i].events?.forEach((event: HTMLElement) => {
        dayHTML.appendChild(event);
      });
      this.elements.innerBody.appendChild(dayHTML);
    }
  }

  displayDayNames = () => {
    for (let i = 0; i < Object.values(Localization.days).length; i++) {
      const day = document.createElement('span');
      day.classList.add('weekday');
      day.innerText = Localization.localizeDay(i);
      this.elements.header?.appendChild(day);
    }
  };

  displayToolbar = () => {
    if (this.elements.toolbar.current) {
      this.elements.toolbar.current.innerText = `${
        Object.values(Localization.months)[this.currentDate.getMonth()]
      } ${this.currentDate.getFullYear()}`;
    }
  };

  createCalendarEvent = (
    calendarEvent: CalendarEvent,
    options?: {
      isStart?: boolean;
      isEnd?: boolean;
      isCenter?: boolean;
      showTitle?: boolean;
    }
  ) => {
    const calEventHTML = document.createElement('div');
    calEventHTML.classList.add('calendarEvent');
    calEventHTML.style.backgroundColor = calendarEvent.color || '';

    if (options?.isStart) calEventHTML.classList.add('eventStart');
    else if (options?.isCenter) calEventHTML.classList.add('eventCenter');
    else if (options?.isEnd) calEventHTML.classList.add('eventEnd');
    calEventHTML.innerHTML = `<span class="title">${
      options?.isStart || options?.showTitle ? calendarEvent.title : '&#8205;'
    }</span>`;

    calEventHTML.onclick = (e) => {
      e.stopPropagation();
      this.options.onEventClick && this.options.onEventClick(calendarEvent, e);
    };

    if (!this.options.disableTooltip && calendarEvent.description && calendarEvent.description?.length > 0)
      calEventHTML.innerHTML += `<p class="description">${calendarEvent.description}</p>`;

    return calEventHTML;
  };

  createSpacer = () => {
    const spacerHTML = document.createElement('div');
    spacerHTML.classList.add('spacer');
    spacerHTML.innerHTML = `<span class="title">&#8205;</span>`;

    return spacerHTML;
  };

  getEvents = (date: Date) => {
    return (
      this.options.events &&
      this.options.events.filter(
        (event) =>
          Helper.isToday(event.start, date) ||
          Helper.isToday(event.start, date) ||
          (event.end && event.start.getTime() < date.getTime() && date.getTime() < event.end.getTime())
      )
    );
  };

  createShowMoreBtn = (day: Day, count: number) => {
    const btnHTML = document.createElement('button');
    btnHTML.innerHTML = '+' + count;
    btnHTML.classList.add('btnShowMore');

    btnHTML.onclick = (e) => {
      e.stopPropagation();
      this.modal?.showToday(day.date, this.getEvents(day.date));
      this.modal?.show();
    };

    return btnHTML;
  };

  // TODO: Refactor this method. fcking mess from gpt
  attachCalendarEvents = () => {
    const sortByIsAllDay = (a: CalendarEvent, b: CalendarEvent) => {
      return (b.end !== undefined ? 1 : 0) - (a.end != undefined ? 1 : 0);
    };

    const sortByStart = (a: CalendarEvent, b: CalendarEvent) => a.start.getDate() - b.start.getDate();

    const isCurrentMonth = (event: CalendarEvent) =>
      event.start.getMonth() === this.currentDate.getMonth() || event.end?.getMonth() === this.currentDate.getMonth();

    const filtered = this.options.events.sort(sortByIsAllDay).sort(sortByStart).filter(isCurrentMonth);

    console.log(filtered);

    filtered.forEach((event: CalendarEvent) => {
      const start = this.days.find((day) => Helper.isToday(event.start, day.date));
      if (start == undefined || start.events == undefined) return;
      const starterPosition = start.events.length + 1;

      if (event.end) {
        const end = this.days.find((day) => Helper.isToday(event.end!, day.date)) || this.days[this.days.length - 1];
        const diff = this.days.filter((day) => Helper.isInBetween(day.date, event.start, event.end!));

        start.events.push(this.createCalendarEvent(event, { isStart: true }));
        diff.forEach((e) => {
          if (Helper.isToday(e.date, end.date) || Helper.isToday(e.date, start.date) || e.events == undefined) return;
          const lengthDiff = starterPosition - e.events.length - 1;
          for (let i = 0; i < lengthDiff; i++) {
            e.events.push(this.createSpacer());
          }
          e.events.push(this.createCalendarEvent(event, { isCenter: true }));
        });

        if (end.events != undefined) {
          const lengthDiff = starterPosition - end.events.length - 1;
          for (let i = 0; i < lengthDiff; i++) {
            end.events.push(this.createSpacer());
          }
          end.events.push(this.createCalendarEvent(event, { isEnd: true }));
        }
      } else {
        start.events.push(this.createCalendarEvent(event, { showTitle: true }));
      }
    });

    console.log(this.days);

    this.days.forEach((day) => {
      const sumEvents = day.events.length;

      if (sumEvents > this.options.maxEventsPerDay!) {
        //FIXME: If event starts and end on the same day, the show more button display wrong number of events
        day.events.length = this.options.maxEventsPerDay!;
        day.events.push(this.createShowMoreBtn(day, sumEvents - this.options.maxEventsPerDay!));
      }
    });
  };

  update = () => {
    this.displayToolbar();
    this.calculateDays();
    this.attachCalendarEvents();
    this.render();
  };

  init = () => {
    this.createElements();
    this.displayDayNames();
    this.createFooter();
    this.update();
  };
}
