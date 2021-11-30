import { useEffect, useState } from "react";

export default function Home() {

  const [startMonth, setStartMonth] = useState('April');
  const [regFee, setRegFee] = useState(45);
  const [annualFee, setAnnualFee] = useState(290);
  const [tmMonths, setTmMonths] = useState(['January']);

  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
  ];

  useEffect(() => {
    renderTable(startMonth);
  },[])

  const renderTable = (month) => {
    const monthIndex = months.indexOf(month);

    let currentIndex = monthIndex;

    let _tmMonths = [];

    for (let i = 0; i < 12; i++) {
      _tmMonths.push(months[currentIndex]);

      currentIndex += 1;

      if (currentIndex === 12) currentIndex = 0;
    }

    setTmMonths(_tmMonths);
  }

  const handleChange = e => {
    const _month = e.target.value; 

    setStartMonth(_month);

    renderTable(_month);
  }

  const calculateAnnualFee = (index) => {
    return (((12-index)/12)*annualFee);
  }


  return (
    <div className="container mx-auto my-24 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">TM Fee Calculator</h1>
      <div className="flex flex-col gap-2">
        <label>Start Month</label>
        <select className="py-2 px-4 border border-gray-400" value={startMonth} onChange={handleChange}>
          {months.map(month => <option key={month} value={month}>{month}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label>Registration Fee</label>
        <input type="text" className="py-2 px-4 border border-gray-400" value={regFee} onChange={e => setRegFee(Number(e.target.value))}/>
      </div>
      <div className="flex flex-col gap-2">
        <label>Annual Fee</label>
        <input type="text" className="py-2 px-4 border border-gray-400" value={annualFee} onChange={e => setAnnualFee(Number(e.target.value))}/>
      </div>

      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Month
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registration Fee
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Annual Fee
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {tmMonths.map((month, monthIndex) => (
              <tr key={month} className={monthIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{regFee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateAnnualFee(monthIndex)?.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(calculateAnnualFee(monthIndex) + regFee)?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
