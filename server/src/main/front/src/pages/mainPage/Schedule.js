

const Schedule = () => {
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri']; // 월요일부터 금요일까지
  const scheduleData = [
    {
      'lecture': '알고리즘',
      'date': 'mon',
      'time': '7-8'
    },
    {
      'lecture': '자료구조',
      'date': 'fri',
      'time': '2-3M'
    }
  ];
  
  return (
    <div>
      <h2>주간 시간표</h2>
      <table>
        <thead>
          <tr>
            <th>요일</th>
            <th>시간</th>
            <th>과목</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map(day => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                {scheduleData
                  .filter(item => item.date === day)
                  .map(item => (
                    <div key={item.lecture}>
                      {item.time.replace('M', ':30')} -{' '}
                      {parseInt(item.time.split('-')[1]) + (item.time.includes('M') ? 0.5 : 0)}:00
                    </div>
                  ))}
              </td>
              <td>
                {scheduleData
                  .filter(item => item.date === day)
                  .map(item => item.lecture)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;