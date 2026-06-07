
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';
const createPlot = createPlotlyComponent.default || createPlotlyComponent;
const Plot = createPlot(Plotly);

function Foobar() {
  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18],
            y: [1, 2, 10, 13, 20, 22, 59, 24, 20, 10, 0],
            // x: ["January", "February", "March"],
            // y: [1, 2, 4],
            mode: "lines+markers",
            type: "scatter",
          },
        ]}
        layout={{
          title: { text: "Concentration at Timepoints" },
          xaxis: { title: { text: "Timepoint" } },
          yaxis: { title: { text: "Peak AP" } },
        }}
      />
    </>
  )
}

export default Foobar;
