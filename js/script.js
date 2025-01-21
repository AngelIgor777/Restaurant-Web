
// Закрытие меню
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');






// части html для меню
const renderHeader = () => `
<header>
        <nav class="navbar navbar-expand-lg navcont">
          <div class="container-fluid">
            <h1 class="logo"><a href="panel.html" style='text-decoration:none'><img src="./css/Coffelog.png" alt="" /> </a></h1>
            <span class="buttonsing-1 d-flex flex-row">
              <div class="dropdown  singin">
                
                <ul class="dropdown-menu text-small shadow dropdown-menu-start">
                  <li><a class="dropdown-item" href="#" style="color: black;">Профиль</a></li>
                  <li><a class="dropdown-item" href="#"style="color: black;">Настройки</a></li>
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
                <li class="nav-item active"><a href="#menu">Меню</a></li>
                <li class="nav-item"><a href="#about">О нас</a></li>
                <li class="nav-item"><a href="#">Доставка</a></li>
                <li class="nav-item"><a href="#">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
              <div class="dropdown  singin">
                
                <ul class="dropdown-menu text-small shadow dropdown-menu-start" >
                  <li><a class="dropdown-item" style="color: black;" href="#">Зарегестрироваться</a></li>
                  <li><a class="dropdown-item" style="color: black;" href="#">Настройки</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item"href="#" style="color: black;">Выход</a></li>
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
const renderFooter = () => `
      <footer>
        <div class="container-fluid foot">
          <div class="row text-center">
            <h1 class="col-12" id="about"><b>COFFEE TIME</b></h1>
          </div>
          <div class="row text-center">
            <div class="col-md-4 part">
              <h3>Адрес</h3>
              <h5>Ул. ???</h5>
              <h5>Copceac</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Время работы</h3>
              <h5>с 7:00 до 23:00</h5>
              <h5>Работаем без выходных</h5>
            </div>
            <div class="col-md-4 part">
              <h3>Контакты</h3>
              <h5>тел: 078848459</h5>
            </div>
          </div>
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
  
        <!-- Кнопка отправки -->
        <div class="buttonsend">
          <a type="button" data-bs-toggle="modal" data-bs-target="#Modalwindow">
            <i class="bx bx-cart-download"></i>
          </a>
          <p class="colvo">0</p>
        </div>
  
        <!-- Модальное окно -->
        <div
          class="modal fade"
          id="Modalwindow"
          tabindex="-1"
          aria-labelledby="Modalwindow"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1>Ваш заказ</h1>
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
                  class="btn btn-success"
                  style="font-size: 1.4rem"
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
              <img src="./css/Coffelog.png" alt="" /> 
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
        <div class="aboutrestoran">
        
        <p class="restdescr">
        Ресторан, погружающий в атмосферу гастрономического наслаждения. Мы
        предлагаем авторское меню, сочетая традиции и современные кулинарные
        тренды. Уютный интерьер и гостеприимная атмосфера делают COFFEE TIME
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
            <h4 class="cost-item">${onlyItem[1]}</h4>
            <h5 class="weith"><span>Время: </span>${onlyItem[4]}</h5>
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
   
    const response = await fetch('http://localhost:9091/api/v1/product-types');
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

    for (const id of categoryIds) {
      const response = await fetch(`http://localhost:9091/api/v1/products?typeId=${id}`);
      const data = await response.json();

      if (data.content && Array.isArray(data.content)) {
        for (const item of data.content) {
          // Запрос URL картинки
          const photoResponse = await fetch(`http://localhost:9091/api/v1/photos/product/${item.id}`);
          const photoData = await photoResponse.json();
          console.log(photoResponse);
          const imageUrl = 'http://localhost:9091/api/v1/photos/resource?photoName=' + (photoData[0]?.url || 'default.jpg'); // Если нет URL, используем картинку по умолчанию
          
          // Создаем элемент меню
          const menuItem = document.createElement('div');
          menuItem.className = `col-sm-6 col-md-4 col-lg-4 item ${id} `;
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
      }
    }
    initializeIsotope();
  } catch (error) {
    console.error('Ошибка при запросе данных меню:', error);
  }
}



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
        
        let totalcost=JSON.parse(localStorage.getItem('totalcost'));
        totalcost-=price;
        localStorage.setItem('totalcost', JSON.stringify(totalcost));
        // Обновляем заказ, удаляя элемент
        let order = JSON.parse(localStorage.getItem('order'));
        order = order.filter(item => item.id !== parseInt(itemId));
        
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

  // Инициализация Isotope
  $container.isotope({
    filter: '*',
    layoutMode: 'masonry',
    masonry: {
      gutter: 10
    },
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    }
  });



  // Переключение на position static
  var checkInterval = setInterval(function() {
    $container.find('.item').each(function() {
      var currentPosition = $(this).css('position');
      if (currentPosition !== 'static') {
        // Если position не static, то принудительно устанавливаем position: static
        $(this).css('position', 'static');
      }
    });
  }, 100);  // Каждые 10 миллисекунд

  // Остановка таймера после того, как Isotope завершит свою работу
  $container.on('arrangeComplete', function() {
    // Останавливаем таймер, так как проверка больше не нужна
    clearInterval(checkInterval);
  });

  // Обработчик кликов по категориям
  $('.category-list a').on('click', function() {
    $('.category-list .active').removeClass('active');
    $(this).addClass('active');
    var selector = $(this).attr('data-filter');

    // Перезапускаем фильтрацию элементов с анимацией
    $container.isotope({
      filter: selector,
      layoutMode: 'masonry',
      transitionDuration: '0' // Время для анимации расположения
    });

    // Скрываем элементы перед анимацией
   

    // После завершения анимации, восстанавливаем opacity
    $container.on('arrangeComplete', function() {
      // Делаем элементы видимыми с плавным переходом
      setTimeout(function() {
        $container.find('.item').css({
          'opacity': 1,  // Делаем элементы видимыми
          'transition': 'opacity 0.9s'  // Плавный переход на 0.9 секунды
        });
      }, 10); // Задержка для гарантированной перерисовки
    });

    return false;
  });
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




// Вызываем функцию при изменения хэша
async function Hachchange(){

  document.querySelector('body').style.backgroundImage="url(./img/dinner.jpg)";
  const hash = window.location.hash;
  if(!hash){
    menusect.innerHTML=renderTitle()+renderFooter();
    
document.querySelector('body').style.backgroundImage="url(./img/dinner.jpg)";
  }
  if(hash==='#menu'){
    document.querySelector('body').style.backgroundImage="url(./img/flat-lay-composition-mexican-food-with-copyspace.jpg)";
    document.querySelector('body').classList.add('bodyc');
    menusect.innerHTML='';
    menusect.innerHTML=renderHeader()+renderMenu()+renderFooter();
    await fetchProductTypes();
    
    
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
        console.log(order);
        // Находим поле ввода количества
        const input = but.closest(".send-plus-min").querySelector("input");
        let quantity = parseInt(input.value, 10);

        // Находим название товара
        const tovarname = but.closest(".item").querySelector('.name').textContent;
        const price=parseFloat(but.closest(".item").querySelector('.cost').textContent)*quantity;
        totalcost+=price;
        quant+=quantity;
        buttosend.innerHTML=order.length+1;
        console.log(order.length);
        // Добавляем заказ в массив
        order.push({ id:order.length, tovarname, quantity, price});
        console.log(order);
        console.log(totalcost);
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.setItem('totalcost', JSON.stringify(totalcost));
        // Убираем класс sold через 1 секунду
        setTimeout(function() {
          but.classList.remove("sold");
        }, 1000); // 1 секунда анимации
      }
    }
  });
  // Модальное окно 
  document.querySelector(".buttonsend").addEventListener("click", function(){
    let order=JSON.parse(localStorage.getItem('order'));
    updateModal(order);
  });
  }
  else if(hash==='#about'){
    document.querySelector('body').style.backgroundImage="url(./img/dinner.jpg)";
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
    
      document.querySelector('body').style.backgroundImage="url(./img/flat-lay-composition-mexican-food-with-copyspace.jpg)";
    document.querySelector('body').classList.add('bodyc');
      const menuItem = document.querySelector(hash);
      if(!localStorage.getItem("onlyItem")){
          localStorage.setItem("onlyItem", JSON.stringify([]))
        }
      if (menuItem) {
        
        const itemName = menuItem.querySelector('.name').textContent;
        const itemCost = menuItem.querySelector('.cost').textContent;
        const itemImg = menuItem.querySelector('img').src;
        const itemDescription = menuItem.querySelector(".description h3").textContent;
        const itemTime = menuItem.querySelector(".description h5 b") ? menuItem.querySelector(".description h5 b").textContent :"сразу";
        
      
        let onlyItem=[];
        onlyItem.push(itemName, itemCost, itemImg, itemDescription, itemTime);
        localStorage.setItem("onlyItem", JSON.stringify(onlyItem));
        menusect.innerHTML = renderHeader()+renderItem(onlyItem)+renderFooter();

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
              console.log(itemCost);
              // Находим поле ввода количества
              const plusmin = but.closest(".send-but"); 
              if(plusmin){
                  let totalcost=JSON.parse(localStorage.getItem('totalcost'));
                  const input = plusmin.querySelector("input"); 
                  let quantity = parseInt(input.value, 10);
                  totalcost +=quantity*parseFloat(itemCost, 10);
                  console.log(order.length);
                  // Добавляем заказ в массив
                  order.push({ id:order.length, tovarname:itemName, quantity:quantity, price:parseFloat(itemCost)*quantity});
                  console.log(order);
                  console.log(totalcost);
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
      } else {
        console.log(localStorage.getItem("onlyItem"))
        if(localStorage.getItem("onlyItem")){
          console.log("Это я")
          let onlyItem=JSON.parse(localStorage.getItem('onlyItem'));
          menusect.innerHTML = renderHeader()+renderItem(onlyItem)+renderFooter();

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
                    totalcost +=parseFloat(onlyItem[1], 10);
                    console.log(order.length);
                    // Добавляем заказ в массив
                    order.push({ id:order.length, tovarname:onlyItem[0], quantity:quantity, price:parseFloat(onlyItem[1])});
                    console.log(order);
                    console.log(totalcost);
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


window.addEventListener('hashchange', Hachchange);
window.addEventListener('load', Hachchange);