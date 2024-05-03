import styles from "./QuizScoreBar.module.css"
import { ResponsiveBar } from '@nivo/bar'

const QuizScoreBar = ({ data /* see data tab */ }) => {
  console.log(data)
  return (
    <ResponsiveBar
      data={data}
      keys={[
        'score',
      ]}
      indexBy="quizName"
      margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
      padding={0.5}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.6
          ]
        ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
      }}
      axisLeft={null}
      enableGridY={false}
      enableLabel={false}
      enableTotals={true}
      labelTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            '3'
          ]
        ]
      }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
    />
  );
}

export default QuizScoreBar;