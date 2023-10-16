import axios from 'axios';
import { useState, useEffect } from 'react';
import URL from '../../config';
import BossNavbar from '../bossNavbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BooksStatistic = () => {
    const [fullData, setFullData] = useState([]);

    const fetchData = async () => {
        try {
          const res = await axios.get(`${URL}/reports/byProductRemain`);
          setFullData(res.data);
        } catch (err) {
          alert(err);
        }
      };
      
        useEffect(() => {
          fetchData();
        }, []);

        const data = fullData?.books?.map((item) => ({
            name: item?.title,
            pv: item?.price,
            category: item?.category,
            qty: item?.qty,
            price: item?.price
          }));
        
        const CustomTooltip = ({ active, payload, label }) => {
          if (active && payload && payload.length) {
            return (
              <div className="custom-tooltip">
                <p className="label">
                  {`${label} :`}
                </p>
                <p className="desc">{`category: ${payload[0]?.payload?.category}`}</p>
                <p className="desc">{`quantity: ${payload[0]?.payload?.qty} pcs`}</p>
                <p className="desc">{`price: ${payload[0]?.payload?.price} $`}</p>
              </div>
            );
          }
        
          return '';
        };
    return (
        <div className="container" style={{textAlign: "center"}}>
            <BossNavbar />
          <h2>Books Information</h2>
            <div className="wrapper">
                  <BarChart
                    width={500}
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
        </div>
    );
}
 
export default BooksStatistic;