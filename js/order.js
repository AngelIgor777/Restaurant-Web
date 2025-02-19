const token=JSON.parse(localStorage.getItem('accessToken')); // Получаем токен (замени на свой способ хранения)
console.log(token);
const renderHeader = () => `
<header>
        <nav class="navbar navbar-expand-lg navcont">
          <div class="container-fluid">
            <h1 class="logo"><a href="panel.html" style='text-decoration:none'><img src="./css/Park.png" alt="" /> </a></h1>
            <span class="buttonsing-1 d-flex flex-row">
            <select class="form-select" id='lang'>
              <option value="rus"  selected>rus</option>
              <option value="rum">rum</option>
            </select>
              <div class="dropdown  singin">
                
                <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" href="#" style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" style="color: black;">Выход</a></li>
                </ul>
                <a href="#" class="userimg d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class='bx bxs-user-circle singinuser' ></i>
                </a>
              </div>
    
              <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarcont"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span><i class="bx bx-menu"></i></span>
            </button>
            
            </span>
            
            <div class="collapse navbar-collapse" id="navbarcont">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item active"><a href="index.html#menu">Меню</a></li>
                <li class="nav-item"><a href="index.html#about">О нас</a></li>
                <li class="nav-item"><a href="#">Доставка</a></li>
                <li class="nav-item"><a href="#">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
            <select class="form-select" id='lang'>
              <option value="rus"  selected>rus</option>
              <option value="rum">rum</option>
            </select>
              <div class="dropdown  singin">
                
                 <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" href="#" style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" style="color: black;">Выход</a></li>
                </ul>
                <a href="#" class="userimg d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class='bx bxs-user-circle singinuser' ></i>
                </a>
              </div>
    
              <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarcont"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span><i class="bx bx-menu"></i></span>
            </button>
            
            </span>
            
          </div>
        </nav>
      </header>
      `;
const renderBody= () =>`
        <div id="messages"></div>

`
const renderFooter = () => `
      <footer>
        <div class="container-fluid foot">
          <div class="row text-center">
            <h1 class="col-12" id="about"><b>PARKTOWN COFFEE</b></h1>
          </div>
          <div class="row text-center">
            <div class="col-md-4 part">
              <h3>Адрес</h3>
              <h5>Lenin 81/a</h5>
              <h5>Copceac</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Время работы</h3>
              <h5>с 8:00 до 22:00</h5>
              <h5>Кухня до 21:00</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Контакты</h3>
              <h5>тел: 078299844</h5>
            </div>
          </div>
          <p>Acest website a fost realizat în cadrul
          competiției „Tekwill Junior Ambassadors” organizată de proiectul „Tekwill în Fiecare
          Școală” și nu reflectă neapărat opinia proiectului.</p>
        </div>
      </footer>`;
let stompClient = null;
function connectWebSocket() {
  if (!token) {
      displayMessage("Ошибка: JWT-токен отсутствует");
      return;
  }

  const socket = new SockJS('http://46.229.212.34:9091/ws-orders'); // Подключение к WebSocket
  stompClient = Stomp.over(socket); // Инициализация STOMP клиента

  stompClient.connect(
      { Authorization: "Bearer " + token }, // Передача токена в заголовке
      function (frame) {
          console.log("Connected to server:", frame); // Выведем frame, чтобы понять, что возвращает сервер
          // Подписка на канал
          stompClient.subscribe('/topic/orders', function (response) {
              const orderData = JSON.parse(response.body); // Парсим ответ
              displayOrderBB(orderData);
          });
      },
      function (error) {
          console.error("Ошибка подключения:", error); // Выводим ошибку подключения
          displayMessage("Ошибка подключения: " + error);
      }
  );
}



// Функция для отображения всех заказов
function loadAllOrders() {

  if (!token) {
      displayMessage("Ошибка: JWT-токен отсутствует");
      return;
  }
  console.log(token);
  fetch("http://46.229.212.34:9091/api/v1/orders", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + token,
      }
  })
  .then(response => {

      if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
  })
  .then(orders => {
      orders.reverse().forEach(orderData => {
          displayOrder(orderData);
      });
      confirmbut();
  })
  .catch(error => {
      displayMessage("Ошибка загрузки заказов: " + error);
  });
}


function displayMessage(message) {
          const messageDiv = document.getElementById("messages");
          const messageElement = document.createElement("p");
          messageElement.className = "message";
          messageElement.textContent = message;
          messageDiv.appendChild(messageElement);
}
function displayOrderBB(data) {
  const messageDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.className = "order";

  const order = data.orderResponseDTO;

  // Displaying basic order details
  messageElement.innerHTML = `
      <h2>Заказ ID: ${order.id ?? 'Не указано'}</h2>
      <details>
      <summary>
      <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
      <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
      <p>${formatAddress(data.addressResponseDTO)}</p>
      <p class='tableNum'> ${formatTable(data.tableResponseDTO)}</p>
      <p class='and'style='text-align: right; opacity:0.7;'>Ещё...</p>
      <p class='andv'style='text-align: right; opacity:0.7; margin-left:60%;'><i class='bx bx-chevron-up' ></i></p>
      </summary>
      <p><span>Общее время готовки:</span> ${formatTime(order.totalCookingTime)}</p>
      <p><span>Создан:</span> ${formDate(order.createdAt)}</p>
      <p><span>Обновлён:</span> ${order.updatedAt ?? 'Не указано'}</p>
      <p><span>В ресторане:</span> ${data.orderInRestaurant ? 'Да' : 'Нет'}</p>
      <p><span>Коды скидки:</span> ${data.existDiscountCodes ? 'Есть' : 'Нет'}</p>
      <p><span>Код продукта скидки:</span> ${data.productDiscountCode ?? 'Нет'}</p>
      <p><span>Глобальный код скидки:</span> ${data.globalDiscountCode ?? 'Нет'}</p>
      </details>
      <div class="products">
          <strong>Продукты:</strong>
          ${formatProducts(order.products)}
      </div>
      <div class="buttonsall">
        <button class="confirm">Подтвердить</button>
        </div>
      `
;
messageDiv.prepend(messageElement); // Добавить в начало

  // Автопрокрутка вниз
  messageDiv.scrollTop = messageDiv.scrollHeight;
}

function displayOrder(data) {
    const messageDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    

    const order = data.orderResponseDTO;

    // Добавление клаасов
    messageElement.className = `order it-${order.id}`;
    // Displaying basic order details
    messageElement.innerHTML = `
        <h2>Заказ ID: ${order.id ?? 'Не указано'}</h2>
        <details>
        <summary>
        <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
        <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
        <p>${formatAddress(data.addressResponseDTO)}</p>
        <p class='tableNum'> ${formatTable(data.tableResponseDTO)}</p>
        <p class='and'style='text-align: right; opacity:0.7;'>Ещё...</p>
        <p class='andv'style='text-align: right; opacity:0.7; margin-left:60%;'><i class='bx bx-chevron-up' ></i></p>
        </summary>
        <p><span>Общее время готовки:</span> ${formatTime(order.totalCookingTime)}</p>
        <p><span>Создан:</span> ${formDate(order.createdAt)}</p>
        <p><span>Обновлён:</span> ${order.updatedAt ?? 'Не указано'}</p>
        <p><span>В ресторане:</span> ${data.orderInRestaurant ? 'Да' : 'Нет'}</p>
        <p><span>Коды скидки:</span> ${data.existDiscountCodes ? 'Есть' : 'Нет'}</p>
        <p><span>Код продукта скидки:</span> ${data.productDiscountCode ?? 'Нет'}</p>
        <p><span>Глобальный код скидки:</span> ${data.globalDiscountCode ?? 'Нет'}</p>
        </details>
        <div class="products">
            <strong>Продукты:</strong>
            ${formatProducts(order.products)}
        </div>
        <div class="buttonsall">
        <button class="confirm" data-id="${order.id}">Подтвердить</button>
        </div>
        `
;
    messageDiv.appendChild(messageElement);
    
    // Автопрокрутка вниз
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

function confirmbut() {
  console.log(document.querySelectorAll('.confirm'));
  document.querySelectorAll('.confirm').forEach(el => {
    el.addEventListener('click', function() {
      const id = el.getAttribute('data-id');
      if (id) {
        console.log(`Подтвержден заказ с ID: ${id}`);
         el.innerHTML = "<i class='bx bx-check'></i>";
        setTimeout(() => {
          // Изменяем текст кнопки после 2 секунд
          el.innerHTML = "Подтверждено"; 
          fetch(`http://46.229.212.34:9091/api/v1/orders/confirm/${id}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
            }
          });
        }, 1000);
        setTimeout(() => {
          // Изменяем текст кнопки после 2 секунд
          document.querySelector(`.it-${id}`).classList.add('confirmed')
        }, 5000);
      } else {
        console.log("data-id не найден");
      }
    });
  });
}

function formatProducts(products) {
    if (!Array.isArray(products) || products.length === 0) {
        return '<em>Нет продуктов</em>';
    }
    return products.map((product, id) => 
        `<div class="product">
        <details class='det'>
        <summary>
            <p class='prname'><span>${id+1}) Название:</span> <b>${product.name ?? 'Не указано'}</b></p>
            <p><span>Цена:</span> <b>${product.price ?? 'Не указано'}</b></p>
            <p><span>Количество:</span> <b>${product.quantity ?? 'Не указано'}</b>
            </p>
            
        </summary>
           
            </details>
        </div>`
    ).join('');
}

function formatAddress(address) {
    if (!address) {
        return '';
    }
    return `Адрес:
        ${address.city ?? 'Город не указан'},
        ${address.street ?? 'Улица не указана'},
        ${address.homeNumber ?? 'Номер дома не указан'}${address.apartmentNumber ? ', Кв. ' + address.apartmentNumber : ''}`
    ;
}

function formatTable(table) {
    if (!table) {
        return ``;
    }
    else{
      return `Стол №${table.number ?? 'Не указано'}`;
    }
    
}
function formatTime(inputTime) {
        const parts = inputTime.split(':').map(Number); // Разделяем строку и преобразуем части в числа
        const hours = parts[0];
        const minutes = parts[1];
        const seconds = parts[2];
      
        let formattedTime = '';
        if (hours > 0) {
            formattedTime += `${hours} час `;
        }
        if (minutes > 0) {
            formattedTime += `${minutes} мин `;
        }
        if (seconds > 0) {
            formattedTime += `${seconds} сек`;
        }
        return formattedTime.trim(); // Убираем лишние пробелы
}
function formDate(longDate){
  const date=new Date(longDate);
  const day =date.getDate();
  const months=[
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];
const month=months[date.getMonth()];
let hours = date.getHours()+2;
hours.toString().padStart(2, "0");
let minutes = date.getMinutes().toString().padStart(2, "0");
return `${day} ${month} ${hours}:${minutes}`;
}
function getUUIDFromURL() {
  const hash = window.location.hash; // Получаем часть после #
  const match = hash.match(/#menu\/([a-f0-9\-]{36})/i); // Регулярка для UUID
  return match ? match[1] : null; // Возвращаем UUID или null, если не найден
}
async function getReg(uuid1) {
  try {
    // Получаем данные пользователя
    let response = await fetch(`http://46.229.212.34:9091/api/v1/users/${uuid1}`);
    let data = await response.json();

    
    // Сохраняем данные адреса, если они еще не сохранены
    if (!localStorage.getItem("addressResponseDTO") && data.addressResponseDTO) {
      localStorage.setItem('addressResponseDTO', JSON.stringify(data.addressResponseDTO));
    }

    // Получаем изображение
    let imageResponse = data.photoUrl;

    // Вставляем изображение в элементы
    if (imageResponse) {
      document.querySelectorAll(".userimg").forEach(im => {
        im.innerHTML = `<img src="${imageResponse}" alt="User Image">`;
      });
    } else {
      throw new Error("Изображение не найдено");
    }

  } catch (error) {
    console.error("Ошибка запроса:", error);
  }
}

async function Registr() {
  // let params = new URLSearchParams(window.location.search);
  let uuid = getUUIDFromURL();
  console.log(uuid);
  if (!localStorage.getItem("uuid")) {
    if (uuid) {
      localStorage.setItem("uuid", JSON.stringify(uuid));
      getReg(uuid);
    }
  } else {
    let uuid1 = JSON.parse(localStorage.getItem("uuid"));
    if (uuid1) {
      getReg(uuid1);
    }
  }
}
function Language(){
  document.getElementById("lang").addEventListener("change", function(event) {
    console.log("Выбрано:", event.target.value);
    localStorage.setItem('lang', JSON.stringify(event.target.value));
});
}


// Автоматическое подключение при загрузке страницы
window.onload = async function() {
      document.querySelector('.app').innerHTML=renderHeader()+renderBody()+renderFooter();
    Registr(); //Изменение лого
    Language();
    await connectWebSocket();  // Подключение к WebSocket
    await loadAllOrders();  // Загрузка всех заказов
};