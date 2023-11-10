const importance = [
  'Низкая',
  'Высокая',
  'Критическая'
];
const hardware = [
  'Вегас',
  'Коммутатор',
  'Люк',
  'ИБП',
  'Трансформатор',
  'ЛВС',
  ''
];
const message = [
  'Сервер Vegas недоступен',
  'Потеряно сетевое соединение',
  'Открыта крышка',
  'Низкий заряд батареи',
  'Недостаточное количество масла',
  'Обрыв силового кабеля',
  'Отсутствует подтверждение пуска в работу'
];
const responsible = [
  'Смирнов В.А',
  'Капустин С.С.',
  'Ветрова И.С.',
  'Лавочкин А.В.',
  'Ольшанская Е.Г.'
];

function dateComponentPad(value: number) {
  const format = String(value);
  return format.length < 2 ? '0' + format : format;
}

export const giveRandomEvent = () => {
  //Получаем дату в формате dd.mm.yyyy hh:mm:ss
  const date = new Date();
  const datePart = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ].map(dateComponentPad);
  const timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);

  const hardwareMessage = Math.floor(Math.random() * hardware.length); // Берём индекс случайной связки из hardware и  message
  const randomEvent = {
    date: datePart.join('.') + ' ' + timePart.join(':'),
    importance: importance[Math.floor(Math.random() * importance.length)],
    hardware: hardware[hardwareMessage],
    message: message[hardwareMessage],
    responsible: responsible[Math.floor(Math.random() * responsible.length)]
  };

  return randomEvent;
}