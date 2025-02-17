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
                <li class="nav-item"><a href="#Contacts">Контакты</a></li>
              </ul>
            </div>
  
            <span class="buttonsing-2 flex-row">
            <select class="form-select" id='lang'>
              <option value="rus"  selected>rus</option>
              <option value="rum">rum</option>
            </select>
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
const renderBody =()=>`
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
document.querySelector('body').innerHTML=renderHeader()+renderBody()+renderFooter()
function Language(){
    document.getElementById("lang").addEventListener("change", function(event) {
      console.log("Выбрано:", event.target.value);
      localStorage.setItem('lang', JSON.stringify(event.target.value));
  });
  }
async function Chatnum(){
    document.querySelector('.chatbut').addEventListener('click', async function(){
        let input=document.querySelector('#chatnum').value;
        console.log(input)
        if(document.querySelector('.pot').style.display==='none'){
            fetch(`http://46.229.212.34:9091/api/v1/otp/generate?chatId=${input}`,{
                method:'POST'
              }).then(result=>{
                document.querySelector('.pot').style.display='block'
              })
              .then(data=>{
                console.log(data);
              })
              .catch(error=>{
                console.log(error);
              });
        }
        else{
            let pot=document.querySelector('#chatpot').value;
            fetch(`http://46.229.212.34:9091/api/v1/otp/verify?chatId=${input}&otp=${pot}`,{
                method:'POST'
              }).then(result=>
                result.json())
              .then(data=>{
                console.log(data);
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                window.location.href = "http://127.0.0.1:9092/Coffe/panel.html";

              })
              .catch(error=>{
                console.log(error);
              });
        }
        
    });

}
  window.addEventListener('load', function(e){
    Language();
    Chatnum();
    document.querySelector('body').style.backgroundImage="url(./img/about.png)";
  });