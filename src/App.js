import './index.css';
import Chart from './Chart';
import UploadData from './UploadData';
import { useData } from './context/ChartContext';

function App() {
  const { chartData } = useData();

  return (
    <div className="container">
      <div className="navigation">
        <p>
          be sure that first column of your csv is x(vertical) axis and second is y(horizental) axis and it must be csv
          file
        </p>
        <UploadData />
      </div>
      {chartData && (
        <div className="chart">
          <Chart data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
