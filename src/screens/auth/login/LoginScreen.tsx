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
import {AdminLoginResponse} from "../../../data/model/AdminLoginResponse";

export default function LoginScreen() {
    const loading = useComponentState(false);
    const router = useHistory();
    const rememberMeState: any = useComponentState(true);
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email(strings.validation.invalidEmail).required(strings.validation.required),
            password: Yup.string()
                .min(6, strings.formatString(strings.validation.minFieldChars, 6))
                .required(strings.validation.required)
        }),
        async onSubmit(values) {
            // call web service.
            const request = new HttpRequest();
            request.url = "/v1/admin/auth/login";
            request.body = values;
            request.method = 'POST';
            loading.value = true;
            HttpService.send(request).then((response) => {
                loading.value = false;
                const adminLoginResponse = response.data as AdminLoginResponse;
                UserCache.saveUser(adminLoginResponse.admin, rememberMeState.value);
                router.replace("/home/dashboard");
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
                <Link to="/home" className="logo"><span>Mis<span>Mar</span></span></Link>
                <h5 className="text-muted m-t-0 font-600">{strings.login.loginTitle}</h5>
            </div>
            <div className="m-t-40 card-box">
                <div className="text-center">
                    <h4 className="text-uppercase font-bold m-b-0">{strings.login.signIn}</h4>
                </div>
                <div className="p-20">
                    <form className="form-horizontal m-t-20" onSubmit={formik.handleSubmit}>
                        <AppTextField type={'email'} name="email" formik={formik} placeholder={strings.login.email}/>
                        <AppTextField type={'password'} name="password" formik={formik} placeholder={strings.login.password}/>
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
                            <AppButton text={strings.login.signIn} type={'submit'} block={true}
                                       className={"btn btn-custom btn-bordred btn-block waves-effect waves-light"} disabled={loading.value}/>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
}