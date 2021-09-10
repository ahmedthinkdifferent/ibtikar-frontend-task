import {useState} from "react";

export default function useComponentState(state: any) {
    const [hookState, setHookState] = useState(state);
    return new ComponentState(hookState, setHookState);
}

class ComponentState {

    constructor(private _value: any, private _setValue: any) {
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._setValue(value);
    }

    reverseValue() {
        this.value = (oldVal: boolean) => {
            return !oldVal;
        };
    }

    getVal(){
        return this._value;
    }
}
