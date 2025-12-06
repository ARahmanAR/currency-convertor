import React, {useId}  from 'react'


function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
   const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-slate-100/80 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id ={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-white placeholder:text-slate-200/60"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(event) => onAmountChange && onAmountChange(Number(event.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-slate-100/75 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100/90 cursor-pointer outline-none text-slate-900"
                    value={selectedCurrency}
                    onChange={(event) => onCurrencyChange && onCurrencyChange(event.target.value)}
                    disabled={currencyDisabled}
                >
                    
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
