import { Route, Routes } from "react-router-dom";
import Home from "../view/home";
import Food from "../view/food";
import Electronic from "../view/electronic";
import Dress from "../view/dress";
import Book from "../view/book";
import Info from "../view/info";
import Favourite from "../view/favourites";
import About from "../view/about";
import Cart from "../view/cart";
import Login from "../view/login";
import Admin from "../view/admin";

import Tablet from "../component/Techcategories/tablet";
import SAMSUNG from '../component/Techcategories/SAMSUNG'
import TV from '../component/Techcategories/tv';
import Laptop from '../component/Techcategories/laptop';
import IPhone from '../component/Techcategories/IPhone';

import Adidas from '../component/Dresscategories/adidas';
import Polo from '../component/Dresscategories/polo';
import Converse from '../component/Dresscategories/converse';
import Rebook from '../component/Dresscategories/rebook';
import Lacoste from '../component/Dresscategories/lacoste';

import Cofee from '../component/Foodcategories/cofee';
import Fries from '../component/Foodcategories/fries';
import Pizza from '../component/Foodcategories/pizza';
import Kebab from '../component/Foodcategories/kebab';
import Sushi from '../component/Foodcategories/sushi';

import Statistics from "../view/chart";
import BooksStatistic from "../component/booksStatistic";
import DressStatistic from "../component/dressStatistic";
import DevicesStatistic from "../component/devicesStatistic";
import FoodsStatistic from "../component/foodsStatistic";

function AppRouter () {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="food" element={<Food/>} />
                <Route path="electronic" element={<Electronic/>} />
                <Route path="dress" element={<Dress/>} />
                <Route path="book" element={<Book/>} />
                <Route path="info" element={<Info/>} />
                <Route path="favourite" element={<Favourite/>} />
                <Route path="about" element={<About/>} />
                <Route path="cart" element={<Cart/>} />
                <Route path="login" element={<Login/>} />
                <Route path="secret" element={<Admin/>} />

                <Route path="electronic/tablet" element={<Tablet/>} />
                <Route path="electronic/samsung" element={<SAMSUNG/>} />
                <Route path="electronic/tv" element={<TV/>} />
                <Route path="electronic/laptop" element={<Laptop/>} />
                <Route path="electronic/iphone" element={<IPhone/>} />

                <Route path="dress/adidas" element={<Adidas/>} />
                <Route path="dress/lacoste" element={<Lacoste/>} />
                <Route path="dress/rebook" element={<Rebook/>} />
                <Route path="dress/converse" element={<Converse/>} />
                <Route path="dress/polo" element={<Polo/>} />

                <Route path="food/cofee" element={<Cofee/>} />
                <Route path="food/fries" element={<Fries/>} />
                <Route path="food/pizza" element={<Pizza/>} />
                <Route path="food/kebab" element={<Kebab/>} />
                <Route path="food/sushi" element={<Sushi/>} />

                <Route path="chart" element={<Statistics/>} />
                <Route path="books" element={<BooksStatistic/>} />
                <Route path="dresss" element={<DressStatistic/>} />
                <Route path="devices" element={<DevicesStatistic/>} />
                <Route path="foods" element={<FoodsStatistic/>} />
            </Routes>
        </>
    );
}

export default AppRouter