import PageContainer from "./components/PageContainer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {initUserInfo, changeLoginStatus} from "./store/userSlice.js";
import {getInfoByNameServer, loginServer} from "./api/user.js";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

export default function App() {
    const isLogin = useSelector(state => state.user.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const localInfo = JSON.parse(localStorage.getItem('userInfo'));
        navigate('/login')

        const checkLoginStatus = async () => {
            if (localInfo) {
                try {
                    const res = await loginServer({
                        username: localInfo.username,
                        password: localInfo.password,
                    });
                    const userinfo = await getInfoByNameServer(res.username);
                    dispatch(changeLoginStatus(true));
                    dispatch(initUserInfo(userinfo));
                    navigate("/home");
                } catch (error) {
                    message.error(error.response?.data?.message || "用户登录失败");
                }
            }
        };

        checkLoginStatus();

    }, []);

    return (
        <>
            {isLogin ? <PageContainer/> : <LoginPage/>}
        </>
    );
}
