import SweetAlert from "react-bootstrap-sweetalert";
import {strings} from "../util/locale";

interface Props {
    title: string;
    onConfirm: () => void,
    onCancel: () => void,
    show: boolean;
}

export default function WarningAlertDialog(props: Props) {
    return <SweetAlert title={props.title} onConfirm={props.onConfirm} onCancel={props.onCancel} type='warning'
                       show={props.show} confirmBtnText={strings.confirm} cancelBtnText={strings.cancel} showCancel={true} openAnim={true} closeAnim={true}/>
}