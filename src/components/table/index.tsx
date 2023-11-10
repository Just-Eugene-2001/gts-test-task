import { useEffect, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Event } from '../../types';

interface TableProps {
  eventsList: Event[];
  filters: any;
  setRead: (index: number) => void;
}

function Table({eventsList, filters, setRead}: TableProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSpace = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && selectedEvent?.id !== undefined) {
      e.preventDefault();
      setRead(selectedEvent.id);
    }
  }, [selectedEvent, setRead])

  useEffect(() => {
    document.addEventListener("keydown", handleSpace);
    return () => document.removeEventListener("keydown", handleSpace);
  }, [handleSpace])

  const rowClass = (event: Event) => {
    return {
      'surface-200': event.read
    };
  };

  return (
    <div className="table" >
      <DataTable
        value={eventsList}
        showGridlines
        paginator
        rows={14}
        paginatorPosition={"top"}
        removableSort
        filters={filters}
        globalFilterFields={["message"]}
        selectionMode="single"
        selection={selectedEvent!}
        onSelectionChange={(e) => setSelectedEvent(e.value)}
        rowClassName={rowClass}
      >
        <Column field="date" header="Дата" style={{ width: '15%' }}></Column>
        <Column field="importance" header="Важность" style={{ width: '15%' }}></Column>
        <Column field="hardware" header="Оборудование" style={{ width: '15%' }}></Column>
        <Column field="message" header="Сообщение" style={{ width: '40%' }} sortable filter showFilterMenu={false}></Column>
        <Column field="responsible" header="Ответственный" style={{ width: '15%' }} sortable></Column>
      </DataTable>
    </div>
  )
}

export default Table;
