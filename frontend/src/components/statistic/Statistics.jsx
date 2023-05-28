import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Statistics({ cars, type }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  let data = [];
  let time = [];

  if(type === "months") {
    const carQuantityByMonth = Array(12).fill(0);

    cars.forEach(car => {
      const registrationDate = new Date(car.least_recently_registered);
      const registrationMonth = registrationDate.getMonth();
      const registrationYear = registrationDate.getFullYear();

      if (registrationYear === 2022) {
        carQuantityByMonth[registrationMonth] += 1;
      }
    });
    data = carQuantityByMonth;
    time = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(data);
  } else if (type === "quarter") {
    const carQuantityByQuarter = Array(4).fill(0);

    cars.forEach(car => {
      const registrationDate = new Date(car.least_recently_registered);
      const registrationMonth = registrationDate.getMonth();
      const registrationYear = registrationDate.getFullYear();
      const registrationQuarter = Math.floor(registrationMonth / 3);

      if (registrationYear === 2022) {
        carQuantityByQuarter[registrationQuarter] += 1;
      }
    });
    data = carQuantityByQuarter;
    time =['Quarter_1', 'Quarter_2', 'Quarter_3', 'Quarter_4'];
    console.log(data);
  } else {
    const carQuantityByYear = {};
    const years = [];

    cars.forEach((car) => {
      const registrationDate = new Date(car.least_recently_registered);
      const registrationYear = registrationDate.getFullYear();

      if (!carQuantityByYear[registrationYear]) {
        carQuantityByYear[registrationYear] = 0;
        years.push(registrationYear);
      }

      carQuantityByYear[registrationYear] += 1;
    });

    years.sort((a, b) => a - b); // Sort years in ascending order

    data = years.map((year) => carQuantityByYear[year]);
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'số lượng xe đăng ký',
          data: data,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [data]);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default Statistics;
