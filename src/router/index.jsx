import {Route, Routes} from "react-router-dom";

import AddArticles from "../pages/AddArticles.jsx";
import ArticlesCate from "../pages/ArticlesCate.jsx";
import HandleAdd from "../pages/HandleAdd.jsx";
import HomePage from "../pages/HomePage.jsx";
import UserPage from "../pages/UserPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

export default function RouteConfig() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/">
                <Route path="home" element={<HomePage/>}/>
                <Route path="articles" element={<ArticlesCate/>}/>
                <Route path="addarticle" element={<AddArticles/>}/>
                <Route path="handleadd" element={<HandleAdd/>}/>
                <Route path="user" element={<UserPage/>}/>
            </Route>
        </Routes>
    );
}
