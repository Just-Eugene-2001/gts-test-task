import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../redux/hook';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../redux/store';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode } from "primereact/api";
import Table from '../components/table';
import Cards from '../components/cards';
import { addEvent, setRead } from '../redux/eventsSlice';
import { giveRandomEvent } from '../lib/event-options';

function App() {
  const dispatch = useAppDispatch();

  const [view, setView] = useState<"tables" | "cards">("tables");
  const [messageFilterValue, setMessageFilterValue] = useState<string>('');
  const [idOfFilteredEvents, setIdOfFilteredEvents] = useState<number[]>([]);

  const select = useSelector((state: RootState) => ({
    eventsList: state.events.eventsList
  }), shallowEqual);

  const callbacks = {
    addEvent: useCallback(() => {
      dispatch(addEvent(giveRandomEvent()))
    }, [dispatch]),
    setRead: useCallback((index: number) => {
      dispatch(setRead(index))
    }, [dispatch])
  };

  useEffect(() => {
    setInterval(() => dispatch(addEvent(giveRandomEvent())), 2000);
  }, [dispatch])

  const [filters, setFilters] = useState({
    message: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const onMessageFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageFilterValue(e.target.value);
  };

  const onMessageFilter = () => {
    const value = messageFilterValue;
    let _filters = { ...filters };
    // @ts-ignore
    _filters['message'].value = value;
    setFilters(_filters);

    let result = select.eventsList
      .filter(item => {
        if (!value) return true;
        if (item.message.toLowerCase().trimStart().includes(value.toLowerCase())) {
          return true;
        }
        return false;
    })

    if (value) {
      setIdOfFilteredEvents(result.map(function(inner) { return inner.id }));
    }
    else {
      setIdOfFilteredEvents([]);
    }
  }

  return (
    <div className="flex flex-column gap-2 h-screen py-2 mx-2">
      <div className="flex flex-wrap justify-content-between">
        <div className="flex gap-2">
          <Button label="Таблица" onClick={() => setView("tables")}/>
          <Button label="Карточки" onClick={() => setView("cards")}/>
        </div>
        <div className="flex gap-2">
          <InputText
            placeholder="Поиск"
            type="text"
            value={messageFilterValue}
            onChange={onMessageFilterChange}
          />
          <Button label="Поиск" onClick={onMessageFilter}/>
        </div>
      </div>
      <div className="mt-2">
        {view === "tables" ?
          <Table eventsList={select.eventsList} filters={filters} setRead={callbacks.setRead}/> :
          <Cards eventsList={select.eventsList} filters={idOfFilteredEvents} setRead={callbacks.setRead}/>
        }
      </div>
    </div>
  );
}

export default App;