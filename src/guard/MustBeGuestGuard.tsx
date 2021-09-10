import {Redirect, Route} from 'react-router-dom';
import UserCache from "../data/cache/UserCache";

export default function MustBeGuestGuard(props: any) {
    return <Route render={(p) => {
        const isUserLogin = UserCache.hasUser();
        if (isUserLogin) {
            return <Redirect to={"/home"}/>
        }
        return <props.component {...p}/>
    }}/>
}