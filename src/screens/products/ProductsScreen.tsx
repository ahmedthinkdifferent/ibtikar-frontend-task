import useComponentState from "../../hooks/useComponentState";
import {Product, ProductsResponse} from "../../data/model/ProductsResponse";
import React, {useEffect} from "react";
import HttpRequest from "../../data/network/HttpRequest";
import HttpService from "../../data/network/HttpService";
import {Alert, Button, Card, Col, Row} from "react-bootstrap";
import {ForLoop, IfCondition} from "react-ifloop-ts";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import {strings} from "../../util/locale";
import {appStore} from "../../data/store/AppStore";
import {ActionNames} from "../../data/store/ActionNames";

export default function ProductsScreen() {
    const loadingState = useComponentState({isLoading: false, error: null});
    const productsState = useComponentState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    function loadProducts() {
        loadingState.value = {isLoading: true, error: null};

        const request = new HttpRequest();
        request.method = "GET";
        request.url = "/v1/products";
        HttpService.send(request).then(res => {
            loadingState.value = {isLoading: false, error: null};
            productsState.value = (res.data as ProductsResponse).products;
        }).catch(e => {
            loadingState.value = {isLoading: false, error: e.message};
        });
    }

    return (<Row className={"flex-column"}>
        <IfCondition condition={loadingState.value.isLoading}>
            <Col className={'text-center'}><AppLoadingSpinner/></Col>
        </IfCondition>

        <IfCondition condition={loadingState.value.error != null}>
            <Alert variant={'danger'} className={'text-center'}>{loadingState.value.error}</Alert>
        </IfCondition>

        <Col>
            <Row>
                <ForLoop items={productsState.value} forEachItem={(product: Product) => {
                    return <Col md={3} className={'mb-2'} key={product.id}>
                        <Card>
                            <Card.Img variant="top" src={product.images[0].image} style={{maxHeight: "300px"}}/>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text className={'text-success'}>
                                    <span>{product.category.name}</span>
                                    <span className={'float-right'}>{product.price} $</span>
                                </Card.Text>
                                <Button variant="primary" onClick={() => {
                                    appStore.dispatch({type: ActionNames.INCREASE_PRODUCT, payload: product});
                                }}>{strings.products.addToCard}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                }}/>
            </Row>
        </Col>

    </Row>);
}