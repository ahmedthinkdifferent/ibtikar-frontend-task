import {Redirect, Route} from 'react-router-dom';
import UserCache from "../data/cache/UserCache";

export default function MustBeLoginAuth(props: any) {
    const isUserLogin = UserCache.hasUser();
    if (isUserLogin) {
        return <Route {...props}/>
    } else {
        return <Redirect to={"/auth/login"}/>
    }
}