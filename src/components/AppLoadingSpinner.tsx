import {strings} from "../util/locale";

interface Props {
    type?: string;
    margin?: string;
}

export default function AppLoadingSpinner(props: Props) {
    function getClasses() {
        let className = "spinner-border";
        if (props.type) {
            className += " " + props.type;
        } else {
            className += " text-success";
        }
        if (props.margin) {
            className += " " + props.margin;
        } else {
            className += " m-2";
        }
        return className;
    }

    return (<div className={getClasses()}>
        <span className="sr-only">{strings.alert.pleaseWait}</span>
    </div>);
}