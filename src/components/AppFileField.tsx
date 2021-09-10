import {Form} from "react-bootstrap";
import {IfCondition, IfElseCondition} from "react-ifloop-ts";

interface Props {
    showLabel?: boolean;
    name: string;
    formik?: any,
    label?: string;
    placeholder: string,
    block?: boolean;
    onFilePicked: (file: any) => void,
    file: any
}

export default function AppFileField(props: Props) {
    const isBlock = props.block ?? true;
    const showLabel = props.showLabel ?? true;
    const hasFormik = props.hasOwnProperty('formik');
    const formControl = <Form.Control className={'form-control'} placeholder={props.placeholder} id={props.name} type={'file'} name={props.name}
                                      value={props.file} onChange={(e) => {
        const target: any = e.target;
        props.onFilePicked(target.files[0]);
    }
    }/>;
    return (
        <Form.Group>
            <IfCondition condition={showLabel}>{props.label || props.placeholder}</IfCondition>
            <IfElseCondition condition={isBlock}>
                <div className="col-xs-12">
                    {formControl}
                </div>
                {formControl}
            </IfElseCondition>
            <IfCondition condition={hasFormik}>
                <Form.Text className={"text-danger"}>{props['formik']?.errors[props.name]}</Form.Text>
            </IfCondition>
        </Form.Group>
    );
}