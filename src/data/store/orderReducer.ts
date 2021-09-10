import {ActionNames} from "./ActionNames";

export function orderReducer(state = {productsCount: 0, products: []}, action: any) {
    switch (action.type) {
        case ActionNames.INCREASE_PRODUCT:
            return increaseProduct(state, action.payload);
        case ActionNames.DECREASE_PRODUCT:
            return decreaseProduct(state, action.payload);
        case ActionNames.CLEAR_BASKET:
            return {productsCount: 0, products: []};
        default:
            return state
    }
}

function increaseProduct(state: any, product: any) {
    const newState = Object.assign({}, state);
    newState.productsCount += 1;
    let storeProduct = state.products.find((p: any) => {
        return p.id === product.id;
    });
    if (storeProduct) {
        // exists in store.
        storeProduct.requiredQuantity += 1;
        storeProduct.totalPrice = (storeProduct.requiredQuantity * storeProduct.price);
    } else {
        // not exists before.
        storeProduct = Object.assign({}, product);
        storeProduct.requiredQuantity = 1;
        storeProduct.totalPrice = (storeProduct.requiredQuantity * storeProduct.price);
        newState.products.push(storeProduct);
    }
    return newState;
}

function decreaseProduct(state: any, product: any) {
    const newState = Object.assign({}, state);
    newState.productsCount -= 1;
    let storeProduct = state.products.find((p: any) => {
        return p.id === product.id;
    });
    if (storeProduct) {
        // exists in store.
        storeProduct.requiredQuantity -= 1;
        storeProduct.totalPrice = (storeProduct.requiredQuantity * storeProduct.price);
        if (storeProduct.requiredQuantity === 0) {
            const index = newState.products.findIndex((p: any) => p.id === storeProduct.id);
            newState.products.splice(index, 1);
        }
    }
    return newState;
}