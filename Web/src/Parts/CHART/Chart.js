import React, { PureComponent } from 'react';
import { Area,AreaChart, PieChart, Pie,LineChart,Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function TwoPieChart({ALL,PENSONAL,THIS}){
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie data={THIS} dataKey="value" cx="50%" cy="50%" strokeWidth={'2'} outerRadius={40} fill="rgb(179, 112, 255)" />
            
            <Pie data={PENSONAL} dataKey="value" cx="50%" cy="50%" strokeWidth={'2'} innerRadius={50} outerRadius={65} fill="rgb(130, 202, 157)"  />
            <Pie data={ALL} dataKey="value" cx="50%" cy="50%" strokeWidth={'2'}  innerRadius={75} outerRadius={90} fill="rgb(255, 198, 88)" label labelLine />
          </PieChart>
        </ResponsiveContainer>
      );
  }
export function SimpleLineChart({Data}) {

  
    return (
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={300}
          data={Data}
          margin={{
            top: 15,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          
          <Area type="monotone" dataKey="G" stackId="1" strokeWidth={'2'} stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey="P" stackId="2" strokeWidth={'2'} stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="Current" stackId="3" strokeWidth={'2'} stroke="#b370ff" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
}
