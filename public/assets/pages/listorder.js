function refreshData() {
    $.ajax({
        url: '/api/orders',
        method: 'GET',
        dataType: 'json',
        headers: {
            'token' : window.localStorage['token']
        },
        success:(res)=>{
            console.log(res);
            var data    = res.data.data;
            var content = '';

            for (var i = 0; i < data.length; i++) {
                 var item = data[i];
                 var btnhapus = `<a href='#' class ='link-hapus' data-id='${item.id}'>Hapus</a>`;
                 var linkEdit = `<a href='#' class ='link-edit' data-id='${item.id}'>Edit</a>`;

                content += `
                    <tr> 
                        <td>${i+1}</td>
                        <td>${item.order_date} <br/> ${btnhapus} | ${linkEdit}</td>
                        <td>${item.product_title}</td>
                        <td>${item.price}</td>
                        <td>${item.qty}</td>
                        <td>${item.first_name} ${item.last_name}</td>
                    </tr>
                `;
            }
            $('table.table tbody').html(content);
        },
        error:(res,status,err)=>{
            console.log(res)
            alert('Terjadi kesalahan');
        }
    });
}

function hapus(id) {
    
}

function edit(id) {
    
}

document.addEventListener('DOMContentLoaded', (c)=>{
    refreshData();

    $('body').on('click', 'a.link-hapus', (e)=>{
        var c = confirm('Apakah yakin ingin menghapus data?');

        if (c === true ) {
            var id = $(e.currentTarget).data('id');
            hapus( id );
        }
    });

    $('body').on('click', 'a.link-edit', (e)=>{
        var id = $(e.currentTarget).data('id');
        edit( id );
    });
});