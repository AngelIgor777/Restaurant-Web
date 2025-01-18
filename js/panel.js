
async function fetchProductTypes() {
    try {
     
      const response = await fetch('http://localhost:9091/api/v1/product-types');
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
                    fetch('http://localhost:9091/api/v1/products', {
                        method: 'PATCH',
                        
                        body:formData
                    }).then(res=>{
                        if(!res.ok){
                            throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
                        }
                        return res.text().then(text => text ? JSON.parse(text) : {});
                    }).then(data=>{
                        console.log('Success:', data);
                        // уведомление о успехе
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
                fetch('http://localhost:9091/api/v1/products', {
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
                })
                .catch(error => {
                    console.error('Error:', error);
                    // уведомление о неудаче
                });
                }
                
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
        // Добавление новой категории
        document.querySelector('.category-confirm').addEventListener('click', function(e){
            const newcategory=document.querySelector('#category-name');
            if(newcategory){
                console.log(newcategory.value)
                let cat={
                    name: newcategory.value
                }
                let Modal = new bootstrap.Modal(document.getElementById('Modalwindow'), {
                    keyboard: false
                });
                Modal.hide();
                fetch('http://localhost:9091/api/v1/product-types',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(cat)
                }).then(res=>{
                    if(!res.ok){
                         // Обработка ошибки на уровне HTTP
                         throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                    }
                    return res.text().then(text => text ? JSON.parse(text) : {});
                }).then(data=>{
                    console.log('Success:', data);
                    fetchProductTypes();
                    // уведомление о успехе
                    
                }).catch(err=>{
                    console.error('Error:', err);
                });
            }
            else{
                alert('Пожалуйста, заполните все поля');
            }
        });
        
      } else {
        console.error('Неверный формат данных:', data);
      }
    } catch (error) {
      console.error('Ошибка при запросе данных категорий:', error);
    }
  }
async function Addtable(categoryIds){
    try{
        for(const id of categoryIds){
            const response = await fetch(`http://localhost:9091/api/v1/products?typeId=${id}`);
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
        const response = await fetch(`http://localhost:9091/api/v1/products/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Ошибка при удалении продукта с ID ${productId}`);
        }
        // Удаление изображения
        const photoResponse = await fetch(`http://localhost:9091/api/v1/photos/product/${productId}`);
        if (!photoResponse.ok) {
            throw new Error(`Ошибка при получении изображения для продукта с ID ${productId}`);
        }
        const photoData = await photoResponse.json();
        if (!photoData.length || !photoData[0].url) {
            throw new Error(`Изображение для продукта с ID ${productId} не найдено`);
        }
        const imageresponse= await fetch('http://localhost:9091/api/v1/photos/resource?photoName='+photoData[0].url, {
            method: 'DELETE',
        })
       
        if (!imageResponse.ok) {
            throw new Error(`Ошибка при удалении изображения для продукта с ID ${productId}`);
        }
        
        console.log(`Продукт с ID ${productId} успешно удален`);
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
    }
}
async function deleteCategory(categoryId) {
    try {
        const response = await fetch(`http://localhost:9091/api/v1/product-types/${categoryId}`, {
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

fetchProductTypes();
