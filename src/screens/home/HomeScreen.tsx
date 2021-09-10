import {Link, NavLink as ReactNav, Redirect, Switch, useHistory} from 'react-router-dom';
import React, {useEffect, useMemo} from "react";
import UserCache from "../../data/cache/UserCache";
import {strings} from "../../util/locale";
import $ from 'jquery';
import AppButton from "../../components/AppButton";
import AppCache from "../../data/cache/AppCache";
import {Badge, Dropdown, Image, Row} from 'react-bootstrap';
import ProductsScreen from "../products/ProductsScreen";
import MustBeLoginAuth from '../../guard/MustBeLoginGuard';
import {useSelector} from "react-redux";
import {ForLoop, IfCondition} from 'react-ifloop-ts';
import BasketScreen from "../basket/BasketScreen";
import CompleteOrderScreen from "../complete-order/CompleteOrderScreen";

export default function HomeScreen() {
    const router = useHistory();
    const productsInBasket = useSelector((s: any) => s.productsCount);
    const products = useSelector((s: any) => {
        return s.products;
    });
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
        });
    }, []);

    return (
        <div id="wrapper">
            <div className="topbar">
                <div className="topbar-left">
                    <Link to="/" className="logo"><span>Ibti<span>Kar</span></span><i className="mdi mdi-layers"/></Link>
                </div>


                <div className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav list-inline navbar-left">
                            <li className="list-inline-item">
                                <button className="button-menu-mobile open-left">
                                    <i className="mdi mdi-menu"/>
                                </button>
                            </li>
                        </ul>

                    </div>
                    <Row className={'w-100vw justify-content-end bg-light px-2 align-items-center py-2'}>
                        <IfCondition condition={true}>
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                    {productsInBasket}
                                    <span className={' mx-2 my-4'}>
                            <i className="mdi mdi-cart text-white" style={{fontSize: '25px'}}>
                            </i></span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ForLoop items={products} forEachItem={(product: any, index: number) => {
                                        return <Dropdown.Item key={product.id} onClick={() => {
                                            router.push('/home/basket');
                                        }}>
                                            <span>{product.name + " - " + product.requiredQuantity}</span>
                                            <Badge variant={'success'} className={'mx-2'}>{strings.show}</Badge>
                                        </Dropdown.Item>;
                                    }}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </IfCondition>
                        <span className={'m-2'}>{user?.name}</span>
                        <Image src="https://www.surtecsuzuki.com.mx/facturas/img/user1.jpg" roundedCircle style={{width: '50px', height: '50px'}}/>
                    </Row>
                </div>
            </div>

            <div className="left side-menu">
                <div className="sidebar-inner slimscrollleft">
                    <div className="user-box">
                        <div className="user-img">
                            <img src={"https://www.surtecsuzuki.com.mx/facturas/img/user1.jpg"} alt="user-img" title={user?.name}
                                 className="rounded-circle img-thumbnail img-responsive"/>
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
                                <ReactNav activeClassName={'active'} to="/home/products" className="waves-effect"><i className="mdi mdi-laptop-mac"/>
                                    <span> {strings.dashboard.products} </span> </ReactNav>
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
                            <MustBeLoginAuth component={ProductsScreen} path={'/home/products'}/>
                            <MustBeLoginAuth component={BasketScreen} path={'/home/basket'}/>
                            <MustBeLoginAuth component={CompleteOrderScreen} path={'/home/completeOrder'}/>
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