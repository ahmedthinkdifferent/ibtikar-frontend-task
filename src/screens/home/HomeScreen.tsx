import {Link, Switch, useHistory, Redirect} from 'react-router-dom';
import {appStore} from "../../data/store/AppStore";
import React, {useEffect, useMemo} from "react";
import UserCache from "../../data/cache/UserCache";
import {strings} from "../../util/locale";
import MustBeLoginAuth from "../../guard/MustBeLoginGuard";
import $ from 'jquery';
import AppButton from "../../components/AppButton";
import AppCache from "../../data/cache/AppCache";

export default function HomeScreen() {
    const router = useHistory();
    const screenHeaderName = appStore.useState(s => s.screenHeaderName);
    const user = useMemo(() => {
        return UserCache.getUser();
    }, []);

    useEffect(() => {
        $("button.button-menu-mobile").on('click', () => {
            // hide or show right menu.
            const menu = $("div.side-menu");
            const pageContent = $("div.content-page");
            const isHidden = $(menu).hasClass("d-none");
            const topBar = $("ul.nav.navbar-nav");
            if (isHidden) {
                // show it
                $(menu).removeClass("d-none");
                $(pageContent).css({"margin-right": "250px"});
                $(topBar).css("height", "");
            } else {
                // hide it.
                $(menu).addClass("d-none");
                $(pageContent).css({"margin-right": "0"});
                $(topBar).css({"height": "60px"})
            }

            console.log("button click");
        });
    }, []);

    return (
        <div id="wrapper">
            <div className="topbar">
                <div className="topbar-left">
                    <Link to="/" className="logo"><span>Mis<span>Mar</span></span><i className="mdi mdi-layers"/></Link>
                </div>

                <div className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">

                        <ul className="nav navbar-nav list-inline navbar-left">
                            <li className="list-inline-item">
                                <button className="button-menu-mobile open-left">
                                    <i className="mdi mdi-menu"/>
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <h4 className="page-title">{screenHeaderName}</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="left side-menu">
                <div className="sidebar-inner slimscrollleft">
                    <div className="user-box">
                        <div className="user-img">
                            <img src={"https://www.surtecsuzuki.com.mx/facturas/img/user1.jpg"} alt="user-img" title={user?.name} className="rounded-circle img-thumbnail img-responsive"/>
                        </div>
                        <h5><span>{user?.name}</span></h5>
                        <AppButton text={strings.logout} onClick={() => {
                            AppCache.getInstance().clear();
                            router.push("/auth/login");
                        }} className={'btn btn-danger btn-trans waves-effect w-md waves-danger'}/>
                    </div>
                    <div id="sidebar-menu">
                        <ul>
                            <li className="text-muted menu-title">{strings.dashboard.navigation}</li>
                            <li>
                                <Link to="/home/dashboard" className="waves-effect"><i className="mdi mdi-view-dashboard"/> <span> {strings.dashboard.dashboard} </span> </Link>
                            </li>
                            <li>
                                <Link to="/home/admins" className="waves-effect"><i className="mdi mdi-account-settings"/> <span> {strings.dashboard.admins} </span> </Link>
                            </li>
                        </ul>
                        <div className="clearfix"/>
                    </div>
                    <div className="clearfix"/>
                </div>

            </div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Switch>
                            <MustBeLoginAuth component={DashboardScreen} path={'/home/dashboard'}/>
                            <Redirect to={'/home/products'}/>
                        </Switch>
                    </div>
                </div>
                <footer className="footer text-right">
                    {strings.dashboard.copyrights}
                </footer>
            </div>
        </div>);
}