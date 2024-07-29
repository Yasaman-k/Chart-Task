import { useRef } from 'react';
import { useData } from './context/ChartContext';

const UploadData = () => {
  const { setChartData } = useData();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    setChartData([]);
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const jsonData = csvToJson(contents);
        setChartData(jsonData);
      };
      reader.readAsText(uploadedFile);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      const pointValues = Object.values(obj);
      const cleanArr = pointValues.map((item) => {
        // Remove any double quotes, carriage returns, newline characters, and trim whitespace
        const cleanedItem = item.replace(/["\r\n]/g, '').trim();
        // Convert to number if applicable
        try {
          if (isNaN(cleanedItem)) {
            setChartData(null);
            throw new Error('points must be a number');
          } else {
            return Number(cleanedItem);
          }
        } catch (error) {
          alert(error.message);
          throw error;
        }
      });
      const cleanedData = { X: cleanArr[0], Y: cleanArr[1] };
      result.push(cleanedData);
    }
    return result;
  };

  return (
    <>
      <input type="file" id="fileToUpload" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} />
    </>
  );
};
export default UploadData;
