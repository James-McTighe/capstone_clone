import { useState, useEffect } from 'react';
import fetchData from '../services/apiClient'

function InitialInput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedConditionsFile, setSelectedConditionsFile] = useState(null);
  // Matches the source app's two data paths: ChemStation HPLC or processed data.
  const [sourceIsPreProcessed, setSourceIsPreProcessed] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  // Prevents duplicate requests while the selected file is being uploaded.
  const [isUploading, setIsUploading] = useState(false);
  const [readyForUpload, setReadyForUpload] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0] || null);
    setStatusMessage('');
  };

  const onFileUpload = async () => {
    if (!selectedFile || !selectedConditionsFile) return;

    const formData = new FormData();
    // The field name must match the FastAPI alias and the original Flask route.
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    formData.append(
      "conditionsFile",
      selectedConditionsFile,
      selectedConditionsFile.name
    );
    setStatusMessage('Uploading file...');
    setIsUploading(true);

    console.log('reached the target')

    try {
      const response = fetchData('/uploadfile', {
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
        // The backend uses this value to validate the permitted extension.
        params: { source: sourceIsPreProcessed },
      })
      setStatusMessage(`Processed ${response.data.rows} rows successfully.`);
    } catch (error) {
      setStatusMessage(
        error.response?.data?.detail || 'Upload failed. Check the server logs.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
          <h3 className="text-base font-semibold text-gray-800 mb-2">File Details:</h3>
          <p><span className="font-medium text-gray-700">File Name:</span> {selectedFile.name}</p>
          <p><span className="font-medium text-gray-700">File Type:</span> {selectedFile.type || 'Unknown'}</p>
          {selectedFile.lastModifiedDate && (
            <p>
              <span className="font-medium text-gray-700">Last Modified:</span>{' '}
              {selectedFile.lastModifiedDate.toDateString()}
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className="mt-6 text-center text-sm text-gray-500 italic">
          <h4>Choose a file before pressing the Upload button</h4>
        </div>
      );
    }
  };

  useEffect(() => {
    if (sourceIsPreProcessed){
      if (selectedFile && !isUploading) {
        setReadyForUpload(true);
      } else {
        setReadyForUpload(false)
      }
    } else {
      if (selectedFile && selectedConditionsFile && !isUploading){
        setReadyForUpload(true);
      } else {
        setReadyForUpload(false)
      }
    }
  }, [sourceIsPreProcessed, isUploading, selectedFile, selectedConditionsFile])
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
      <header className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">File Upload</h3>
        <p className="text-sm text-gray-500 mt-1">Upload processed or pre-processed data here.</p>
      </header>

      <div className="space-y-4">
        <label className="flex gap-2" role="group" aria-label="File type">
          {/* These choices mirror the upload types supported by Kinetics.py. */}
          <button
            type="button"
            onClick={() => setSourceIsPreProcessed(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${sourceIsPreProcessed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pre-processed Data (.xlsx)
          </button>
          <button
            type="button"
            onClick={() => setSourceIsPreProcessed(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${!sourceIsPreProcessed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            HPLC Data (.xlsx)
          </button>
        </label>

        <label className="flex flex-col items-center justify-center w-full">
          <div className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-200">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">
              {selectedFile ? 'Change file' : 'Select a file'}
            </span>
            <input
              type="file"
              className="hidden"
              // Restrict the picker to the formats accepted for the selected source.
              accept={!sourceIsPreProcessed ? '.xlsx,.xls' : '.csv,.xlsx,.xls'}
              onChange={onFileChange}
            />
          </div>
        </label>

        {!sourceIsPreProcessed && <label
          className="w-full flex flex-col items-center px-4 py-4 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-200"

        >
          <span className="text-sm text-gray-600 font-medium">
            {selectedConditionsFile ? selectedConditionsFile.name : 'Select conditions file'}
          </span>
          <input
            type="file"
            className="hidden"
            accept=".csv,.xlsx,.xls,.xlsm"
            onChange={(event) => setSelectedConditionsFile(event.target.files[0] || null)}
          />
        </label>}

        <button
          onClick={onFileUpload}
          disabled={readyForUpload}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white shadow transition duration-200 
            ${readyForUpload
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {statusMessage && (
        <p className="mt-4 text-center text-sm text-gray-600">{statusMessage}</p>
      )}

      {fileData()}
    </div>
  );
}

export default InitialInput;
