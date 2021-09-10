export default class ArrayUtil {

    static removeAtIndex(array: [], index: number, copyArray: boolean = false, numberOfRemoves: number = 1): [] {
        array.splice(index, numberOfRemoves);
        if (copyArray) {
            return [...array];
        }
        return array;
    }

    static removeAndClone(array: [], index: number, numberOfRemoves: number = 1) {
        return ArrayUtil.removeAtIndex(array, index, true, numberOfRemoves);
    }
}