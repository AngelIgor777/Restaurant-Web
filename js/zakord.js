// const host = "http://46.229.212.34:9091";
const host = "http://localhost:9091";


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


const renderBody = () => `
<div class="buttonsend">
          <span className="badge" id="pendingCount">0</span>
          <a class='addbutton' type="button"  href='order.html'>
            <i class='bx bx-list-ol'></i>
          </a>
        </div>
        <div class="addbody">
      <div class="searchFind">
        <div class="findinput">
          <form>
            <div class="input-group searchgroup">
             <input class="form-control" type="search" id='search' placeholder="Введите запрос..." aria-label="Поиск">
          </div>
          </form>
        </div>
        <div class="category">
          <ul class="category-list"></ul>
        </div>
         <div class="result_table">
            
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

`

async function ChosenOne() {
    // а тут очистка заказа
    localStorage.setItem("order", JSON.stringify([]));
    localStorage.setItem("totalcost", JSON.stringify(0.0));
    // убираем из избранного после отправки


    let totalcost = JSON.parse(localStorage.getItem('totalcost')) || 0.0;  // Инициализация totalcost
    let total = 'Всего:';
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        total = 'Total:';
    }
    const ordcont = document.querySelector(".itog-cost");
    ordcont.innerHTML = ` <h6 class="itog-cost">${total} ${totalcost}<h6> `;

    updateModal(JSON.parse(localStorage.getItem('order')));
}

let pagepro = 0; // Начинаем с 0
let isLoadingpro = false; // Флаг загрузки
async function loadItems(id) {
    if (isLoadingpro) return; // Предотвращаем повторные запросы
    isLoadingpro = true; // Устанавливаем флаг загрузки
    const apiUrl = `${host}/api/v1/products?typeId=${id}&page=${pagepro}&size=20`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const container = document.querySelector('.result_table');

        console.log(data);

        const photoRequests = data.content.map(async (product) => {
            try {
                const photoResponse = await fetch(`${host}/api/v1/photos/product/${product.id}`);
                const photoData = await photoResponse.json();
                return {...product, imageUrl: photoData[0]?.url || 'path/to/default-image.jpg'};
            } catch (photoError) {
                console.error(`Ошибка при загрузке фото для продукта ${product.id}`, photoError);
                return {...product, imageUrl: 'path/to/default-image.jpg'};
            }
        });

        const productsWithPhotos = await Promise.all(photoRequests);

        const menuItems = productsWithPhotos.map((product) => {
            const menuItem = document.createElement('div');
            menuItem.className = `col-sm-6 col-md-4 col-lg-1 item visible`;
            menuItem.id = `item-${product.id}`;
            menuItem.innerHTML = `
                  <img class="img-cost" src="${product.imageUrl}" alt="${product.name}" />
                  <h3 class="nameTov">${product.name}</h3>
                  <h3 class="costTov">${product.price} MDL</h3>
                  <div class="send-plus-min">
                    <div class="plus-min">
                      <p class="min"><i class="bx bx-minus-circle"></i></p>
                      <input type="number" value="1" maxlength="2" min="0" readonly />
                      <p class="plus"><i class="bx bx-plus-circle"></i></p>
                    </div>
                    <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                  </div>
                `;
            return menuItem;
        });
        container.addEventListener('scroll', () => checkScroll(container));
        container.append(...menuItems);
        pagepro++;
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    } finally {
        isLoadingpro = false; // Сбрасываем флаг загрузки
    }
}

// Получение данных категорий с сервера
async function fetchProductTypes() {
    try {

        const response = await fetch(`${host}/api/v1/product-types`);
        const data = await response.json();

        if (data.content && Array.isArray(data.content)) {
            const productList = document.querySelector('.category-list');
            productList.innerHTML = '<li ><a class="active" data-filter="*">Все</a></li>'; // Очистка списка

            // Создаем категории
            for (const item of data.content) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');

                // создание рум версии категорий
                let namerum = item.name;
                console.log(namerum, item.id);
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    const respo = await fetch(`${host}/api/v1/product-type-translations/${item.id}?lang=ro`, {
                        method: "GET"
                    });

                    if (!respo.ok) throw new Error(`Ошибка HTTP: ${respo.status}`);

                    const dat = await respo.json();
                    namerum = dat.name;
                    console.log(dat);
                }
                link.textContent = `${namerum}`;
                link.setAttribute('data-filter', `.${item.id}`);
                listItem.appendChild(link); // Вставляем ссылку в элемент списка
                productList.appendChild(listItem);
            }
            document.querySelectorAll('.category-list a').forEach(it => {
                it.addEventListener('click', async function () {
                    document.querySelector('.category-list .active').classList.remove('active');
                    it.classList.add('active');

                    let selector = it.dataset.filter || '*';

                    if (selector === '*') {
                        page = 0;
                        const container = document.querySelector('.result_table');
                        container.innerHTML = '';
                        loadProducts("");
                    } else {
                        let ids = parseInt(selector.replace('.', ''));
                        console.log(ids)
                        pagepro = 0;
                        const container = document.querySelector('.result_table');
                        container.innerHTML = '';
                        loadItems(ids);
                    }
                });
            });


        } else {
            console.error('Неверный формат данных:', data);
        }
    } catch (error) {
        console.error('Ошибка при запросе данных категорий:', error);
    }
}

async function Addsendform() {

    const cont = document.querySelector('.sendform');
    const form = document.createElement('div');
    form.classList.add('formsend');

    // Тексты на разных языках
    let texts = {
        title: 'Введите данные',
        street: 'Улица',
        home: 'Дом',
        tel: 'Номер телефона',
        tableNum: 'Текущий номер столика: ',
        selectTable: 'Выберите номер столика:',
        couponAll: 'Купон для всего заказов',
        couponOne: 'Купон для товара',
        hasCoupon: 'Есть купон?',
        card: 'Карта',
        cash: 'Наличные'
    };
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        texts = {
            title: 'Introduceți detalii',
            street: 'Stradă',
            home: 'Casa',
            tel: 'Număr de telefon',
            tableNum: 'Numărul curent al tabelului:',
            selectTable: 'Selectați numărul tabelului:',
            couponAll: 'Cupon pentru toate comenzile',
            couponOne: 'Cupon de produs',
            hasCoupon: 'Ai un cupon?',
            card: 'Hartă',
            cash: 'Numerar'
        };
    }

    // Шаблон формы
    form.innerHTML = `
            <div class="form-check check-box">
                <input type="checkbox" class="form-check-input" id="check-zak" />
                <label class="form-check-label" for="check-zak">Заказ на дом</label>
            </div>
              <div class='inputad-container' style='display:none;'>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="street" placeholder="${texts.street}" />
                  <label for="street">${texts.street}</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="home" placeholder="${texts.home}" />
                  <label for="home">${texts.home}</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" maxlength="9" id="tel" placeholder="${texts.tel}" />
                  <label for="tel">${texts.tel}</label>
                </div>
              </div>
              <div class='inputtab-container' style='display:none;'>
                  <div class="grid" id="number-grid"></div>
                  <p>Выбрано число: <span id="selected-number">нет</span></p>
              </div>
            
              
              <div class="mb-3">
                <label>
                  <input type="radio" id="Cash" name="paymentMethod" value="CASH" />
                  ${texts.cash}
                </label>
                <label style="margin-left: 15px;">
                  <input type="radio" id="Card" name="paymentMethod" value="CARD" />
                  ${texts.card}
                </label>
              </div>
              <div>
                 <button type="button" class="btn btn-success printButton" style="font-size: 1.2rem">
                  Распечатать
                </button>
                <button type="button" class="btn btn-success confirmButton" style="font-size: 1.2rem">
                  Выполнено
                </button>      
               </div>
          
                
            `;
    // это для купонов но можно поменять на "заказ с собой"
    //  <div class="form-check couponch">
    //         <input type="checkbox" class="form-check-input" id="couponCheckbox" />
    //         <label class="form-check-label" for="couponCheckbox">${texts.hasCoupon}</label>
    //       </div>
    cont.appendChild(form);
    const grid = document.getElementById("number-grid");

    for (let i = 1; i <= 10; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = i;
        cell.onclick = () => selectCell(cell);
        grid.appendChild(cell);
    }

    // Получаем элемент слайдера и элемент для отображения значения
    // const slider = document.getElementById('table');
    // const sliderValue = document.getElementById('selected-number');

    // // Устанавливаем начальное значение в span
    // sliderValue.textContent = slider.value;

    // // Обработчик события для обновления значения при изменении слайдера
    // slider.addEventListener('input', function() {
    //   sliderValue.textContent = slider.value;  // Обновляем текст в span
    // });


    const couponCheckbox = document.getElementById('couponCheckbox');

    // Обработчик для чекбокса
    // couponCheckbox.addEventListener('change', () => {

    // });

    const check = document.getElementById('check-zak');
    console.log(check.checked);
    // Функция для обновления видимости формы в зависимости от состояния чекбокса
    const updateFormVisibility = () => {

        const isChecked = check.checked;
        const addressContainer = document.querySelector('.inputad-container');
        const tableContainer = document.querySelector('.inputtab-container');
        if (isChecked) {
            addressContainer.style.display = 'block';
            tableContainer.style.display = 'none';

            let address = JSON.parse(localStorage.getItem('addressResponseDTO'));
            if (address) {
                document.getElementById("street").value = address.street;
                document.getElementById("home").value = address.homeNumber;
            }
        } else {
            addressContainer.style.display = 'none';
            tableContainer.style.display = 'block';
        }
    };
    // Инициализация начального состояния
    updateFormVisibility();

    // Обработчик изменения состояния чекбокса
    check.addEventListener('click', updateFormVisibility);

    // Обработчик кнопки обновления
    document.querySelector('.printButton').addEventListener('click', function () {
        let data = getFormData(check.checked);
        handleOrderSubmission(data, check.checked, "COMPLETED");
    });
    document.querySelector('.confirmButton').addEventListener('click', function () {
        let data = getFormData(check.checked);
        handleOrderSubmission(data, check.checked, "CONFIRMED");
    });


}

// функция для получения номера
function selectCell(cell) {
    // Убираем выделение со всех ячеек
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('selected'));

    // Выделяем текущую ячейку
    cell.classList.add('selected');

    // Обновляем выбранное число
    document.getElementById('selected-number').textContent = cell.textContent;
}

// Функция для проверки полей
function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        Swal.fire({
            title: `Заполните поле ${fieldName}!`,
            icon: 'error',
            confirmButtonColor: '#2F9262',
        });
        return false;
    }
    return true;
}

// Функция для получения данных формы
function getFormData(isAddressForm) {
    let data = {};
    if (isAddressForm) {
        const street = document.getElementById("street").value.trim();
        const home = document.getElementById("home").value.trim();
        const tel = document.getElementById("tel").value.trim();
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

        if (!validateField(street, 'Улица') || !validateField(home, 'Дом') || !validateField(tel, 'Телефон') || !paymentMethod) {
            return false;
        }

        data = {
            street,
            home,
            tel,
            paymentMethod: paymentMethod.value,
            coupon: null,
            couponit: null
        };
    } else {
        const num = document.getElementById("selected-number").textContent.trim();
        console.log(num);
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!validateField(num, 'Номер столика') || !paymentMethod) {
            return false;
        }

        data = {
            paymentMethod: paymentMethod.value,
            coupon: null,
            couponit: null
        };
    }
    return data;
}

let user = null;

// Функция для обработки отправки данных заказа
function handleOrderSubmission(orderData, isAddressForm, orderStatus) {
    let order = JSON.parse(localStorage.getItem('order'));
    let orderRequest = order.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }));
    console.log(document.getElementById("selected-number").value);
    let book = {
        orderProductRequestDTO: orderRequest,
        paymentMethod: orderData.paymentMethod,
        orderInRestaurant: !isAddressForm,
        tableRequestDTO: isAddressForm ? null : {number: document.getElementById("selected-number").textContent},
        existDiscountCodes: orderData.coupon || orderData.couponit ? true : false,
        productDiscountCode: orderData.couponit || "",
        globalDiscountCode: orderData.coupon || "",
        phoneNumber: orderData.tel,
        orderStatus: orderStatus,
        userRegistered: !!user,
        userUUID: user || "",
        addressRequestDTO: isAddressForm ? {
            city: "Copceak",
            street: orderData.street,
            homeNumber: orderData.home,
            apartmentNumber: "1",
            userUUID: user || ""
        } : null
    };

    fetch(`${host}/api/v1/order-products/bulk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
        .then(response => response.json())
        .then(data => {
            let responseText;
            if (orderStatus !== "CONFIRMED") {
                responseText = `Номер вашего заказа: ${data.otp}!`;
            } else {
                responseText = "Отправлено!";
            }
            Swal.fire({
                title: 'Успех!',
                text: responseText,
                confirmButtonColor: "#2F9262",
                icon: "success",
            });
            ChosenOne();  // Пример использования функции для избранного
        })
        .catch(error => {
            Swal.fire({
                title: 'Ошибка!',
                text: 'Не удалось принять заказ!',
                confirmButtonColor: "#2F9262",
                icon: "error",
            });
            console.error(error);
        });
}

// Функция для управления видимостью элементов
function toggleVisibility(element, isVisible) {
    element.style.display = isVisible ? 'block' : 'none';
}

async function updateModal(order) {
    let tbody = document.querySelector(".ordorlist");
    tbody.innerHTML = ''; // Очищаем таблицу перед вставкой новых данных
    // Проверяем, что orderList не пустой
    console.log(order);
    if (order.length > 0) {
        let totalcost = JSON.parse(localStorage.getItem('totalcost'));
        for (let i = 0; i < order.length; i++) {
            let name = order[i].tovarname || order[i].name;
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                const respo = await fetch(`${host}/api/v1/product-translations/${order[i].id}?lang=ro`, {
                    method: "GET"
                });

                if (!respo.ok) throw new Error(`Ошибка HTTP: ${respo.status}`);

                const dat = await respo.json();
                name = dat.name;
            }
            tbody.insertAdjacentHTML('beforeend', `
            <tr>
              <td style="text-align: center;">${i + 1}</td>
              <td style="text-align: center;">${name}</td>
              <td style="text-align: center;">${order[i].price}</td>
              <td style="text-align: center;">${order[i].quantity}</td>
              <td style="text-align: center;"><button class="delete btn btn-danger" data-delete="${order[i].id}"  data-price="${order[i].price}"><i class='bx bx-trash-alt'></i></button></td>
            </tr>
            
          `);

        }


        // Важно: добавляем обработчик события для кнопок удаления
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                // Получаем ID товара для удаления
                const itemId = e.target.closest("button").dataset.delete;
                const price = parseFloat(button.dataset.price);
                console.log(price)
                let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                totalcost -= price;

                // Обновляем заказ, удаляя элемент
                let order = JSON.parse(localStorage.getItem('order'));
                const index = order.findIndex(item => item.id === parseInt(itemId) && item.price === price);
                if (index !== -1) {
                    order.splice(index, 1); // Удаляет только один элемент по найденному индексу
                }
                if (order.length === 0) {
                    totalcost = 0;
                }
                localStorage.setItem('totalcost', JSON.stringify(totalcost));
                // Сохраняем обновленный заказ в localStorage
                localStorage.setItem('order', JSON.stringify(order));

                // Обновляем модальное окно
                updateModal(order);
                let total = 'Всего:';
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    total = 'Total:';
                }
                const ordcont = document.querySelector(".itog-cost");
                ordcont.innerHTML = `
                    <h6 class="itog-cost">${total} ${totalcost}<h6>
                     `;


            });
        });
    } else {
        // Если нет элементов в заказе, показываем сообщение
        tbody.insertAdjacentHTML('beforeend', '<tr><td colspan="5">Корзина пуста</td></tr>');
    }
}

let page = 0; // Начинаем с 0
let isLoading = false; // Флаг загрузки
async function loadProducts(query) {
    if (isLoading) return; // Предотвращаем повторные запросы
    isLoading = true; // Устанавливаем флаг загрузки
    const apiUrl = `${host}/api/v1/products/search?page=${page}&size=20&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const container = document.querySelector('.result_table');

        console.log(data);

        const photoRequests = data.content.map(async (product) => {
            try {
                const photoResponse = await fetch(`${host}/api/v1/photos/product/${product.id}`);
                const photoData = await photoResponse.json();
                return {...product, imageUrl: photoData[0]?.url || 'path/to/default-image.jpg'};
            } catch (photoError) {
                console.error(`Ошибка при загрузке фото для продукта ${product.id}`, photoError);
                return {...product, imageUrl: 'path/to/default-image.jpg'};
            }
        });

        const productsWithPhotos = await Promise.all(photoRequests);

        const menuItems = productsWithPhotos.map((product) => {
            const menuItem = document.createElement('div');
            menuItem.className = `col-sm-6 col-md-4 col-lg-1 item visible`;
            menuItem.id = `item-${product.id}`;
            menuItem.innerHTML = `
                  <img class="img-cost" src="${product.imageUrl}" alt="${product.name}" />
                  <h3 class="nameTov">${product.name}</h3>
                  <h3 class="costTov">${product.price} MDL</h3>
                  <div class="send-plus-min">
                    <div class="plus-min">
                      <p class="min"><i class="bx bx-minus-circle"></i></p>
                      <input type="number" value="1" maxlength="2" min="0" readonly />
                      <p class="plus"><i class="bx bx-plus-circle"></i></p>
                    </div>
                    <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                  </div>
                `;
            return menuItem;
        });
        container.addEventListener('scroll', () => checkScroll(container));
        container.append(...menuItems);
        page++;
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    } finally {
        isLoading = false; // Сбрасываем флаг загрузки
    }
}

function checkScroll(container) {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        const searchQuery = document.querySelector("#search").value;
        loadProducts(searchQuery); // Передаём актуальный поисковый запрос
    }
}

// Поиск пользователей
let pageus = 0; // Начинаем с 0
let isLoadingus = false; // Флаг загрузки


async function FindTovar() {
    const searchInput = document.querySelector("#search");
    const resultTable = document.querySelector(".result_table");

    let totalcost = JSON.parse(localStorage.getItem('totalcost')) || 0.0;  // Инициализация totalcost

    if (!searchInput || !resultTable) {
        console.error("Ошибка: не найдены необходимые элементы.");
        return;
    }
    loadProducts("");
    fetchProductTypes();
    // поле для ввода данных
    Addsendform();
    // Запрещаем стандартное поведение формы
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        const container = document.querySelector('.result_table');
        container.innerHTML = ''; // Очистка контейнера
        page = 0; // Сброс страницы
        loadProducts(searchInput.value);
    });


    // Поиск по нажатию кнопки
    searchInput.addEventListener("input", function () {
        const container = document.querySelector('.result_table');
        container.innerHTML = ''; // Очистка контейнера
        page = 0; // Сброс страницы
        loadProducts(searchInput.value);
    });


    // Поиск при нажатии Enter в поле ввода
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const container = document.querySelector('.result_table');
            container.innerHTML = ''; // Очистка контейнера
            loadProducts(searchInput.value);
        }
    });

    // Обработка кликов внутри `.result_table`
    resultTable.addEventListener("click", function (e) {
        const plusMinContainer = e.target.closest(".plus-min");

        if (plusMinContainer) {
            const input = plusMinContainer.querySelector("input");

            if (e.target.matches("p.plus") || e.target.closest("p.plus")) {
                input.value = parseInt(input.value, 10) + 1;
            }

            if (e.target.matches("p.min") || e.target.closest("p.min")) {
                let value = parseInt(input.value, 10);
                if (value > 1) {
                    input.value = value - 1;
                }
            }
        }

        if (e.target.matches(".send") || e.target.closest(".send")) {
            const button = e.target.closest(".send");
            button.classList.add("sold");
            if (!localStorage.getItem("order")) {
                localStorage.setItem("order", JSON.stringify([]));
            }
            if (!localStorage.getItem("totalcost")) {
                localStorage.setItem("totalcost", JSON.stringify(0.0));
            }

            let order = JSON.parse(localStorage.getItem('order'));
            totalcost = JSON.parse(localStorage.getItem('totalcost'));  // Получаем актуальное значение totalcost

            const item = button.closest(".item");
            const input = button.closest(".send-plus-min").querySelector("input");

            let quantity = parseInt(input.value, 10);
            const productName = item.querySelector('.nameTov').textContent;
            const productId = parseInt(item.id.replace(/[^0-9]/g, ""));
            const price = parseFloat(item.querySelector('.costTov').textContent) * quantity;

            totalcost += price;

            let existingProduct = order.find(item => item.tovarname === productName);
            if (existingProduct) {
                existingProduct.price += price;
                existingProduct.quantity += quantity;
            } else {
                order.push({id: productId, tovarname: productName, quantity, price});
            }
            // Убираем класс sold через 1 секунду
            setTimeout(function () {
                button.classList.remove("sold");
            }, 1000); // 1 секунда анимации
            localStorage.setItem('order', JSON.stringify(order));
            localStorage.setItem('totalcost', JSON.stringify(totalcost));

            console.log(order);
            console.log(totalcost);
            // При каждом нажатии обновляем таблицу
            let orde = JSON.parse(localStorage.getItem('order'));
            console.log(orde);
            updateModal(orde);

            // Редактируем totalcost

            let total = 'Всего:';
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                total = 'Total:';
            }
            const ordcont = document.querySelector(".itog-cost");
            ordcont.innerHTML = ` <h6 class="itog-cost">${total} ${totalcost}<h6> `;

        }
    });


    let orde = JSON.parse(localStorage.getItem('order'));
    updateModal(orde);
    let total = 'Всего:';
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        total = 'Total:';
    }
    const ordcont = document.querySelector(".orderconteiner");
    ordcont.insertAdjacentHTML('afterbegin', `
        <h6 class="itog-cost">${total} ${totalcost}<h6>
      `);
}

async function getReg(uuid1) {
    try {
        // Получаем данные пользователя
        let response = await fetch(`${host}/api/v1/users/${uuid1}`);
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

function getUUIDFromURL() {
    const hash = window.location.hash; // Получаем часть после #
    const match = hash.match(/#menu\/([a-f0-9\-]{36})/i); // Регулярка для UUID
    return match ? match[1] : null; // Возвращаем UUID или null, если не найден
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

async function updateOrderCounters() {
    const token = JSON.parse(localStorage.getItem("accessToken"));

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


let stompClient = null;
function connectWebSocket(retryCount = 0) {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (!token) return;

    const socket = new SockJS(`${host}/ws-orders`);
    stompClient = Stomp.over(socket);

    stompClient.connect(
        {Authorization: "Bearer " + token},
        function (frame) {
            console.log("Connected to server:", frame);
            stompClient.subscribe('/topic/pending-orders-increment', function (response) {
                const orderData = JSON.parse(response.body);
                if (orderData === 1) {
                    const element = document.getElementById("pendingCount");
                    if (element) {
                        const currentCount = parseInt(element.textContent, 10) || 0;
                        element.textContent = currentCount + 1;
                    }
                }
            });
        },
        function (error) {
            console.error("Ошибка подключения:", error);
            // Try reconnecting after a delay
            if (retryCount < 100) { // Limit retries to avoid infinite loops
                setTimeout(() => connectWebSocket(retryCount + 1), 5000); // 5 sec delay
            }
        }
    )
}



// Автоматическое подключение при загрузке страницы
window.onload = async function () {
    document.querySelector('.app').innerHTML = renderBody();
    updateOrderCounters();
    FindTovar();
    Registr();
    connectWebSocket();
};