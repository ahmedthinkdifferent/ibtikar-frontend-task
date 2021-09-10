import Switch from "react-switch";
import {IfElseCondition} from "react-ifloop-ts";
import {Form} from "react-bootstrap";

interface Props {
    checked: any,
    onChanged?: (checked: any) => void,
    label?: string;
    name?: string;
    valueType?: 'str' | 'num';
    disabled?: boolean;
    formik?: any;
}

export default function AppSwitch(props: Props) {

    function isChecked() {
        if (props.valueType) {
            if (props.valueType === "str") {
                return props.checked === "yes";
            } else {
                // number.
                return props.checked === 1;
            }
        }
        return props.checked;
    }

    function handleChange(checked: boolean) {
        if (!props.onChanged && !props.formik) {
            return;
        }
        if (props.valueType) {
            if (props.valueType === "str") {
                if (checked) {
                    if (props.onChanged) {
                        props.onChanged("yes");
                    } else {
                        props.formik.setFieldValue(props.name, "yes");
                    }
                } else {
                    if (props.onChanged) {
                        props.onChanged("no");
                    } else {
                        props.formik.setFieldValue(props.name, "no");
                    }
                }
            } else {
                // number.
                if (checked) {
                    if (props.onChanged) {
                        props.onChanged(1);
                    } else {
                        props.formik.setFieldValue(props.name, 1);
                    }
                } else {
                    if (props.onChanged) {
                        props.onChanged(0);
                    } else {
                        props.formik.setFieldValue(props.name, 0);
                    }
                }
            }
        } else {
            if (props.onChanged) {
                props.onChanged(checked);
            } else if (props.formik) {
                props.formik.setFieldValue(props.name, checked);
            }
        }
    }

    const switchComponent = <Switch disabled={props.disabled} onChange={handleChange} checked={isChecked()} name={props.name}/>;
    return <>
        <IfElseCondition condition={props.label != null}>
            <Form.Group>
                <Form.Label htmlFor={props.name} className={'d-block'}>{props.label}</Form.Label>
                {switchComponent}
            </Form.Group>
            {switchComponent}
        </IfElseCondition>
    </>;
}