import SweetAlert from "react-bootstrap-sweetalert";
import {strings} from "../util/locale";

interface Props {
    title: string;
    show: boolean;
    onConfirm: () => void
}

export default function InfoDialog(p: Props) {
    return (<SweetAlert title={p.title}
                        show={p.show}
                        confirmBtnText={strings.confirm}
                        openAnim={true}
                        closeAnim={true}
                        onConfirm={p.onConfirm}/>);
}