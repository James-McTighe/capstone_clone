
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';
const createPlot = createPlotlyComponent.default || createPlotlyComponent;
const Plot = createPlot(Plotly);

function Foobar() {
  return (
    <>
      <div className='border-amber-500 border-4 mx-4 rounded-md'>
        <Plot
          data={[
            {
              // x: [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18],
              // y: [32, 37, 40.5, 43, 49, 54, 59, 63.5, 69.5, 73, 74],
              x: ["January", "February", "March"],
              y: [1, 2, 4],
              mode: "bar",
              type: "bar",
            },
          ]}
          layout={{
            title: "Growth Rate in Boys",
            xaxis: { title: "Age (years)" },
            yaxis: { title: "Height (inches)" },
          }}
        />
      </div>
    </>
  )
}

export default Foobar;
