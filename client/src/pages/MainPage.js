import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
const [loading,setLoading]=useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/convert', {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      // Log the response to check its structure
      console.log(response.data);


      setAmountInTargetCurrency(response.data.amountInTargetCurrency);
setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };




  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllCurrencies');
        setCurrencyNames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className='lg:mx-32 text-5xl font-bold text-blue-500'>Convert Your Currencies Today</h1>
      <p className='lg:mx-32 opacity-40 py-6'>
        Welcome to the Currency Converter App - your go-to solution for all currency exchange
        needs! Our intuitive and user-friendly interface ensures that converting currencies
        is as easy as possible, whether you're planning a trip abroad, managing international
        transactions, or keeping an eye on global market trends.
      </p>

      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>
            <div className='mb-8'>
              <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type='date'
                id='date'
                name='date'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder=''
                required
              />

              <label htmlFor='sourceCurrency' className='mt-8 block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                name='sourceCurrency'
                id='sourceCurrency'
                value={sourceCurrency}
              >
                <option value=''>Select the source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>

              <label htmlFor='targetCurrency' className='mt-8 block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                name='targetCurrency'
                id='targetCurrency'
                value={targetCurrency}
              >
                <option value=''>Select the target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>

              <label htmlFor='amountInSourceCurrency' className='mt-8 block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Amount in Source Currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type='number'
                id='amountInSourceCurrency'
                name='amountInSourceCurrency'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Amount in Source Currency'
                required
              />
            </div>

            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              Get your Target Currency
            </button>
          </form>
        </section>
      </div>
     {!loading?(
     <section className='mt-5 lg:mx-32 text-5xl '>
     {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "}
   <span className='text-blue-500 font-bold'> {amountInTargetCurrency} </span>{" "}  in {currencyNames[targetCurrency]}
    </section>
      
     ):null}

      </div>
    
  );
}