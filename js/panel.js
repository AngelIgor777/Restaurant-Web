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
const token=JSON.parse(localStorage.getItem('accessToken'));

let allitems=[];
async function Statistiktable(start, end) {
    try{
        if (!start) start = '2023-01-01T00:00:00';
        if (!end) end = '2025-01-31T23:59:59';
        const response = await fetch(`http://46.229.212.34:9091/api/v1/statistics?from=${start}&to=${end}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
            const data = await response.json();
            document.querySelector(".Totalcost").textContent=`Доход: ${data.totalRevenueBasedOrdersDto.totalRevenue}`;
            document.querySelector(".Totalorders").textContent=`Всего заказанно: ${data.totalRevenueBasedOrdersDto.totalOrders}`;
            document.querySelector(".Earning").textContent=`Средняя цена одного заказа: ${data.totalRevenueBasedOrdersDto.avgRevenuePerOrder}`;
            const tableone=document.querySelector(`.one-category`);
            const tbody=tableone.querySelector(`.catlist`);
            tbody.innerHTML = '';
            let i=0;
            if (data.productSalesResponseDto && Array.isArray(data.productSalesResponseDto)) {
                for(const item of data.productSalesResponseDto){
                    tbody.insertAdjacentHTML('beforeend', `
                        <tr>
                          <td style="text-align: center;">${i + 1}</td>
                          <td style="text-align: center;">${item.productResponseDTO.name}</td>
                          <td style="text-align: center;">${item.productResponseDTO.typeName}</td>
                          <td style="text-align: center;">${item.totalQuantitySold}</td>
                          <td style="text-align: center;">${item.productResponseDTO.price*item.totalQuantitySold}</td>
                          </tr>
                      `);
                      i+=1;
                }
            }
    }
    catch (error) {
        console.error('Ошибка при запросе данных меню:', error);
      }
}
async function Statistik() {
    document.querySelector('.categorylist').innerHTML = '';
    document.querySelectorAll('.catbut').forEach(el=>{
        el.classList.remove('active');
    });
    document.querySelector('.static').classList.add('active');

    const categorytable = document.querySelector('.categorylist');
    const table = document.createElement('div');
    table.classList.add('one-category');

    // Сортировка по времени
    const date = new Date(); // Текущая дата
    const allTime = getFormattedDate(date);  // Для "Все время"
    const oneDayAgo = getPastDate(1);        // Для "1д"
    const fiveDaysAgo = getPastDate(5);      // Для "5д"
    const oneMonthAgo = getPastDate(30);     // Для "1мес" (условно, 30 дней)
    console.log(allTime);
    table.innerHTML = `
        <ul class='time'>
            <li><button data-timestart='2023-01-01T00:00:00' data-timeend='${allTime}' class='active'>Все время</button></li>
            <li><button data-timestart='${oneDayAgo}' data-timeend='${allTime}'>1д</button></li>
            <li><button data-timestart='${fiveDaysAgo}' data-timeend='${allTime}'>5д</button></li>
            <li><button data-timestart='${oneMonthAgo}' data-timeend='${allTime}'>1мес</button></li>
        </ul>
        <table class="category-items table">
            <thead>
                <tr>
                    <th style="text-align: center;">№</th>
                    <th style="text-align: center;">Название</th>
                    <th style="text-align: center;">Категория</th>
                    <th style="text-align: center;">Проданно</th>
                    <th style="text-align: center;">Заработок</th>
                </tr>
            </thead>
            <tbody class="catlist">
            </tbody>
        </table>
        <div class='pagging'>
            <p>ещё...</p>
        </div>
        <div class='information'>
        <p class='Totalcost' style="text-align:right;"></p>
        <p class='Totalorders' style="text-align:right;"></p>
        <p class='Earning' style="text-align:right;"></p>
        </div>
    `;
    categorytable.appendChild(table);

    const buttons = document.querySelector('.time').querySelectorAll("button"); // Получаем все кнопки

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Удаляем 'active' у всех кнопок
            buttons.forEach(btn => btn.classList.remove("active"));
            // Добавляем 'active' только к нажатой кнопке
            this.classList.add("active");

            const timeStart = this.getAttribute('data-timestart');
            const timeEnd = this.getAttribute('data-timeend');
            Statistiktable(timeStart, timeEnd); // Вызываем функцию статистики с нужными датами
        });
    });

    await Statistiktable('2023-01-01T00:00:00', allTime);
}

async function Notifications() {
    document.querySelectorAll('.catbut').forEach(el=>{
        el.classList.remove('active');
    });
    document.querySelector('.notifay').classList.add('active');
        // Находим контейнер, куда будем добавлять форму
        const container = document.querySelector('.categorylist');
        container.innerHTML = ''; // Очищаем перед добавлением
    
        const scheduleForm = document.createElement('div');
        scheduleForm.classList.add('one-category');
        scheduleForm.innerHTML = `
        <div class='choysenot'>
            <div class='schedule'>
                <h2>Расписание уведомлений</h2>
                <label for="schedule">Выберите периодичность:</label>
                <select id="schedule">
                    <option value="daily">Раз в день</option>
                    <option value="weekly">Раз в неделю</option>
                    <option value="twice_week">Два раза в неделю</option>
                    <option value="monthly">Раз в месяц</option>
                </select>
    
                <label for="sctime">Выберите время:</label>
                <input type="time" id="sctime">
    
                <div id="days-container" style="display: none; margin-top: 10px;">
                    <h4>Выберите дни недели:</h4>
                    <label><input type="checkbox" value="1"> Пн</label>
                    <label><input type="checkbox" value="2"> Вт</label>
                    <label><input type="checkbox" value="3"> Ср</label>
                    <label><input type="checkbox" value="4"> Чт</label>
                    <label><input type="checkbox" value="5"> Пт</label>
                    <label><input type="checkbox" value="6"> Сб</label>
                    <label><input type="checkbox" value="0"> Вс</label>
                </div>
            </div>
             <button class="submit-schedule">Отправить</button>
            <h6>Выберите периодичность отправки уведомлений в телеграмме</h6>
        </div>
        `;
    
        container.appendChild(scheduleForm);
    
        // Логика переключения дней недели
        const scheduleSelect = document.getElementById("schedule");
        const daysContainer = document.getElementById("days-container");
        
        scheduleSelect.addEventListener('change', function () {
            daysContainer.style.display = (this.value === "weekly" || this.value === "twice_week") ? "block" : "none";
        });
    
        // Обработчик кнопки "Отправить"
        document.querySelector('.submit-schedule').addEventListener('click', async function () {
            const schedule = document.getElementById("schedule").value;
            const time = document.getElementById("sctime").value;
            const daysOfWeek = [];
        
            document.querySelectorAll("#days-container input:checked").forEach(cb => daysOfWeek.push(cb.value));
        
            if (!schedule || !time) {
                alert("Пожалуйста, заполните все поля!");
                return;
            }
    
            let [hours, minutes] = time.split(":");
            let cronExpression = "";
            hours = (parseInt(hours) - 2 + 24) % 24;
            if (schedule === "daily") {
                cronExpression = `0 ${minutes} ${hours} * * *`;
            } else if (schedule === "twice_day") {
                cronExpression = `0 ${minutes} ${hours},${(parseInt(hours) + 12) % 24} * * *`;
            } else if (schedule === "weekly" || schedule === "twice_week") {
                if (schedule === "weekly" && daysOfWeek.length !== 1) {
                    alert("Выберите только один день недели!");
                    return;
                }
                if (schedule === "twice_week" && daysOfWeek.length !== 2) {
                    alert("Выберите только два дня!");
                    return;
                }
                cronExpression = `0 ${minutes} ${hours} * * ${daysOfWeek.join(",")}`;
            } else if (schedule === "monthly") {
                cronExpression = `0 ${minutes} ${hours} 1 * *`;
            }
    
            try {
                const response = await fetch(`http://46.229.212.34:9091/api/v1/scheduler/update-cron?cronExpression=${encodeURIComponent(cronExpression)}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    Swal.fire({
                        title: "Успех!",
                        text: "Расписание обновленно!",
                        icon: "success",
                        customClass: {
                          confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                        }
                      })
                } else {
                    Swal.fire({
                        title: "Ошибка!",
                        text: "Не удалось обновить!",
                        icon: "error",
                        customClass: {
                          confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                        }
                      })
                }
    
                // Запуск бота
                await fetch('http://46.229.212.34:9091/api/v1/scheduler/start', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error(error);
                alert("Ошибка при отправке данных.");
            }
        });  
        // Создание окна отправки сообщения
        const messageForm = document.createElement('div');
        messageForm.classList.add('messageform');
        messageForm.innerHTML = `
        <div class="mesform">
        <div class="mb-3">
          <label for="messageSend" class="form-label"><h2>Сообщение</h2></label>
          <textarea class="form-control" id="messageSend" rows="3"></textarea>
        </div>
        <button class="submit-mes">Отправить</button>
      </div>

        `
        container.appendChild(messageForm);
        document.querySelector('.submit-mes').addEventListener('click', function() {
            let mestext = document.querySelector('#messageSend').value.trim();
            let mas={
                "message":mestext
            }
            if (mestext) {
                console.log(token);
                fetch('http://46.229.212.34:9091/api/v1/tg',{
                    method:'POST',
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                     },
                    body: JSON.stringify(mas)
                  }).then(result=>result.text())
                  .catch(error=>{
                    console.log(error);
                  });
            }
        });
        
}

// получение времени
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0, поэтому +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
// Отнят дату
function getPastDate(days) {
    const pastDate = new Date();
    pastDate.setDate(new Date().getDate() - days);  // Вычитаем дни
    return getFormattedDate(pastDate);
}
// Получение румынской версии
// для категории
async function Rumcat(id) {
    Swal.fire({
        title: "Alternativă",
        html: `
        <div class="form-floating mb-3 tovname">
            <input type="text" class="form-control" id="rumname" />
            <label for="rumname">Nume</label>
        </div>
        `,
        confirmButtonColor: "#2F9262",
        confirmButtonText: "Trimite",
        showCancelButton: true,
        cancelButtonText:'Anula',
        preConfirm: () => {
            const rumnume = document.getElementById("rumname").value.trim();
            
            if (!rumnume) {
                Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                return false;
            }

            return { rumname: rumnume};
        }
    }).then(async (result) => {
        if (result.isConfirmed) {  // Если пользователь нажал "OK"
            try {
                let fet=`http://46.229.212.34:9091/api/v1/product-type-translations/`;
                let met="POST";
                const respo = await fetch(`http://46.229.212.34:9091/api/v1/product-type-translations/${id}?lang=ro`, {
                    method: "GET"
                });
                console.log(respo)
                if (respo.status !== 404) {
                    const dat = await respo.json();
                    fet=`http://46.229.212.34:9091/api/v1/product-type-translations/${dat.id}?lang=ro`;
                    met="PATCH";
                }
                console.log(met, id);
                const response = await fetch(fet, {
                    method: met,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productTypeId: id,  // Передаём ID продукта
                        languageCode:'ro',
                        name: result.value.rumname,
                    })
                });

                if (!response.ok) throw new Error("Ошибка при отправке данных");

                Swal.fire({
                    title: "Успез!",
                    text: "Перевод добавлен!",
                    icon: "success",
                    customClass: {
                      confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                    }
                  })
            } catch (error) {
                Swal.fire({
                    title: "Ошибка!",
                    text: "Не удалось добавить перевод!",
                    icon: "error",
                    customClass: {
                      confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                    }
                  });
            }
        }
    });
}
// для товара
async function Rumname(id) {
    Swal.fire({
        title: "Alternativă",
        html: `
        <div class="form-floating mb-3 tovname">
            <input type="text" class="form-control" id="rumname" />
            <label for="rumname">Nume</label>
        </div>
        <div class="form-floating mb-3 descr">
            <textarea class="form-control" placeholder="Leave a comment here" id="rumdescription"></textarea>
            <label for="rumdescription">Descriere</label>
        </div>
        `,
        confirmButtonColor: "#2F9262",
        confirmButtonText: "Trimite",
        showCancelButton: true,
        cancelButtonText:'Anula',
        preConfirm: () => {
            const rumnume = document.getElementById("rumname").value.trim();
            const rumdesc = document.getElementById("rumdescription").value.trim();
            
            if (!rumnume || !rumdesc) {
                Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                return false;
            }

            return { rumname: rumnume, rumdescription: rumdesc };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {  // Если пользователь нажал "OK"
            try {
                let fet=`http://46.229.212.34:9091/api/v1/product-translations`;
                let met="POST";
                const respo = await fetch(`http://46.229.212.34:9091/api/v1/product-translations/${id}?lang=ro`, {
                    method: "GET"
                });
                console.log(respo)
                if (respo.status !== 404) { 
                    const dat = await respo.json();
                    fet=`http://46.229.212.34:9091/api/v1/product-translations/${dat.id}?lang=ro`;
                    met="PATCH";
                }
                const response = await fetch(fet, {
                    method: met,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: id,  // Передаём ID продукта
                        languageCode:'ro',
                        name: result.value.rumname,
                        description: result.value.rumdescription
                    })
                });

                if (!response.ok) throw new Error("Ошибка при отправке данных");

                Swal.fire({
                    title: "Успез!",
                    text: "Перевод добавлен!",
                    icon: "success",
                    customClass: {
                      confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                    }
                  })
            } catch (error) {
                Swal.fire({
                    title: "Ошибка!",
                    text: "Не удалось добавить перевод!",
                    icon: "error",
                    customClass: {
                      confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                    }
                  });
            }
        }
    });
}

async function CuponAll() {
    if(token){
        try {
            const response = await fetch(`http://46.229.212.34:9091/api/v1/discounts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
    
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
            const data = await response.json();
            console.log("Купоны:", data);
    
            const tableone = document.querySelector(".cuppons-al");
            const tbody = tableone.querySelector(".catlist");
    
            if (!tbody) {
                console.error("Элемент .catlist не найден!");
                return;
            }
    
            tbody.innerHTML = "";
            let i = 0;
    
            for (const item of data) {
                tbody.insertAdjacentHTML("beforeend", `
                    <tr>
                      <td style="text-align: center;">${i + 1}</td>
                      <td style="text-align: center;">${item.code}</td>
                      <td style="text-align: center;">${item.description}</td>
                      <td style="text-align: center;">${item.discount}</td>
                      <td style="text-align: center;">${formDate(item.validFrom)}</td>
                      <td style="text-align: center;">${formDate(item.validTo)}</td>
                      <td style="text-align: center;" class="allbuttons">
                          <button class="delete delete-cup btn btn-danger" data-id="${item.id}">
                              <i class="bx bx-trash-alt"></i>
                          </button>
                      </td>
                    </tr>
                `);
                i++;
            }
    
            // Обработчик удаления купона
            document.querySelector(".categorylist").addEventListener("click", async (event) => {
                if (event.target.closest(".delete-cup")) {
                    const button = event.target.closest(".btn-danger");
                    const productId = button.getAttribute("data-id");
    
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
                        try {
                            await deleteCupponAl(productId);
                            button.closest("tr").remove();
    
                            Swal.fire({
                                title: "Успех!",
                                text: "Купон был удален!",
                                icon: "success",
                                customClass: {
                                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                }
                              })
                        } catch (error) {
                            Swal.fire({
                                title: "Ошибка!",
                                text: "Не удалось удалить!",
                                icon: "error",
                                customClass: {
                                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                }
                              })
                        }
                    }
                }
            });
    
    
        } catch (error) {
            console.error("Ошибка при загрузке купонов:", error);
            Swal.fire("Ошибка", "Не удалось загрузить купоны", "error");
        }
    }
    
}

async function deleteCupponAl(productId) {
    try {
        const response = await fetch(`http://46.229.212.34:9091/api/v1/discounts/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении продукта с ID ${productId}`);
        }
        console.log(`Продукт с ID ${productId} успешно удален`);
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
    }
}
async function CuponItem() {
    if(token){
        try {
            const response = await fetch(`http://46.229.212.34:9091/api/v1/product-discounts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
    
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
            const data = await response.json();
            console.log("Купоны:", data);
    
            const tableone = document.querySelector(".cupons-it");
            const tbody = tableone.querySelector(".catlist");
    
            if (!tbody) {
                console.error("Элемент .catlist не найден!");
                return;
            }
    
            tbody.innerHTML = "";
            let i = 0;
            
            for (const item of data) {
                tbody.insertAdjacentHTML("beforeend", `
                    <tr>
                      <td style="text-align: center;">${i + 1}</td>
                      <td style="text-align: center;">${item.code}</td>
                      <td style="text-align: center;">${item.description}</td>
                      <td style="text-align: center;">${item.discount}</td>
                      <td style="text-align: center;">${formDate(item.validFrom)}</td>
                      <td style="text-align: center;">${formDate(item.validTo)}</td>
                      <td style="text-align: center;" class="allbuttons">
                          <button class="delete delete-cup btn btn-danger" data-id="${item.id}">
                              <i class="bx bx-trash-alt"></i>
                          </button>
                      </td>
                    </tr>
                `);
                i++;
            }
    
            // Обработчик удаления купона
            document.querySelector(".categorylist").addEventListener("click", async (event) => {
                if (event.target.closest(".delete-cup")) {
                    const button = event.target.closest(".btn-danger");
                    const productId = button.getAttribute("data-id");
    
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
                        try {
                            await deleteCupponIt(productId);
                            button.closest("tr").remove();
    
                            Swal.fire({
                                title: "Успех!",
                                text: "Купон был удален!",
                                icon: "success",
                                customClass: {
                                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                }
                              })
                        } catch (error) {
                            Swal.fire({
                                title: "Ошибка!",
                                text: "Не удалось удалить!",
                                icon: "error",
                                customClass: {
                                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                                }
                              })
                        }
                    }
                }
            });
    
            // Открытие формы для создания купона
            document.querySelector(".cupon-one").addEventListener("click", function () {
                Swal.fire({
                    html: `
                    <div class="adres">
                       <h1>Создать купон</h1>
                       <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="cupname" placeholder="Название" />
                          <label for="cupname">Название</label>
                       </div>

                            <div class="findinput">
                              <div class="form-floating mb-3">
                                <input class="form-control" placeholder="Имя товара" id="cupid" rows="3"></input>
                                <label for="cupid">Имя товара</label>
                                 </div>
                            </div>
                             <div class="result_table">
                                <div class='result'>
                                <!-- Сюда будут добавляться результаты поиска -->
                                </div>
                             </div>

                            </div>
                       <div class="form-floating mb-3">
                          <textarea class="form-control" placeholder="Описание" id="cupdes" rows="3"></textarea>
                          <label for="cupdes">Описание</label>
                       </div>
                       <div class="form-floating mb-3">
                          <input type="number" class="form-control" id="cupskid" placeholder="Процент скидки" />
                          <label for="cupskid">Процент скидки</label>
                       </div>
                       <div class="form-floating mb-3">
                          <select class="form-select" id="cupday">
                              <option value="1" selected>1 день</option>
                              <option value="7">1 неделя</option>
                              <option value="14">2 недели</option>
                              <option value="28">1 месяц</option>
                          </select>
                          <label for="cupday">Длительность</label>
                       </div>
                    </div>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Создать",
                    cancelButtonText: "Отмена",
                    didOpen: () => {
                        FindTovar();
                    },
                    preConfirm: () => {
                        
                        const name = document.getElementById("cupname").value;
                        const des = document.getElementById("cupdes").value;
                        const dis = document.getElementById("cupskid").value;
                        const cuptime = document.getElementById("cupday").value;
                        
                        const cupid = JSON.parse(localStorage.getItem('cupid'));
                        if (!name || !dis || !cuptime || !cupid) {
                            Swal.showValidationMessage("Пожалуйста, заполните все поля или проверьте правильность написания имени!");
                            return false;
                        }
    
                        return { name, des, dis, cuptime, cupid };
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const { name, des, dis, cuptime, cupid} = result.value;
    
                        const now = new Date();
                        const validFrom = now.toISOString().slice(0, 19);
    
                        now.setDate(now.getDate() + parseInt(cuptime, 10));
                        const validTo = now.toISOString().slice(0, 19);
    
                        const cupon = {
                            code: name,
                            productId:cupid,
                            description: des,
                            discount: parseFloat(dis), // Преобразуем в число
                            validFrom,
                            validTo
                        };
                        try {
                            const response = await fetch("http://46.229.212.34:9091/api/v1/product-discounts", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify(cupon)
                            });
    
                            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
                            const data = await response.json();
                            console.log("Создан купон:", data);
                            await CuponItem(); // Перезагружаем список купонов
                           
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
            });
    
        } catch (error) {
            console.error("Ошибка при загрузке купонов:", error);
            Swal.fire({
                title: "Ошибка!",
                text: "Не удалось загрузить!",
                icon: "error",
                customClass: {
                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                }
              })
        }
    }
}
async function deleteCupponIt(productId) {
    try {
        const response = await fetch(`http://46.229.212.34:9091/api/v1/product-discounts/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении продукта с ID ${productId}`);
        }
        console.log(`Продукт с ID ${productId} успешно удален`);
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
    }
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
async function Addallcup() {
    // Открытие формы для создания купона
    document.querySelector(".cupon-all").addEventListener("click", function () {
        Swal.fire({
            html: `
            <div class="adres">
               <h1>Создать купон</h1>
               <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="cupname" placeholder="Название" />
                  <label for="cupname">Название</label>
               </div>
               <div class="form-floating mb-3">
                  <textarea class="form-control" placeholder="Описание" id="cupdes" rows="3"></textarea>
                  <label for="cupdes">Описание</label>
               </div>
               <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="cupskid" placeholder="Процент скидки" />
                  <label for="cupskid">Процент скидки</label>
               </div>
               <div class="form-floating mb-3">
                  <select class="form-select" id="cupday">
                      <option value="1" selected>1 день</option>
                      <option value="7">1 неделя</option>
                      <option value="14">2 недели</option>
                      <option value="28">1 месяц</option>
                  </select>
                  <label for="cupday">Длительность</label>
               </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonColor: "#2F9262",
            cancelButtonColor: "#3f3f3f",
            confirmButtonText: "Создать",
            cancelButtonText: "Отмена",
            preConfirm: () => {
                const name = document.getElementById("cupname").value;
                const des = document.getElementById("cupdes").value;
                const dis = document.getElementById("cupskid").value;
                const cuptime = document.getElementById("cupday").value;

                if (!name || !dis || !cuptime) {
                    Swal.showValidationMessage("Пожалуйста, заполните все поля!");
                    return false;
                }

                return { name, des, dis, cuptime };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { name, des, dis, cuptime } = result.value;

                const now = new Date();
                const validFrom = now.toISOString().slice(0, 19);

                now.setDate(now.getDate() + parseInt(cuptime, 10));
                const validTo = now.toISOString().slice(0, 19);

                const cupon = {
                    code: name,
                    description: des,
                    discount: parseFloat(dis), // Преобразуем в число
                    validFrom,
                    validTo
                };
                try {
                    const response = await fetch("http://46.229.212.34:9091/api/v1/discounts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(cupon)
                    });

                    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

                    const data = await response.json();
                    console.log("Создан купон:", data);
                    await CuponAll(); // Перезагружаем список купонов
                   
                } catch (error) {
                    console.error(error);
                }
            }
        });
    });
}
async function Cupon() {
    document.querySelectorAll('.catbut').forEach(el=>{
        el.classList.remove('active');
    });
    document.querySelector('.cupon').classList.add('active');

    const categorytable = document.querySelector('.categorylist');
    categorytable.innerHTML='';
    // 1 таблица купонов
    const table=document.createElement('div');
    table.classList.add('one-category');
    table.innerHTML=`
    <h3>Купон для всех товаров</h3>
          <table class="cuppons-al table ">
              <thead>
                <tr>
                  <th style="text-align: center;">№</th>
                  <th style="text-align: center;">Название</th>
                  <th style="text-align: center;">Описание</th>
                  <th style="text-align: center;">Скидка</th>
                  <th style="text-align: center;">Начало</th>
                  <th style="text-align: center;">Окончание</th>
                  <th class="allbuttons">
                   <button class="delete category-btn btn btn-success cupon-all"><i class='bx bx-book-add' ></i></button>
                  </th>
                </tr>
              </thead>
              <tbody class="catlist">

              </tbody>
            </table>
            <div class='pagging'>
            <p>ещё...</p>
            </div>
    `;
    categorytable.appendChild(table);
    await CuponAll();
    await Addallcup();
    // 2 таблица купонов
    const table2=document.createElement('div');
    table2.classList.add('one-category');
    table2.innerHTML=`
    <h3>Купон для одного товара</h3>
          <table class="cupons-it table">
              <thead>
                <tr>
                  <th style="text-align: center;">№</th>
                  <th style="text-align: center;">Название</th>
                  <th style="text-align: center;">Описание</th>
                  <th style="text-align: center;">Скидка</th>
                  <th style="text-align: center;">Начало</th>
                  <th style="text-align: center;">Окончание</th>
                  <th class="allbuttons">
                   <button class="delete category-btn btn btn-success cupon-one"><i class='bx bx-book-add' ></i></button>
                  </th>
                </tr>
              </thead>
              <tbody class="catlist">

              </tbody>
            </table>
            <div class='pagging'>
            <p>ещё...</p>
            </div>
    `;
    categorytable.appendChild(table2);
    await CuponItem();
    
    document.querySelectorAll('.pagging').forEach(el => {
        pagcup(el);
        el.addEventListener('click', function (e) {
            pagcup(el);
        });
    });
}
function pagcup(el){
    const nearestTable = el.closest('div').previousElementSibling;
            if (nearestTable &&  el.classList.contains('pagging')) {
                let i = 0;
                
                nearestTable.querySelectorAll('tbody tr').forEach(em => {
                    if (i >= 2) {
                        em.style.display = 'none'; // Скрыть строки
                    } else {
                        em.style.display = ''; // Убедиться, что строки видимы
                        i++;
                    }
                });
    
                el.classList.replace('pagging', 'pagshow');
            } else {
                let i = 0;
                nearestTable.querySelectorAll('tbody tr').forEach(em => {
                    em.style.display = ''; // Паказать строки
                });
    
                el.classList.replace('pagshow', 'pagging');
            }
}

// для поиска 
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
                  <h3 class="nameTov">${product.name}</h3>
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
      const searchQuery = document.querySelector("#cupid").value; 
      loadProducts(searchQuery); // Передаём актуальный поисковый запрос
  }
}
// для поиска товаров
async function FindTovar() {
    const searchInput = document.querySelector("#cupid");
    const resultTable = document.querySelector(".result_table");

    
    if (!searchInput || !resultTable) {
        console.error("Ошибка: не найдены необходимые элементы.");
        return;
    }
    loadProducts("");
    // поле для ввода данных
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
  
        if (e.target.matches(".send") || e.target.closest(".send")) {
            const button = e.target.closest(".send");
            button.classList.add("sold");
            const itemid = parseInt(button.closest(".item").id.replace(/[^0-9]/g, ""));
            localStorage.setItem('cupid', JSON.stringify(itemid));
            // Убираем класс sold через 1 секунду
            setTimeout(function () {
                button.classList.remove("sold");
            }, 1000); // 1 секунда анимации
        
        }
    });

}
// Загрузка всех таблиц
async function fetchProductTypes() {
    try {
     
      const response = await fetch('http://46.229.212.34:9091/api/v1/product-types');
      const data = await response.json();
      
      if (data.content && Array.isArray(data.content)) {
        const categorytable = document.querySelector('.categorylist');
        categorytable.innerHTML='';
  
        // Создаем таблицы категорий
        data.content.forEach(item => {
          const table=document.createElement('div');
          table.classList.add('one-category');
          table.classList.add(`item-${item.id}`);
          table.innerHTML=`
          <div class='catTitle'>
            <h3>${item.name}</h3>
          <button class="delete changecatlang btn btn-primary" data-id="${item.id}"><i class='bx bx-globe'></i> </button>
          </div>
          
                <table class="category-items table">
                    <thead>
                      <tr>
                        <th style="text-align: center;">№</th>
                        <th style="text-align: center;">Название</th>
                        <th style="text-align: center;">Цена</th>
                        <th style="text-align: center;">Описание</th>
                        <th style="text-align: center;">Время готовки</th>
                        <th style="text-align: center;">Изображение</th>
                        <th class="allbuttons">
                        <button class="delete category-btn btn btn-success" data-category-id="${item.id}" data-bs-toggle="modal" data-bs-target="#Modalwindow" data-category-id=${item.id} ><i class='bx bx-book-add' ></i></button>
                        <button class="delete category-delete  btn btn-danger" data-delete="${item.id}" data-category-id="${item.id}"><i class='bx bx-trash-alt'></i></button>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="catlist">
  
                    </tbody>
                  </table>
                  <div class='pagging'>
                  <p>ещё...</p>
                  </div>
          `;
          categorytable.appendChild(table);
        });
  
        // После загрузки категорий загружаем меню
        const categoryIds = data.content.map(item => item.id); // Извлекаем IDs
        await Addtable(categoryIds);
        console.log(allitems);
        document.querySelectorAll('.changelang').forEach(item=>{
            item.addEventListener('click', function(){
                const itemId = this.getAttribute("data-id");
                Rumname(itemId);
            });
        })
        document.querySelectorAll('.changecatlang').forEach(item=>{
            item.addEventListener('click', function(){
                const itemId = this.getAttribute("data-id");
                Rumcat(itemId);
            });
        })
        
        document.querySelector('.categorylist').addEventListener('click', async (event) => {
            if (event.target.closest('.delete-item')) {
                Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это востоновить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Да, удалить!",
                    cancelButtonText:"Отмена!"
                }).then(async (result) => {  // Добавляем async здесь
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Удалено!",
                            text: "Элемент был удален.",
                            icon: "success",
                            confirmButtonColor: "#2F9262",
                            confirmButtonText:"Ок"
                        });
            
                        const button = event.target.closest('.btn-danger');
                        const productId = button.getAttribute('data-delete');
            
                        await deleteProduct(productId);  // Используем await здесь
            
                        // Удаляем строку из таблицы
                        const row = button.closest('tr');
                        row.remove();
                    }
                });
            }
            

            if (event.target.closest('.category-delete')) {
                Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это востоновить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#3f3f3f",
                    confirmButtonText: "Да, удалить!",
                    cancelButtonText:"Отмена!"
                }).then(async (result) => {  // Добавляем async здесь
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Удалено!",
                            text: "Элемент был удален.",
                            icon: "success",
                            confirmButtonColor: "#2F9262",
                            confirmButtonText:"Ок"
                        });
            
                        const button = event.target.closest('.category-delete');
                const categoryId = button.getAttribute('data-delete');
                await deleteCategory(categoryId); 
                // Удаляем категорию (всю таблицу)
                const categoryDiv = button.closest('.one-category');
                categoryDiv.remove();
                    }
                });
            }
            // если нажали на кнопку история запускаем функцию
            if(event.target.closest('.history')){
                const button= event.target.closest('.history');
                const itemId = button.getAttribute("data-id");
                Historyset(itemId);
            }
            if(event.target.closest('.category-btn')){
                const button= event.target.closest('.category-btn');
                const typename=button.getAttribute('data-category-id');
                document.getElementById('typename').value = typename;
                console.log(typename);
            };
            if(event.target.closest('.change-button')){
                const button= event.target.closest('.change-button');
                
                const row = button.closest('tr');
                const name = row.cells[1].innerText;
                const price = row.cells[2].innerText;
                const description = row.cells[3].innerText;
                const time = row.cells[4].innerText.split(":")[1];
                console.log(time);
                // Заполняем модальное окно
                document.getElementById('name').value = name;
                document.getElementById('price').value = price;
                document.getElementById('description').value = description;
                document.getElementById('time').value = time;
                
                // Получаем id что бы пониманать что за товар
                const typename=button.getAttribute('data-type');
                const itemid=button.getAttribute('data-delete');
                // проверка на изменение
                console.log(typename);
                document.getElementById('ischange').value=`${itemid}`;
                document.getElementById('typename').value = typename;
            }

        });
        let Modal = new bootstrap.Modal(document.getElementById('Modalwindow'), {
            keyboard: false
        });
    //    обнуление входных в модальном окете
        document.querySelectorAll('.category-btn').forEach(it=>{
            it.addEventListener('click', function(e){
                document.getElementById('name').value = '';
                document.getElementById('price').value = '';
                document.getElementById('description').value = '';
                document.getElementById('time').value = '';
                document.getElementById('ischange').value='';
 
        });
        })
        
        // Пагинация в меню
        document.querySelectorAll('.pagging').forEach(el => {
            el.addEventListener('click', function (e) {
            const nearestTable = el.closest('div').previousElementSibling;

            if (nearestTable && nearestTable.classList.contains('category-items') && el.classList.contains('pagging')) {
                let i = 0;
                // Скрыть строки после 5-й
                nearestTable.querySelectorAll('tbody tr').forEach(em => {
                    if (i >= 5) {
                        em.style.display = 'none'; // Скрыть строки
                    } else {
                        em.style.display = ''; // Убедиться, что первые 5 строк видимы
                        i++;
                    }
                });

                // Меняем класс на "pagshow"
                el.classList.replace('pagging', 'pagshow');
            }
            else{
                let i = 0;
                nearestTable.querySelectorAll('tbody tr').forEach(em => {
                        em.style.display = ''; // Паказать строки
                });

                // Меняем класс на "pagshow"
                el.classList.replace('pagshow', 'pagging');
            }
        });
    });
        // После всего добавляем для категорий
        console.log(categoryIds);
        await Category(categoryIds);
      } else {
        console.error('Неверный формат данных:', data);
      }
    } catch (error) {
      console.error('Ошибка при запросе данных категорий:', error);
    }
    
  }
// все с изменением товаром
async function Category(categoryIds){
// создание или редактирование нового товара
document.querySelector('button.confirm').addEventListener('click', async function(e) {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let cookingTime=document.getElementById("time").value;
    let img = document.getElementById('image').files[0]; // Получаем выбранный файл
    let typeName = document.getElementById('typename').value;
    if(cookingTime==='1'){
        cookingTime='00:50:00';
        console.log(cookingTime);
    }
    else{
        cookingTime=`00:${cookingTime}:00`
    }
    if (name && price) {
        // Очистка полей формы
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('description').value = '';
        document.getElementById('image').value = '';
        document.getElementById("time").value='';
        // назначение модального окна для дальнейшого его закрытия
        let modalElement = document.getElementById('Modalwindow');
        let Modal = bootstrap.Modal.getInstance(modalElement); // Получаем уже существующий экземпляр

        const ischange=document.getElementById('ischange');
        if(ischange.value.length>0){
           
            let changeproduct={
                id:ischange.value,
                name:name,
                description:description,
                typeId:typeName,
                price:price,
                cookingTime:cookingTime
            };
            console.log(img);
            const formData=new FormData(); 
            formData.append("id",changeproduct.id);
            formData.append("name",changeproduct.name);
            formData.append("description",changeproduct.description);
            formData.append("typeId",changeproduct.typeId);
            formData.append("price",changeproduct.price);
            formData.append("cookingTime",changeproduct.cookingTime);
            formData.append('file', img);
            fetch('http://46.229.212.34:9091/api/v1/products', {
                method: 'PATCH',
                headers: {
                "Authorization": `Bearer ${token}`
            },
                body:formData
            }).then(res=>{
                if(!res.ok){
                    throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
                }
                return res.text().then(text => text ? JSON.parse(text) : {});
            }).then(data=>{
                console.log('Success:', data);
                Addtable(categoryIds);
            }).catch(errr=>{
                console.error('Error:', errr);
            });
            Modal.hide();
        }
        else{
        let newProduct={
                name: name,
                price: price,
                typeName: typeName,
                description: description,
                cookingTime: cookingTime
            };
           
        const formData=new FormData(); 
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('typeId', newProduct.typeName);
        formData.append('price', newProduct.price);
        formData.append('cookingTime', newProduct.cookingTime);
        formData.append('file', img);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        
        Modal.hide();
        // const rumData = await Rumname();
        // console.log(rumData);

        fetch('http://46.229.212.34:9091/api/v1/products', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                // Обработка ошибки на уровне HTTP
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
            return response.text().then(text => text ? JSON.parse(text) : {});
        })
        .then(data => {
            console.log('Success:', data);
            // уведомление о успехе
            Addtable(categoryIds);
            Swal.fire({
                title: "Успех!",
                text: "Обновленно!",
                icon: "success",
                customClass: {
                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                }
              });
        })
        .catch(error => {
            console.error('Error:', error);
            // уведомление о неудаче
            Swal.fire({
                title: "Ошибка!",
                text: "Попробуйте снова!",
                icon: "error",
                customClass: {
                  confirmButton: 'custom-confirm-button'  // Класс для кнопки подтверждения
                }
              });
        });
        }
        
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});
  // Добавление новой категории
  document.querySelector('.category-confirm').addEventListener('click', function (e) {
    const newcategory = document.querySelector('#category-name');
    if (newcategory && newcategory.value.trim() !== "") {  // Проверка на пустое значение
        let cat = { name: newcategory.value };
        newcategory.value='';
        // Получаем существующий модальный экземпляр
        let modalElement = document.getElementById('Categorywindow');
        let modalInstance = bootstrap.Modal.getInstance(modalElement); // Получаем уже существующий экземпляр

        if (modalInstance) {
            modalInstance.hide(); // Закрываем модальное окно
        }
        fetch('http://46.229.212.34:9091/api/v1/product-types', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cat)
        }).then(res => {
            console.log(1);
            return res.json();
        }).then(data => {
            console.log('Success:', data);
        }).catch(err => {
            console.error('Error:', err);
        });
        fetchProductTypes();
    }
         else {
            
        alert('Пожалуйста, заполните все поля');
    }
});
}
async function Historyset(id) {
    const response = await fetch(`http://46.229.212.34:9091/api/v1/productHistory/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const data = await response.json();
    console.log(data);
    let tbody = document.querySelector(".ordorlist");
    tbody.innerHTML = ''; // Очищаем таблицу перед вставкой новых данных
    console.log();
  // Проверяем, что orderList не пустой
    let j=0
    for (let i of data) {
      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="text-align: center;">${j + 1}</td>
          <td style="text-align: center;">${i.name}</td>
          <td style="text-align: center;">${i.price}</td>
          <td style="text-align: center;">${i.description}</td>
          <td style="text-align: center;">${i.cookingTime}</td>
          <td style="text-align: center;">${formDate(i.changedAt)}</td>
          <td style="text-align: center;"><button class="delete recover btn btn-success" data-id='${i.id}' data-history="${i.productHistoryId}"><i class='bx bx-arrow-from-top' ></i></button></td>
        </tr>
        
      `);
      j+=1;
    }
    j=0
    document.querySelectorAll('.recover').forEach(item => {
        item.addEventListener('click', async function() {
            const itemId = this.getAttribute('data-id');
            const histId=this.getAttribute('data-history');
            const response = await fetch(`http://46.229.212.34:9091/api/v1/productHistory/${itemId}/${histId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response);
            if(response.ok){
                fetchProductTypes();
                let modalElement = document.getElementById('HistoryModal');
                let Modal = bootstrap.Modal.getInstance(modalElement); // Получаем уже существующий экземпляр
                Modal.hide();
            }
        });
    });
}
async function Addtable(categoryIds){
    try{
        for(const id of categoryIds){
            const response = await fetch(`http://46.229.212.34:9091/api/v1/products?typeId=${id}`);
            const data = await response.json();
            const tableone=document.querySelector(`.item-${id}`);
            const typename=id;
            const tbody=tableone.querySelector(`.catlist`);
            tbody.innerHTML = '';
            let i=0;
            if (data.content && Array.isArray(data.content)) {
                for(const item of data.content){
                    allitems.push({name: item.name, id: item.id}); // Добавляем объект в массив
                    tbody.insertAdjacentHTML('beforeend', `
                        <tr>
                          <td style="text-align: center;">${i + 1}</td>
                          <td style="text-align: center;">${item.name}</td>
                          <td style="text-align: center;">${item.price}</td>
                          <td style="text-align: center;">${item.description}</td>
                          <td style="text-align: center;">${item.cookingTime}</td>
                          <td style="text-align: center;">Изобржение</td>
                          <td style="text-align: center;" class="allbuttons">
                          <button class="delete change-button btn btn-success" data-delete="${item.id}" data-type='${typename}' data-bs-toggle="modal" data-bs-target="#Modalwindow"><i class='bx bxs-edit-alt'></i></button>
                          <button class="delete delete-item btn btn-danger" data-delete="${item.id}"><i class='bx bx-trash-alt'></i></button>
                          </td>
                          <td class='otherbuttons'>
                            <button class="delete changelang btn btn-primary" data-id="${item.id}"><i class='bx bx-globe'></i> </button>
                            <button class="delete history btn btn-secondary" data-id="${item.id}"data-bs-toggle="modal" data-bs-target="#HistoryModal"><i class='bx bx-history'></i></button>
                        </td>
                          </tr>
                      `);
                      i+=1;
                }
            }
        }
    }
    catch (error) {
        console.error('Ошибка при запросе данных меню:', error);
      }
}
async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://46.229.212.34:9091/api/v1/products/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении продукта с ID ${productId}`);
        }
        console.log(`Продукт с ID ${productId} успешно удален`);
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
    }
}
async function deleteCategory(categoryId) {
    try {
        const response = await fetch(`http://46.229.212.34:9091/api/v1/product-types/${categoryId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении категории с ID ${categoryId}`);
        }
        console.log(`Категория с ID ${categoryId} успешно удалена`);
    } catch (error) {
        console.error('Ошибка при удалении категории:', error);
    }
}
async function Closepagging() {
    // запускаем всю страницу
    document.querySelector('.categorylist').innerHTML='';
    document.querySelectorAll('.catbut').forEach(el=>{
        el.classList.remove('active');
    });
    document.querySelector('.cattaloge').classList.add('active');
    await fetchProductTypes();
    // закрытие всех пагинациий
    document.querySelectorAll('.pagging').forEach(el => {
        const nearestTable = el.closest('div').previousElementSibling;
        
        if (nearestTable && nearestTable.classList.contains('category-items') && el.classList.contains('pagging')) {
            let i = 0;
            // Скрыть строки после 5-й
            nearestTable.querySelectorAll('tbody tr').forEach(em => {
                if (i >= 5) {
                    em.style.display = 'none'; // Скрыть строки
                } else {
                    em.style.display = ''; // Убедиться, что первые 5 строк видимы
                    i++;
                }
            });

            // Меняем класс на "pagshow"
            el.classList.replace('pagging', 'pagshow');
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
function ExitButton() {
    document.querySelector('.exit').addEventListener('click', function () {
        if (localStorage.getItem('uuid')) {
            localStorage.removeItem('uuid');
            localStorage.removeItem('addressResponseDTO');
        }
    });
}

document.querySelector('.cupon').addEventListener('click', Cupon);
document.querySelector('.notifay').addEventListener('click', Notifications);
document.querySelector('.static').addEventListener('click', Statistik);
document.querySelector('.cattaloge').addEventListener('click', Closepagging);
// Запуск
Closepagging();
Registr();
ExitButton();
