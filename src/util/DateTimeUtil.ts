import moment from "moment";

export default class DateTimeUtil {


    static format(date: any, format = "YYYY-MM-DD") {
        return moment(date).format(format);
    }
}