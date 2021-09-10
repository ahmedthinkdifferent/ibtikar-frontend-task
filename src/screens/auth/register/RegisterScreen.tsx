import {Link, useHistory} from 'react-router-dom';
import {strings} from "../../../util/locale";
import {useFormik} from "formik";
import * as Yup from "yup";
import HttpRequest from "../../../data/network/HttpRequest";
import AppButton from "../../../components/AppButton";
import useComponentState from "../../../hooks/useComponentState";
import HttpService from "../../../data/network/HttpService";
import UserCache from "../../../data/cache/UserCache";
import ToastManager from "../../../util/ToastManager";
import AppTextField from "../../../components/AppTextField";
import AppLoadingSpinner from "../../../components/AppLoadingSpinner";
import {IfCondition} from "react-ifloop-ts";
import {AuthResponse} from "../../../data/model/AuthResponse";

export default function RegisterScreen() {
    const loading = useComponentState(false);
    const router = useHistory();
    const rememberMeState: any = useComponentState(true);
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required(strings.validation.required).matches(/^[a-zA-Z0-9]+$/, strings.validation.mustNotContainsSpaces),
            email: Yup.string().email(strings.validation.invalidEmail).required(strings.validation.required),
            password: Yup.string()
                .required(strings.validation.required)
                .min(8, strings.formatString(strings.validation.minFieldChars, 8))
                .matches(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
                    strings.validation.passwordRegxNotMatch
                ),
            confirmPassword: Yup.string()
                .required(strings.validation.required)
                .min(8, strings.formatString(strings.validation.minFieldChars, 8))
                .matches(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
                    strings.validation.passwordRegxNotMatch
                ).oneOf([Yup.ref('password'), null], strings.validation.passwordsNotMatch),
        }),
        async onSubmit(values) {
            // call web service.
            const request = new HttpRequest();
            request.url = "/v1/auth/register";
            request.body = values;
            request.method = 'POST';
            loading.value = true;
            HttpService.send(request).then((response) => {
                loading.value = false;
                const authResponse = response.data as AuthResponse;
                UserCache.saveUser(authResponse.user, rememberMeState.value);
                router.replace("/home");
            }).catch((e) => {
                loading.value = false;
                ToastManager.showError(e.message);
            });
        },
    });

    return <div>
        <div className="account-pages"/>
        <div className="clearfix"/>
        <div className="wrapper-page">
            <div className="text-center">
                <Link to="/home" className="logo"><span>Ibti<span>Kar</span></span></Link>
                <h5 className="text-muted m-t-0 font-600">{strings.login.registerNew}</h5>
            </div>
            <div className="m-t-40 card-box">
                <div className="text-center">
                    <h4 className="text-uppercase font-bold m-b-0">{strings.login.registerNew}</h4>
                </div>
                <div className="p-20">
                    <form className="form-horizontal m-t-20" onSubmit={formik.handleSubmit}>
                        <AppTextField type={'text'} name="name" formik={formik} placeholder={strings.login.name}/>
                        <AppTextField type={'email'} name="email" formik={formik} placeholder={strings.login.email}/>
                        <AppTextField type={'password'} name="password" formik={formik} placeholder={strings.login.password}/>
                        <AppTextField type={'password'} name="confirmPassword" formik={formik} placeholder={strings.login.retypedPassword}/>
                        <div className="form-group ">
                            <div className="col-xs-12">
                                <div className="checkbox checkbox-success checkbox-circle">
                                    <input id="checkbox-signup" type="checkbox" checked={rememberMeState.value} onChange={(e) => {
                                        rememberMeState.reverseValue();
                                    }
                                    }/>
                                    <label htmlFor="checkbox-signup">
                                        {strings.login.rememberMe}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group text-center m-t-30">
                            <IfCondition condition={loading.value}>
                                <AppLoadingSpinner/>
                            </IfCondition>
                            <AppButton text={strings.login.register} type={'submit'} block={true}
                                       className={"btn btn-custom btn-bordred btn-block waves-effect waves-light"} disabled={loading.value}/>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
}