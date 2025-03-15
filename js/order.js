const token=JSON.parse(localStorage.getItem('accessToken')); // Получаем токен (замени на свой способ хранения)
console.log(token);
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
          <a class='addbutton' type="button" data-bs-toggle="modal" data-bs-target="#Modalsearch">
            <i class='bx bx-plus'></i>
          </a>
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
  // тут код для отправки заказа в избранное
  const star = document.querySelector('.chosen');
  if (star.classList.contains('active')) {
      // отправляем на сервер весь заказ
  }
  // а тут очистка заказа
  localStorage.setItem("order", JSON.stringify([]));
  localStorage.setItem("totalcost", JSON.stringify(0.0));
  // убираем из избранного после отправки
  star.classList.remove('active');
  star.innerHTML = `<i class='bx bx-star' ></i>`;

  let totalcost = JSON.parse(localStorage.getItem('totalcost')) || 0.0;  // Инициализация totalcost
  let total = 'Всего:';
  if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
      total = 'Total:';
  }
  const ordcont = document.querySelector(".itog-cost");
  ordcont.innerHTML = ` <h6 class="itog-cost">${total} ${totalcost}<h6> `;

  updateModal();
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
          <label for="rangeSlider" class="form-label">${texts.selectTable}</label>
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

// Функция для обработки отправки данных заказа
function handleOrderSubmission(orderData, isAddressForm) {
  let order = JSON.parse(localStorage.getItem('order'));
  let user = JSON.parse(localStorage.getItem('uuid'));
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

  fetch('http://46.229.212.34:9091/api/v1/order-products/bulk', {
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
      console.log('sdfsdfsdf');
      for (let i = 0; i < order.length; i++) {
          let name = order[i].tovarname || order[i].name;
          if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
              const respo = await fetch(`http://46.229.212.34:9091/api/v1/product-translations/${order[i].id}?lang=ro`, {
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

     
    // Кнопка отправки
    document.querySelector('.ordersend').addEventListener('click', function () {
      

  });
      // добавление в избранное
      const star = document.querySelector('.chosen');
      star.addEventListener('click', function () {
          // добавление класс active
          if (!star.classList.contains('active')) {
              star.classList.add('active');
              star.innerHTML = `<i class='bx bxs-star' ></i>`;
          }
          // удаление класс active
          else {
              star.classList.remove('active');
              star.innerHTML = `<i class='bx bx-star' ></i>`;
          }
      });
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
  const apiUrl = `http://46.229.212.34:9091/api/v1/products/search?page=${page}&size=20&query=${encodeURIComponent(query)}`;
  
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const container = document.querySelector('.result_table');
      
      console.log(data);

      const photoRequests = data.content.map(async (product) => {
          try {
              const photoResponse = await fetch(`http://46.229.212.34:9091/api/v1/photos/product/${product.id}`);
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
            <h3 class="name">${product.name}</h3>
            <h3 class="cost">${product.price} MDL</h3>
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

// Назначаем обработчик прокрутки


async function FindTovar() {
  const searchInput = document.querySelector("#search");
  const resultTable = document.querySelector(".result_table");
  
  let totalcost = JSON.parse(localStorage.getItem('totalcost')) || 0.0;  // Инициализация totalcost
  
  if (!searchInput || !resultTable) {
      console.error("Ошибка: не найдены необходимые элементы.");
      return;
  }
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

  // Поиск по нажатию кнопки
  searchInput.addEventListener("input", function() {
    const container = document.querySelector('.result_table');
    container.innerHTML = ''; // Очистка контейнера
    page = 0; // Сброс страницы
    loadProducts(searchInput.value);
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
          const productName = item.querySelector('.name').textContent;
          const productId = parseInt(item.id.replace(/[^0-9]/g, ""));
          const price = parseFloat(item.querySelector('.cost').textContent) * quantity;

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
          messageElement.className = "message ";
          messageElement.textContent = message;
          messageDiv.appendChild(messageElement);
}
function displayOrderBB(data) {
  const messageDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");

  const order = data.orderResponseDTO;
  messageElement.className = `order it-${order.id} swiper-slide`;

  // Displaying basic order details
  messageElement.innerHTML = `
      <h2>Заказ ID: ${order.id ?? 'Не указано'}</h2>
      <details>
      <summary>
      <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
      <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
      <p>${formatAddress(data.addressResponseDTO)}</p>
      <p>${formatphoen(data.phoneNumber)}</p>
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
        <button class="close" data-id="${order.id}">Отмена</button>
        </div>
      `
;
messageDiv.prepend(messageElement); // Добавить в начало
Swip();
confirmbut();

  // Автопрокрутка вниз
  messageDiv.scrollTop = messageDiv.scrollHeight;

}

function displayOrder(data) {
    const messageDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    console.log(data)

    const order = data.orderResponseDTO;

    // Добавление клаасов
    messageElement.className = `order it-${order.id} swiper-slide`;
    // Displaying basic order details
    messageElement.innerHTML = `
        <h2>Заказ ID: ${order.id ?? 'Не указано'}</h2>
        <details>
        <summary>
        <p>${data.otp ? `Проверочный код: ${data.otp}` : ''}</p>
        <p><span>Метод оплаты:</span> ${order.paymentMethod ?? 'Не указано'}</p>
        <p><span>Итоговая цена:</span> ${order.totalPrice ?? 'Не указано'} lei</p>
        <p>${formatAddress(data.addressResponseDTO)}</p>
        <p>${formatphoen(data.phoneNumber)}</p>
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
        <button class="close" data-id="${order.id}">Отмена</button>
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
  document.querySelectorAll('.close').forEach(el => {
    el.addEventListener('click', async function() {
      const id = el.getAttribute('data-id');
      if (id) {
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
        const response =await fetch(`http://46.229.212.34:9091/api/v1/orders/${id}`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${token}`
          }
          });
          console.log(response);
          document.querySelector(`.it-${id}`).style.display='none';
        }
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

function formatphoen(tel) {
  if (!tel) {
      return '';
  }
  return `Номер телефона: ${tel}`
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


let swiper;

function Swip() {
  swiper = new Swiper('.card-cont', {
    loop: false,  // Если элементы дублируются, зацикливание включено
    spaceBetween: 32,  // Уменьшаем расстояние между карточками
    slidesPerView: "auto",  // Автоматическая ширина слайдов (убедитесь, что слайды одинаковы по размеру)
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
  // Убедитесь, что swiper инициализирован
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

// Автоматическое подключение при загрузке страницы
window.onload = async function() {
      document.querySelector('.app').innerHTML=renderHeader()+renderBody()+renderFooter();
      
    Registr(); //Изменение лого
    await connectWebSocket();  // Подключение к WebSocket
    await loadAllOrders();  // Загрузка всех заказов
    Swip();
    FindTovar();
};