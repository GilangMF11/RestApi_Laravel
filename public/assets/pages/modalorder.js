function fillCustomer() {
    $.ajax({
        url: '/api/customers',
        method: 'GET',
        dataType: 'json',
        headers:{
            ' token' : window.localStorage['token']
        },
        success:(res)=>{
            var data    = res.data.data;
            var content = '';

            for (let i = 0; i < data.length; i++) {
                var item = data[i];
                content += ` <option value='${item.id}'>${item.first_name} ${item.last_name}</option> `;
                
            }
            $('select[name=id]').html(content);
        },
        error:(res, status, err)=>{
            alert('Terjadi kesalahan baca data isi select customer')
        }
    });
}

function fillProduct() {
    $.ajax({
        url: '/api/products',
        method: 'GET',
        dataType: 'json',
        headers:{
            'token' : window.localStorage['token']
        },
        success:(res)=>{
            var data    = res.data.data;
            var content = '';

            for (let i = 0; i < data.length; i++) {
                var item = data[i];
                content += ` <option value="${item.id}">${item.title} (${item.category})</option> `;
                
            }
            $('select[name=product_id]').html(content);
        },
        error:(res, status, err)=>{
            alert('Terjadi kesalahan baca data isi select customer')
        }
    });
}

function save( id ) {
    $.ajax({
        url: 'api/orders',
        method: 'GET',
        dataType: 'json', 
        data: {
            'product_id' : $('select[name=product_id]').val(),
            'customer_id' : $('select[name=customer_id]').val(),
            'qty' : $('select[name=qty]').val()
        },
        headers:{
            'token' : window.localStorage['token']
        },
        success:(res)=>{
            console.log('sukses', res);
            alert('Data order berhasil direkam');
            $('#modalOrder').modal('hide'); //modal ditutuo
            refreshData(); // reflesh

        },
        error:(res, status, err)=>{
            console.log('error : ', res);
            alert('Order gagal direkam');
        }
    })
}

function hapus(id) {

    
}

document.addEventListener('DOMContentLoaded', (c)=>{
    fillCustomer();
    fillProduct();

    $('button#simpan').on('click', (c)=>{
        save();
    });
});