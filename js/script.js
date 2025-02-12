

// Закрытие меню
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// части html для меню
const renderHeader = () => `
<header>
        <nav class="navbar navbar-expand-lg navcont">
          <div class="container-fluid">
            <h1 class="logo"><a href="panel.html" style='text-decoration:none'><img src="./css/Park.png" alt="" /> </a></h1>
            <span class="buttonsing-1 d-flex flex-row">
              <div class="dropdown  singin">
                <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" id='profile' style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
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
                <li class="nav-item"><a href="#">Доставка</a></li>
                <li class="nav-item"><a href="#">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
              <div class="dropdown  singin">
                
                 <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" id='profile' style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" id='notification' style="color: black;">Уведомления</a></li>
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
const renderMenu = () =>`
<div class="container-fluid cat">
        <div class="row">
          <div class="col-12 category-content">
            <h1 class="title">
              <a
                data-bs-toggle="collapse"
                href="#Category"
                role="button"
                aria-expanded="false"
                aria-controls="Category"
                > <i class="bi bi-chevron-down"></i>Меню</a
              >
            </h1>
            <!-- Сюда динамически подгружать категории -->
            <div class="collapse" id="Category">
              <div class="category">
                <ul class="category-list">
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 containe" style="height: 2000px; opacity:0">
            <div class="menu-container text-center col-sm-6 col-md-4 col-lg-4 container">
              <!-- Сюда будет загружаться меню -->
            </div>
          </div>
        </div>
        <!-- Для пагинации -->
        <div class="pagcontainer">
          <ul class="pagul">

          </ul>
     </div>
        <!-- Кнопка отправки -->
        <div class="buttonsend">
          <a type="button" data-bs-toggle="modal" data-bs-target="#Modalwindow">
            <i class="bx bx-cart-download"></i>
          </a>
          <p class="colvo">0</p>
        </div>

        <!-- Модальное окно -->
        <div
          class="modal fade orderList"
          id="Modalwindow"
          tabindex="-1"
          aria-labelledby="Modalwindow"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1>Ваш заказ</h1>
                <h5 class='history'>
                    <a type="button" data-bs-toggle="" data-bs-target="">
                      История
                    </a>
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
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
                    <tbody class="ordorlist">
  
                    </tbody>
                  </table>
                </div>
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
                  class="btn btn-secondary"
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
`
// часть О нас
const renderTitle = () =>`

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
                  <li class="nav-item"><a href="#">Доставка</a></li>
                  <li class="nav-item"><a href="#">Контакты</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <h1 class='parktitle'>PARKTOWN COFFEE</h1>
        <div class="aboutrestoran">
        
        <p class="restdescr">
        Ресторан, погружающий в атмосферу гастрономического наслаждения. Мы
        предлагаем авторское меню, сочетая традиции и современные кулинарные
        тренды. Уютный интерьер и гостеприимная атмосфера делают PARKTOWN COFFEE
        идеальным местом для особых моментов и встреч. Наши повара используют
        свежие, качественные ингредиенты, создавая вдохновляющие блюда.
        Приходите, чтобы открыть уникальный вкус и незабываемые эмоции.
        
        </p>
        <button class="ourmenu"><a href="#menu">Наше Меню</a></button>
      </div>
      <section class='menuContainer'>
      <div class="aboutourgroup container-fluid">
        <div class="commantname">Наша Команда</div>
        <div class="command-imgs">
        <div class="command-img">
          <img src="./img/Наша-команда.jpg" alt="Наша Команда">
        </div>
        <div class="command-img">
          <img src="./img/команда.jpg" alt="Наша Команда">
        </div>
        </div>
      </div>
      </section>
      </section>
      
`
const renderItem= (onlyItem=[]) =>`
<div class="container-fluid only-item justify-content-center align-items-center ">
        <div class="row justify-content-center align-items-center">
          <div class="col-sm-8 col-md-5 col-lg-6 item-img d-flex justify-content-center">
            <img src="${onlyItem[2]}" alt="${onlyItem[0]}">
          </div>
          <div class="col-sm-5 col-md-6 col-lg-4 item-descr d-flex flex-column align-items-left">
            <h1 class="item-name">${onlyItem[0]}</h1>
            <h4 class="cost-item">${onlyItem[1]}MDL</h4>
            <h5 class="weith"><span>Время: </span>${formatTime(onlyItem[4])}</h5>
            <h5 class="ingredients" style="word-wrap: break-word !important;"><span>Описание: </span> ${onlyItem[3]} </h5>
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
`
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
// Получение данных категорий с сервера
async function fetchProductTypes() {
  try {
   
    const response = await fetch('http://46.229.212.34:9091/api/v1/product-types');
    const data = await response.json();

    if (data.content && Array.isArray(data.content)) {
      const productList = document.querySelector('.category-list');
      productList.innerHTML = '<li ><a class="active" data-filter="*">Все</a></li>'; // Очистка списка

      // Создаем категории
      data.content.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = `${item.name}`;
        link.setAttribute('data-filter', `.${item.id}`); 
        listItem.appendChild(link); // Вставляем ссылку в элемент списка
        productList.appendChild(listItem);
      });

      // После загрузки категорий загружаем меню
      const categoryIds = data.content.map(item => item.id); // Извлекаем IDs
      await fetchMenuItems(categoryIds);
      setTimeout(function(){
        document.querySelector('.containe').style.height = 'auto';
      document.querySelector('.containe').style.opacity = '1';
      }, 500)
    } else {
      console.error('Неверный формат данных:', data);
    }
  } catch (error) {
    console.error('Ошибка при запросе данных категорий:', error);
  }
}

// Получение данных меню
async function fetchMenuItems(categoryIds) {
  try {
    const menuContainer = document.querySelector('.menu-container');
    const allitems=[];
    const ids=[];
    for (const id of categoryIds) {
      const response = await fetch(`http://46.229.212.34:9091/api/v1/products?typeId=${id}`);
      const data = await response.json();
      if(data.content && Array.isArray(data.content)){
      allitems.push(data.content);
      ids.push(id);
      }
    }
    let shet=0;
    if (allitems && Array.isArray(allitems)) {
      for (const it of allitems) {  
        for (const item of it){
        // Запрос URL картинки
        const photoResponse = await fetch(`http://46.229.212.34:9091/api/v1/photos/product/${item.id}`);
        const photoData = await photoResponse.json();
        const imageUrl = photoData[0].url; // Если нет URL, используем картинку по умолчанию
        // Создаем элемент меню
        const menuItem = document.createElement('div');
        menuItem.className = `col-sm-6 col-md-4 col-lg-1 item ${ids[shet]} `;
        menuItem.id= `item-${item.id}`;
        menuItem.innerHTML = `
        
          <div class="img-cost">
          <a href="#item-${item.id}">
            <div class="description">
            <h3><b>${item.description}</b></h3>
                <h5>${item.cookingTime && item.cookingTime !== '00:00:00' 
                  ? `Примерное время готовки: <b>${formatTime(item.cookingTime)}</b>` 
                  : "Сразу"}</h5>
            </div>
            </a>
            <img src="${imageUrl}" alt="${item.name}" />
            <p class="cost">${item.price} MDL</p>
            
          </div>
          <h3 class="name">${item.name}</h3>
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
        menuContainer.appendChild(menuItem);
       
        }
        shet+=1;
      }
    }
    initializeIsotope();
  } catch (error) {
    console.error('Ошибка при запросе данных меню:', error);
  }
}

// Обновление модального окна заказа
function updateModal(order) {
  let tbody = document.querySelector(".ordorlist");
  tbody.innerHTML = ''; // Очищаем таблицу перед вставкой новых данных
  
  // Проверяем, что orderList не пустой
  if (order.length > 0) {
    let totalcost=JSON.parse(localStorage.getItem('totalcost'));
    for (let i = 0; i < order.length; i++) {
      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td style="text-align: center;">${order[i].tovarname}</td>
          <td style="text-align: center;">${order[i].price}</td>
          <td style="text-align: center;">${order[i].quantity}</td>
          <td style="text-align: center;"><button class="delete btn btn-danger" data-delete="${order[i].id}"  data-price="${order[i].price}"><i class='bx bx-trash-alt'></i></button></td>
        </tr>
        
      `);
      
    }
    tbody.insertAdjacentHTML('beforeend', `
      <br>
      <h6 class="itog-cost">Всего: ${totalcost}<h6>
      `);
    // Важно: добавляем обработчик события для кнопок удаления
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
      button.addEventListener("click", function (e) {
        // Получаем ID товара для удаления
        const itemId = e.target.closest("button").dataset.delete;
        const price = parseFloat(button.dataset.price);
        console.log(price)
        let totalcost=JSON.parse(localStorage.getItem('totalcost'));
        totalcost-=price;
        
        // Обновляем заказ, удаляя элемент
        let order = JSON.parse(localStorage.getItem('order'));
        const index = order.findIndex(item => item.id === parseInt(itemId) && item.price===price);
        if (index !== -1) {
           order.splice(index, 1); // Удаляет только один элемент по найденному индексу
        }
        if(order.length===0){
          totalcost=0;
        }
        localStorage.setItem('totalcost', JSON.stringify(totalcost));
        // Сохраняем обновленный заказ в localStorage
        localStorage.setItem('order', JSON.stringify(order));
        
        // Обновляем модальное окно
        updateModal(order);
        const buttosend=document.querySelector("p.colvo");
        buttosend.innerHTML=order.length;
      });
    });
  } else {
    // Если нет элементов в заказе, показываем сообщение
    tbody.insertAdjacentHTML('beforeend', '<tr><td colspan="5">Корзина пуста</td></tr>');
  }
}

function initializeIsotope() {
  var $container = $('.menu-container');
  var itemsPerPage = 20;
  var currentPage = 1;

  // Инициализация Isotope
  $container.isotope({
    filter: '*',
    layoutMode: 'masonry',
    masonry: {
      gutter: 10
    },
    transitionDuration: 0
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
  
    // Получаем текущий фильтр
    var selector = $('.category-list .active').attr('data-filter') || '*';
  
    $container.isotope({
      filter: function () {
        if (selector === '*') {
          // Если фильтр "все", используем индекс без селектора
          var index = $(this).index();
          return index >= start && index < end;
        } else {
          // Если есть фильтр, учитываем только отфильтрованные элементы
          var index = $(this).index(selector);
          return index >= start && index < end;
        }
      }
    });
  
    // Обновляем активную кнопку пагинации
    $('.pagul .pagination-button').removeClass('active');
    $(`.pagul .pagination-button[data-page="${page}"]`).addClass('active');
    // поднимаем экран вверх
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  }

  // Обработчик фильтрации
  $('.category-list a').on('click', function () {
    // Убираем активный класс у всех и добавляем на текущий фильтр
    $('.category-list .active').removeClass('active');
    $(this).addClass('active');
    
    // Получаем текущий фильтр
    var selector = $(this).attr('data-filter') || '*';  
    // Пересчитываем элементы и страницы
    var allItems = selector === '*' ? $container.find('.item') : $container.find(selector);
    var totalPages = Math.ceil(allItems.length / itemsPerPage);
  
    // Инициализируем пагинацию и отображаем первую страницу
    initializePagination(totalPages);
    showPage(1); // Переходим на первую страницу
    return false; // Предотвращаем стандартное поведение ссылки
  });

  // Инициализация при загрузке
  var totalPages = Math.ceil($container.find('.item').length / itemsPerPage);
  initializePagination(totalPages);
  showPage(1);

}

if(!localStorage.getItem("order")){
  localStorage.setItem("order", JSON.stringify([]))
}
if(!localStorage.getItem("totalcost")){
  localStorage.setItem("totalcost", JSON.stringify(0.0))
}
let order=JSON.parse(localStorage.getItem('order'));
console.log(order);
let totalcost=JSON.parse(localStorage.getItem('totalcost'));
let quant=0;
console.log(quant)



function extractHash(str) {
  let match = str.match(/#[a-zA-Z0-9_-]+/);
  return match ? match[0] : "";
}

// Вызываем функцию при изменения хэша это основа не забываеми
async function Hachchange(){

  document.querySelector('body').style.backgroundImage="url(./img/back.jpg)";
  const hash = extractHash(window.location.hash);
  if(!hash){
    menusect.innerHTML=renderTitle()+renderFooter();
    
  }
  if(hash==='#menu'){
    document.querySelector('body').style.backgroundImage="url(./img/menu.png)";
    document.querySelector('body').classList.add('bodyc');
    menusect.innerHTML='';
    menusect.innerHTML=renderHeader()+renderMenu()+renderFooter();
    await fetchProductTypes();
    // запуск всех нужных функ. после загрузки самого сайта
    Registr();
    Sendchange();
    ExitButton();
    revealCards()
  console.log("Всё запущено");
  let order=JSON.parse(localStorage.getItem('order'));
  const buttosend=document.querySelector("p.colvo");
  buttosend.innerHTML=order.length;
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
    if(e.target.id==='profile'){
      const uuid=JSON.parse(localStorage.getItem('uuid'));
      // Если пользователь зарегестрирован
      if(uuid){
        Swal.fire({
          html:`
          <div class='adres'>
             <h1>Ваш постояный адрес</h1>
             <div class="form-floating mb-3">
              <input type="text" class="form-control" id="street" placeholder="Улица" />
              <label for="street">Улица</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="num" placeholder="Дом" />
              <label for="num">Дом</label>
            </div>
          </div>
          `,
          showCancelButton: true,
          confirmButtonColor: "#2F9262",
          cancelButtonColor: "#d33",
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
        }).then((result)=>{
          if(result.isConfirmed){
            const street = document.getElementById("street").value;
            const home = document.getElementById("num").value;
            const addres={
              city:"Copceac",
              street:street,
              homeNumber: home,
              apartmentNumber:1,
              userUUID:uuid 
            }

            fetch('http://46.229.212.34:9091/api/v1/addresses',{
              method:'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(addres)
            }).then(result=>result.json())
            .then(data=>{
              console.log(data);
              localStorage.setItem('addressResponseDTO', JSON.stringify(addres));
            })
            .catch(error=>{
              console.log(error);
            });
          }

        });
      }
      // Если пользователь не зарегестрирован
      else{
        Swal.fire({
          html:`
          <div class='adres'>
             <h1>Ваш постояный адрес</h1>
             <div class="form-floating mb-3">
              <input type="text" class="form-control" id="street" placeholder="Улица" />
              <label for="street">Улица</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="num" placeholder="Дом" />
              <label for="num">Дом</label>
            </div>
          </div>
          `,
          showCancelButton: true,
          confirmButtonColor: "#2F9262",
          cancelButtonColor: "#d33",
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
        }).then((result)=>{
          if(result.isConfirmed){
            const street = document.getElementById("street").value;
            const home = document.getElementById("num").value;
            const addres={
              city:"Copceac",
              street:street,
              homeNumber: home,
              apartmentNumber:1,
              userUUID:uuid 
            }
            localStorage.setItem('addressResponseDTO', JSON.stringify(addres));
            
          }

        });
      }
    }
    if(e.target.id==='notification'){
      Swal.fire({
        html: `
        <div class='schedule'>
          <h1>Расписание уведомлений</h1>
          <label for="schedule">Выберите периодичность:</label>
          <select  id="schedule">
              <option value="daily">Раз в день</option>
            <option value="twice_day">Два раза в день</option>
            <option value="weekly">Раз в неделю</option>
            <option value="twice_week">Два раза в неделю</option>
            <option value="monthly">Раз в месяц</option>
          </select>
       <label for="sctime">Выберите время:</label>
       <input type="time" id="sctime">

       <div id="days-container" style="display: none; margin-top: 10px;">
        <h3>Выберите дни недели:</h3>
        <input type="checkbox" value="1"> Пн
        <input type="checkbox" value="2"> Вт
        <input type="checkbox" value="3"> Ср
        <input type="checkbox" value="4"> Чт
        <input type="checkbox" value="5"> Пт
        <input type="checkbox" value="6"> Сб
        <input type="checkbox" value="0"> Вс
     </div>
       </div>
        `,
        showCancelButton: true,
        confirmButtonColor: "#2F9262",
        cancelButtonColor: "#d33",
        confirmButtonText: "Отправить",
        cancelButtonText: "Отмена",
        focusConfirm: false,
        didOpen: () =>{
        //  проверка что если выбрано раз в неделю открывался список дней
          const scheduleSelect = document.getElementById("schedule");
          const daysContainer = document.getElementById("days-container");
          scheduleSelect.addEventListener('change', function(){
            daysContainer.style.display=(this.value === "weekly" || this.value === "twice_week") ? "block" : "none";
          });
        },
        preConfirm: () => {
          const schedule = document.getElementById("schedule").value;
          const time = document.getElementById("sctime").value;
          const daysOfWeek = [];
      
          document.querySelectorAll("#days-container input:checked").forEach(cb => daysOfWeek.push(cb.value));
      
          if (!schedule || !time) {
              Swal.showValidationMessage("Пожалуйста, заполните все поля!");
              return false;
          }
          let [hours, minutes] = time.split(":");
          let cronExpression = "";

          if (schedule === "daily") {
              cronExpression = `0 ${minutes} ${hours} * * *`;
          }
          else if (schedule === "twice_day") {
              cronExpression = `0 ${minutes} ${hours},${(parseInt(hours) + 12) % 24} * * *`;
          }
          else if (schedule === "weekly" || schedule === "twice_week") {
              
              if(schedule==="weekly"){
                if(daysOfWeek.length===1){
                  cronExpression = `0 ${minutes} ${hours} * * ${daysOfWeek.join(",")}`
                }
                else{
                  Swal.showValidationMessage("Выберите толкьо один день недели!");
                  return false;
                }
              }
              if(schedule==="twice_week"){
                if(daysOfWeek.length===2){
                  cronExpression = `0 ${minutes} ${hours} * * ${daysOfWeek.join(",")}`
                }
                else{
                  Swal.showValidationMessage("Выберите толкьо два дня!");
                  return false;
                }
              }
          } else if (schedule === "monthly") {
              cronExpression = `0 ${minutes} ${hours} 1 * *`;
          }
          return { cronExpression };
        },
      }).then((result)=>{
        if(result.isConfirmed){
          
          fetch('http://46.229.212.34:9091/api/v1/scheduler/update-cron?cronExpression='+ encodeURIComponent(result.value.cronExpression),{
            method:'POST',
            headers: { "Content-Type": "application/json" }
          })
          .then(response=>response.text())
          .then(data=>Swal.fire({
            title: "Успех!",
            text: "Расписание обновлено!",
            icon: "success",
            customClass: {
              confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
            }
          }))
          .catch(er =>{
            Swal.fire({
              title: "Ошибка!",
              text: "Не удалось обновить расписание!",
              icon: "error",
              customClass: {
                confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
              }
            })
            console.log(er)
          });
          // запуск бота
          fetch('http://46.229.212.34:9091/api/v1/scheduler/start',{
            method:'POST'
          })
          .then(response=>response.json())
          .then(data=>console.log(data))
          .catch(er =>console.log(er))
        }
        
      });
    }
  });

  // Делегирование события на родительский элемент
  document.querySelector('.menu-container').addEventListener("click", function(e) {
    
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
      const buttosend=document.querySelector("p.colvo");
      if (but) {
        // Добавляем класс sold для анимации
        but.classList.add("sold");
        let order=JSON.parse(localStorage.getItem('order'));
        let totalcost=JSON.parse(localStorage.getItem('totalcost'));
        console.log(order);
        // Находим поле ввода количества
        const input = but.closest(".send-plus-min").querySelector("input");
        let quantity = parseInt(input.value, 10);

        // Находим данные товара
        const tovarname = but.closest(".item").querySelector('.name').textContent;
        const tovarid =parseInt(but.closest(".item").id.replace(/[^0-9]/g,""));
        console.log(tovarid);
        const price=parseFloat(but.closest(".item").querySelector('.cost').textContent)*quantity;
        quant+=quantity;
        // Добавляем заказ в массив
        totalcost +=price;
        if(order.some(item=>item.tovarname===tovarname)){
          let index=order.findIndex(item => item.tovarname === tovarname);
          console.log(order[index]);
          order[index].price+=price;
          order[index].quantity+=quantity;
        }
        else{
          // Добавляем заказ в массив
          order.push({ id:tovarid, tovarname:tovarname, quantity:quantity, price:price});
          buttosend.innerHTML=order.length;
        }
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.setItem('totalcost', JSON.stringify(totalcost));
        // Убираем класс sold через 1 секунду
        setTimeout(function() {
          but.classList.remove("sold");
        }, 1000); // 1 секунда анимации
      }
    }
  });
  // Кнопка отправки
  document.querySelector('.ordersend').addEventListener('click', function(){
    let order=JSON.parse(localStorage.getItem('order'));
    if(order.length>0){
      console.log(order);
      Swal.fire({
        title: "Введите данные",
        html: `
        <div class='inputad-container' style='display:none;'>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="street" placeholder="Улица" />
            <label for="street">Улица</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="home" placeholder="Дом" />
            <label for="home">Дом</label>
          </div>
          </div>
          <div class='inputtab-container' style='display:none;'>
          <div class="form-floating mb-3">
            <input type="number" class="form-control tablenum" id="table" placeholder="Номер столика" />
            <label for="table">Номер столика</label>
          </div>
          </div>
          <div class="mb-3">
            <label>
              <input type="radio" id="Cash" name="paymentMethod" value="CASH" />
                Наличные
            </label>
            <label style="margin-left: 15px;">
              <input type="radio" id="Card" name="paymentMethod" value="CARD" />
              Карта
            </label>
          </div>
        `,
        showCancelButton: true,
        confirmButtonColor: "#2F9262",
        cancelButtonColor: "#d33",
        confirmButtonText: "Отправить",
        cancelButtonText: "Отмена",
        focusConfirm: false,
        didOpen: () => {
          // если выбрали что заказ на дом
          const check=document.querySelector('.check-box input');
          if(check.checked){
            // проверяем зарегестрирован ли пользователь чтобы получить его адресс
            document.querySelector('.inputad-container').style.display='block';
            let adress=JSON.parse(localStorage.getItem('addressResponseDTO'));
            let street=document.querySelector("#street");
            let home=document.querySelector("#home");
            if(adress){
              street.value=adress.street;
              home.value=adress.homeNumber;
            }
          }
          // если делается в ресторане 
          else{
            document.querySelector('.inputtab-container').style.display='block';
          }
          document.getElementById("street").focus();
        },
        preConfirm: () => {

           const check=document.querySelector('.check-box input');
          if(check.checked){
          const street = document.getElementById("street").value.trim();
          const home = document.getElementById("home").value.trim();
          const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
      
          if (!street || !home || !paymentMethod) {
            Swal.showValidationMessage("Пожалуйста, заполните все поля!");
            return false;
          }
          
          return {
            street,
            home,
            paymentMethod: paymentMethod.value,
          };
        }
         // Если выбрали что в ресторане проверяем заполнили ли номер
         else{
          const num = document.getElementById("table").value.trim();
          const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
          if (!num) {
            Swal.showValidationMessage("Пожалуйста, заполните все поля!");
            return false;
          }
          return paymentMethod.value;
        }
      },
      }).then((result) => {
        const check=document.querySelector('.check-box input');
        if (result.isConfirmed && check.checked) {
          console.log("Введенные данные:", result.value);
          let adres={
            city:"Copceak",
            street:String(result.value.street),
            homeNumber:String(result.value.home),
            apartmentNumber:"2"
          }
          let book={};
          let order=JSON.parse(localStorage.getItem('order'));
          let orderrequest=[];
          order.forEach(item=>{
              let todo={
              productId:item.id,
              quantity:item.quantity,
          }
          orderrequest.push(todo);
          })
        // Проверка на регистрацию
        let user=JSON.parse(localStorage.getItem('uuid'));
        if(!user){
          let restered=false;
        }
        else{
          let restered=true;
        }
        book={
          orderProductRequestDTO:orderrequest,
          paymentMethod: result.value.paymentMethod,
          orderInRestaurant:false,
          tableRequestDTO:{
            number: null
          },
          existDiscountCodes:false,
          productDiscountCode:"",
          globalDiscountCode:"",
          isRegisterUser:false,
          userId:0,
          addressRequestDTO:adres
      }
      console.log(JSON.stringify(book));
      fetch('http://46.229.212.34:9091/api/v1/order-products/bulk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
        })
        .then(response => response.json())
        .then(data => {
            // Обрабатываем успешный ответ
            Swal.fire({
              title: "Успех!",
              text: "Ваш заказ принят!",
              icon: "success",
              customClass: {
                confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
              }
            })
        })
        .catch(error => {
            // Обрабатываем ошибку при отправке
            Swal.fire({
              title: "Ошибка!",
              text: "Не удалось принять заказ!",
              icon: "error",
              customClass: {
                confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
              }
            })
            console.log(error);
        });
      }

      // Отправляем если в ресторане
      if (result.isConfirmed && !check.checked) {
        const num = document.getElementById("table").value.trim();
        let book={};
        let order=JSON.parse(localStorage.getItem('order'));
        let orderrequest=[];
        order.forEach(item=>{
            let todo={
            productId:item.id,
            quantity:item.quantity,
        }
        orderrequest.push(todo);
        })
        // Проверка на регистрацию
        let user=JSON.parse(localStorage.getItem('uuid'));
        if(!user){
          let restered=false;
        }
        else{
          let restered=true;
        }
      book={
        orderProductRequestDTO:orderrequest,
        paymentMethod: result.value,
        orderInRestaurant:true,
        tableRequestDTO:{
          number: num
        },
        existDiscountCodes:false,
        productDiscountCode:"",
        globalDiscountCode:"",
        isRegisterUser:false,
        userId:0,
        addressRequestDTO:null
    }
    console.log(JSON.stringify(book));
    fetch('http://46.229.212.34:9091/api/v1/order-products/bulk', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
      })
      .then(response => response.json())
      .then(data => {
          // Обрабатываем успешный ответ
          Swal.fire({
            title: "Успех!",
            text: "Ваш заказ принят!",
            icon: "success",
            customClass: {
              confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
            }
          })
      })
      .catch(error => {
          // Обрабатываем ошибку при отправке
          Swal.fire({
            title: "Ошибка!",
            text: "Не удалось принять заказ!",
            icon: "error",
            customClass: {
              confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
            }
          })
          console.log(error);
      });
      }
      });
    }
    else{
      Swal.fire({
        title: "Вы ничего не выбрали!",
        icon: "error",
        confirmButtonColor: "#2F9262"
      });
    }
   
    
  });
  // Модальное окно 
  document.querySelector(".buttonsend").addEventListener("click", function(){
    let order=JSON.parse(localStorage.getItem('order'));
    updateModal(order);
  });
  }
  else if(hash==='#about'){
    window.scrollTo(0, 0);
    document.querySelector('body').style.backgroundImage="url(./img/back.jpg)";
    document.querySelector('body').classList.add('bodyc');

    menusect.innerHTML='';
    menusect.innerHTML=renderTitle()+renderFooter();
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
  if (hash && hash.startsWith('#item-')) {
    
      document.querySelector('body').style.backgroundImage="url(./img/menu.png)";
    document.querySelector('body').classList.add('bodyc');
      const menuItem = document.querySelector(hash);
      if(!localStorage.getItem("onlyItem")){
          localStorage.setItem("onlyItem", JSON.stringify(0));
        }
      if (menuItem) {
        
        const itemid = parseInt(menuItem.closest(".item").id.replace(/[^0-9]/g,""));;
        console.log(itemid);
      
        let onlyItem=itemid;
        let contentfetch= await fetch(`http://46.229.212.34:9091/api/v1/products/${onlyItem}`);
        let contentdat=await contentfetch.json();
        let contentimg=contentdat.photoResponseDTOList[0].url;
        let contentitem=[];
        contentitem.push(contentdat.productResponseDTO.name, contentdat.productResponseDTO.price,
          contentimg, contentdat.productResponseDTO.description,
           contentdat.productResponseDTO.cookingTime);
        console.log(contentimg);
        localStorage.setItem("onlyItem", JSON.stringify(onlyItem));
        menusect.innerHTML = renderHeader()+renderItem(contentitem)+renderFooter();
        Registr();
        document.querySelector('.only-item').addEventListener("click", function(e) {
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
              let order=JSON.parse(localStorage.getItem('order'));
              
              // Находим поле ввода количества
              const plusmin = but.closest(".send-but"); 
              if(plusmin){
                  let totalcost=JSON.parse(localStorage.getItem('totalcost'));
                  const input = plusmin.querySelector("input"); 
                  let quantity = parseInt(input.value, 10);
                  totalcost +=quantity*parseFloat(contentitem[1], 10);
                  if(order.some(item=>item.tovarname===contentitem[0])){
                    let index=order.findIndex(item => item.tovarname === contentitem[0]);
                    console.log(order[index]);
                    order[index].price+=parseFloat(contentitem[1])*quantity;
                    order[index].quantity+=quantity;
                  }
                  else{
                    // Добавляем заказ в массив
                    order.push({ id:itemid, tovarname:contentitem[0], quantity:quantity, price:parseFloat(contentitem[1])*quantity});
                  }
                 
                  localStorage.setItem('order', JSON.stringify(order));
                  localStorage.setItem('totalcost', JSON.stringify(totalcost));
                  // Убираем класс sold через 1 секунду
                  setTimeout(function() {
                    but.classList.remove("sold");
                  }, 1000); // 1 секунда анимации
                  
              }
            }
          }
        });
      } 
      // После перезагрузки страницы
      else {
        console.log(localStorage.getItem("onlyItem"))
        if(localStorage.getItem("onlyItem")){
          let onlyItem=parseInt(hash.replace(/[^0-9]/g,""));
          let contentfetch= await fetch(`http://46.229.212.34:9091/api/v1/products/${onlyItem}`);
          let contentdat=await contentfetch.json();
          let contentimg=contentdat.photoResponseDTOList[0].url;
          console.log(contentimg);
          let contentitem=[];
          contentitem.push(contentdat.productResponseDTO.name, contentdat.productResponseDTO.price,
            contentimg, contentdat.productResponseDTO.description,
             contentdat.productResponseDTO.cookingTime);
          menusect.innerHTML = renderHeader()+renderItem(contentitem)+renderFooter();

          document.querySelector('.only-item').addEventListener("click", function(e) {
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
                let order=JSON.parse(localStorage.getItem('order'));
                console.log(order);
                // Находим поле ввода количества
                const plusmin = but.closest(".send-but"); 
                if(plusmin){
                  let totalcost=JSON.parse(localStorage.getItem('totalcost'));
                  const input = plusmin.querySelector("input"); 
                  let quantity = parseInt(input.value, 10);
                  totalcost +=quantity*parseFloat(contentitem[1], 10);
                  if(order.some(item=>item.tovarname===contentitem[0])){
                    let index=order.findIndex(item => item.tovarname === contentitem[0]);
                    console.log(order[index]);
                    order[index].price+=parseFloat(contentitem[1])*quantity;
                    order[index].quantity+=quantity;
                  }
                  else{
                    // Добавляем заказ в массив
                    let itemid=JSON.stringify(localStorage.getItem("onlyitem"));
                    order.push({ id:itemid, tovarname:contentitem[0], quantity:quantity, price:parseFloat(contentitem[1])*quantity});
                  }
                    localStorage.setItem('order', JSON.stringify(order));
                    localStorage.setItem('totalcost', JSON.stringify(totalcost));
                    // Убираем класс sold через 1 секунду
                    setTimeout(function() {
                      but.classList.remove("sold");
                    }, 1000); // 1 секунда анимации
                    
                }
              }
            }
          });
        }
        else{
          console.error('Элемент с хешем ' + hash + ' не найден');
        }
        
      }
      
      
    }
    
   
}

const menusect=document.querySelector(".app");
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
// Привлечение внимание на заказ
function Sendchange(){
let buttonsend=document.querySelector('.buttonsend a')
let changes=[`<i class='bx bxs-bell-ring bx-tada' ></i>`, `<i class="bx bx-cart-download"></i>`]
let index = 0;
setInterval(()=>{
  buttonsend.style.opacity = '0';
        
  setTimeout(() => {
      // Меняем содержимое, когда оно скрыто
      buttonsend.innerHTML = changes[index];
      index = (index + 1) % changes.length;

      // Плавно показываем
      buttonsend.style.opacity = '1';
  }, 300); // Дождаться завершения анимации скрытия

},3000);
}
function revealCards() {
  let item = document.querySelectorAll(".item");
  let windowHeight = window.innerHeight; // Высота окна просмотра

  item.forEach((card, index) => {
    let position = card.getBoundingClientRect().top; // Расстояние до верха экрана

    if (position < windowHeight - 50) { 
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 200); // Добавляем задержку для плавного появления
    }
  });
}
function ExitButton(){
  document.querySelector('.exit').addEventListener('click', function(){
    if(localStorage.getItem('uuid')){
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

function loadCachedBackground(url) {
  const cachedImage = localStorage.getItem("backgroundImage");
  if (cachedImage) {
      document.body.style.backgroundImage = `url(${cachedImage})`;
  } else {
      document.body.style.backgroundImage = `url(${url})`;
      cacheBackground(url);
  }
}



window.addEventListener('hashchange', Hachchange);
window.addEventListener('load', Hachchange);