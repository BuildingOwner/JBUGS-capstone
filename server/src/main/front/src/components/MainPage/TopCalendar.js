import backgroundImg1 from '../../image/college.jpg';

export const TopCalendar = () => {
  return (
    <div id="calendarBG" style={{ backgroundImage: `url(${backgroundImg1})` }}>
      <div className="calendar"></div>
    </div>
  );
};
