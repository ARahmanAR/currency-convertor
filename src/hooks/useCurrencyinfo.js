import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const code = currency?.toLowerCase();
        if (!code) return;

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code}.json`)
            .then((res) => res.json())
            .then((res) => setData(res?.[code] ?? {}))
            .catch(() => setData({}));
        }, [currency])

    return data;
}
export default useCurrencyInfo;