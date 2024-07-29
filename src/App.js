import './index.css';
import Chart from './Chart';
import UploadData from './UploadData';
import { useData } from './context/ChartContext';

function App() {
  const { chartData } = useData();

  return (
    <div className="container">
      <div className="navigation">
        <div className="note">
          <p>
            <strong> Upload a CSV file. Please note the following before uploading.</strong>
          </p>

          <p>
            1. Your CSV file must have two columns: the first column represents the x-axis, and the second column
            represents the y-axis.
          </p>
          <p> 2. Ensure that all yourpoints are numerical values.</p>
        </div>
        <UploadData />
      </div>
      {chartData && (
        <div className="chart-container">{chartData.length > 0 ? <Chart data={chartData} /> : <>loading...</>}</div>
      )}
    </div>
  );
}

export default App;
