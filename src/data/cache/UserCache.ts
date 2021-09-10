import AppCache from "./AppCache";
import {User} from '../model/AuthResponse';

export default class UserCache {


    static saveUser(user: User, saveInCache: boolean = true) {
        AppCache.getInstance().save("user", user, saveInCache);
    }

    static getUser(): User | null {
        const user = AppCache.getInstance().get("user");
        if (user) {
            return user as User;
        }
        return null;
    }

    static hasUser(): boolean {
        return AppCache.getInstance().has("user");
    }
}