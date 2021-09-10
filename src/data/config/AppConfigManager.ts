import * as prod from '../../config/prod.json';
import * as dev from '../../config/dev.json';
import * as local from '../../config/local.json';
import {AppEnvironments} from "../../constant/AppEnvironments";

export default class AppConfigManager {

    private static instance: (AppConfigManager | null) = null;
    private readonly appConfig: any;

    constructor() {
        const env = process.env.REACT_APP_ENV;
        if (env === AppEnvironments.PRODUCTION) {
            this.appConfig = prod;
        } else if (env === AppEnvironments.DEVELOPMENT) {
            this.appConfig = dev;
        } else {
            // localhost
            this.appConfig = local;
        }
    }

    public static getInstance(): AppConfigManager {
        if (!AppConfigManager.instance) {
            AppConfigManager.instance = new AppConfigManager();
        }
        return AppConfigManager.instance;
    }

    public getAppConfig() {
        return this.appConfig;
    }
}