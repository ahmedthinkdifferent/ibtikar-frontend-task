interface Props {
    className?: string,
    block?: boolean,
    type?: "button" | "submit" | undefined | "reset",
    onClick?: () => void,
    margin?: string;
    text: string;
    disabled?: boolean;
}

export default function AppButton(props: Props) {
    const isDisabled = props.disabled ?? false;

    function getClasses() {
        let className = "";
        if (props.className) {
            className += props.className;
        } else {
            className += "btn btn-primary waves-effect w-md waves-light";
        }
        if (props.margin) {
            className += " " + props.margin;
        }
        if (props.block) {
            className += " btn-block";
        }
        return className;
    }

    const button = <button className={getClasses()} type={props.type || "submit"} disabled={isDisabled} onClick={props.onClick}>{props.text}</button>
    if (props.block) {
        return <div className="col-xs-12">{button}</div>
    }
    return button
}