import {Form} from "react-bootstrap";
import Select from "react-select";
import {IfCondition} from "react-ifloop-ts";

interface Value {
    label: string;
    value: any;
}

interface Props {
    label?: string;
    values: Value[],
    selectedValue: any;
    onChange?: (value: any) => void;
    formik?: any;
    name: string;
}

export default function AppSingleSelect(props: Props) {

    function getValue() {
        return props.values.find((value, index, obj) => {
            return value.value === props.selectedValue;
        })
    }

    const select = <Select
        name={props.name}
        value={getValue()}
        onChange={(value: any) => {
            if (props.onChange) {
                props.onChange(value.value);
            } else if (props.formik) {
                props.formik.setFieldValue(props.name, value.value);
            }
        }
        }
        options={props.values}
    />;

    return <>
        <IfCondition condition={props.label != null}>
            <Form.Group>
                <Form.Label>{props.label}</Form.Label>
                {select}
                <IfCondition condition={props.formik != null}>
                    <Form.Text className={"text-danger"}>{props['formik']?.errors[props.name]}</Form.Text>
                </IfCondition>
            </Form.Group>


        </IfCondition>
        <IfCondition condition={props.label == null}>
            {select}
            <IfCondition condition={props.formik != null}>
                <Form.Text className={"text-danger"}>{props['formik']?.errors[props.name]}</Form.Text>
            </IfCondition>
        </IfCondition>
    </>
}