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
                <li class="nav-item active"><a href="index.html#menu">Меню</a></li>
                <li class="nav-item"><a href="index.html#about">О нас</a></li>
                <li class="nav-item"><a href="index.html#Contacts">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
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
const renderBody = () => `
<div class="info-box">
  <p>Ожидайте сообщения...</p>
</div>
<div class="admininput">
    <h1>Вход</h1>
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="chatnum" placeholder="Номер чата">
            <label class='chatlab'for="chatnum">Номер чата</label>
          </div>
        <div class="form-floating mb-3 pot" style='display:none'>
            <input type="number" class="form-control" id="chatpot" placeholder="Введите код подтверждения">
            <label class='chatlab'for="chatpot">Введите код подтверждения</label>
          </div>
          <button class='chatbut'>Отправить</button>
     </div>
`

function start() {
    document.querySelector('body').innerHTML = renderHeader() + renderBody() + renderFooter();
}


async function Chatnum() {
    document.querySelector('.chatbut').addEventListener('click', async function () {
        let input = document.querySelector('#chatnum').value;
        console.log(input)
        if (input) {
            if (document.querySelector('.pot').style.display === 'none') {
                fetch(`http://46.229.212.34:9091/api/v1/otp/generate?chatId=${input}`, {
                    method: 'POST'
                }).then(result => {
                    if (result.ok) {
                        document.querySelector(".info-box").style.display = "block";
                        document.querySelector('.pot').style.display = 'block';
                        setTimeout(() => {
                            document.querySelector(".info-box").classList.add("hidden");
                        }, 3000);
                    }

                })
                    .then(data => {

                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                        document.querySelector('.pot').style.display = 'none';
                    });
            } else {
                let pot = document.querySelector('#chatpot').value;
                fetch(`http://46.229.212.34:9091/api/v1/otp/verify?chatId=${input}&otp=${pot}`, {
                    method: 'POST'
                }).then(result =>
                    result.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                        window.location.href = "panel.html";

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }


    });

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
          <li class="nav-item active"><a href="index.html#menu">Meniu</a></li>
          <li class="nav-item"><a href="index.html#about">Despre noi</a></li>
          <li class="nav-item"><a href="index.html#Contacts">Contacte</a></li>
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
}

function Language() {

    document.querySelectorAll(".lang").forEach(it => {
        console.log(it);
        it.value = JSON.parse(localStorage.getItem('lang'));
        it.addEventListener("change", function (event) {
            console.log(3);
            localStorage.setItem('lang', JSON.stringify(event.target.value));
            if (JSON.parse(localStorage.getItem('lang')) === 'ro') {
                document.querySelector('.chatbut').textContent = 'Trimite';
                document.querySelector('label[for=chatpot]').textContent = 'Introdu codul de verificare';
                document.querySelector('#chatpot').textContent = 'Introdu codul de verificare';
                document.querySelector('#chatnum').textContent = 'Număr de chat';
                document.querySelector('label[for=chatnum]').textContent = 'Număr de chat';
                document.querySelector('.admininput h1').textContent = 'Intrare';
                document.querySelector('.info-box p').textContent = 'Așteptați mesajele...';

                footerRum();
                headerRum();
                Language();
            }
            if (JSON.parse(localStorage.getItem('lang')) === 'ru') {
                start();
            }
        });

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
function getUUIDFromURL() {
  const hash = window.location.hash; // Получаем часть после #
  const match = hash.match(/#menu\/([a-f0-9\-]{36})/i); // Регулярка для UUID
  return match ? match[1] : null; // Возвращаем UUID или null, если не найден
}
// Изменения ярлыка
async function getReg(uuid1) {
  try {
    // Получаем данные пользователя
    let response = await fetch(`http://46.229.212.34:9091/api/v1/users/${uuid1}`,{
      
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
window.addEventListener('load', function (e) {
    start();
    Chatnum();
    Language();
    ExitButton();
    Registr();
    document.querySelector('body').style.backgroundImage = "url(./img/about.png)";
});