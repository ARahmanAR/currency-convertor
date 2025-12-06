import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyinfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('bdt')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = () => {
    const rate = currencyInfo?.[to]
    if (!rate) return
    setConvertedAmount((amount * rate).toFixed(2))
  }
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-scene">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(123, 31, 162, 0.38), rgba(99, 102, 241, 0.32), rgba(192, 38, 211, 0.3)), linear-gradient(115deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0)), url('https://images.unsplash.com/photo-1445540101160-1b2710c062e7?auto=format&fit=crop&w=2000&q=80&sat=-35&exp=-5')`,
          backgroundBlendMode: 'screen, lighten, normal',
        }}
      />
      <div className="background-grid" />
      <div className="currency-layer" aria-hidden />
      <div className="glow-blob glow-1" />
      <div className="glow-blob glow-2" />
      <div className="glow-blob glow-3" />
      <div className="relative z-10 w-full min-h-screen flex flex-wrap justify-center items-center px-4 py-10">
        <div className="w-full max-w-md mx-auto glass-card border border-white/15 rounded-2xl p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();

            }}
          >
            <div className="w-full mb-3">
              <InputBox
                label="From"
                amount={amount}
                className="glass-input"
                currencyOptions={options}
                onAmountChange={(amt) => setAmount(amt)}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectedCurrency={from}

              />
            </div>
            <div className="relative w-full h-0.5 my-2">
              <button
                type="button"
                className="swap-btn absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-3 mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                className="glass-input"
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled={true}
              />
            </div>
            <button type="submit" className="neon-button w-full">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
