import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts'

export const Stats = () => {

  let navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [counts, setCounts] = useState([]);

  const getSkills = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/visualization/user/fetchtopskills', {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      // Assuming the API response is an array of objects with 'skill' and 'count' properties
      setSkills(response.data.map(item => item.skill));
      setCounts(response.data.map(item => item.count));
    } catch (error) {
      console.error("Error fetching Internship:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getSkills();
    } else {
      navigate("/Front");
    }
  }, [getSkills, navigate]);


  return (
    <div className='d-flex justify-content-evenly' style={{marginTop : "8vw"}}>
        <Chart type='bar' width={750} height={500}
        series = {
            [
                {
                    name: "Top Demanded Skills",
                    data: counts
                }
            ]
        }

        options = {{
            title:{text:"Top Demanded Skills",
            style:{fontSize: "30", color:"white"}
            },
            colors: ['#f90000'],
            theme:{mode: 'dark'},
            
            xaxis: {tickPlacement: "on",
                categories: skills,
                title:{text:"Skills",
                style:{fontSize: "30", color:"white"}
            },
        },
        yaxis: {
                title:{text:"Skills Count",
                style:{fontSize: "30", color:"white"}
            }
            }
        }}

        ></Chart>
        {/* <Chart type='line' width={750} height={500} 
        series = {
            [
                {
                    name: "Top Demanded Skills",
                    data: counts
                }
            ]
        }

        options = {{
            title:{text:"Top Demanded Skills",
            style:{fontSize: "30"}
            },
            colors: ['#f90000'],
            // theme:{mode: 'light'}
            
            xaxis: {
              tickPlacement: "on",
                categories: skills,
                title:{text:"Skills",
                style:{fontSize: "30"}
            },
        },
        yaxis: {
                title:{text:"Skills Count",
                style:{fontSize: "30"}
            }
            }
        }}

        ></Chart> */}
    </div>
  )
};