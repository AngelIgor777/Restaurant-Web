const renderHeader = () => `
<header>
        <nav class="navbar navbar-expand-lg navcont">
          <div class="container-fluid">
            <h1 class="logo"><a href="panel.html" style='text-decoration:none'><img src="./css/Park.png" alt="" /> </a></h1>
            <span class="buttonsing-1 d-flex flex-row">
              <div class="dropdown  singin">
                
                <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" href="#" style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" style="color: black;">Выход</a></li>
                </ul>
                <a href="#" class="d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
              <div class="dropdown  singin">
                
                 <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" href="#" style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" style="color: black;">Выход</a></li>
                </ul>
                <a href="#" class="d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
          const socket = new SockJS('http://localhost:9091/ws-orders'); // Подключение к WebSocket
          stompClient = Stomp.over(socket); // Инициализация STOMP клиента
  
          stompClient.connect({}, function (frame) {
              displayMessage("Соединение установлено: " + frame);
  
              // Подписка на канал
              stompClient.subscribe('/topic/orders', function (response) {
                  const orderData = JSON.parse(response.body); // Парсим ответ
                  displayOrder(orderData);
              });
          }, function (error) {
              displayMessage("Ошибка подключения: " + error);
          });
      }
  
      // Функция для отображения всех заказов
      function loadAllOrders() {
          fetch("http://localhost:9091/api/v1/orders")
              .then(response => response.json())
              .then(orders => {
                  orders.forEach(orderData => {
                      displayOrder(orderData);
                  });
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
  
      function displayOrder(data) {
          const messageDiv = document.getElementById("messages");
          const messageElement = document.createElement("div");
          messageElement.className = "order";
  
          const order = data.orderResponseDTO;
  
          // Displaying basic order details
          messageElement.innerHTML = `
          <h2>Заказ ID: ${order.id ?? 'Не указано'}</h2>
          <p><span>Статус:</span> ${order.status ?? 'Не указано'}</p>
          <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
          <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'}</p>
          <p><span>Общее время готовки:</span> ${order.totalCookingTime ?? 'Не указано'}</p>
          <p><span>Создан:</span> ${order.createdAt ?? 'Не указано'}</p>
          <p><span>Обновлён:</span> ${order.updatedAt ?? 'Не указано'}</p>
          <p><span>В ресторане:</span> ${data.orderInRestaurant ? 'Да' : 'Нет'}</p>
          <p><span>Коды скидки:</span> ${data.existDiscountCodes ? 'Есть' : 'Нет'}</p>
          <p><span>Код продукта скидки:</span> ${data.productDiscountCode ?? 'Нет'}</p>
          <p><span>Глобальный код скидки:</span> ${data.globalDiscountCode ?? 'Нет'}</p>
          <p><span>Адрес:</span> ${formatAddress(data.addressResponseDTO)}</p>
          <p><span>Стол:</span> ${formatTable(data.tableResponseDTO)}</p>
          <div class="products">
              <strong>Продукты:</strong>
              ${formatProducts(order.products)}
          </div>`
      ;
          messageDiv.appendChild(messageElement);
  
          // Автопрокрутка вниз
          messageDiv.scrollTop = messageDiv.scrollHeight;
      }
  
      function formatProducts(products) {
          if (!Array.isArray(products) || products.length === 0) {
              return '<em>Нет продуктов</em>';
          }
          return products.map(product => 
              `<div class="product">
                  <p class='prname'><span>Название:</span> ${product.name ?? 'Не указано'}</p>
                  <p><span>Описание:</span> ${product.description ?? 'Не указано'}</p>
                  <p><span>Тип:</span> ${product.typeName ?? 'Не указано'}</p>
                  <p><span>Цена:</span> ${product.price ?? 'Не указано'}</p>
                  <p><span>Время готовки:</span> ${product.cookingTime ?? 'Не указано'}</p>
                  <p><span>Количество:</span> ${product.quantity ?? 'Не указано'}</p>
              </div>`
          ).join('');
      }
  
      function formatAddress(address) {
          if (!address) {
              return '<em>Адрес не указан</em>';
          }
          return `
              ${address.city ?? 'Город не указан'},
              ${address.street ?? 'Улица не указана'},
              ${address.homeNumber ?? 'Номер дома не указан'}${address.apartmentNumber ? ', Кв. ' + address.apartmentNumber : ''}`
          ;
      }
  
      function formatTable(table) {
          if (!table) {
              return '<em>Стол не указан</em>';
          }
          return `Стол №${table.number ?? 'Не указано'}`;
      }
  
      // Автоматическое подключение при загрузке страницы
      window.onload = function() {
            document.querySelector('.app').innerHTML=renderHeader()+renderBody()+renderFooter();
          loadAllOrders();  // Загрузка всех заказов
          connectWebSocket();  // Подключение к WebSocket
      };