import { useEffect, useState, useCallback } from "react";
import { DataView } from 'primereact/dataview';
import { Event } from "../../types"

interface CardsProps {
  eventsList: Event[];
  filters: number[];
  setRead: (index: number) => void;
}

function Cards({eventsList, filters, setRead}: CardsProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSpace = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && selectedEvent?.id !== undefined) {
      e.preventDefault();
      setRead(selectedEvent.id);
    }
  }, [selectedEvent, setRead]);

  useEffect(() => {
    document.addEventListener("keydown", handleSpace);
    return () => document.removeEventListener("keydown", handleSpace);
  }, [handleSpace]);

  const gridItem = (event: Event) => {
    return (
      <div className="col-12 lg:col-6 xl:col-4 p-2">
        <div
          onClick={() => setSelectedEvent(event)}
          className={`card border-2 border-round border-solid p-2 h-full cursor-pointer hover:surface-100 ${selectedEvent?.id === event.id ? "surface-100" : ""} ${event.read ? "surface-200" : ""}`}
        >
          <div className="flex justify-content-between">
            <div className="">
              <div
                className=""
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'min-content auto'
              }}>
                <p className="m-1">Дата</p>
                <p className="m-1">{event.date}</p>
                <p className="m-1">Важность</p>
                <p className="m-1">{event.importance}</p>
                <p className="m-1">Оборудование</p>
                <p className="m-1">{event.hardware}</p>
                <p className="m-1">Сообщение</p>
                <p className="m-1">{event.message}</p>
              </div>
            </div>
            <div className="">
              <div className="flex flex-column align-items-center">
                <div className="w-4rem h-4rem surface-500 border-circle"></div>
                <p className="my-2 text-center">{event?.responsible}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="cards">
      <DataView
        value={filters.length ? filters?.map(index => eventsList[index]) : eventsList}
        itemTemplate={gridItem}
        layout={"grid"}
        paginator
        rows={9}
        paginatorPosition={"top"}
      />
    </div>
  )
}

export default Cards;
