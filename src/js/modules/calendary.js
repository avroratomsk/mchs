console.log("work")

// const events = [{
//   "date": "2025-01-20 15:31:28",
//   "title": "Какое-то событие"
// }, {
//   "date": "2025-01-22 15:31:39",
//   "title": "Новое событие"
// }];

function localFormatDate(date) {
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  return date.toLocaleDateString('ru-RU', options);
}

// Функция для получения формата даты в виде строки
function formatDate(date) {
  const year = date.getFullYear(); // Получаем год
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому +1
  const day = String(date.getDate()).padStart(2, '0'); // День с ведущим нулем
  const hours = String(date.getHours()).padStart(2, '0'); // Часы с ведущим нулем
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты с ведущим нулем
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Секунды с ведущим нулем

  // Формируем строку в формате YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Основная функция для вывода дат с событиями
function displayDates() {
  const today = new Date(); // Текущая дата
  const dateList = document.getElementById('date-list'); // Элемент для вставки дат

  // Очистим список (на случай, если вызываем функцию повторно)
  dateList.innerHTML = '';
  const days = [];

  // Добавляем текущий день и шесть следующих
  for (let i = 0; i < 9; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i); // Прибавляем i дней
    days.push(formatDate(currentDate)); // Сохраняем форматированные даты
  }

  const calendaryInfo = document.getElementById("calendary-info");
  calendaryInfo.innerHTML = "";
  // Обрабатываем каждый день и проверяем наличие событий
  days.forEach((day) => {
    const listItem = document.createElement('div'); // Создаем элемент списка
    listItem.className = "calendary-day__item";
    listItem.setAttribute("data-id", day.split(' ')[0]);
    const spanListItem = document.createElement('span');
    spanListItem.textContent = day.split(' ')[0].split('-')[2]; // Устанавливаем текст дня
    listItem.appendChild(spanListItem);

    // Проверяем наличие события на этот день
    const eventForDay = events.find(event => event.date.startsWith(day.split(' ')[0]));
    if (eventForDay) {
      const star = document.createElement('span');
      star.className = 'calendary-day__start'
      star.textContent = '★'; // Символ звезды
      star.style.color = 'red'; // Можно изменить цвет
      listItem.appendChild(star); // Добавляем звезду к дате


      // Добавляем описание события под датой
      const eventDescription = document.createElement('div');
      eventDescription.classList.add('calendary-info__day');
      eventDescription.setAttribute("id", day.split(' ')[0]);
      eventDescription.textContent = eventForDay.title; // Заголовок события
      calendaryInfo.appendChild(eventDescription); // Добавляем описание события
    } else {
      // Если событий нет, добавляем сообщение "нет событий"
      const noEventMessage = document.createElement('div');
      noEventMessage.classList.add('calendary-info__day');
      noEventMessage.setAttribute("id", day.split(' ')[0]);
      noEventMessage.textContent = 'нет событий';
      calendaryInfo.appendChild(noEventMessage); // Добавляем текст "нет событий"
    }
    dateList.appendChild(listItem); // Добавляем в список
  });
  document.querySelector(".calendary-day__item").classList.add("active");
  document.querySelector(".calendary-info__day").classList.add("active");
}

// Вызов функции при загрузке страницы
displayDates();

const calendaryDay = document.querySelectorAll(".calendary-day__item");
calendaryDay?.forEach(day => {
  day.addEventListener("click", function (e) {
    calendaryDay.forEach(day => day.classList.remove("active"));
    day.classList.add("active");

    const dataId = day.dataset.id;

    const calendaryInfoItems = document.querySelectorAll('.calendary-info__day');
    calendaryInfoItems?.forEach((item) => item.classList.remove("active"));

    document.getElementById(dataId).classList.add('active');
  })
})