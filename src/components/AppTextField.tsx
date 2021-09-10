import {Form} from "react-bootstrap";
import {IfCondition, IfElseCondition} from "react-ifloop-ts";

interface Props {
    showLabel?: boolean;
    type: string;
    name: string;
    formik: any,
    label?: string;
    placeholder: string,
    block?: boolean;
    as?: string;
    rows?: number;
}

export default function AppTextField(props: Props) {
    const isBlock = props.block ?? true;
    const showLabel = props.showLabel ?? true;

    const formControl = <Form.Control placeholder={props.placeholder} id={props.name} type={props.type} name={props.name}
                                      {...props.formik.getFieldProps(props.name)} as={props.as} rows={props.rows}/>;
    return (
        <Form.Group>
            <IfCondition condition={showLabel}>
                <Form.Label htmlFor={props.name}>{props.label || props.placeholder}</Form.Label>
            </IfCondition>
            <IfElseCondition condition={isBlock}>
                <div className="col-xs-12">
                    {formControl}
                </div>
                {formControl}
            </IfElseCondition>
            <IfCondition condition={props.formik.errors[props.name] != null}>
                <Form.Text className={"text-danger"}>{props.formik.errors[props.name]}</Form.Text>
            </IfCondition>
        </Form.Group>
    );
}