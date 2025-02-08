async function Statistiktable(start, end) {
    try{
        if (!start) start = '2023-01-01T00:00:00';
        if (!end) end = '2025-01-31T23:59:59';
        const response = await fetch(`http://46.229.212.34:9091/api/v1/statistics?from=${start}&to=${end}`);
            const data = await response.json();
            document.querySelector(".Totalcost").textContent=`Общая стоимость: ${data.totalRevenueBasedOrdersDto.totalRevenue}`;
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
    document.querySelector('.static').classList.add('active');
    document.querySelector('.cattaloge').classList.remove('active');

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
        <p class='Totalcost' style="text-align:right;"></p>
        <p class='Totalorders' style="text-align:right;"></p>
        <p class='Earning' style="text-align:right;"></p>
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
async function fetchProductTypes() {
    try {
     
      const response = await fetch('http://46.229.212.34:9091/api/v1/product-types');
      const data = await response.json();
  
      if (data.content && Array.isArray(data.content)) {
        const categorytable = document.querySelector('.categorylist');
      
  
        // Создаем таблицы категорий
        data.content.forEach(item => {
          const table=document.createElement('div');
          table.classList.add('one-category');
          table.classList.add(`item-${item.id}`);
          table.innerHTML=`
          <h3>${item.name}</h3>
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
                        <button class="delete category-btn btn btn-success" data-bs-toggle="modal" data-bs-target="#Modalwindow" data-category-id=${item.id} ><i class='bx bx-book-add' ></i></button>
                        <button class="delete category-delete  btn btn-danger" data-delete="${item.id}" data-category-id="${item.id}"><i class='bx bx-trash-alt'></i></button>
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
        });
  
        // После загрузки категорий загружаем меню
        const categoryIds = data.content.map(item => item.id); // Извлекаем IDs
        await Addtable(categoryIds);
        document.querySelector('.categorylist').addEventListener('click', async (event) => {
            if (event.target.closest('.delete-item')) {
                Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это востоновить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#d33",
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
            
            if (event.target.closest('.delete')) {
                const button = event.target.closest('.delete');
                const typeName = button.getAttribute('data-category-id'); // Получаем categoryId из кнопки
                console.log('Переданный тип продукта:', typeName);
        
                // Заполняем скрытое поле для типа продукта в модальном окне
                document.getElementById('typename').value = typeName;
            }
            if (event.target.closest('.category-delete')) {
                Swal.fire({
                    title: "Вы уверены?",
                    text: "Вы не сможете это востоновить!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2F9262",
                    cancelButtonColor: "#d33",
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
            if(event.target.closest('.change-button')){
                const button= event.target.closest('.change-button');
                
                const row = button.closest('tr');
                const name = row.cells[1].innerText;
                const price = row.cells[2].innerText;
                const description = row.cells[3].innerText;
                const time = row.cells[4].innerText;

                // Заполняем модальное окно
                document.getElementById('name').value = name;
                document.getElementById('price').value = price;
                document.getElementById('description').value = description;
                document.getElementById('time').value = time;
                
                // Получаем id что бы пониманать что за товар
                const typename=button.closest('table').querySelector('.category-btn').getAttribute('data-category-id');
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
        document.querySelector('.category-btn').addEventListener('click', function(e){
                document.getElementById('name').value = '';
                document.getElementById('price').value = '';
                document.getElementById('description').value = '';
                document.getElementById('time').value = '';
                document.getElementById('ischange').value=``;
        });
        // создание или редактирование нового товара
        document.querySelector('button.confirm').addEventListener('click', function(e) {
            let name = document.getElementById('name').value;
            let price = document.getElementById('price').value;
            let description = document.getElementById('description').value;
            let img = document.getElementById('image').files[0]; // Получаем выбранный файл
            let cookingTime= document.getElementById('time').value;
            let typeName = document.getElementById('typename').value;
            if(cookingTime===''){
                cookingTime='00:00:00';
            }
            if (name && price && description) {
                // Очистка полей формы
                document.getElementById('name').value = '';
                document.getElementById('price').value = '';
                document.getElementById('description').value = '';
                document.getElementById('image').value = '';
                document.getElementById('time').value = '';
                
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
                    const formData=new FormData(); 
                    formData.append("id",changeproduct.id);
                    formData.append("name",changeproduct.name);
                    formData.append("description",changeproduct.description);
                    formData.append("typeId",changeproduct.typeId);
                    formData.append("price",changeproduct.price);
                    formData.append("cookingTime",changeproduct.cookingTime);
                    fetch('http://46.229.212.34:9091/api/v1/products', {
                        method: 'PATCH',
                        
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
                console.log(newProduct);
                console.log(cookingTime);
                const formData=new FormData(); 
                formData.append('name', newProduct.name);
                formData.append('description', newProduct.description);
                formData.append('typeId', newProduct.typeName);
                formData.append('price', newProduct.price);
                formData.append('cookingTime', newProduct.cookingTime);
                formData.append('file', img);
                

                Modal.hide();
                fetch('http://46.229.212.34:9091/api/v1/products', {
                    method: 'POST',
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
                // Скрыть строки после 5-й
                nearestTable.querySelectorAll('tbody tr').forEach(em => {
                        em.style.display = ''; // Скрыть строки
                });

                // Меняем класс на "pagshow"
                el.classList.replace('pagshow', 'pagging');
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
            headers: { 'Content-Type': 'application/json' },
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
async function Addtable(categoryIds){
    try{
        for(const id of categoryIds){
            const response = await fetch(`http://46.229.212.34:9091/api/v1/products?typeId=${id}`);
            const data = await response.json();
            const tableone=document.querySelector(`.item-${id}`);

            const tbody=tableone.querySelector(`.catlist`);
            tbody.innerHTML = '';
            let i=0;
            if (data.content && Array.isArray(data.content)) {
                for(const item of data.content){
                    tbody.insertAdjacentHTML('beforeend', `
                        <tr>
                          <td style="text-align: center;">${i + 1}</td>
                          <td style="text-align: center;">${item.name}</td>
                          <td style="text-align: center;">${item.price}</td>
                          <td style="text-align: center;">${item.description}</td>
                          <td style="text-align: center;">${item.cookingTime}</td>
                          <td style="text-align: center;">Изобржение</td>
                          <td style="text-align: center;" class="allbuttons">
                          <button class="delete change-button btn btn-success" data-delete="${item.id}" data-bs-toggle="modal" data-bs-target="#Modalwindow"><i class='bx bxs-edit-alt'></i></button>
                          <button class="delete delete-item btn btn-danger" data-delete="${item.id}"><i class='bx bx-trash-alt'></i></button>
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
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении продукта с ID ${productId}`);
        }
        // Удаление изображения
        const photoResponse = await fetch(`http://46.229.212.34:9091/api/v1/photos/product/${productId}`);
        if (!photoResponse.ok) {
            throw new Error(`Ошибка при получении изображения для продукта с ID ${productId}`);
        }
        const photoData = await photoResponse.json();
        if (!photoData.length || !photoData[0].url) {
            throw new Error(`Изображение для продукта с ID ${productId} не найдено`);
        }
        const imageresponse= await fetch('http://46.229.212.34:9091/api/v1/photos/resource?photoName='+photoData[0].url, {
            method: 'DELETE',
        })
       
        if (!imageresponse.ok) {
            throw new Error(`Ошибка при удалении изображения для продукта с ID ${productId}`);
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
    document.querySelector('.cattaloge').classList.add('active');
    document.querySelector('.static').classList.remove('active');
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
// Изменения ярлыка
async function Registr() {
    let params = new URLSearchParams(window.location.search);
    let uuid = params.get("uuid");
  
    if (!localStorage.getItem("uuid")) {
      if (uuid) {
        localStorage.setItem("uuid", JSON.stringify(uuid));
      }
    } else {
      let uuid1 = JSON.parse(localStorage.getItem("uuid"));
      
      if (uuid1) {
        try {
          // Получаем данные пользователя
          let response = await fetch(`http://46.229.212.34:9091/api/v1/users/${uuid1}`);
          let data = await response.json();
          console.log(data);
  
          // Получаем изображение
          let imageResponse = await fetch(`http://46.229.212.34:9091/api/v1/photos/resource/?photoName=${data.photoUrl}`);
          
          if (!imageResponse.ok) {
            throw new Error("Ошибка загрузки изображения");
          }
  
          let imageBlob = await imageResponse.blob();
          let imageUrl = URL.createObjectURL(imageBlob);
  
          // Вставляем изображение в элементы
          document.querySelectorAll(".userimg").forEach(im => {
            im.innerHTML = `<img src="${imageUrl}" alt="User Image">`;
          });
  
        } catch (error) {
          console.error("Ошибка запроса:", error);
        }
      }
    }
  }
document.querySelector('.static').addEventListener('click', Statistik);
document.querySelector('.cattaloge').addEventListener('click', Closepagging);
// Запуск
Closepagging();
Registr();