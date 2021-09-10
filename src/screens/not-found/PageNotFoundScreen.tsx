import {strings} from "../../util/locale";
import {Link} from "react-router-dom";

export default function PageNotFoundScreen() {
    return (<div>
            <div className="account-pages"/>
            <div className="clearfix"/>
            <div className="wrapper-page">
                <div className="ex-page-content text-center">
                    <div className="text-error">404</div>
                    <h3 className="text-uppercase font-600">{strings.pageNotFoundTitle}</h3>
                    <p className="text-muted">
                        {strings.pageNotFoundDescription}
                    </p>
                    <br/>
                    <Link to={'/home'} className="btn btn-success waves-effect waves-light">{strings.returnHome}</Link>
                </div>
            </div>
        </div>
    );
}