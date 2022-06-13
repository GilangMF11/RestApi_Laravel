<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customers;
use App\Models\Orders;

class CustomerController extends BaseController
{

    public function store (){
        $customer = Customers::find( \request('id') );

        if ($customer == null ) {
            //kembalikan nilai dengan format produk tidak ditemukan
            return $this->out( status: 'Gagal', code:404 ,
            error: ['Customer tidak ditemukan']) ;

        }

        $cus = new Customers();
        $cus->id  = $cus->id;
        $cus->email         = $cus->email;
        $cus->last_name       = $cus->last_name;
        $cus->last_name       = $cus->last_name;

        if ( $cus->save() == true) {
            return $this->out(data: $cus, status: 'OK', code: 201);
        }else{
            return $this->out(status: 'Gagal', error: ['Customer Gagal Disimpan!'], code: 504);
        }

    }

    public function findAll(){
        $data = Customers::paginate(20, ['id', 'email', 'first_name', 'last_name', 'city'] );

        if ( count($data) ==0) {
            return $this->out(data:[], status:'Kosong', code: 204);
        } else {
            return $this->out(data: $data, status: 'OK');
        }
    }
    public function findOne(Customers $customer){
        return $this->out(data: $customer, status: 'OK');
    }
}
