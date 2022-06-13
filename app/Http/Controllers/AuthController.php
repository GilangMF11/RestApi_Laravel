<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Response;

class AuthController extends BaseController
{
    public function auth() {
        $authheader = \request()->header('Authorization'); //base xxxbase64decodexxx
        $keyauth    = substr($authheader,6); //hilangkan text basic

        $plainauth  = base64_decode($keyauth);  //decode text info login
        $tokenauth  = explode(':', $plainauth);   //pisahkan email:password

        $email  = $tokenauth[0]; // email
        $pass   = $tokenauth[1]; //password
    
        $data = (new Customers())-> newQuery()
                    ->where(['email'=>$email])
                    ->get(['id', 'first_name', 'last_name', 'email', 'password'])->first();

        //Validarsi custumers

        if ($data == null ){ //jika ditemukan
            return $this->out( status: 'Gagal', code: 404,
            error: ['Pengguna tidak ditemukan']    
        );


        }else{
            if ( Hash::check($pass, $data->password) ) {
                
                $data->token = hash('sha256', Str::random(10)); // buat token untuk dikirim ke client
                unset($data->password); //hilangkan informasi password baru yang akan dikirm le client
                $data->update(); //update token tersimpan ke table customers

                return $this->out( data: $data, status: 'OK', );
            }else { //jika tidak ada maka
                
                return $this->out( status: 'Gagal', code: 401 ,
                    error: ['Anda tidak memilki wewenang'],
            );
            }
        }
    }
}
