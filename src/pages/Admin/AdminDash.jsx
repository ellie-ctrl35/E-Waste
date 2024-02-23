import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import'./admin.css';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
import '../../App.css';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import { PieChart, Pie, Sector,Cell,  } from 'recharts';
import AdminNavbar from '../../components/AdminNavbar';




// Define the data and renderActiveShape function here or import them
const data = [
    { name: 'JANUARY', value: 400 },
    { name: 'FEBUARY', value: 300 },
    { name: 'MARCH', value: 300 },
    { name: 'APRIL', value: 200 },
    { name: 'MAY', value: 200 },
    { name: 'JUNE', value: 200 },
    { name: 'JULY', value: 200 },
    { name: 'AUGUST', value: 200 },
    { name: 'SEPTEMBER', value: 200 },
    { name: 'OCTOBER', value: 200 },
    { name: 'NOVEMBER', value: 200 },
    { name: 'DECEMBER', value: 200 },
  ];

  const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" style={{ fontSize: '14px' }}>
                {payload.value}
            </text>
        </g>
    );
};
  const dataa = [
    { name: '1', uv: 300,  },
    { name: '2', uv: 145,  },
    { name: '3', uv: 100,  },
    { name: '4', uv: 8,  },
    { name: '5', uv: 100,  },
    { name: '6', uv: 9,  },
    { name: '7', uv: 53,  },
    { name: '8', uv: 252, },
    { name: '9', uv: 79,  },
    { name: '10', uv: 294,  },
    { name: '12', uv: 43, },
    { name: '13', uv: 74, },
    { name: '14', uv: 71,  },
    { name: '15', uv: 117, },
    { name: '16', uv: 186,  },
    { name: '17', uv: 16,  },
    { name: '18', uv: 125,  },
    { name: '19', uv: 222,  },
    { name: '20', uv: 372, },
    { name: '21', uv: 182,  },
    { name: '22', uv: 164,  },
    { name: '23', uv: 316,  },
    { name: '24', uv: 131,  },
    { name: '25', uv: 291, },
    { name: '26', uv: 47,  },
    { name: '27', uv: 415,  },
    { name: '28', uv: 182, },
    { name: '29', uv: 93,  },
    { name: '30', uv: 99, },
    { name: '31', uv: 52, },
  
  ];
  const COLORS = [
    '#000000', // Pure black
    '#0A0A0A', // Very dark gray (almost black)
    '#141414', // Darker gray
    '#1E1E1E', // Dark gray
    '#282828', // Slightly lighter dark gray
    '#323232', // Medium dark gray
    '#3C3C3C', // Neutral dark gray
    '#464646', // Slightly brighter dark gray
    '#505050', // Bright dark gray
    '#5A5A5A', // Lighter dark gray
    '#646464', // Slightly dim gray
    '#6E6E6E'  // Dim gray
  ];
  
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 500}
        outerRadius={outerRadius + 30}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />

      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
  {value} {/* Removed PV and used value directly */}
</text>
<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
  {(percent * 100).toFixed(2)}% {/* Removed Rate and formatted percent */}
</text>

    </g>
  );
};

function AdminDash() {
    const [requests, setRequests] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // State for active index in PieChart
    const {register,userInfo}= useContext(AuthContext);
    const Username = userInfo.username;
   
 

    

    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    };

    return (
        <div className='App'>
            <AdminNavbar />
            <div className='right-side'>
            <br></br>

            <br></br>
            <br></br>
          
            <ResponsiveContainer width={1000} height={250} >
                  
                    
                        
                  <BarChart
                      width={1000}
                      height={300}
                      data={dataa}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}
                  >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
                      <YAxis tick={{ fontSize: 14 }} />
                      <Tooltip />
                      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                      <ReferenceLine y={0} stroke="#000" />
                      <Brush dataKey="name" height={30} stroke="#8884d8" />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
 
 
 
   
  </ResponsiveContainer>
  <ResponsiveContainer width={5000} height={300}  className="downpart">
   <div className='sideside'>
    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
     
     </div>                                                                                                                                                                                                                                                            
             
  <PieChart  >
 
 <Pie
 activeIndex={activeIndex}
 activeShape={renderActiveShape}
 data={data}
 cx="50%"
 cy="50%"
 innerRadius={60}
 outerRadius={80}
 fill="#8884d8"
 dataKey="value"
 onMouseEnter={onPieEnter}
 >
 {data.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
 
 ))}
 </Pie>
 </PieChart>
 </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AdminDash;