import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {Alert, Card, Col, Row} from "react-bootstrap";
import {strings} from "../../util/locale";
import {IfCondition} from "react-ifloop-ts";
import {appStore} from "../../data/store/AppStore";
import {ActionNames} from "../../data/store/ActionNames";
import ToastManager from "../../util/ToastManager";
import React from "react";
import AppTextField from "../../components/AppTextField";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import AppButton from "../../components/AppButton";
import {useFormik} from "formik";
import * as Yup from "yup";
import HttpRequest from "../../data/network/HttpRequest";
import HttpService from "../../data/network/HttpService";
import useComponentState from "../../hooks/useComponentState";

export default function CompleteOrderScreen() {
    const router = useHistory();
    const loadingState = useComponentState({isLoading: false, error: null});
    const products = useSelector((s: any) => {
        return s.products;
    });

    function formatProductsToApi() {
        const apiProducts: { id: number, quantity: number }[] = [];
        products.forEach((p: any) => {
            apiProducts.push({id: p.id, quantity: p.requiredQuantity});
        });
        return apiProducts;
    }

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            userPhone: "",
            userEmail: "",
            userAddress: "",
            products: formatProductsToApi()
        },
        validationSchema: Yup.object().shape({
            userEmail: Yup.string().email(strings.validation.invalidEmail).required(strings.validation.required),
            userPhone: Yup.string().required(strings.validation.required).min(6, strings.formatString(strings.validation.minFieldChars, 6)),
            userAddress: Yup.string().required(strings.validation.required).min(10, strings.formatString(strings.validation.minFieldChars, 10))
        }),
        async onSubmit(values) {
            // call web service.
            loadingState.value = {isLoading: true, error: null};
            const request = new HttpRequest();
            request.url = "/v1/orders";
            values.userPhone = "02" + values.userPhone;
            request.body = values;
            request.method = 'POST';
            HttpService.send(request).then((response) => {
                ToastManager.showSuccess(response.data.message);
                loadingState.value = {isLoading: false, error: null};

                router.replace("/home/products");
                appStore.dispatch({type: ActionNames.CLEAR_BASKET});
            }).catch((e) => {
                loadingState.value = {isLoading: false, error: e.message};
            });
        },
    });

    return <Row className={'flex-column'}>
        <IfCondition condition={loadingState.value.isLoading}>
            <Col className={'text-center'}><AppLoadingSpinner/></Col>
        </IfCondition>

        <IfCondition condition={loadingState.value.error != null}>
            <Alert variant={'danger'} className={'text-center'}>{loadingState.value.error}</Alert>
        </IfCondition>

        <Col className={'mt-2'}>
            <Card>
                <Card.Header>
                    {strings.basket.completeOrder}
                </Card.Header>
                <Card.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <AppTextField type={'number'} name="userPhone" formik={formik} placeholder={strings.basket.userPhone}/>
                        <AppTextField type={'email'} name="userEmail" formik={formik} placeholder={strings.basket.userEmail}/>
                        <AppTextField type={'text'} as={'textarea'} rows={3} name="userAddress" formik={formik} placeholder={strings.basket.userAddress}/>
                        <AppButton text={strings.basket.order} type={'submit'}/>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
}