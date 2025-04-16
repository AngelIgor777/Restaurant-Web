const host = CONFIG.host;


let allPENDINGOrders = []; // Store all loaded orders
let allCOMPLETEDOrders = []; // Store all loaded orders
let allCONFIRMEDOrders = []; // Store all loaded orders

let chosenTable=''//Выбранный стол

function pushUniqueOrder(orderArray, newOrder) {
    if (!orderArray.some(order => order.orderResponseDTO.id === newOrder.orderResponseDTO.id)) {
        orderArray.push(newOrder);
    }
}

function checkAdminAccess() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.warn("No token found! Redirecting to login...");
        window.location.href = "index.html";
        return;
    }

    const userInfo = parseJwt(token);

    if (!userInfo || !userInfo.roles || !userInfo.roles.includes("ROLE_ADMIN")) {
        console.warn("Access denied! Redirecting to login...");
        window.location.href = "index.html";
        return;
    }
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Get payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix encoding
        const decodedPayload = JSON.parse(atob(base64)); // Decode base64 to JSON
        return decodedPayload; // Return full payload
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

checkAdminAccess();

let currentOrdersPageStatus = "PENDING";


const token = JSON.parse(localStorage.getItem('accessToken')); // Получаем токен

const renderBody = () => `
  <div class="findinput" style="display: flex; flex-direction: column; align-items: flex-end;">
    <div class="order-top-buttons">
      <button class="btn btn-primary orderTypesButton" id="orderTypesPENDINGButton" type="button">
        Текущие <span class="badge" id="pendingCount">0</span>
      </button>
      <button class="btn btn-primary orderTypesButton" id="orderTypesCOMPLETEDButton" type="button">
        В процессе <span class="badge" id="completedCount">0</span>
      </button>
      <button class="btn btn-primary orderTypesButton" id="orderTypesCONFIRMEDButton" type="button">
        Выполненные <span class="badge" id="confirmedCount">0</span>
      </button>
    </div>

    <div class='TableDesk'>
            <div class='TableList'>
        
            </div>
            <div class='CheckButton'>

            </div>
        </div>

    <!-- Search input below the buttons -->
    <form id="searchOrderInput" style="width: 100%;">
      <div class="input-group searchgroup">
        <input class="form-control" type="search" id="searchOrderInputField" placeholder="Проверочный код..." aria-label="Поиск">
      </div>
    </form>


  </div>
    
        <div class='ordertop'>
        
        <div class='topcont swiper'>
            <div class="card-cont menu-container">
                <div class="swiper-wrapper" id='messages'>

                </div>
            </div>
            <div class="swiper-button-prev">
            <i class='bx bx-left-arrow-alt'></i>
            </div>
            <div class="swiper-button-next">
            <i class='bx bx-left-arrow-alt bx-rotate-180' ></i>
            </div>

            <div class="swiper-pagination"></div>
        </div>
    </div>
  <!-- Модальное окно -->
        <div
          class="modal fade orderList"
          id="Modalwindow"
          tabindex="-1"
          aria-labelledby="Modalwindow"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content menuorder">
              <div class="modal-header">
                <h1>Ваш заказ<span class='chosen'><i class='bx bx-star' ></i></span></h1>
                
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                
                
              </div>
              <div class="modal-footer">
                <div class="form-check check-box">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    Заказ на дом
                  </label>
                </div>
                <button
                  type="button"
                  class="btn decline"
                  data-bs-dismiss="modal"
                  style="font-size: 1.2rem"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  class="btn btn-success ordersend"
                  style="font-size: 1.4rem"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="modal fade orderList" id="Modalsearch" tabindex="-1" aria-labelledby="Modalsearch">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body addbody">
      <div class="searchFind">
        <div class="findinput">
          <form>
            <div class="input-group searchgroup">
             <input class="form-control" type="search" id='search' placeholder="Введите запрос..." aria-label="Поиск">
          </div>
            
          </form>
        </div>
         <div class="result_table">
            <!-- Сюда будут добавляться результаты поиска -->
         </div>
      
         </div>
      
      
         <div class='oredersendcolum'>


      <div class='orderconteiner'>
        <div class="orderli">
                  <table class="ord table">
                    <thead>
                      <tr>
                        <th style="text-align: center;">№</th>
                        <th style="text-align: center;">Название</th>
                        <th style="text-align: center;">Цена</th>
                        <th style="text-align: center;">Количество</th>
                        <th></th>
                        
                      </tr>
                    </thead>
                    <tbody class="ordorlist">
  
                    </tbody>
                  </table>
                </div>
        </div>
        <div class='sendform'>
        
        </div>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn decline" data-bs-dismiss="modal" style="font-size: 1.2rem">
          Отмена
        </button>
      </div>
    </div>
  </div>
</div>
    <!-- Кнопка отправки -->
        <div class="buttonsend">
          <a class='addbutton' type="button"  href='zakord.html'>
            <i class='bx bx-plus'></i>
          </a>
        </div>
`

let stompClient = null;

function connectWebSocket(retryCount = 0) {
    if (!token) {
        displayMessage("Ошибка: JWT-токен отсутствует");
        return;
    }

    const socket = new SockJS(`${host}/ws-orders`);
    stompClient = Stomp.over(socket);

    stompClient.connect(
        { Authorization: "Bearer " + token },
        function (frame) {
            console.log("Connected to server:", frame);

            // Подписка на заказы
            stompClient.subscribe('/topic/orders', function (response) {
                const orderData = JSON.parse(response.body);
                let orderStatus = orderData.orderResponseDTO.status;

                if (orderStatus === "PENDING") {
                    incrementOrderCounterValueByCounterId("pendingCount");
                    if (currentOrdersPageStatus === "PENDING") {
                        displayOrder(orderData, orderStatus, true);
                    }
                } else if (orderStatus === "COMPLETED") {
                    incrementOrderCounterValueByCounterId("completedCount");
                    if (currentOrdersPageStatus === "COMPLETED") {
                        displayOrder(orderData, orderStatus, true);
                    }
                } else if (orderStatus === "CONFIRMED") {
                    incrementOrderCounterValueByCounterId("confirmedCount");
                    if (currentOrdersPageStatus === "CONFIRMED") {
                        displayOrder(orderData, orderStatus, true);
                    }
                }
            });

            // Подписка на изменения статуса столов
            stompClient.subscribe('/topic/tables-info', function (message) {
                const openTables = JSON.parse(message.body);
                console.log(message);
                console.log('Received open tables:', openTables);
                TableLis(); // перерисовать список столов
            });
        },
        function (error) {
            console.error("Ошибка подключения:", error);
            if (retryCount < 100) {
                setTimeout(() => connectWebSocket(retryCount + 1), 5000);
            }
        }
    );
}

// Функция для отображения всех заказов
function loadAllOrders(status, ordersArray) {
    if (!token) {
        displayMessage("Ошибка: JWT-токен отсутствует");
        return;
    }
    console.log(token);
    fetch(`${host}/api/v1/orders?status=${status}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }
            const messageDiv = document.getElementById("messages"); // div for all orders
            messageDiv.innerHTML = '';
            return response.json();
        })
        .then(orders => {
            orders.reverse().forEach(orderData => {
                pushUniqueOrder(ordersArray, orderData)
                displayOrder(orderData, status, false);
            });
            removeAllOrderFromArraysBesideLoaded(status);
        })
        .catch(error => {
            displayMessage("Ошибка загрузки заказов: " + error);
        });
}

function removeAllOrderFromArraysBesideLoaded(status) {
    if (status === "PENDING") {
        allCONFIRMEDOrders = [];
        allCOMPLETEDOrders = [];
    } else if (status === "COMPLETED") {
        allCONFIRMEDOrders = [];
        allPENDINGOrders = [];
    } else if (status === "CONFIRMED") {
        allCOMPLETEDOrders = [];
        allPENDINGOrders = [];
    }
}

function displayMessage(message) {
    const messageDiv = document.getElementById("messages");
    const messageElement = document.createElement("p");
    messageElement.className = "message ";
    messageElement.textContent = message;
    messageDiv.appendChild(messageElement);
}

function displayOrder(data, status, fromWebSocket) {
    const messageDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");

    const order = data.orderResponseDTO;

    // Генерация кнопок в зависимости от статуса
    let buttonsHTML = "";
    if (status === "PENDING") {
        buttonsHTML = `
            <button class="confirm" data-id="${order.id}">Выполнено</button>
            <button class="complete" data-id="${order.id}">Распечатать</button>
            <button class="close" data-id="${order.id}">Удалить</button>
        `;
    } else if (status === "COMPLETED") {
        buttonsHTML = `
            <button class="confirm" data-id="${order.id}">Выполнено</button>
            <button class="close" data-id="${order.id}">Удалить</button>
        `;
    } else if (status === "CONFIRMED") {
        buttonsHTML = `
            <button class="close" data-id="${order.id}">Удалить</button>
        `;
    }
    if(chosenTable===''){
         // Создание блока заказа
         messageElement.className = `order it-${order.id} swiper-slide`;
         messageElement.innerHTML = `
              <h2>${order.id}</h2>
              <h2>${data.otp ? `Проверочный код: ${data.otp}` : ""}</h2>
             <details>
             <summary>
             <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
             <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
             <p>${formatAddress(data.addressResponseDTO)}</p>
             <p>${formatphone(data.phoneNumber)}</p>
             <p class='tableNum'> ${formatTable(data.tableResponseDTO)}</p>
             <p class='and' style='text-align: right; opacity:0.7;'>Ещё...</p>
             <p class='andv' style='text-align: right; opacity:0.7; margin-left:60%;'><i class='bx bx-chevron-up'></i></p>
             </summary>
             <p><span>Общее время готовки:</span> ${formatTime(order.totalCookingTime)}</p>
             <p><span>Создан:</span> ${formDate(order.createdAt)}</p>
             <p><span>Внутри заведения:</span> ${data.orderInRestaurant ? 'Да' : 'Нет'}</p>
             <p><span>Коды скидки:</span> ${data.existDiscountCodes ? 'Есть' : 'Нет'}</p>
             <p><span>Код продукта скидки:</span> ${data.productDiscountCode ?? 'Нет'}</p>
             <p><span>Глобальный код скидки:</span> ${data.globalDiscountCode ?? 'Нет'}</p>
             </details>
             <div class="products">
                 <strong>Продукты:</strong>
                 ${formatProducts(order.products, status)}
             </div>
             <div class="buttonsall">
                 ${buttonsHTML}   <!-- вставляем сгенерированные кнопки -->
             </div>
         `;
         if (fromWebSocket === true) {
             messageDiv.prepend(messageElement); // Добавить в начало
         } else if (fromWebSocket === false) {
             messageDiv.appendChild(messageElement);
         }
         Swip();
         // confirmbut();
         // Автопрокрутка вниз
         addOrderListeners(order.id)
         messageDiv.scrollTop = messageDiv.scrollHeight;
    }
    else if(chosenTable===data.tableResponseDTO.number){
         // Создание блока заказа
         messageElement.className = `order it-${order.id} swiper-slide`;
         messageElement.innerHTML = `
              <h2>${order.id}</h2>
              <h2>${data.otp ? `Проверочный код: ${data.otp}` : ""}</h2>
             <details>
             <summary>
             <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
             <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
             <p>${formatAddress(data.addressResponseDTO)}</p>
             <p>${formatphone(data.phoneNumber)}</p>
             <p class='tableNum'> ${formatTable(data.tableResponseDTO)}</p>
             <p class='and' style='text-align: right; opacity:0.7;'>Ещё...</p>
             <p class='andv' style='text-align: right; opacity:0.7; margin-left:60%;'><i class='bx bx-chevron-up'></i></p>
             </summary>
             <p><span>Общее время готовки:</span> ${formatTime(order.totalCookingTime)}</p>
             <p><span>Создан:</span> ${formDate(order.createdAt)}</p>
             <p><span>Внутри заведения:</span> ${data.orderInRestaurant ? 'Да' : 'Нет'}</p>
             <p><span>Коды скидки:</span> ${data.existDiscountCodes ? 'Есть' : 'Нет'}</p>
             <p><span>Код продукта скидки:</span> ${data.productDiscountCode ?? 'Нет'}</p>
             <p><span>Глобальный код скидки:</span> ${data.globalDiscountCode ?? 'Нет'}</p>
             </details>
             <div class="products">
                 <strong>Продукты:</strong>
                 ${formatProducts(order.products, status)}
             </div>
             <div class="buttonsall">
                 ${buttonsHTML}   <!-- вставляем сгенерированные кнопки -->
             </div>
         `;
         if (fromWebSocket === true) {
             messageDiv.prepend(messageElement); // Добавить в начало
         } else if (fromWebSocket === false) {
             messageDiv.appendChild(messageElement);
         }
         Swip();
         // confirmbut();
         // Автопрокрутка вниз
         addOrderListeners(order.id)
         messageDiv.scrollTop = messageDiv.scrollHeight;
    }
   
}

function addOrderListeners(orderId) {
    const completeButton = document.querySelector(`.complete[data-id="${orderId}"]`);
    const confirmButton = document.querySelector(`.confirm[data-id="${orderId}"]`);
    const closeButton = document.querySelector(`.close[data-id="${orderId}"]`);

    if (completeButton) {
        completeButton.addEventListener('click', async function () {
            const id = completeButton.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }

            console.log(`Подтвержден заказ с ID: ${id}`);
            completeButton.innerHTML = "<i class='bx bx-check'></i>";
            completeButton.disabled = true;

            setTimeout(() => {
                completeButton.innerHTML = "Отправлено";
            }, 100);
            
            // Создание списков продуктов на печать
            let products=[];
            const allproducts=completeButton.closest('.order');
            const checkedCheckboxes = allproducts.querySelectorAll('.print-check input[type="checkbox"]:checked');
                checkedCheckboxes.forEach(cb => {
                    products.push(cb.id);
            });
            const listprod={
                'products':products
            };
            console.log(JSON.stringify(listprod));
            try {
                const response = await fetch(`${host}/api/v1/orders/${id}/print`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(listprod)
                });

                if (response.ok) {
                    incrementOrderCounterValueByCounterId("completedCount");
                    decrementOrderCounterValueByCounterId("pendingCount");
                    setTimeout(() => {
                        document.querySelector(`.it-${id}`)?.classList.add('confirmed');
                    }, 500);
                } else {
                    handleError(completeButton, "Ошибка при отправке заказа");
                }
            } catch (error) {
                handleError(completeButton, "Ошибка:", error);
            }
        });
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', async function () {
            const id = confirmButton.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }

            confirmButton.innerHTML = "<i class='bx bx-check'></i>";

            setTimeout(async () => {
                try {
                    await fetch(`${host}/api/v1/orders/confirm/${id}`, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                        }
                    });
                    incrementOrderCounterValueByCounterId("confirmedCount");
                    if (currentOrdersPageStatus === "PENDING") {
                        decrementOrderCounterValueByCounterId("pendingCount");
                    } else if (currentOrdersPageStatus === "COMPLETED") {
                        decrementOrderCounterValueByCounterId("completedCount");
                    }
                    setTimeout(() => {
                        document.querySelector(`.it-${id}`)?.classList.add('confirmed');
                    }, 500);
                } catch (error) {
                    console.error("Ошибка при подтверждении заказа:", error);
                }
            }, 100);
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', async function () {
            const id = closeButton.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }

            try {
                const result = await Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это восстановить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Да, удалить!",
                    cancelButtonText: "Отмена"
                });

                if (result.isConfirmed) {
                    const response = await fetch(`${host}/api/v1/orders/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    decrementOrderCounterByOpenOrdersType();
                    if (response.ok) {
                        document.querySelector(`.it-${id}`).style.display = 'none';
                    } else {
                        console.error("Ошибка при удалении заказа");
                    }
                }
            } catch (error) {
                console.error("Ошибка удаления заказа:", error);
            }
        });
    }
}


function confirmbut() {
    console.log("Me here");
    document.querySelectorAll('.complete').forEach(el => {
        el.addEventListener('click', async function () {
            const id = el.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }
            
            console.log(`Подтвержден заказ с ID: ${id}`);
            el.innerHTML = "<i class='bx bx-check'></i>";
            el.disabled = true;

            setTimeout(() => {
                el.innerHTML = "Отправлено";
            }, 100);

            try {
                const response = await fetch(`${host}/api/v1/orders/${id}/print`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                });

                if (response.ok) {
                    incrementOrderCounterValueByCounterId("completedCount");
                    decrementOrderCounterValueByCounterId("pendingCount")
                    setTimeout(() => {
                        document.querySelector(`.it-${id}`)?.classList.add('confirmed');
                    }, 500);
                } else {
                    handleError(el, "Ошибка при отправке заказа");
                }
            } catch (error) {
                handleError(el, "Ошибка:", error);
            }
        });
    });

    document.querySelectorAll('.confirm').forEach(el => {
        el.addEventListener('click', async function () {
            const id = el.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }

            el.innerHTML = "<i class='bx bx-check'></i>";

            setTimeout(async () => {
                try {
                    await fetch(`${host}/api/v1/orders/confirm/${id}`, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                        }
                    });
                    incrementOrderCounterValueByCounterId("confirmedCount");
                    decrementOrderCounterValueByCounterId("completedCount")
                    setTimeout(() => {
                        document.querySelector(`.it-${id}`)?.classList.add('confirmed');
                    }, 500);
                } catch (error) {
                    console.error("Ошибка при подтверждении заказа:", error);
                }
            }, 100);
        });
    });

    document.querySelectorAll('.close').forEach(el => {
        el.addEventListener('click', async function () {
            const id = el.getAttribute('data-id');
            if (!id) {
                console.log("data-id не найден");
                return;
            }

            try {
                const result = await Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это восстановить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Да, удалить!",
                    cancelButtonText: "Отмена"
                });

                if (result.isConfirmed) {
                    const response = await fetch(`${host}/api/v1/orders/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    decrementOrderCounterByOpenOrdersType();
                    if (response.ok) {
                        document.querySelector(`.it-${id}`).style.display = 'none';
                    } else {
                        console.error("Ошибка при удалении заказа");
                    }
                }
            } catch (error) {
                console.error("Ошибка удаления заказа:", error);
            }
        });
    });
}

function handleError(el, message, error = null) {
    console.error(message, error || '');
    el.innerHTML = "Ошибка";
    el.disabled = false;
}

function formatProducts(products, stat) {
    if (!Array.isArray(products) || products.length === 0) {
        return '<em>Нет продуктов</em>';
    }
    let typ=false;
    if(stat==='PENDING'){
        typ=true;   
    }
    return products.map((product, id) =>
        `<div class="product">
        <details class='det'>
        <summary>
            <p class='prname'>
                <span>${id + 1})</span>
                <b>${product.name ?? 'Не указано'}</b>
            </p>
            <p><span>Цена:</span> <b>${product.price ?? 'Не указано'}</b></p>
            <p><span>Количество:</span> <b>${product.quantity ?? 'Не указано'}</b>
            ${typ ? `<div class="form-check print-check">
                <input class="form-check-input" type="checkbox" value="" id="${product.id}" checked>
                <label class="form-check-label" for="${product.id}">Печатать</label>
            </div>` : ''}
                
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

function formatphone(tel) {
    if (!tel) {
        return '';
    }
    return `Номер телефона: ${tel}`
        ;
}

function formatTable(table) {
    if (!table) {
        return ``;
    } else {
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

function formDate(longDate) {
    const date = new Date(longDate);
    const day = date.getDate();
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const month = months[date.getMonth()];
    let hours = date.getHours();
    hours.toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
}


let swiper;

function Swip() {
    swiper = new Swiper('.card-cont', {
        loop: false,  // Если элементы дублируются, зацикливание включено
        spaceBetween: 32,  // Уменьшаем расстояние между карточками
        slidesPerView: "auto",  // Автоматическая ширина слайдов
        centeredSlides: true,  // Центрируем слайды
        loopAdditionalSlides: 5,  // Увеличиваем количество дополнительных слайдов для зацикливания
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Обновляем Swiper после загрузки изображений (если они есть)
    swiper.on('imagesReady', function () {
        swiper.update();
    });

    // Переход к первому слайду после задержки
    setTimeout(() => {
        swiper.slideTo(0);  // Переход к первому слайду
    }, 100);
}

function Swipto(id) {
    if (!swiper) {
        console.error('Swiper не был инициализирован!');
        return;
    }

    const targetSlide = document.getElementById(id);

    // Проверка, существует ли элемент с данным id
    if (!targetSlide) {
        console.error(`Элемент с id ${id} не найден.`);
        return;
    }

    // Получаем индекс слайда
    const targetIndex = Array.from(targetSlide.parentElement.children).indexOf(targetSlide);

    // Переход к слайду с нужным id
    console.log(targetIndex);
    console.log(id);
    swiper.slideTo(1);
}

async function updateOrderCounters() {
    try {
        const response = await fetch(`${host}/api/v1/orders/countStats`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        });

        if (!response.ok) {
            console.error("Ошибка при получении статистики заказов");
            return;
        }

        const data = await response.json();

        // Update your counters on the page
        setCounterValue("pendingCount", data.pendingOrders);
        setCounterValue("completedCount", data.completedOrders);
        setCounterValue("confirmedCount", data.confirmedOrders);

    } catch (error) {
        console.error("Ошибка запроса статистики заказов:", error);
    }
}

function setCounterValue(counterId, value) {
    const element = document.getElementById(counterId);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`Элемент с ID ${counterId} не найден`);
    }
}


function makeActivePendingButton() {
    let orderTypesPENDINGButton = document.getElementById("orderTypesPENDINGButton");
    if (orderTypesPENDINGButton) {
        orderTypesPENDINGButton.classList.add("active");
    }
}


function getOrdersByCurrentPageStatusClicked() {
    if (currentOrdersPageStatus === "PENDING") {
        return allPENDINGOrders
    } else if (currentOrdersPageStatus === "COMPLETED") {
        return allCOMPLETEDOrders
    } else if (currentOrdersPageStatus === "CONFIRMED") {
        return allCONFIRMEDOrders
    }
}

document.addEventListener("DOMContentLoaded", function () {
    event.preventDefault()
    const observer = new MutationObserver(() => {
        const searchInput = document.getElementById("searchOrderInput");
        const messageDiv = document.getElementById("messages"); // div for all orders

        if (searchInput) {
            observer.disconnect(); // Stop observing once found

            searchInput.addEventListener("input", async (event) => {
                const query = event.target.value.trim();

                if (!query) {
                    // 🛠️ If the input is empty, reload all orders instead of clearing
                    messageDiv.innerHTML = "";
                    let ordersByCurrentPageStatusClicked = getOrdersByCurrentPageStatusClicked();
                    console.debug("orders By Current Page Status Clicked: ", ordersByCurrentPageStatusClicked);
                    ordersByCurrentPageStatusClicked.forEach(order => displayOrder(order, order.orderResponseDTO.status, false));
                    return;
                }
                try {
                    const response = await fetch(`${host}/api/v1/orders/search?query=${query}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        },
                    });
                    if (response.status === 404) {
                        messageDiv.innerHTML = "<p class='warning'>Заказы не найдены</p>";
                        return;
                    }

                    const data = await response.json();
                    messageDiv.innerHTML = ""; // Clear previous content
                    displayOrder(data, data.orderResponseDTO.status, false);
                } catch (error) {

                }
            });
        }
    });

    // Observe changes in the body to detect when dynamic elements are added
    observer.observe(document.body, {childList: true, subtree: true});
});

function initializeButtons() {
    const orderTypesCOMPLETEDButton = document.getElementById("orderTypesCOMPLETEDButton");
    const orderTypesCONFIRMEDButton = document.getElementById("orderTypesCONFIRMEDButton");
    const orderTypesPENDINGButton = document.getElementById("orderTypesPENDINGButton");

    const allButtons = [orderTypesCOMPLETEDButton, orderTypesCONFIRMEDButton, orderTypesPENDINGButton];

    function setActive(button) {
        allButtons.forEach(btn => btn.classList.remove("active")); // remove active from all
        button.classList.add("active"); // add active to the clicked button
    }

    if (orderTypesCOMPLETEDButton) {
        orderTypesCOMPLETEDButton.addEventListener("click", () => {
            // обнуляем столы
            chosenTable='';
            loadAllOrders("COMPLETED", allCOMPLETEDOrders);
            currentOrdersPageStatus = "COMPLETED";
            setActive(orderTypesCOMPLETEDButton);
        });
    }

    if (orderTypesCONFIRMEDButton) {
        orderTypesCONFIRMEDButton.addEventListener("click", () => {
            // обнуляем столы
            chosenTable='';
            loadAllOrders("CONFIRMED", allCONFIRMEDOrders);
            currentOrdersPageStatus = "CONFIRMED";
            setActive(orderTypesCONFIRMEDButton);
        });
    }

    if (orderTypesPENDINGButton) {
        orderTypesPENDINGButton.addEventListener("click", () => {
            // обнуляем столы
            chosenTable='';
            loadAllOrders("PENDING", allPENDINGOrders);
            currentOrdersPageStatus = "PENDING";
            setActive(orderTypesPENDINGButton);
        });
    }
}


function incrementOrderCounterValueByCounterId(id) {
    let elementById = document.getElementById(id);
    if (elementById) {
        let count = parseInt(elementById.textContent, 10) || 0;
        count++;
        elementById.textContent = count;
    }
}

function decrementOrderCounterValueByCounterId(id) {
    let elementById = document.getElementById(id);
    if (elementById) {
        let count = parseInt(elementById.textContent, 10) || 0;
        count--;
        elementById.textContent = count;
    }
}

function decrementOrderCounterByOpenOrdersType() {
    if (currentOrdersPageStatus === "PENDING") {
        decrementOrderCounterValueByCounterId("pendingCount");
    } else if (currentOrdersPageStatus === "COMPLETED") {
        decrementOrderCounterValueByCounterId("completedCount");
    } else if (currentOrdersPageStatus === "CONFIRMED") {
        decrementOrderCounterValueByCounterId("confirmedCount");
    }
}

function set0OrderCounterValueByCounterId(id) {
    let elementById = document.getElementById(id);
    if (elementById) {
        elementById.textContent = 0;
    }
}
function ChangeChoosenTable(spis){
    const tbody=document.querySelector(`.Chosenlist`);
    tbody.innerHTML = '';
    spis.forEach((order, index) => {
        console.log(`\n🧾 Заказ #${index + 1}, ID: ${order.orderResponseDTO.id}`);
        order.orderResponseDTO.products.forEach(product => {
            tbody.insertAdjacentHTML('beforeend', `
                <tr>
                  <td style="text-align: center;">${product.name}</td>
                  <td style="text-align: center;">${product.typeName}</td>
                  <td style="text-align: center;">${product.quantity}</td>
                  <td style="text-align: center;">${product.quantity*product.price}</td>
                  </tr>
              `);
        });
    });
}
async function TableCheck(id, status){
    console.log(status);
    const desk = document.querySelector(".TableDesk");
    desk.style.height = '300px';
    const but = document.querySelector(".CheckButton");
    const messageDiv = document.getElementById("messages"); // div for all orders
    if (!status) {
        but.innerHTML = `<button class='OpenBut'>Открыть счет ${id}</button>`;
        const openBtn = document.querySelector(".OpenBut");
        openBtn.onclick = async function () {
            const result = await fetch(`${host}/api/v1/tables/open/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            const data = await result.json();
            console.log(data);
            if (data.open) {
                const cell = document.querySelector(`.cell-${data.id}`);
                cell.innerHTML = `
                    <p>${id}</p>
                    <p class='NumberOrder'>0</p>
                `;
                cell.classList.add('Checked');
                but.innerHTML = ``;
            }
        };
    } else {
        but.innerHTML = `<button class='OpenBut'>Закрыть счет ${id}</button>`;
        // Кнопка закрытия
                    document.querySelector('.OpenBut').addEventListener('click', async function(){
                        const result = await fetch(`${host}/api/v1/orders/count/${id}`, {
                            method: "POST",
                            headers: {
                                "Authorization": "Bearer " + token,
                            }
                        });
                        const data = await result.json();
                        console.log(data);
                        Swal.fire({
                            title: `Итого: ${data.price}MDL`,
                            text: ``,
                            icon: "success",
                            customClass: {
                                confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                            }});
                    });
        chosenTable=id;
        const res = await fetch(`${host}/api/v1/orders/countStats`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
            }
        });
        const data = await res.json();
        const tableIdToFind = id;
        const tableInfo = data.tableOrderInfos.find(info => info.tableId === tableIdToFind);
        console.log(tableInfo);
        if (tableInfo) {
            // Получаем все заказы по категориям
            const pendingOrders = tableInfo.pendingOrders.orders;
            const confirmedOrders = tableInfo.confirmedOrders.orders;
            const completedOrders = tableInfo.completedOrders.orders;
            
            // Объединяем всё в один массив
            const allOrders = [
                ...pendingOrders,
                ...confirmedOrders,
                ...completedOrders
            ];
            let status='';
            document.querySelectorAll('.order-top-buttons button').forEach(el => {
                if (el.classList.contains('active')) {
                    if (el.id === 'orderTypesPENDINGButton') {
                        status = 'PENDING';
                        messageDiv.innerHTML = ""; // Clear previous content
                        console.log(tableInfo.pendingOrders.orders);
                        tableInfo.pendingOrders.orders.forEach(it=>{
                            displayOrder(it, status, false);
                        });
                    } else if (el.id === 'orderTypesCONFIRMEDButton') {
                        status = 'CONFIRMED';
                        messageDiv.innerHTML = ""; // Clear previous content
                        console.log(tableInfo.confirmedOrders.orders);
                        tableInfo.confirmedOrders.orders.forEach(it=>{
                            displayOrder(it, status, false);
                        });
                    } else if (el.id === 'orderTypesCOMPLETEDButton') {
                        status = 'COMPLETED';
                        messageDiv.innerHTML = ""; // Clear previous content
                        console.log(tableInfo.completedOrders.orders);
                        tableInfo.completedOrders.orders.forEach(it=>{
                            displayOrder(it, status, false);
                        });
                    }
                }
                
            });
            
        }
        
        
        // Swal.fire({
        //     title: `Столик номер: ${id}`,
        //     html: `
        //       <div class='OrderStat'>
        //         <ul class='statusButs'>
        //             <li class='orderPending active'>Текущие: 0</li>
        //             <li class='orderCompleted'>В процессе: 0</li>
        //             <li class='confirmedOrders'>Выполненные: 0</li>
        //         </ul>
        //             <div class='ChosenOrders'>
        //             <table class="ChosenItems table">
        //                  <thead>
        //                      <tr>
        //                          <th style="text-align: center;">Название</th>
        //                          <th style="text-align: center;">Категория</th>
        //                          <th style="text-align: center;">Количество</th>
        //                          <th style="text-align: center;">Итог</th>
        //                      </tr>
        //                  </thead>
        //                  <tbody class="Chosenlist">
        //                  </tbody>
        //              </table>
        //             </div>
        //             <button class='OpenBut'>Закрыть счет ${id}</button>
        //       </div>
        //     `,
        //     showCancelButton: true,
        //     confirmButtonColor: "#2F9262",
        //     cancelButtonColor: "#3f3f3f",
        //     confirmButtonText: "Вернуться",
        //     cancelButtonText: "Отмена",
        //     focusConfirm: false,
        //     didOpen: async () => {
        //         const res = await fetch(`${host}/api/v1/orders/countStats`, {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": "Bearer " + token,
        //             }
        //         });
        //         const data = await res.json();
        //         const tableIdToFind = id;
        //         const tableInfo = data.tableOrderInfos.find(info => info.tableId === tableIdToFind);
        //         console.log(tableInfo);
        //         if (tableInfo) {
        //             // Получаем все заказы по категориям
        //             const pendingOrders = tableInfo.pendingOrders.orders;
        //             const confirmedOrders = tableInfo.confirmedOrders.orders;
        //             const completedOrders = tableInfo.completedOrders.orders;



        //             // Объединяем всё в один массив
        //             const allOrders = [
        //                 ...pendingOrders,
        //                 ...confirmedOrders,
        //                 ...completedOrders
        //             ];
        //             ChangeChoosenTable(pendingOrders);
        //             document.querySelector('.orderPending').addEventListener('click', function(){
        //                 document.querySelectorAll('.statusButs li').forEach(it=>{
        //                     it.classList.remove('active');
        //                 });
        //                 if(!this.classList.contains('active')){
        //                     this.classList.add('active');
        //                     ChangeChoosenTable(pendingOrders);
        //                 }
        //             });
        //             document.querySelector('.orderCompleted').addEventListener('click', function(){
        //                 document.querySelectorAll('.statusButs li').forEach(it=>{
        //                     it.classList.remove('active');
        //                 });
        //                 if(!this.classList.contains('active')){
        //                     this.classList.add('active');
        //                     ChangeChoosenTable(confirmedOrders);
        //                 }
        //             });
        //             document.querySelector('.confirmedOrders').addEventListener('click', function(){
        //                 document.querySelectorAll('.statusButs li').forEach(it=>{
        //                     it.classList.remove('active');
        //                 });
        //                 if(!this.classList.contains('active')){
        //                     this.classList.add('active');
        //                     ChangeChoosenTable(completedOrders);
        //                 }
        //             });
        //             // Кнопка закрытия
        //             document.querySelector('.OpenBut').addEventListener('click', async function(){
        //                 const result = await fetch(`${host}/api/v1/orders/count/${id}`, {
        //                     method: "POST",
        //                     headers: {
        //                         "Authorization": "Bearer " + token,
        //                     }
        //                 });
        //                 const data = await result.json();
        //                 console.log(data);
        //             });
        //         }
        //     }
        // })
        
        
    }
}

async function TableLis(){
    const grid = document.querySelector(".TableList");
    grid.innerHTML='';
    const result = await fetch(`${host}/api/v1/tables?page=0&size=30`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    
    const data = await result.json(); // нужно ждать, пока данные загрузятся
    const res = await fetch(`${host}/api/v1/orders/countStats`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    const dat = await res.json();
    
    for (let i = 0; i < 10; i++) {
        console.log(data[i]);
        const cell = document.createElement("div");
        cell.className = `cell cell-${data[i].id} cellNum`;
        cell.textContent = data[i].number;

        const tableIdToFind = data[i].id;
        const tableInfo = dat.tableOrderInfos.find(info => info.tableId === tableIdToFind);

        let SumOfOrders=0;
        if (tableInfo) {
            SumOfOrders=tableInfo.pendingOrders.count+tableInfo.confirmedOrders.count+tableInfo.completedOrders.count;
        }
        if(data[i].open){
            cell.innerHTML=`
            <p>${data[i].id}</p>
            <p class='NumberOrder'>${SumOfOrders}</p>
            `;
            cell.classList.add('Checked');
        }
        // функция при нажатии
        cell.onclick = () => TableCheck(data[i].id, data[i].open);
        grid.appendChild(cell);
    }
    
    

}


// Автоматическое подключение при загрузке страницы
window.onload = async function () {
    document.querySelector('.app').innerHTML = renderBody();
    initializeButtons();  // 2. Add event listeners to buttons!
    await connectWebSocket();  // Подключение к WebSocket
    await loadAllOrders("PENDING", allPENDINGOrders);  // Загрузка всех заказов
    makeActivePendingButton();
    Swip();
    await updateOrderCounters();
    TableLis();
};