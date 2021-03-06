<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $table= 'products';
    const UPDATED_AT=null;
    const CREATED_AT=null;
    protected $quarded=[];
}
