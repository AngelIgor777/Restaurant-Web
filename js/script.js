const host = CONFIG.host;

// Закрытие меню
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
// для всей суммы
let ishist = false;
// для заказа
let isorder = false;
// части html для меню
const renderHeader = () => `
<header>
        <nav class="navbar navbar-expand-lg navcont">
          <div class="container-fluid">
            <h1 class="logo"><a style='text-decoration:none'><img src="./css/Park.png" alt="" /> </a></h1>
            <span class="buttonsing-1 d-flex flex-row">
            <select class="form-select lang" >
              <option value="ru">ru</option>
              <option value="ro">ro</option>
            </select>
              <div class="dropdown  singin">
                <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" id='profile' style="color: black;">Профиль</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item exit" style="color: black;">Выход</a></li>
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
                <li class="nav-item active"><a href="#menu">Меню</a></li>
                <li class="nav-item"><a href="#about">О нас</a></li>
                <li class="nav-item"><a href="#Contacts">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
            <select class="form-select lang">
              <option value="ru">ru</option>
              <option value="ro">ro</option>
            </select>
              <div class="dropdown  singin">
                
                 <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                 
                  <li><a class="dropdown-item" id='profile' style="color: black;">Профиль</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item exit" style="color: black;">Выход</a></li>
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
const renderMenu = () => `
<div class="container-fluid cat">
  <div class="row">
    <div class="col-12 category-content">
      <div class="input-group searchgroup">
        <input class="form-control" type="search" id="search-input" placeholder="Введите запрос..." aria-label="Поиск">
        <button class="btn btn-secondary" type="button" id="search-button">
          <i class='bx bx-search'></i>
        </button>
      </div>
      <h1 class="title">
        <a data-bs-toggle="collapse" href="#Category" id="menutext" role="button" aria-expanded="false" aria-controls="Category">
          <i class="bi bi-chevron-down"></i>Меню
        </a>
      </h1>
      <div class="collapse" id="Category">
        <div class="category">
          <ul class="category-list"></ul>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 containe" style="height: 2000px; opacity:0">
      <div class="menu-container text-center col-sm-6 col-md-4 col-lg-4 container"></div>
    </div>
  </div>
  <div class="pagcontainer">
    <ul class="pagul"></ul>
  </div>

  <div class="buttonsend">
    <a type="button" data-bs-toggle="modal" data-bs-target="#Modalwindow">
      <i class="bx bx-cart-download"></i>
    </a>
    <p class="colvo">0</p>
  </div>

  <div class="buthistory" id="orderHistoryBtn">
    <a type="button" data-bs-toggle="modal" data-bs-target="#HistoryModal">
      <i class='bx bx-history'></i>
    </a>
  </div>

  <div class="genorder" id="GeneralOrderBtn">
    <a type="button" data-bs-toggle="modal" data-bs-target="#GeneralOrder">
      <i class='bx bx-collection'></i>
    </a>
  </div>

  <div class="modal fade orderList" id="Modalwindow" tabindex="-1" aria-labelledby="ModalwindowTitle">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content menuorder">
        <div class="modal-header">
          <h1 id="ModalwindowTitle">Ваш заказ <span class='chosen'><i class='bx bx-star'></i></span></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="order">
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
              <tbody class="ordorlist"></tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-check check-box">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">Заказ на дом</label>
          </div>
          <button type="button" class="btn decline orderButtons" data-bs-dismiss="modal" style="font-size: 1.2rem">Отмена</button>
          <button type="button" class="btn btn-success ordersend" style="font-size: 1.4rem" data-bs-dismiss="modal" aria-label="Close">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade histmod" id="HistoryModal" tabindex="-1" aria-labelledby="HistoryModalTitle">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="HistoryModalTitle">История</h2>
          <button type="button" class="btn-close histclose" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="historyBody"></div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="GeneralOrder" tabindex="-1" aria-labelledby="GeneralOrderTitle">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="GeneralOrderTitle">Общие заказы</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="genorderbody">
            <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Код для подключения" aria-label="Код для подключения" aria-describedby="basic-addon2">
                 <div class="input-group-append">
                    <span class="input-group-btn"><button type="button" class="connectbtn">Подключиться</button></span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
         <button type="button" class="btn decline" data-bs-dismiss="modal" style="font-size: 1.2rem">Отмена</button>
          <button type="button" class="btn btn-success" style="font-size: 1.4rem">Создать группу</button>
        </div>
      </div>
    </div>
  </div>
</div>


`
// часть О нас
const renderTitle = () => `

<section class="aboutmenu">
        
        <header class="title">
          <nav class="navbar navbar-expand-md navcont">
            <div class="container-fluid">
              <div class="logoimg">
              <img src="./css/Park.png" alt="" /> 
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

              <div class="collapse navbar-collapse" id="navbarcont">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item active"><a href="#menu">Меню</a></li>
                  <li class="nav-item"><a href="#about">О нас</a></li>
                  <li class="nav-item"><a href="#Contacts">Контакты</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <h1 class='parktitle' id='about'>PARKTOWN <span>COFFEE<span></h1>
        <div class="aboutrestoran">
        
        <p class="restdescr">
        Ресторан, погружающий в атмосферу гастрономического наслаждения. Мы
        предлагаем авторское меню, сочетая традиции и современные кулинарные
        тренды. Уютный интерьер и гостеприимная атмосфера делают PARKTOWN COFFEE
        идеальным местом для особых моментов и встреч. Наши повара используют
        свежие, качественные ингредиенты, создавая вдохновляющие блюда.
        Приходите, чтобы открыть уникальный вкус и незабываемые эмоции.
        
        </p>
        <button class="ourmenu">
        <a href="#menu">Наше Меню</a></button>
      </div>
      <section class='menuContainer'>
      <div class="aboutourgroup container-fluid up-on-scroll">
        <div class="commantname">Наша Команда</div>
        <div class="command-imgs">
            <div class="command-img">
              <img src="./img/povara.jpg" alt="Наша Команда">
            </div>
             <div class="command-img">
              <img src="./img/Komanda.jpg" alt="Наша Команда">
            </div>
        </div>
      </div>
      </section>
       <section class="contact-us up-on-scroll">
    <form class='mes'>
        <div class="inputs">
            <h3 class="contactTitle" id="Contacts">Свяжитесь с нами</h3>
            <div class="contact-inputs">
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" id="contact-name" placeholder="Имя" required/>
                    <label for="contact-name">Имя</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="email" class="form-control" id="contact-mail" placeholder="Электронная почта" required/>
                    <label for="contact-mail">Электронная почта</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" maxlength="9" id="contact-number" placeholder="Номер телефона" required/>
                    <label for="contact-number">Номер телефона</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" id="contact-event" placeholder="Мероприятие" required/>
                    <label for="contact-event">Мероприятие</label>
                </div>
                <div class="form-group mb-3">
                    <textarea class="form-control" placeholder="Сообщение" id="contact-message" rows="3" required></textarea>
                </div>
            </div>
            <button type="submit" class="contact-button text-end">Отправить</button>
        </div>
    </form> <!-- Закрываем форму здесь -->
    <div class="contact-info">
        <div>
            <h3><b>Время работы</b></h3>
            <h5>с 8:00 до 22:00</h5>
            <h5>Кухня до 21:00</h5>
        </div>
        <div>
            <h3><b>Контактный адрес</b></h3>
            <h5><span><i class="bx bxs-location-plus"></i></span> Lenin 81/a, Copceac</h5>
            <h5><span><i class="bx bx-phone"></i></span> 078299844</h5>
            <h5>
                <span><i class="bx bxl-instagram"></i></span>
                <a href="https://www.instagram.com/parktown_coffee/">parktown_coffee</a>
            </h5>
            <h5>
                <span><i class='bx bxl-telegram'></i></span>
                <a href="https://t.me/PARK_TOWN_BOT" target="_blank">Telegram</a>
            </h5>
        </div>
    </div>
</section>

      </section>
      
`
const renderItem = (onlyItem = []) => `
<div class="container-fluid only-item justify-content-center align-items-center ">
        <div class="row justify-content-center align-items-center">
          <div class="col-sm-8 col-md-5 col-lg-6 item-img d-flex justify-content-center">
            <img src="${onlyItem[2]}" alt="${onlyItem[0]}">
          </div>
          <div class="col-sm-5 col-md-6 col-lg-4 item-descr d-flex flex-column align-items-left">
            <h1 class="item-name">${onlyItem[0]}</h1>
            <h4 class="cost-item">${onlyItem[1]}MDL</h4>
            <h5 class="weith">${formatTime(onlyItem[4])}</h5>
            <h5 class="ingredients" style="word-wrap: break-word !important;">${formatDescr(onlyItem[3])}</h5>
            <div class="send-but d-flex justify-content-center">
              <div class="plus-min">
                <p class="min"><i class="bx bx-minus-circle"></i></p>
                <input type="number" value="1" maxlength="2" min="0" />
                <p class="plus"><i class="bx bx-plus-circle"></i></p>
              </div>
             <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
            </div>
             
          </div>
        </div>
      </div>

    <div class='weektop'>
      <h2>Топ 10 блюд недели</h2>
        <div class='topcont swiper'>
            <div class="card-cont menu-container">
                <div class="swiper-wrapper">


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
`

function formatDescr(inputDescr) {
    if (!inputDescr) {
        return '';
    }
    return `<span>Описание: </span> ${inputDescr} `
}

function formatTime(inputTime) {
    const parts = inputTime.split(':').map(Number); // Разделяем строку и преобразуем части в числа
    const hours = parts[0];
    const minutes = parts[1];
    const seconds = parts[2];

    if (inputTime === '00:00:00') {
        return '';
    }
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
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        formattedTime = ''
        formattedTime += `${minutes}`
        return `<span>Timp aproximativ de gătire: </span> ${formattedTime.trim()}min`; // Убираем лишние пробелы
    }
    return `<span>Примерное время готовки: </span>${formattedTime.trim()}`; // Убираем лишние пробелы
}

function formDate(longDate) {
    const date = new Date(longDate);
    const day = date.getDate();
    let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        months = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
    }

    const month = months[date.getMonth()];
    let hours = date.getHours() + 2;
    hours.toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
}

async function GetHistory() {
    let userUUID = JSON.parse(localStorage.getItem('uuid'));
    if (userUUID) {
        document.querySelector('#orderHistoryBtn a').setAttribute('data-bs-target', '#HistoryModal');
    }
    document.getElementById("orderHistoryBtn").addEventListener("click", async function () {
        let userUUID = JSON.parse(localStorage.getItem('uuid'));
        if (userUUID) {
            try {
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    const titl = document.getElementById('HistoryModalTitle');
                    titl.textContent = 'Istoricul comenzilor';
                }
                const response = await fetch(`${host}/api/v1/orders/user?userUUID=${userUUID}&page=0&size=40`);
                const data = await response.json();
                console.log("Response from user order history:", data);

                const modalBody = document.getElementById("historyBody");
                modalBody.innerHTML = ""; // Clear previous content

                if (!data || data.length === 0) {
                    modalBody.innerHTML = "<p>No order history available.</p>";
                    return;
                }

                const orderList = document.createElement("ul");
                orderList.classList.add("order-list");

                data.forEach(order => {
                    const {orderResponseDTO} = order;
                    const orderItem = document.createElement("li");
                    orderItem.classList.add("order-item");

                    // Order info (Date & Total Price)
                    const orderInfo = document.createElement("div");
                    orderInfo.classList.add("order-info");
                    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                        orderInfo.innerHTML = `
                        <button class='histsend' data-id='${orderResponseDTO.id}'>Repetă comanda</button>
                        <span class="order-date">Data comenzii: ${formDate(orderResponseDTO.createdAt)}</span>
                        <span class="order-price">Sumă: ${orderResponseDTO.totalPrice.toFixed(2)} lei</span>
                        ${orderResponseDTO.otp ? `<span class="order-price">Cod: ${orderResponseDTO.otp}</span>` : ''}
                    `;
                    } else {
                        orderInfo.innerHTML = `
                        <button class='histsend' data-id='${orderResponseDTO.id}'>Повторить заказ</button>
                        <span class="order-date">Дата заказа: ${formDate(orderResponseDTO.createdAt)}</span>
                        <span class="order-price">Сумма: ${orderResponseDTO.totalPrice.toFixed(2)} lei</span>
                        ${orderResponseDTO.otp ? `<span class="order-price">Код: ${orderResponseDTO.otp}</span>` : ''}
                    `;
                    }


                    // Product Images
                    const productImages = document.createElement("div");
                    productImages.classList.add("product-images");
                    orderResponseDTO.products.forEach(product => {
                        const img = document.createElement("img");
                        img.src = product.photoUrl;
                        img.alt = "Product";
                        img.classList.add("product-image");
                        productImages.appendChild(img);
                    });

                    orderItem.appendChild(orderInfo);
                    orderItem.appendChild(productImages);
                    orderList.appendChild(orderItem);
                });

                modalBody.appendChild(orderList);
                document.querySelector('.histmod .order-list').addEventListener('click', function (e) {
                    // Проверяем, что клик был по кнопке .histsend

                    if (e.target && e.target.classList.contains('histsend')) {
                        const orderId = e.target.getAttribute('data-id'); // Получаем id из data-id кнопки

                        // Находим заказ с этим id
                        const order = data.find(order => order.orderResponseDTO.id == orderId);
                        // Выводим все продукты этого заказа
                        if (order) {
                            console.log('Все продукты для заказа:', order.orderResponseDTO.products);
                            $('#Modalwindow').modal('show');
                            ishist = true;
                            isorder = true;
                            // Сохраняю итоговую стоимость и список товаров для дальнейшей работы
                            localStorage.setItem('historder', JSON.stringify(order.orderResponseDTO.products));
                            localStorage.setItem('totalhist', JSON.stringify(order.orderResponseDTO.totalPrice));
                            updateModal(order.orderResponseDTO.products);  // Предполагается, что функция updateModal существует
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        } else {
            let text = "Ox... вы не зарегистрированы!"
            let tele = 'Зарегестрироваться!';
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                text = 'Ox... nu sunteti înregistrat!';
                tele = 'Înregistrare!'
            }
            Swal.fire({
                icon: "error",
                title: text,
                confirmButtonColor: "#2F9262",
                footer: `
                <a href="https://t.me/PARK_TOWN_BOT">${tele}</a>
                <p>Просто подпишитесь на телеграм бота</p>
                `
            });

        }
    });
}


async function Sendmes() {
    document.querySelector(".mes").addEventListener("submit", function (event) {
        event.preventDefault(); // Отмена стандартного поведения
        console.log("Форма не отправлена, но обработана JavaScript");
        let name = document.getElementById("contact-name").value.trim();
        let email = document.getElementById("contact-mail").value.trim();
        let number = document.getElementById("contact-number").value.trim();
        let eventName = document.getElementById("contact-event").value.trim();
        let message = document.getElementById("contact-message").value.trim();
        fetch(`${host}/api/v1/connection?name=${name}&email=${email}&event=${eventName}&phoneNumber=${number}&message=${message}`, {
            method: 'POST', headers: {"Content-Type": "application/json"},
        }).then(result => {
            let titl = 'Успех!';
            let tex = 'С вами свяжется наш специалист!'
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                titl = 'Succes!';
                tex = 'Specialistul nostru te va contacta!'
            }
            Swal.fire({
                title: `${titl}`, text: `${tex}`, icon: "success", customClass: {
                    confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                }
            })
        })
            .catch(error => {
                console.log(error);
            });

    });
}

async function WeekTop() {
    const container = document.querySelector('.swiper-wrapper');
    // Скрываем все пока не загрузится
    container.classList.add('nothing');


    const response = await fetch(`${host}/api/v1/products/top-weekly?page=0&size=10`);
    const data = await response.json();
    console.log(data);
    for (const item of data) {
        // Запрос URL картинки

        const imageUrl = item.photoUrl; // Если нет URL, используем картинку по умолчанию
        // Создаем элемент меню
        let name = item.name;
        let descr = item.description;
        if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
            const respo = await fetch(`${host}/api/v1/product-translations/${item.id}?lang=ro`, {
                method: "GET"
            });

            if (!respo.ok) throw new Error(`Ошибка HTTP: ${respo.status}`);
            const dat = await respo.json();
            name = dat.name;
            descr = dat.description;
            document.querySelector('.weektop h2').textContent = 'Top 10 feluri de mâncare ale săptămânii';
        }
        const menuItem = document.createElement('div');
        menuItem.className = `col-sm-6 col-md-4 col-lg-1 item swiper-slide visible `;
        menuItem.id = `item-${item.id}`;
        menuItem.innerHTML = `
      <div class="img-cost">
      <a href="#item-${item.id}">
        <div class="description">
        <h3><b>${descr}</b></h3>
            <h5>${item.cookingTime && item.cookingTime !== '00:00:00' ? `${formatTime(item.cookingTime)}</b>` : ""}</h5>
        </div>
        </a>
        <img src="${imageUrl}" alt="${item.name}" />
        <p class="cost">${item.price} MDL</p>
        
      </div>
      <h3 class="name">${name}</h3>
      <div class="send-plus-min">
        <div class="plus-min">
          <p class="min"><i class="bx bx-minus-circle"></i></p>
          <input type="number" value="1" maxlength="2" min="0" disabled/>
          <p class="plus"><i class="bx bx-plus-circle"></i></p>
        </div>
        <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
      </div>
    `;

        // Добавляем элемент в контейнер
        container.appendChild(menuItem);

    }
    let swiper = new Swiper('.card-cont', {
        loop: true,  // если элементы дублируются — отключи loop
        spaceBetween: 32, // Уменьши расстояние между карточками
        slidesPerView: "auto", // Автоматическая ширина слайдов
        centeredSlides: false, autoplay: {
            delay: 3000, // Автоматическое пролистывание каждые 3 секунды
            disableOnInteraction: false, // Автопрокрутка не останавливается при взаимодействии
        }, pagination: {
            el: ".swiper-pagination", clickable: true, dynamicBullets: true,
        }, navigation: {
            nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",
        },
    });
    // появление контейнера уже со всем топом
    container.classList.remove('nothing');
    // Добавляем обработчик события клика по документу
    document.addEventListener('click', function (e) {
        var navbarToggler = document.querySelector('.navbar-toggler'); // Кнопка меню
        var navbarCollapse = document.querySelector('.navbar-collapse'); // Меню

        if (navbarToggler && navbarCollapse) { // Проверяем, что элементы существуют
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                // Если клик был не по кнопке и не по самому меню, то закрываем меню
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
        Profile(e);

    });

    // Делегирование события на родительский элемент
    document.querySelector('.menu-container').addEventListener("click", function (e) {
        console.log(2423);
        // Находим родительский элемент с классом .plus-min
        const plusmin = e.target.closest(".plus-min");

        // Если элемент .plus-min существует, работаем с ним
        if (plusmin) {
            const input = plusmin.querySelector("input");

            // Кнопки для увеличения и уменьшения количества товаров
            if (e.target && (e.target.matches("p.plus") || e.target.closest("p.plus"))) {
                let value = parseInt(input.value, 10);
                input.value = value + 1;
            }

            if (e.target && (e.target.matches("p.min") || e.target.closest("p.min"))) {
                let value = parseInt(input.value, 10);
                if (value > 1) {
                    input.value = value - 1;
                }
            }
        }

        // Кнопка отправки
        if (e.target && (e.target.matches(".send") || e.target.closest(".send"))) {
            const but = e.target.closest(".send");
            const buttosend = document.querySelector("p.colvo");
            if (but) {
                // Добавляем класс sold для анимации
                but.classList.add("sold");
                let order = JSON.parse(localStorage.getItem('order'));
                let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                console.log(order);
                // Находим поле ввода количества
                const input = but.closest(".send-plus-min").querySelector("input");
                let quantity = parseInt(input.value, 10);

                // Находим данные товара
                const tovarname = but.closest(".item").querySelector('.name').textContent;
                const tovarid = parseInt(but.closest(".item").id.replace(/[^0-9]/g, ""));
                console.log(tovarid);
                const price = parseFloat(but.closest(".item").querySelector('.cost').textContent) * quantity;
                quant += quantity;
                // Добавляем заказ в массив
                totalcost += price;
                if (order.some(item => item.tovarname === tovarname)) {
                    let index = order.findIndex(item => item.tovarname === tovarname);
                    console.log(order[index]);
                    order[index].price += price;
                    order[index].quantity += quantity;
                } else {
                    // Добавляем заказ в массив
                    order.push({id: tovarid, tovarname: tovarname, quantity: quantity, price: price});
                }
                localStorage.setItem('order', JSON.stringify(order));
                localStorage.setItem('totalcost', JSON.stringify(totalcost));
                // Убираем класс sold через 1 секунду
                setTimeout(function () {
                    but.classList.remove("sold");
                }, 1000); // 1 секунда анимации
            }
        }
       
    });
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
            ;

            // После загрузки категорий загружаем меню
            const categoryIds = data.content.map(item => item.id); // Извлекаем IDs
            localStorage.setItem('cat', JSON.stringify(categoryIds));
            console.log(categoryIds);
            await fetchMenuItems(categoryIds, 0);


        } else {
            console.error('Неверный формат данных:', data);
        }
    } catch (error) {
        console.error('Ошибка при запросе данных категорий:', error);
    }
}

// Проверка что это в первый раз
let first = true;
// Получение данных меню
async function fetchMenuItems(categoryIds, page) {
    try {
        let tran = false;
        console.log(categoryIds);
        const menuContainer = document.querySelector('.menu-container');
        menuContainer.innerHTML = '';

        // 1. Запрашиваем все товары без категорий
        const productRequest = fetch(`${host}/api/v1/products?page=${page}&size=10`)
            .then(response => response.json())
            .then(data => ({products: data.content || []}));

        const categoriesWithProducts = await productRequest;

        // 2. Загружаем переводы параллельно (если язык румынский)
        let translationsMap = new Map();
        if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
            const translationRequests = categoriesWithProducts.products.map(product =>
                fetch(`${host}/api/v1/product-translations/${product.id}?lang=ro`)
                    .then(res => res.ok ? res.json() : null)
                    .then(translation => ({id: product.id, translation}))
            );
            const translations = await Promise.all(translationRequests);
            translations.forEach(({id, translation}) => {
                if (translation) translationsMap.set(id, translation);
            });
        }

        // 3. Создаём HTML элементы
        const fragment = document.createDocumentFragment();

        categoriesWithProducts.products.forEach(product => {
            const translation = translationsMap.get(product.id) || {};
            const name = translation.name || product.name;
            const description = translation.description || product.description;
            // узнаем произошел ли перевод
            if (translation.name) {
                tran = true;
            }

            const menuItem = document.createElement('div');
            menuItem.className = `col-sm-6 col-md-4 col-lg-1 item`;
            menuItem.id = `item-${product.id}`;
            menuItem.innerHTML = `
                <div class="img-cost">
                    <a href="#item-${product.id}">
                        <div class="description">
                            <h3><b>${description}</b></h3>
                            <h5>${product.cookingTime && product.cookingTime !== '00:00:00'
                ? `${formatTime(product.cookingTime)}`
                : ""}</h5>
                        </div>
                    </a>
                    <img src="${product.photoUrl}" alt="${name}" />
                    <p class="cost">${product.price} MDL</p>
                </div>
                <h3 class="name">${name}</h3>
                <div class="send-plus-min">
                <button class="fastsend" data-bs-toggle="modal" data-bs-target="#Modalwindow"><i class='bx bxs-zap'></i><i class='bx bx-check'></i></button>
                    <div class="plus-min">
                        <p class="min"><i class="bx bx-minus-circle"></i></p>
                        <input type="number" value="1" maxlength="2" min="0" disabled/>
                        <p class="plus"><i class="bx bx-plus-circle"></i></p>
                    </div>
                    <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                </div>
            `;
            fragment.appendChild(menuItem);
        });

        // 4. Добавляем товары в контейнер
        menuContainer.appendChild(fragment);

        // 5. Обновляем Isotope
        
        if (first) {
            first = false
            await initializeIsotope();
            loadscreen();
            // это чтобы экран появился
            document.querySelector('.containe').style.height = 'auto';
            document.querySelector('.containe').style.opacity = '1';
        }
        if (tran) {
            revealCards();
        }
        revealCards();
    } catch (error) {
        console.error('Ошибка при запросе данных меню:', error);
    }
}

// для определенных категорий
async function JustFetchMenu(categoryIds, page, size) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = '';

    // 1. Запрашиваем все товары по категориям параллельно
    const productRequests = categoryIds.map(id =>
        fetch(`${host}/api/v1/products?typeId=${id}&page=${page - 1}&size=${size}`)
            .then(response => response.json())
            .then(data => ({id, products: data.content || []}))
    );

    const categoriesWithProducts = await Promise.all(productRequests);

    // 2. Загружаем переводы параллельно (если язык румынский)
    let translationsMap = new Map();
    if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
        const translationRequests = categoriesWithProducts.flatMap(({products}) =>
            products.map(product =>
                fetch(`${host}/api/v1/product-translations/${product.id}?lang=ro`)
                    .then(res => res.ok ? res.json() : null)
                    .then(translation => ({id: product.id, translation}))
            )
        );
        const translations = await Promise.all(translationRequests);
        translations.forEach(({id, translation}) => {
            if (translation) translationsMap.set(id, translation);
        });
    }

    // 3. Создаём HTML элементы
    const fragment = document.createDocumentFragment();

    categoriesWithProducts.forEach(({id, products}) => {
        products.forEach(product => {
            const translation = translationsMap.get(product.id) || {};
            const name = translation.name || product.name;
            const description = translation.description || product.description;

            const menuItem = document.createElement('div');
            menuItem.className = `col-sm-6 col-md-4 col-lg-1 item ${id}`;
            menuItem.id = `item-${product.id}`;
            menuItem.innerHTML = `
                    <div class="img-cost">
                        <a href="#item-${product.id}">
                            <div class="description">
                                <h3><b>${description}</b></h3>
                                <h5>${product.cookingTime && product.cookingTime !== '00:00:00'
                ? `${formatTime(product.cookingTime)}`
                : ""}
                                </h5>
                            </div>
                        </a>
                        <img src="${product.photoUrl}" alt="${name}" />
                        <p class="cost">${product.price} MDL</p>
                    </div>
                    <h3 class="name">${name}</h3>
                    <div class="send-plus-min">
                    <button class="fastsend" data-bs-toggle="modal" data-bs-target="#Modalwindow"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                        <div class="plus-min">
                            <p class="min"><i class="bx bx-minus-circle"></i></p>
                            <input type="number" value="1" maxlength="2" min="0" disabled/>
                            <p class="plus"><i class="bx bx-plus-circle"></i></p>
                        </div>
                        <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                    </div>
                `;
            fragment.appendChild(menuItem);
        });
    });

    // 4. Добавляем товары в контейнер
    menuContainer.appendChild(fragment);
    revealCards();
}


// Обновление модального окна заказа
async function updateModal(order) {
    let tbody = document.querySelector(".ordorlist");
    tbody.innerHTML = ''; // Очищаем таблицу перед вставкой новых данных
    $('#HistoryModal').modal('hide');
    // Проверяем, что orderList не пустой
    if (order.length > 0) {
        let totalcost = JSON.parse(localStorage.getItem('totalcost'));
        if (ishist) {
            totalcost = JSON.parse(localStorage.getItem('totalhist'));
            // обновляем данные таблицы
            localStorage.setItem('totalcost', JSON.stringify(totalcost));
            localStorage.setItem('order', JSON.stringify(order));
            const buttosend = document.querySelector("p.colvo");
            buttosend.innerHTML = order.length;
            ishist = false;
        }

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
        let total = 'Всего:';
        if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
            total = 'Total:';
        }
        tbody.insertAdjacentHTML('beforeend', `
      <br>
      <h6 class="itog-cost">${total} ${totalcost}<h6>
      `);
        // добавление в избранное
        // const star = document.querySelector('.chosen');
        // star.addEventListener('click', function () {
        //     // добавление класс active
        //     if (!star.classList.contains('active')) {
        //         star.classList.add('active');
        //         star.innerHTML = `<i class='bx bxs-star' ></i>`;
        //     }
        //     // удаление класс active
        //     else {
        //         star.classList.remove('active');
        //         star.innerHTML = `<i class='bx bx-star' ></i>`;
        //     }
        // });
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
                const buttosend = document.querySelector("p.colvo");
                buttosend.innerHTML = order.length;
            });
        });
    } else {
        // Если нет элементов в заказе, показываем сообщение
        let empt = '<tr><td colspan="5">Корзина пуста</td></tr>';
        if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
            empt = '<tr><td colspan="5">Coșul este gol</td></tr>';
        }
        tbody.insertAdjacentHTML('beforeend', empt);
    }
}

async function initializeIsotope() {
    var $container = $('.menu-container');
    let cat = JSON.parse(localStorage.getItem('cat'));
    var itemsPerPage = 10;
    var currentPage = 1;
    var searchClicked = false;
    var first = true;
    var selector = '*';
    const response = await fetch(`${host}/api/v1/products?size=${itemsPerPage}`);
    const data = await response.json();
    var totalPages = data.totalPages - 1;
    console.log(data);

    async function loadProducts(page, query) {
        const apiUrl = `${host}/api/v1/products/search?page=${page - 1}&size=${itemsPerPage}&query=${query}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            $container.empty();
            // Генерируем HTML
            const fragment = document.createDocumentFragment();
            data.content.forEach(product => {
                const menuItem = document.createElement('div');
                menuItem.className = `col-sm-6 col-md-4 col-lg-1 item visible`;
                menuItem.id = `item-${product.id}`;
                menuItem.innerHTML = `
                  <div class="img-cost">
                    <a href="#item-${product.id}">
                      <div class="description">
                        <h3><b>${product.description}</b></h3>
                        <h5>${product.cookingTime && product.cookingTime !== '00:00:00' ? formatTime(product.cookingTime) : ''}</h5>
                      </div>
                    </a>
                    <img src="${product.photoUrl}" alt="${product.name}" />
                    <p class="cost">${product.price} MDL</p>
                  </div>
                  <h3 class="name">${product.name}</h3>
                  <div class="send-plus-min">
                    <div class="plus-min">
                      <p class="min"><i class="bx bx-minus-circle"></i></p>
                      <input type="number" value="1" maxlength="2" min="0" readonly/>
                      <p class="plus"><i class="bx bx-plus-circle"></i></p>
                    </div>
                    <button class="send"><i class="bx bx-dish"></i> <i class='bx bx-check'></i></button>
                  </div>
                `;
                fragment.appendChild(menuItem);
            });

            $container.append(fragment);

            // Обновляем Isotope сразу после вставки элементов
            $container.find('img').on('load', function () {
                $container.isotope({
                    filter: '*', layoutMode: 'masonry', masonry: {gutter: 10}, transitionDuration: 0
                });
            });

            // Обновление пагинации
            const totalPages = Math.ceil(data.totalElements / itemsPerPage);
            if (first) {
                initializePagination(totalPages);
                first = false;
            }

            // Исправленный `arrangeComplete`
            $container.on('arrangeComplete', function () {
                $container.find('.item').css('position', 'static');
                revealCards();
            });

        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    }


    var query;
    $('#search-button').on('click', function () {
        searchClicked = true;  // Устанавливаем флаг, что кнопка поиска была нажата
        first = true;  // Сброс флага для загрузки пагинации при новом поиске
        query = $('#search-input').val(); // Получаем значение из поля ввода
        loadProducts(1, query); // Загружаем товары с API по запросу
    });


// Инициализация Isotope
    $container.isotope({
        filter: selector, layoutMode: 'masonry', masonry: {gutter: 10}, transitionDuration: 0
    });

    $container.on('arrangeComplete', function () {
        $container.find('.item').css('position', 'static');
        revealCards();
    });

// Инициализация пагинации
    function initializePagination(totalPages) {
        var $pagination = $('.pagul');
        $pagination.empty();

        for (var i = 1; i <= totalPages; i++) {
            var $li = $('<li>').addClass('page-item');
            var $button = $('<button>')
                .text(i)
                .addClass('page-link pagination-button')
                .attr('data-page', i)
                .on('click', function () {
                    var page = parseInt($(this).attr('data-page'));
                    
                    showPage(page);
                });

            $li.append($button);
            $pagination.append($li);
        }

        $pagination.find(`.page-item:first-child .pagination-button`).addClass('active');
    }

// Показ страницы
    function showPage(page) {
        currentPage = page;
        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        if (searchClicked) {
            loadProducts(page, query);
        }

            // идея чтобы при каждом нажатии на кнопку категории происходила fetchMenuItems(catid, page); типа та категия и стр
        // не забудь отнять 1 от page

        else {
            let catid = [];
            // Если selector не '*', то удаляем точку и оставляем только число
            if (selector !== '*') {
                catid.push(parseInt(selector.replace('.', '')));  // Убираем точку и получаем число
                JustFetchMenu(catid, page, 10);
            } else {
                fetchMenuItems(JSON.parse(localStorage.getItem('cat')), page);
                console.log(234);
                // В случае *, передаем как есть
                // показать карточки
            }
            // Передаем в fetchMenuItems
            //
            $container.isotope({
                filter: '*',  // Показываем все элементы
            });
            // чтобы карточки появились нужна небольшая задержка
            setTimeout(function () {
                revealCards();
            }, 300); // 1 секунда анимации

        }
        // else {
        //     // Получаем текущий фильтр
        //     var selector = $('.category-list .active').attr('data-filter') || '*';

        //     $container.isotope({
        //         filter: function () {
        //             if (selector === '*') {
        //                 var index = $(this).index();
        //                 return index >= start && index < end;
        //             } else {
        //                 var index = $(this).index(selector);
        //                 return index >= start && index < end;
        //             }
        //         }
        //     });
        // }
        console.log(page);
        // Обновляем активную кнопку пагинации
        $('.pagul .pagination-button').removeClass('active');
        $(`.pagul .pagination-button[data-page="${page}"]`).addClass('active');

        // поднимаем экран вверх
        $('html, body').animate({scrollTop: 0}, 'fast');
    }

// Обработчик фильтрации
    $('.category-list a').on('click', async function () {
        $('.category-list .active').removeClass('active');
        $(this).addClass('active');
        // обнуляем что кнопка поиска нажата
        searchClicked=false;
        
        selector = $(this).attr('data-filter') || '*';
        var allItems = selector === '*' ? $container.find('.item') : $container.find(selector);


        if (selector === '*') {
            const response = await fetch(`${host}/api/v1/products?size=${itemsPerPage}`);
            const data = await response.json();
            var totalPages = data.totalPages - 1;
        } else {
            var ids = parseInt(selector.replace('.', ''));
            console.log(ids)
            const response = await fetch(`${host}/api/v1/products?typeId=${ids}`);
            const data = await response.json();
            totalPages = data.totalPages;
        }
        initializePagination(totalPages);
        showPage(1);
        return false;
    });

// Функция перемешивания элементов
//     function shuffleElements($elements) {
//         var $parent = $elements.parent();
//         $elements.sort(function () {
//             return 0.5 - Math.random();
//         }).detach().appendTo($parent);
//     }

    initializePagination(totalPages);
    showPage(1);

}

if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify([]))
}
if (!localStorage.getItem("totalcost")) {
    localStorage.setItem("totalcost", JSON.stringify(0.0))
}
let order = JSON.parse(localStorage.getItem('order'));
console.log(order);
let totalcost = JSON.parse(localStorage.getItem('totalcost'));
let quant = 0;
console.log(quant)

function roler() {
    document.getElementById("table").addEventListener("input", function () {
        document.getElementById("sliderValue").textContent = this.value;
    });

}

function extractHash(str) {
    let match = str.match(/#[a-zA-Z0-9_-]+/);
    return match ? match[0] : "";
}

async function Profile(e) {
    if (e.target.id === 'profile') {
        const uuid = JSON.parse(localStorage.getItem('uuid'));
        // Если пользователь зарегестрирован
        if (uuid) {
            let titl = 'Ваш постояный адрес';
            let stre = 'Улица';
            let casa = 'Дом';
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                titl = 'Adresa dvs. permanentă';
                stre = 'Stradă'
                casa = 'Casa'
            }
            Swal.fire({
                html: `
        <div class='adres'>
           <h1>${titl}</h1>
           <div class="form-floating mb-3">
            <input type="text" class="form-control" id="street" placeholder="${stre}" />
            <label for="street">${stre}</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="num" placeholder="${casa}" />
            <label for="num">${casa}</label>
          </div>
        </div>
        `,
                showCancelButton: true,
                confirmButtonColor: "#2F9262",
                cancelButtonColor: "#3f3f3f",
                confirmButtonText: "Отправить",
                cancelButtonText: "Отмена",
                preConfirm: () => {
                    const street = document.getElementById("street").value;
                    const home = document.getElementById("num").value;

                    if (!street || !home) {
                        Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                        return false;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const street = document.getElementById("street").value;
                    const home = document.getElementById("num").value;
                    const addres = {
                        city: "Copceac", street: street, homeNumber: home, apartmentNumber: 1, userUUID: uuid
                    }

                    fetch(`${host}/api/v1/addresses`, {
                        method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(addres)
                    }).then(result => result.json())
                        .then(data => {
                            console.log(data);
                            localStorage.setItem('addressResponseDTO', JSON.stringify(addres));
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            });
        }
        // Если пользователь не зарегестрирован
        else {
            let titl = 'Ваш постояный адрес';
            let stre = 'Улица';
            let casa = 'Дом';
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                titl = 'Adresa dvs. permanentă';
                stre = 'Stradă!'
                casa = 'Casa'
            }
            Swal.fire({
                html: `
        <div class='adres'>
           <h1>${titl}</h1>
           <div class="form-floating mb-3">
            <input type="text" class="form-control" id="street" placeholder="${stre}" />
            <label for="street">${stre}</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="num" placeholder="${casa}" />
            <label for="num">${casa}</label>
          </div>
        </div>
        `,
                showCancelButton: true,
                confirmButtonColor: "#2F9262",
                cancelButtonColor: "#3f3f3f",
                confirmButtonText: "Отправить",
                cancelButtonText: "Отмена",
                preConfirm: () => {
                    const street = document.getElementById("street").value;
                    const home = document.getElementById("num").value;

                    if (!street || !home) {
                        Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                        return false;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const street = document.getElementById("street").value;
                    const home = document.getElementById("num").value;
                    const addres = {
                        city: "Copceac", street: street, homeNumber: home, apartmentNumber: 1, userUUID: uuid
                    }
                    localStorage.setItem('addressResponseDTO', JSON.stringify(addres));

                }

            });
        }
    }
}

// функция избранное
async function ChosenOne() {
    // тут код для отправки заказа в избранное
    const star = document.querySelector('.chosen');
    // а тут очистка заказа
    localStorage.setItem("order", JSON.stringify([]));
    localStorage.setItem("totalcost", JSON.stringify(0.0));
    const buttosend = document.querySelector("p.colvo");
    buttosend.textContent = '0';
    // убираем из избранного после отправки
    // star.classList.remove('active');
    // star.innerHTML = `<i class='bx bx-star' ></i>`;
}


// когда нужно будет загружать фотографию на задний фон - использовать это, а пока просто фон
//todo сделать фотографии для retina2,3,4,5
function getBackgroundImage(baseName) {
    let windowWidth = window.innerWidth;
    let isMobile = windowWidth < 768;
    let devicePixelRatio = window.devicePixelRatio;
    let isRetina = devicePixelRatio > 1;
    let isRetina2 = 3 > devicePixelRatio > 1;
    let isRetina3 = 4 > devicePixelRatio > 2;
    let isRetina4 = 5 > devicePixelRatio > 3;
    let isRetina5 = 6 > devicePixelRatio > 4;
    console.debug("is mobile width: " + isMobile + ": width: " + windowWidth);
    console.debug("is retina: " + isRetina2 + "; device pixel ratio: " + devicePixelRatio);
    let mobileSuffix = isMobile ? "-mobile" : "";
    const photoFormat = "webp";

    if (isMobile && isRetina) {
        let photoUrl = `url(./img/${baseName}${mobileSuffix}@2x.${photoFormat})`;
        console.debug("photo url: " + photoUrl);
        return photoUrl;
    }
        // else if (isMobile && isRetina3) {
        //
        // } else if (isMobile && isRetina4) {
        //
        // } else if (isMobile && isRetina5) {
        //
    // }

    else if (isMobile) {
        return `url(./img/${baseName}${mobileSuffix}.${photoFormat})`;
    } else {
        return `url(./img/${baseName}.${photoFormat})`;
    }
}

// Вызываем функцию при изменения хэша это основа не забываеми
async function Hachchange() {

    document.querySelector('body').style.backgroundImage = "url(./img/about.png)";
    const hash = extractHash(window.location.hash);

    if (hash === '#menu') {
        // let backgroundImage = getBackgroundImage("menu-sjat")

        window.scrollTo(0, 1);
        // document.querySelector('body').style.backgroundImage = backgroundImage;
        // document.querySelector('body').style.background = `linear-gradient(to bottom, #222222, #3a3a3a, #525252)`;
        document.querySelector('body').style.backgroundImage = "url(./img/menuback.jpg)";
        document.querySelector('body').classList.add('bodyc');
        document.querySelector('.app').style.display = 'none';
        menusect.innerHTML = '';
        menusect.innerHTML = renderHeader() + renderMenu() + renderFooter();


        const loadingScreens = document.getElementsByClassName('loader');
        for (let loadingScreen of loadingScreens) {
            loadingScreen.classList.add('close');
        }
        document.querySelector('.loadcont').style.display = 'flex';

        // устонавливаем как true чтобы было как в первый раз
        first=true;
        // загрузка товаров
    
        await fetchProductTypes();

        // запуск всех нужных функ. после загрузки самого сайта
        GetHistory();
        Registr();
        Sendchange();
        ExitButton();
        revealCards();
        Language();
        
        // scrol();
        let order = JSON.parse(localStorage.getItem('order'));
        const buttosend = document.querySelector("p.colvo");
        buttosend.innerHTML = order.length;
        // Добавляем обработчик события клика по документу
        document.addEventListener('click', function (e) {
            var navbarToggler = document.querySelector('.navbar-toggler'); // Кнопка меню
            var navbarCollapse = document.querySelector('.navbar-collapse'); // Меню

            if (navbarToggler && navbarCollapse) { // Проверяем, что элементы существуют
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    // Если клик был не по кнопке и не по самому меню, то закрываем меню
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
            Profile(e);

        });

        // Делегирование события на родительский элемент
        document.querySelector('.menu-container').addEventListener("click", function (e) {

            // Находим родительский элемент с классом .plus-min
            const plusmin = e.target.closest(".plus-min");

            // Если элемент .plus-min существует, работаем с ним
            if (plusmin) {
                const input = plusmin.querySelector("input");

                // Кнопки для увеличения и уменьшения количества товаров
                if (e.target && (e.target.matches("p.plus") || e.target.closest("p.plus"))) {
                    let value = parseInt(input.value, 10);
                    input.value = value + 1;
                }

                if (e.target && (e.target.matches("p.min") || e.target.closest("p.min"))) {
                    let value = parseInt(input.value, 10);
                    if (value > 1) {
                        input.value = value - 1;
                    }
                }
            }

            // Кнопка отправки
            if (e.target && (e.target.matches(".send") || e.target.closest(".send"))) {
                const but = e.target.closest(".send");
                const buttosend = document.querySelector("p.colvo");
                if (but) {
                    // Добавляем класс sold для анимации
                    but.classList.add("sold");
                    let order = JSON.parse(localStorage.getItem('order'));
                    let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                    console.log(order);
                    // Находим поле ввода количества
                    const input = but.closest(".send-plus-min").querySelector("input");
                    let quantity = parseInt(input.value, 10);

                    // Находим данные товара
                    const tovarname = but.closest(".item").querySelector('.name').textContent;
                    const tovarid = parseInt(but.closest(".item").id.replace(/[^0-9]/g, ""));
                    console.log(tovarid);
                    const price = parseFloat(but.closest(".item").querySelector('.cost').textContent) * quantity;
                    quant += quantity;
                    // Добавляем заказ в массив
                    totalcost += price;
                    if (order.some(item => item.tovarname === tovarname)) {
                        let index = order.findIndex(item => item.tovarname === tovarname);
                        console.log(order[index]);
                        order[index].price += price;
                        order[index].quantity += quantity;
                    } else {
                        // Добавляем заказ в массив
                        order.push({id: tovarid, tovarname: tovarname, quantity: quantity, price: price});
                        buttosend.innerHTML = order.length;
                    }
                    localStorage.setItem('order', JSON.stringify(order));
                    localStorage.setItem('totalcost', JSON.stringify(totalcost));
                    // Убираем класс sold через 1 секунду
                    setTimeout(function () {
                        but.classList.remove("sold");
                    }, 1000); // 1 секунда анимации
                }
            }
             // Кнопка быстрой отправки
        if (e.target && (e.target.matches(".fastsend") || e.target.closest(".fastsend"))) {
            const but = e.target.closest(".fastsend");
            const buttosend = document.querySelector("p.colvo");
            if (but) {
                // Добавляем класс sold для анимации
                but.classList.add("sold");
                let order = JSON.parse(localStorage.getItem('order'));
                let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                console.log(order);
                // Находим поле ввода количества
                const input = but.closest(".send-plus-min").querySelector("input");
                let quantity = parseInt(input.value, 10);

                // Находим данные товара
                const tovarname = but.closest(".item").querySelector('.name').textContent;
                const tovarid = parseInt(but.closest(".item").id.replace(/[^0-9]/g, ""));
                console.log(tovarid);
                const price = parseFloat(but.closest(".item").querySelector('.cost').textContent) * quantity;
                quant += quantity;
                // Добавляем заказ в массив
                totalcost += price;
                if (order.some(item => item.tovarname === tovarname)) {
                    let index = order.findIndex(item => item.tovarname === tovarname);
                    console.log(order[index]);
                    order[index].price += price;
                    order[index].quantity += quantity;
                } else {
                    // Добавляем заказ в массив
                    order.push({id: tovarid, tovarname: tovarname, quantity: quantity, price: price});
                }
                localStorage.setItem('order', JSON.stringify(order));
                localStorage.setItem('totalcost', JSON.stringify(totalcost));
                updateModal(order);
                // Убираем класс sold через 1 секунду
                setTimeout(function () {
                    but.classList.remove("sold");
                }, 1000); // 1 секунда анимации
            }
        }
        });
        // Кнопка отправки
        document.querySelector('.ordersend').addEventListener('click', function () {
            let order = JSON.parse(localStorage.getItem('order'));
            if (isorder) {
                order = JSON.parse(localStorage.getItem('historder'));
                localStorage.removeItem("historder");
                isorder = false;
            }

            if (order.length > 0) {

                let titl = 'Введите данные';
                let stre = 'Улица';
                let casa = 'Дом';
                let tel = 'Номер телефона';
                let stol = 'Текущий номер столика: '
                let vibstol = 'Выберите номер столика:'
                let cupall = 'Купон для всего заказов';
                let cupone = 'Купон для товара';
                let ifcup = 'Есть купон?';
                let car = 'Карта';
                let cash = 'Наличные'
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    titl = 'Introduceți detalii';
                    stre = 'Stradă';
                    casa = 'Casa';
                    tel = 'Număr de telefon';
                    stol = 'Numărul curent al tabelului:';
                    vibstol = 'Selectați numărul tabelului:'
                    cupall = 'Cupon pentru toate comenzile';
                    cupone = 'Cupon de produs'
                    ifcup = 'Ai un cupon?';
                    car = 'Hartă';
                    cash = 'Numerar';
                }
                console.log(order);
                Swal.fire({
                    title: `${titl}`,
                    html: `
          <div class='inputad-container' style='display:none;'>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="street" placeholder="${stre}" />
              <label for="street">${stre}</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="home" placeholder="${casa}" />
              <label for="home">${casa}</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" maxlength="9" id="tel" placeholder="${tel}" />
                <label for="tel">${tel}</label>
              </div>
          </div>
          <div class='inputtab-container' style='display:none;'>
 
            <div class="slider-container">
                  <label for="rangeSlider" class="form-label">${vibstol}</label>
                  <input type="range" class="form-range" id="table" min="1" max="10" value="5">
                   <p>${stol} <span id="sliderValue">5</span></p>
            </div>
          </div>
           <div class="form-floating mb-3" id="coupon-container1" style="display:none;">
              <input type="text" class="form-control" id="coupon" placeholder="${cupall}" />
              <label for="coupon">${cupall}</label>
            </div>
            <div class="form-floating mb-3" id="coupon-container2" style="display:none;">
              <input type="text" class="form-control" id="couponIt" placeholder="${cupone}" />
              <label for="coupon">${cupone}</label>
            </div>
          <div class="form-check couponch">
              <input type="checkbox" class="form-check-input" id="couponCheckbox" />
              <label class="form-check-label" for="couponCheckbox">${ifcup}</label>
            </div>
          <div class="mb-3">
            <label>
              <input type="radio" id="Cash" name="paymentMethod" value="CASH" />
              ${cash}
            </label>
            <label style="margin-left: 15px;">
              <input type="radio" id="Card" name="paymentMethod" value="CARD" />
              ${car}
            </label>
          </div>
        `,
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Отправить",
                    cancelButtonText: "Отмена",
                    focusConfirm: false,
                    didOpen: () => {
                        // Ожидаем изменение состояния чекбокса

                        const couponCheckbox = document.getElementById('couponCheckbox');
                        const couponContainer1 = document.getElementById('coupon-container1');
                        const couponContainer2 = document.getElementById('coupon-container2');
                        // Устанавливаем обработчик события для чекбокса
                        couponCheckbox.addEventListener('change', () => {
                            if (couponCheckbox.checked) {
                                couponContainer1.style.display = 'block';
                                couponContainer2.style.display = 'block';
                            } else {
                                couponContainer1.style.display = 'none';
                                couponContainer2.style.display = 'none';
                            }
                        });

                        const check = document.querySelector('.check-box input');
                        if (check.checked) {
                            // Проверка зарегистрирован ли пользователь
                            document.querySelector('.inputad-container').style.display = 'block';
                            let adress = JSON.parse(localStorage.getItem('addressResponseDTO'));
                            let street = document.querySelector("#street");
                            let home = document.querySelector("#home");

                            if (adress) {
                                street.value = adress.street;
                                home.value = adress.homeNumber;
                            }
                        } else {
                            document.querySelector('.inputtab-container').style.display = 'block';
                        }
                    },
                    preConfirm: () => {
                        const check = document.querySelector('.check-box input');
                        let data = {};
                        if (check.checked) {
                            const street = document.getElementById("street").value.trim();
                            const home = document.getElementById("home").value.trim();
                            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
                            const tel = document.getElementById("tel").value.trim();
                            const coupon = document.getElementById('coupon').value.trim();
                            const couponit = document.getElementById('couponIt').value.trim();
                            if (!street || !home || !paymentMethod || !tel) {
                                Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                                return false;
                            }
                            data = {
                                street,
                                home,
                                tel,
                                paymentMethod: paymentMethod.value,
                                coupon: coupon || null,
                                couponit: couponit || null  // Если купон пустой, не передаем его
                            };
                        } else {
                            const num = document.getElementById("table").value.trim();
                            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
                            const coupon = document.getElementById('coupon').value.trim();
                            const couponit = document.getElementById('couponIt').value.trim();
                            if (!num || !paymentMethod) {
                                Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                                return false;
                            }
                            data = {
                                paymentMethod: paymentMethod.value, coupon: coupon || null, couponit: couponit || null  // Если купон пустой, не передаем его
                            };
                        }

                        // Возвращаем собранные данные
                        return data;
                    },
                }).then((result) => {
                    const check = document.querySelector('.check-box input');
                    if (result.isConfirmed && check.checked) {
                        console.log("Введенные данные:", result.value);

                        let book = {};

                        let orderrequest = [];
                        order.forEach(item => {
                            let todo = {
                                productId: item.id, quantity: item.quantity,
                            }
                            orderrequest.push(todo);
                        })

                        // Проверка на регистрацию
                        let user = JSON.parse(localStorage.getItem('uuid'));
                        let restered = false
                        if (!user) {
                            restered = false;
                        } else {
                            restered = true;
                        }
                        let adres = {
                            city: "Copceak",
                            street: String(result.value.street),
                            homeNumber: String(result.value.home),
                            apartmentNumber: "1",
                            userUUID: user || ""
                        }
                        book = {
                            orderProductRequestDTO: orderrequest,
                            paymentMethod: result.value.paymentMethod,
                            orderInRestaurant: false,
                            tableRequestDTO: {
                                number: null
                            },
                            existDiscountCodes: (result.value.coupon || result.value.couponIt) ? true : false,
                            productDiscountCode: result.value.couponIt || "",
                            phoneNumber: result.value.tel,
                            globalDiscountCode: result.value.coupon || "",
                            userRegistered: restered,
                            userUUID: user || "",
                            addressRequestDTO: adres
                        }
                        console.log(JSON.stringify(book));
                        fetch(`${host}/api/v1/order-products/bulk`, {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify(book),
                        })
                            .then(response => response.json())
                            .then(data => {
                                let titl = 'Успех!';
                                let tex = `Номер вашего заказа: ${data.otp}!`
                                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                                    titl = 'Succes!';
                                    tex = `Numărul dvs. de comandă: ${data.otp}!`
                                }
                                // Обрабатываем успешный ответ
                                Swal.fire({
                                    title: `${titl}`, text: `${tex}`, icon: "success", customClass: {
                                        confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                    }
                                });
                                // кнопка избранное
                                ChosenOne();
                            })
                            .catch(error => {
                                let titl = 'Ошибка!';
                                let tex = 'Не удалось принять заказ!'
                                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                                    titl = 'Eroare!';
                                    tex = 'Nu s-a acceptat comanda!'
                                }
                                // Обрабатываем ошибку при отправке
                                Swal.fire({
                                    title: `${titl}`, text: `${tex}`, icon: "error", customClass: {
                                        confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                    }
                                })
                                console.log(error);
                            });
                    }

                    // Отправляем если в ресторане
                    if (result.isConfirmed && !check.checked) {
                        const num = document.getElementById("table").value.trim();
                        let book = {};

                        let orderrequest = [];
                        order.forEach(item => {
                            let todo = {
                                productId: item.id, quantity: item.quantity,
                            }
                            orderrequest.push(todo);
                        })
                        // Проверка на регистрацию
                        let user = JSON.parse(localStorage.getItem('uuid'));
                        let restered;
                        if (!user) {
                            restered = false;
                        } else {
                            restered = true;
                        }
                        book = {
                            orderProductRequestDTO: orderrequest,
                            paymentMethod: result.value.paymentMethod,
                            orderInRestaurant: true,
                            tableRequestDTO: {
                                number: num
                            },
                            existDiscountCodes: (result.value.coupon || result.value.couponIt) ? true : false,
                            productDiscountCode: result.value.couponIt || "",
                            phoneNumber: result.value.tel,
                            globalDiscountCode: result.value.coupon || "",
                            userRegistered: restered,
                            userUUID: user || "",
                            addressRequestDTO: null
                        }
                        console.log(JSON.stringify(book));
                        fetch(`${host}/api/v1/order-products/bulk`, {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify(book),
                        })
                            .then(response => response.json())
                            .then(data => {
                                let titl = 'Успех!';
                                let tex = `Номер вашего заказа: ${data.otp}!`
                                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                                    titl = 'Succes!';
                                    tex = `Numărul dvs. de comandă: ${data.otp}!`
                                }
                                // Обрабатываем успешный ответ
                                Swal.fire({
                                    title: `${titl}`, text: `${tex}`, icon: "success", customClass: {
                                        confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                    }
                                });
                                // сюда функция для избранного
                                ChosenOne();
                            })
                            .catch(error => {
                                let titl = 'Ошибка!';
                                let tex = 'Не удалось принять заказ!'
                                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                                    titl = 'Eroare!';
                                    tex = 'Nu s-a acceptat comanda!'
                                }
                                // Обрабатываем ошибку при отправке
                                Swal.fire({
                                    title: `${titl}`, text: `${tex}`, icon: "error", customClass: {
                                        confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                    }
                                })
                                console.log(error);
                            });
                    }
                });
                roler();
            } else {
                let titl = 'Вы ничего не выбрали!';
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    titl = 'Nu ai ales nimic';
                }
                Swal.fire({
                    title: `${titl}`, icon: "error", confirmButtonColor: "#2F9262"
                });
            }


        });
        // Модальное окно
        document.querySelector(".buttonsend").addEventListener("click", function () {
            let order = JSON.parse(localStorage.getItem('order'));
            updateModal(order);
        });
    } else if (hash && hash.startsWith('#item-')) {
        window.scrollTo(0, 1);
        // document.querySelector('body').style.background = `linear-gradient(to bottom, #222222, #3a3a3a, #525252)`;
        document.querySelector('body').style.backgroundImage = "url(./img/menuback.jpg)";
        document.querySelector('body').classList.add('bodyc');
        const menuItem = document.querySelector(hash);
        if (!localStorage.getItem("onlyItem")) {
            localStorage.setItem("onlyItem", JSON.stringify(0));
        }
        if (menuItem) {

            const itemid = parseInt(menuItem.closest(".item").id.replace(/[^0-9]/g, ""));
            console.log(itemid);

            let onlyItem = itemid;
            let contentfetch = await fetch(`${host}/api/v1/products/${onlyItem}`);
            let contentdat = await contentfetch.json();
            let contentimg = contentdat.photoResponseDTOList[0].url;

            let name = contentdat.productResponseDTO.name;
            let descr = contentdat.productResponseDTO.description;
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                const respo = await fetch(`${host}/api/v1/product-translations/${onlyItem}?lang=ro`, {
                    method: "GET"
                });

                if (!respo.ok) throw new Error(`Ошибка HTTP: ${respo.status}`);

                const dat = await respo.json();
                name = dat.name;
                descr = dat.description;


            }
            let contentitem = [];
            contentitem.push(name, contentdat.productResponseDTO.price, contentimg, descr, contentdat.productResponseDTO.cookingTime);
            console.log(contentimg);
            localStorage.setItem("onlyItem", JSON.stringify(onlyItem));
            menusect.innerHTML = renderHeader() + renderItem(contentitem) + renderFooter();
            const loadingScreens = document.getElementsByClassName('loader');
            for (let loadingScreen of loadingScreens) {
                loadingScreen.classList.add('close');
            }
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                // Функции когда по руммынскому
                await headerRum();
                footerRum();
                Language();
                document.querySelector('.ingredients span').textContent = 'Descriere';

            }

            WeekTop();
            Registr();
            loadscreen();
            Language();
            document.querySelector('.only-item').addEventListener("click", function (e) {
                // Находим родительский элемент с классом .plus-min
                const plusmin = e.target.closest(".plus-min");

                // Если элемент .plus-min существует, работаем с ним
                if (plusmin) {
                    const input = plusmin.querySelector("input");

                    // Кнопки для увеличения и уменьшения количества товаров
                    if (e.target && (e.target.matches("p.plus") || e.target.closest("p.plus"))) {
                        let value = parseInt(input.value, 10);
                        input.value = value + 1;
                    }

                    if (e.target && (e.target.matches("p.min") || e.target.closest("p.min"))) {
                        let value = parseInt(input.value, 10);
                        if (value > 1) {
                            input.value = value - 1;
                        }
                    }
                }

                // Кнопка отправки
                if (e.target && (e.target.matches(".send") || e.target.closest(".send"))) {
                    const but = e.target.closest(".send");

                    if (but) {
                        // Добавляем класс sold для анимации
                        but.classList.add("sold");
                        let order = JSON.parse(localStorage.getItem('order'));

                        // Находим поле ввода количества
                        const plusmin = but.closest(".send-but");
                        if (plusmin) {
                            let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                            const input = plusmin.querySelector("input");
                            let quantity = parseInt(input.value, 10);
                            totalcost += quantity * parseFloat(contentitem[1], 10);
                            if (order.some(item => item.tovarname === contentitem[0])) {
                                let index = order.findIndex(item => item.tovarname === contentitem[0]);
                                console.log(order[index]);
                                order[index].price += parseFloat(contentitem[1]) * quantity;
                                order[index].quantity += quantity;
                            } else {
                                // Добавляем заказ в массив
                                order.push({
                                    id: itemid,
                                    tovarname: contentitem[0],
                                    quantity: quantity,
                                    price: parseFloat(contentitem[1]) * quantity
                                });
                            }

                            localStorage.setItem('order', JSON.stringify(order));
                            localStorage.setItem('totalcost', JSON.stringify(totalcost));
                            // Убираем класс sold через 1 секунду
                            setTimeout(function () {
                                but.classList.remove("sold");
                            }, 1000); // 1 секунда анимации

                        }
                    }
                }
            });
        }
        // После перезагрузки страницы
        else {
            window.scrollTo(0, 0);
            console.log(localStorage.getItem("onlyItem"))
            if (localStorage.getItem("onlyItem")) {
                let onlyItem = parseInt(hash.replace(/[^0-9]/g, ""));
                let contentfetch = await fetch(`${host}/api/v1/products/${onlyItem}`);
                let contentdat = await contentfetch.json();
                let contentimg = contentdat.photoResponseDTOList[0].url;
                console.log(contentimg);
                let name = contentdat.productResponseDTO.name;
                let descr = contentdat.productResponseDTO.description;
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    const respo = await fetch(`${host}/api/v1/product-translations/${onlyItem}?lang=ro`, {
                        method: "GET"
                    });

                    if (!respo.ok) throw new Error(`Ошибка HTTP: ${respo.status}`);

                    const dat = await respo.json();
                    name = dat.name;
                    descr = dat.description;

                }
                let contentitem = [];
                contentitem.push(name, contentdat.productResponseDTO.price, contentimg, descr, contentdat.productResponseDTO.cookingTime);
                menusect.innerHTML = renderHeader() + renderItem(contentitem) + renderFooter();
                if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                    // Функции когда по руммынскому
                    headerRum();
                    footerRum();
                    Language();
                    document.querySelector('.ingredients span').textContent = 'Descriere';
                }
                loadscreen();
                Language();
                Registr();
                WeekTop();


                document.querySelector('.only-item').addEventListener("click", function (e) {
                    // Находим родительский элемент с классом .plus-min
                    const plusmin = e.target.closest(".plus-min");

                    // Если элемент .plus-min существует, работаем с ним
                    if (plusmin) {
                        const input = plusmin.querySelector("input");

                        // Кнопки для увеличения и уменьшения количества товаров
                        if (e.target && (e.target.matches("p.plus") || e.target.closest("p.plus"))) {
                            let value = parseInt(input.value, 10);
                            input.value = value + 1;
                        }

                        if (e.target && (e.target.matches("p.min") || e.target.closest("p.min"))) {
                            let value = parseInt(input.value, 10);
                            if (value > 1) {
                                input.value = value - 1;
                            }
                        }
                    }

                    // Кнопка отправки
                    if (e.target && (e.target.matches(".send") || e.target.closest(".send"))) {
                        const but = e.target.closest(".send");

                        if (but) {
                            // Добавляем класс sold для анимации
                            but.classList.add("sold");
                            let order = JSON.parse(localStorage.getItem('order'));
                            console.log(order);
                            // Находим поле ввода количества
                            const plusmin = but.closest(".send-but");
                            if (plusmin) {
                                let totalcost = JSON.parse(localStorage.getItem('totalcost'));
                                const input = plusmin.querySelector("input");
                                let quantity = parseInt(input.value, 10);
                                totalcost += quantity * parseFloat(contentitem[1], 10);
                                if (order.some(item => item.tovarname === contentitem[0])) {
                                    let index = order.findIndex(item => item.tovarname === contentitem[0]);
                                    console.log(order[index]);
                                    order[index].price += parseFloat(contentitem[1]) * quantity;
                                    order[index].quantity += quantity;
                                } else {
                                    // Добавляем заказ в массив
                                    let itemid = JSON.stringify(localStorage.getItem("onlyitem"));
                                    order.push({
                                        id: itemid,
                                        tovarname: contentitem[0],
                                        quantity: quantity,
                                        price: parseFloat(contentitem[1]) * quantity
                                    });
                                }
                                localStorage.setItem('order', JSON.stringify(order));
                                localStorage.setItem('totalcost', JSON.stringify(totalcost));
                                // Убираем класс sold через 1 секунду
                                setTimeout(function () {
                                    but.classList.remove("sold");
                                }, 1000); // 1 секунда анимации

                            }
                        }
                    }
                });
            } else {
                console.error('Элемент с хешем ' + hash + ' не найден');
            }

        }


    }
    // когда равен #about
    else {
        window.scrollTo(0, 0);
        document.querySelector('body').style.backgroundImage = "url(./img/about.png)";
        document.querySelector('body').classList.add('bodyc');
        document.querySelector('.app').style.display = 'none';
        menusect.innerHTML = '';
        menusect.innerHTML = renderTitle() + renderFooter();
        // для анимации
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          });
          document.querySelectorAll('.up-on-scroll').forEach(el => {
            observer.observe(el);
          });
        // кнопка загрузки
        const loadingScreens = document.getElementsByClassName('loader');
        for (let loadingScreen of loadingScreens) {
            loadingScreen.classList.add('close');
        }
        Sendmes();
        loadscreen();
        if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
            ChangeTitlerum();
            footerRum();

        }
        // Добавляем обработчик события клика по документу
        document.addEventListener('click', function (e) {
            var navbarToggler = document.querySelector('.navbar-toggler'); // Кнопка меню
            var navbarCollapse = document.querySelector('.navbar-collapse'); // Меню

            if (navbarToggler && navbarCollapse) { // Проверяем, что элементы существуют
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    // Если клик был не по кнопке и не по самому меню, то закрываем меню
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    }
}

const menusect = document.querySelector(".app");

function jwtIsNotExpired(token) {
    try {
        let payloadBase64 = token.split('.')[1];
        let payloadJson = atob(payloadBase64);
        let payload = JSON.parse(payloadJson);

        let expTime = payload.exp * 1000; // exp в секундах, переводим в миллисекунды
        let currentTime = Date.now();

        return expTime >= currentTime;
    } catch (error) {
        console.error("Ошибка декодирования JWT:", error);
        return true; // Если не удалось декодировать, считаем токен недействительным
    }
}

async function getUUIDFromURL() {
    const hash = window.location.hash; // Получаем часть после #
    const match = hash.match(/#menu\/([a-f0-9\-]{36})/i); // Регулярка для UUID
    let existUUID = JSON.parse(localStorage.getItem('uuid'));

    let uuid = match ? match[1] : existUUID;

    if (uuid) {
        let accessToken = localStorage.getItem("accessToken");

        if (accessToken && jwtIsNotExpired(accessToken)) {
            console.log("Токен актуален, запрос не требуется.");
            return uuid; // Используем существующий токен
        }

        try {
            console.log("Токен истёк или отсутствует, выполняем запрос...");
            let response = await fetch(`${host}/api/v1/jwt?userUUID=${uuid}`, {method: "POST"});

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            let jwtResponse = await response.json();
            console.log("Новый JWT получен:", jwtResponse);

            localStorage.setItem("accessToken", jwtResponse.accessToken);
        } catch (error) {
            console.error("Ошибка при получении JWT:", error);
        }
    }
    return uuid;
}

async function getReg(uuid1) {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    console.log("access token: " + accessToken)
    if (uuid1) {
        try {
            // Получаем данные пользователя
            let response = await fetch(`${host}/api/v1/users/${uuid1}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
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
}

async function Registr() {
    // let params = new URLSearchParams(window.location.search);
    let uuid = await getUUIDFromURL(); // Ждём завершения getUUIDFromURL
    console.log("UUID:", uuid);
    if (!localStorage.getItem("uuid")) {
        if (uuid) {
            localStorage.setItem("uuid", JSON.stringify(uuid));
            await getReg(uuid);
        }
    } else {
        let uuid1 = JSON.parse(localStorage.getItem("uuid"));

        if (uuid1) {
            await getReg(uuid);
        }
    }
}

// Привлечение внимание на заказ
function Sendchange() {
    let buttonsend = document.querySelector('.buttonsend a')
    let changes = [`<i class='bx bxs-bell-ring bx-tada' ></i>`, `<i class="bx bx-cart-download"></i>`]
    let index = 0;
    setInterval(() => {
        buttonsend.style.opacity = '0';

        setTimeout(() => {
            // Меняем содержимое, когда оно скрыто
            buttonsend.innerHTML = changes[index];
            index = (index + 1) % changes.length;

            // Плавно показываем
            buttonsend.style.opacity = '1';
        }, 300); // Дождаться завершения анимации скрытия

    }, 3000);
}

function revealCards() {
    let item = document.querySelectorAll(".item");
    item.forEach((card, index) => {

        setTimeout(() => {
            card.classList.add("visible");
        }, index * 50); // Добавляем задержку для плавного появления
    });
}

function ExitButton() {
    document.querySelector('.exit').addEventListener('click', function () {
        if (localStorage.getItem('uuid')) {
            localStorage.removeItem('uuid');
            localStorage.removeItem('addressResponseDTO');
        }
    });
}

function cacheBackground(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                localStorage.setItem("backgroundImage", reader.result);
                document.body.style.backgroundImage = `url(${reader.result})`;
            };
        })
        .catch(err => console.error("Ошибка загрузки:", err));
}

function footerRum() {
    document.querySelector('footer').innerHTML = `
  <div class="container-fluid foot">
          <div class="row text-center">
            <h1 class="col-12" id="about"><b>PARKTOWN COFFEE</b></h1>
          </div>
          <div class="row text-center">
            <div class="col-md-4 part">
              <h3>Adresă</h3>
              <h5>Lenin 81/a</h5>
              <h5>Copceac</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Orar</h3>
              <h5>de la 8:00 până la 22:00</h5>
              <h5>Bucătăria până la 21:00</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Contacte</h3>
              <h5>tel: 078299844</h5>
            </div>
          </div>
          <p>Acest website a fost realizat în cadrul
          competiției „Tekwill Junior Ambassadors” organizată de proiectul „Tekwill în Fiecare
          Școală” și nu reflectă neapărat opinia proiectului.</p>
        </div>
  `;
}

function ChangeTitlerum() {
    document.querySelector('.aboutmenu').innerHTML = `
   <header class="title">
          <nav class="navbar navbar-expand-md navcont">
            <div class="container-fluid">
              <div class="logoimg">
              <img src="./css/Park.png" alt="" /> 
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
    
              <div class="collapse navbar-collapse" id="navbarcont">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item active"><a href="#menu">Meniu</a></li>
                  <li class="nav-item"><a href="#about">Despre noi</a></li>
                  <li class="nav-item"><a href="#Contacts">Contacte</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <h1 class='parktitle' id='about'>PARKTOWN <span>COFFEE<span></h1>
        <div class="aboutrestoran">
        
        <p class="restdescr">
        Un restaurant care te cufundă într-o atmosferă de plăcere gastronomică. 
        Oferim un meniu de autor, combinând tradițiile cu tendințele culinare moderne. 
        Interiorul confortabil și atmosfera primitoare fac din PARKTOWN COFFEE locul ideal 
        pentru momente speciale și întâlniri. Bucătarii noștri folosesc ingrediente proaspete și de calitate, 
        creând preparate inspiraționale. Vino să descoperi un gust unic și emoții de neuitat.
        </p>
        
        <button class="ourmenu">
        <a href="#menu">Meniul nostru</a></button>
      </div>
      
      <section class='menuContainer'>
      <div class="aboutourgroup container-fluid up-on-scroll">
        <div class="commantname">Echipa noastră</div>
        <div class="command-imgs">
            <div class="command-img">
              <img src="./img/povara.jpg" alt="Echipa noastră">
            </div>
             <div class="command-img">
              <img src="./img/Komanda.jpg" alt="Echipa noastră">
            </div>
        </div>
      </div>
      </section>
      
      <section class="contact-us up-on-scroll">
    <form class='mes'>
        <div class="inputs">
            <h3 class="contactTitle" id="Contacts">Contactați-ne</h3>
            <div class="contact-inputs">
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" id="contact-name" placeholder="Nume" required/>
                    <label for="contact-name">Nume</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="email" class="form-control" id="contact-mail" placeholder="Email" required/>
                    <label for="contact-mail">Email</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" maxlength="9" id="contact-number" placeholder="Număr de telefon" required/>
                    <label for="contact-number">Număr de telefon</label>
                </div>
                <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control" id="contact-event" placeholder="Eveniment" required/>
                    <label for="contact-event">Eveniment</label>
                </div>
                <div class="form-group mb-3">
                    <textarea class="form-control" placeholder="Mesaj" id="contact-message" rows="3" required></textarea>
                </div>
            </div>
            <button type="submit" class="contact-button text-end">Trimite</button>
        </div>
    </form> 
    
    <div class="contact-info">
        <div>
            <h3><b>Program de lucru</b></h3>
            <h5>de la 8:00 la 22:00</h5>
            <h5>Bucătăria până la 21:00</h5>
        </div>
        <div>
            <h3><b>Adresă de contact</b></h3>
            <h5><span><i class="bx bxs-location-plus"></i></span> Lenin 81/a, Copceac</h5>
            <h5><span><i class="bx bx-phone"></i></span> 078299844</h5>
            <h5>
                <span><i class="bx bxl-instagram"></i></span>
                <a href="https://www.instagram.com/parktown_coffee/">parktown_coffee</a>
            </h5>
            <h5>
                <span><i class='bx bxl-telegram'></i></span>
                <a href="https://t.me/PARK_TOWN_BOT" target="_blank">Telegram</a>
            </h5>
        </div>
    </div>
</section>
  `;
}

function headerRum() {
    document.querySelector('header').innerHTML = `
  <nav class="navbar navbar-expand-lg navcont">
    <div class="container-fluid">
      <h1 class="logo">
        <a style="text-decoration:none">
          <img src="./css/Park.png" alt="" />
        </a>
      </h1>
      <span class="buttonsing-1 d-flex flex-row">
        <select class="form-select lang" >
          <option value="ru">ru</option>
          <option value="ro">ro</option>
        </select>
        <div class="dropdown singin">
          <ul class="dropdown-menu text-small shadow dropdown-menu-start">
            <li><a class="dropdown-item" id="profile" style="color: black;">Profil</a></li>
            <li><a class="dropdown-item" id="notification" style="color: black;">Notificări</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item exit" style="color: black;">Ieșire</a></li>
          </ul>
          <a href="#" class="userimg d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class='bx bxs-user-circle singinuser'></i>
          </a>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarcont" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span><i class="bx bx-menu"></i></span>
        </button>
      </span>

      <div class="collapse navbar-collapse" id="navbarcont">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active"><a href="#menu">Meniu</a></li>
          <li class="nav-item"><a href="#about">Despre noi</a></li>
          <li class="nav-item"><a href="#Contacts">Contacte</a></li>
        </ul>
      </div>

      <span class="buttonsing-2 flex-row">
        <select class="form-select lang" >
          <option value="ru">ru</option>
          <option value="ro">ro</option>
        </select>
        <div class="dropdown singin">
          <ul class="dropdown-menu text-small shadow dropdown-menu-start">
            <li><a class="dropdown-item" id="profile" style="color: black;">Profil</a></li>
            <li><a class="dropdown-item" id="notification" style="color: black;">Notificări</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item exit" style="color: black;">Ieșire</a></li>
          </ul>
          <a href="#" class="userimg d-flex align-items-center flex-row-reverse link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class='bx bxs-user-circle singinuser'></i>
          </a>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarcont" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span><i class="bx bx-menu"></i></span>
        </button>
      </span>
    </div>
  </nav>
`;
    const lang = JSON.parse(localStorage.getItem('lang')) || 'ru';
    const selects = document.querySelectorAll('select.form-select.lang');
    selects.forEach(it => {
        it.value = lang;
        it.addEventListener("change", function (event) {
            localStorage.setItem('order', JSON.stringify([]));
            localStorage.setItem('lang', JSON.stringify(event.target.value));
            setTimeout(() => location.reload(), 100);
        });
    });
}

function loadCachedBackground(url) {
    const cachedImage = localStorage.getItem("backgroundImage");
    if (cachedImage) {
        document.body.style.backgroundImage = `url(${cachedImage})`;
    } else {
        document.body.style.backgroundImage = `url(${url})`;
        cacheBackground(url);
    }
}

function Language() {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', JSON.stringify('ru'));
    }

    setTimeout(function () {
        const lang = JSON.parse(localStorage.getItem('lang')) || 'ru';

        // Объект с переводами
        const translations = {
            ru: {
                confirm: 'Подтвердить',
                cancel: 'Отмена',
                validation: 'Пожалуйста, заполните все поля!',
                menu: '<i class="bi bi-chevron-down"></i>Меню'
            },
            ro: {
                confirm: 'Confirma',
                cancel: 'Anulare',
                validation: 'Vă rugăm să completați toate câmpurile!',
                menu: '<i class="bi bi-chevron-down"></i>Meniu'
            }
        };

        // --- Создаем один MutationObserver ---
        const observer = new MutationObserver(() => {
            observer.disconnect(); // Отключаем перед изменением, чтобы избежать зацикливания

            document.querySelectorAll('.swal2-confirm').forEach(it => {
                if (it.textContent !== translations[lang].confirm) {
                    it.textContent = translations[lang].confirm;
                }
            });
            document.querySelectorAll('.swal2-cancel').forEach(it => {
                if (it.textContent !== translations[lang].cancel) {
                    it.textContent = translations[lang].cancel;
                }
            });
            document.querySelectorAll('.swal2-validation-message').forEach(it => {
                if (it.textContent !== translations[lang].validation) {
                    it.textContent = translations[lang].validation;
                }
            });

            observer.observe(document.body, {childList: true, subtree: true});
        });

        observer.observe(document.body, {childList: true, subtree: true});

        // --- Логика перевода ---
        const selects = document.querySelectorAll('select.form-select.lang');
        selects.forEach(it => {
            it.value = lang;
            it.addEventListener("change", function (event) {
                localStorage.setItem('order', JSON.stringify([]));
                localStorage.setItem('lang', JSON.stringify(event.target.value));
                setTimeout(() => location.reload(), 100);
            });
        });

        if (lang === 'ro') {
            document.querySelectorAll('.btn-success').forEach(it => it.textContent = 'Confirma');
            document.querySelectorAll('.decline').forEach(it => it.textContent = 'Anulare');

            const modalHeader = document.querySelector('.modal-header h1');
            if (modalHeader) modalHeader.textContent = 'Comanda ta';

            const checkBoxLabel = document.querySelector('.check-box label');
            if (checkBoxLabel) checkBoxLabel.textContent = 'Comanda la domiciliu';

            const orderTable = document.querySelector('.ord thead');
            if (orderTable) {
                orderTable.innerHTML = `
                    <tr>
                        <th style="text-align: center;">№</th>
                        <th style="text-align: center;">Nume</th>
                        <th style="text-align: center;">Preţ</th>
                        <th style="text-align: center;">Cantitate</th>
                        <th></th>
                    </tr>`;
            }

            const categoryList = document.querySelector(".category-list li a");
            if (categoryList) categoryList.textContent = 'Toate';

            const categoryTitle = document.querySelector('.category-content h1.title a');
            if (categoryTitle) categoryTitle.innerHTML = translations[lang].menu;

            headerRum();
            footerRum();
            Registr();

            document.querySelectorAll(".description h5 span").forEach(it => {
                it.textContent = 'Timp aproximativ de gătire: ';
            });
        }
    }, 1000);
}


function loadscreen() {
    const loadingScreens = document.getElementsByClassName('loader');
    for (let loadingScreen of loadingScreens) {
        loadingScreen.classList.remove('close');
    }
    document.querySelector('.loadcont').style.display = 'none'
    document.querySelector('.app').style.display = 'block'
}

function scrol() {
    const scrollContainer = document.querySelector(".menu-container");

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollContainer.classList.add("active");
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("mouseleave", () => {
        isDown = false;
    });

    scrollContainer.addEventListener("mouseup", () => {
        isDown = false;
    });

    scrollContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2; // Ускорение движения
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

window.addEventListener('hashchange', function () {
    const hash = extractHash(window.location.hash);
    console.log(hash);
    if (hash !== '#Contacts') {
        Hachchange();
        localStorage.setItem('hesh', JSON.stringify(hash));
    }
    if (JSON.parse(localStorage.getItem('hesh')) !== '#about' && hash === '#Contacts') {
        Hachchange();
        document.getElementById("Contacts").scrollIntoView({behavior: "smooth"});

    }

});
window.addEventListener('load', function () {
    Hachchange();
});

