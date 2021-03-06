import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import {useMemo} from "react";

export default function useQueryParams() {
    const location = useLocation();
    return useMemo(() => {
        return queryString.parse(location.search);
    }, [location.search]);
}