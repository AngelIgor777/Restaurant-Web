const host = "http://46.229.212.34:9091";

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
                <li class="nav-item"><a href="index.html#Contacts">Контакты</a></li>
                <li class="nav-item"><a href="order.html">Заказы</a></li>
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
        <div class="addbody">
      <div class="searchFind">
        <div class="findinput">
          <form>
            <div class="input-group searchgroup">
             <input class="form-control" type="search" id='search' placeholder="Введите запрос..." aria-label="Поиск">
          </div>
            
          </form>
        </div>
         <div class="result_table">
            <div class='result'>
            <!-- Сюда будут добавляться результаты поиска -->
            </div>
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

        <div class="userFind">
        <div class="findinput">
          <form>
            <div class="input-group searchgroup">
             <input class="form-control" type="search" id='searchuser' placeholder="Введите запрос..." aria-label="Поиск">
          </div>
            
          </form>
        </div>
         <div class="result_table_user result_table">
            <div class='result-user result'>
            <!-- Сюда будут добавляться результаты поиска -->
            </div>
         </div>
      
         </div>

        <div class='sendform'>
        
        </div>
    </div>
      </div>

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
              <div class="slider-container">
                <label for="table" class="form-label">${texts.selectTable}</label>
                <input type="range" class="form-range" id="table" min="1" max="10" value="5">
                <p>${texts.tableNum} <span id="sliderValue">5</span></p>
              </div>
            </div>
            <div class="form-floating mb-3" id="coupon-container1" style="display:none;">
              <input type="text" class="form-control" id="coupon" placeholder="${texts.couponAll}" />
              <label for="coupon">${texts.couponAll}</label>
            </div>
            <div class="form-floating mb-3" id="coupon-container2" style="display:none;">
              <input type="text" class="form-control" id="couponIt" placeholder="${texts.couponOne}" />
              <label for="coupon">${texts.couponOne}</label>
            </div>
            <div class="form-check couponch">
              <input type="checkbox" class="form-check-input" id="couponCheckbox" />
              <label class="form-check-label" for="couponCheckbox">${texts.hasCoupon}</label>
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
            <button type="button" class="btn btn-success updateMod" style="font-size: 1.2rem">
                Заказать
              </button>
          `;
          
      
          cont.appendChild(form);
      
          // Получаем элемент слайдера и элемент для отображения значения
        const slider = document.getElementById('table');
        const sliderValue = document.getElementById('sliderValue');
        
        // Устанавливаем начальное значение в span
        sliderValue.textContent = slider.value;
      
        // Обработчик события для обновления значения при изменении слайдера
        slider.addEventListener('input', function() {
          sliderValue.textContent = slider.value;  // Обновляем текст в span
        });
      
          const couponCheckbox = document.getElementById('couponCheckbox');
          const couponContainer1 = document.getElementById('coupon-container1');
          const couponContainer2 = document.getElementById('coupon-container2');
      
          // Обработчик для чекбокса
          couponCheckbox.addEventListener('change', () => {
            toggleVisibility(couponContainer1, couponCheckbox.checked);
            toggleVisibility(couponContainer2, couponCheckbox.checked);
          });
      
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
          document.querySelector('.updateMod').addEventListener('click', function() {
            let data = getFormData(check.checked);
            handleOrderSubmission(data, check.checked);
          });
          
      
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
            coupon: document.getElementById('coupon').value.trim() || null,
            couponit: document.getElementById('couponIt').value.trim() || null
          };
        } else {
          const num = document.getElementById("table").value.trim();
          const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
          if (!validateField(num, 'Номер столика') || !paymentMethod) {
            return false;
          }
      
          data = {
            paymentMethod: paymentMethod.value,
            coupon: document.getElementById('coupon').value.trim() || null,
            couponit: document.getElementById('couponIt').value.trim() || null
          };
        }
        return data;
}
let user = null;
// Функция для обработки отправки данных заказа
function handleOrderSubmission(orderData, isAddressForm) {
        let order = JSON.parse(localStorage.getItem('order'));
        let orderRequest = order.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }));
      
        let book = {
          orderProductRequestDTO: orderRequest,
          paymentMethod: orderData.paymentMethod,
          orderInRestaurant: !isAddressForm,
          tableRequestDTO: isAddressForm ? null : { number: document.getElementById("table").value },
          existDiscountCodes: orderData.coupon || orderData.couponit ? true : false,
          productDiscountCode: orderData.couponit || "",
          globalDiscountCode: orderData.coupon || "",
          phoneNumber: orderData.tel,
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
          Swal.fire({
            title: 'Успех!',
            text: `Номер вашего заказа: ${data.otp}!`,
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
                    const ordcont=document.querySelector(".itog-cost");
                    ordcont.innerHTML= `
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
                    return { ...product, imageUrl: photoData[0]?.url || 'path/to/default-image.jpg' };
                } catch (photoError) {
                    console.error(`Ошибка при загрузке фото для продукта ${product.id}`, photoError);
                    return { ...product, imageUrl: 'path/to/default-image.jpg' };
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
        }finally {
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

async function loadUsers(query) {
    if (isLoadingus) return; // Предотвращаем повторные запросы
    isLoadingus = true; // Устанавливаем флаг загрузки
    const apiUrl = `${host}/api/v1/users/search?query=${encodeURIComponent(query)}&page=${pageus}&size=10`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const container = document.querySelector('.result-user');
        
        console.log(data);
  
        const userItems = data.content.map((user) => {
            const userItem = document.createElement('div');
            userItem.className = `user-item visible`;
            userItem.id = `user-${user.id}`;
            userItem.innerHTML = `
              <img class="img-cost" src="${user.photoUrl || "./img/default_user.png"}" alt="${user.firstname}" />
              <h3 class="user-first">${user.firstname}</h3>
              ${user.username ? `<h3 class="user-name">${user.username}</h3>` : ''}
              <button class="alege" data-id='${user.uuid}'><i class='bx bx-user-check'></i></i> <i class='bx bx-check'></i></button>
            `;
            return userItem;
        });
        
        container.addEventListener('scroll', () => checkScrollus(container));
        container.append(...userItems);
        pageus++;
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    } finally {
        isLoadingus = false; // Сбрасываем флаг загрузки
    }
}
// Назначаем обработчик прокрутки
function checkScrollus(container) {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        const searchQuery = document.querySelector("#searchuser").value; 
        console.log(231);
        loadUsers(searchQuery); // Передаём актуальный поисковый запрос
    }
}




async function FindTovar() {
        const searchInput = document.querySelector("#search");
        const resultTable = document.querySelector(".result_table");
        
        let totalcost = JSON.parse(localStorage.getItem('totalcost')) || 0.0;  // Инициализация totalcost
        
        if (!searchInput || !resultTable) {
            console.error("Ошибка: не найдены необходимые элементы.");
            return;
        }
        loadProducts("");
        // поле для ввода данных
        Addsendform();  
        // Запрещаем стандартное поведение формы
        document.querySelector("form").addEventListener("submit", function(event) {
          event.preventDefault();
          const container = document.querySelector('.result_table');
          container.innerHTML = ''; // Очистка контейнера
          page = 0; // Сброс страницы
          loadProducts(searchInput.value);
        });

        document.querySelector(".result_table_user").addEventListener('click', function(e){
          if (e.target.matches(".alege") || e.target.closest(".alege")) {
            const button = e.target.closest(".alege");
            button.classList.add("sold");
            user=button.getAttribute('data-id');


            // Убираем класс sold через 1 секунду
            setTimeout(function () {
              button.classList.remove("sold");
          }, 1000); // 1 секунда анимации
      
        }
        });
        // Поиск по нажатию кнопки
        searchInput.addEventListener("input", function() {
          const container = document.querySelector('.result_table');
          container.innerHTML = ''; // Очистка контейнера
          page = 0; // Сброс страницы
          loadProducts(searchInput.value);
        });

        document.querySelector('#searchuser').addEventListener('input', (event) => {
          pageus = 0;
          document.querySelector('.result-user').innerHTML = '';
          loadUsers(event.target.value);
      });
      
        // Поиск при нажатии Enter в поле ввода
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const container = document.querySelector('.result_table');
                container.innerHTML = ''; // Очистка контейнера
                loadProducts(searchInput.value);
            }
        });
      
        // Обработка кликов внутри `.result_table`
        resultTable.addEventListener("click", function(e) {
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
                    order.push({ id: productId, tovarname: productName, quantity, price });
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

// Автоматическое подключение при загрузке страницы
window.onload = async function() {
    document.querySelector('.app').innerHTML=renderHeader()+renderBody()+renderFooter();
    FindTovar();
    Registr();
};