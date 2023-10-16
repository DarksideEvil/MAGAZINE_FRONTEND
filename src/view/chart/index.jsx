import './style.css';
import axios from 'axios';
import URL from '../../config';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BossNavbar from '../../component/bossNavbar';

export default function Statistics () {
const [fullData, setFullData] = useState([]);
const state = fullData[fullData.length - 1];

const fetchData = async () => {
  try {
    const res = await axios.get(`${URL}/reports/byExpensePenny`);
    setFullData(res.data);
  } catch (err) {
    alert(err);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const data = fullData.map((item) => ({
    name: item?.title,
    pv: item?.total,
    category: item?.category,
    type: item?.type,
    qty: item?.qty
  }));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          {`${label} :`}
        </p>
        <p className="label">
          {`total selling price: ${payload[0].value} $`}
        </p>
        <p className="desc">{`category: ${payload[0]?.payload?.category}`}</p>
        <p className="desc">{`type: ${payload[0]?.payload?.type}`}</p>
        <p className="desc">{`quantity: ${payload[0]?.payload?.qty} pcs`}</p>
      </div>
    );
  }
  return '';
};

    return (
        <div className='container' style={{textAlign: "center"}}>
            <BossNavbar />
          <h2>Sales Statistics</h2>
            <div className="wrapper">
                  <BarChart
                    width={800}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                  </BarChart>
            </div>
            <h2 className='pt-4'>{`SoldOut: ${state?.totalPrice} $`}</h2>
        </div>
    );
};