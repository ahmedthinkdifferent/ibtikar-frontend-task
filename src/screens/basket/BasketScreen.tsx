import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import {strings} from "../../util/locale";
import {useSelector} from "react-redux";
import React from "react";
import {ForLoop} from "react-ifloop-ts";
import {appStore} from "../../data/store/AppStore";
import {ActionNames} from "../../data/store/ActionNames";
import ToastManager from "../../util/ToastManager";
import {useHistory} from "react-router-dom";

export default function BasketScreen() {
    const router = useHistory();
    const products = useSelector((s: any) => {
        return s.products;
    });
    const total = getTotal();

    function getTotal() {
        let total = 0;
        products.forEach((p: any) => {
            total += p.totalPrice;
        });
        return total;
    }

    return <Row>
        <Col className={'mt-2'}>
            <Card>
                <Card.Header>
                    {strings.basket.items}
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ForLoop items={products} forEachItem={(product: any) => {
                            return <ListGroup.Item key={product.id}>
                                <Row>
                                    <Col>
                                        {product.name}
                                    </Col>
                                    <Col className={'col-auto'}>
                                    <span className={'badge badge-success mx-2 p-2 cursor-pointer'} onClick={() => {
                                        appStore.dispatch({type: ActionNames.INCREASE_PRODUCT, payload: product});
                                    }}>+</span>
                                        <span>{product.requiredQuantity}</span>
                                        <span className={'badge badge-danger mx-2 p-2 cursor-pointer'} onClick={() => {
                                            appStore.dispatch({type: ActionNames.DECREASE_PRODUCT, payload: product});
                                        }}>-</span>
                                        <span className={'mx-4'}>{product.totalPrice + " $"}</span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        }
                        }/>
                        <ListGroup.Item key={"totalItems"}>
                            <Row>
                                <Col>
                                    {strings.basket.total}
                                </Col>
                                <Col className={'col-auto'}>
                                    <span className={'mx-4'}>{total + " $"}</span>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>

                    <Button variant={'primary'} className={'btn-block'} onClick={() => {
                        if (products.length === 0) {
                            ToastManager.showError(strings.alert.basketIsEmpty);
                        } else {
                            router.push("/home/completeOrder");
                        }
                    }}>{strings.basket.order}</Button>
                </Card.Body>
            </Card>
        </Col>
    </Row>
}