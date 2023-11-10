import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { EventsState, NewEvent } from '../types';


const initialState: EventsState = {
  eventsList: [],
}

const certificatesSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<NewEvent>) {
      state.eventsList = [...state.eventsList,
        {
          date: action.payload.date,
          importance: action.payload.importance,
          hardware: action.payload.hardware,
          message: action.payload.message,
          responsible: action.payload.responsible,
          read: false,
          id: state.eventsList.length
        }];
    },
    setRead(state, action: PayloadAction<any>) {
      state.eventsList[action.payload].read = true;
    }
  }
});

export const { addEvent, setRead } = certificatesSlice.actions;
export default certificatesSlice.reducer;
