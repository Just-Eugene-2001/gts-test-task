export type NewEvent = {
  date: string;
  importance: string;
  hardware: string;
  message: string;
  responsible: string;
}

export type Event = NewEvent & {
  read: boolean;
  id: number;
}

export type EventsState = {
  eventsList: Event[];

}