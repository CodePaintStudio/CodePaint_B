import PageContainer from "./components/PageContainer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {initUserInfo, changeLoginStatus} from "./store/userSlice.js";
import {getInfoByNameServer, loginServer} from "./api/user.js";
import {message} from "antd";

export default function App() {

    const isLogin = useSelector(state => state.user.isLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        const localInfo = JSON.parse(localStorage.getItem('userInfo'));

        async function checkLoginStatusFn() {
            try {
                const res = await loginServer({
                    username: localInfo.username,
                    password: localInfo.password,
                });
                try {
                    const userinfo = await getInfoByNameServer(res.username);
                    dispatch(changeLoginStatus(true));
                    dispatch(initUserInfo(userinfo));
                } catch {
                    message.error("获取用户信息失败")
                }
            } catch {
                message.error("用户登录失败")
            }
        }

        if (localInfo) {
            checkLoginStatusFn()
        }

    }, [])

    return (
        <>
            {isLogin ? <PageContainer/> : <LoginPage/>}
        </>
    )
}
