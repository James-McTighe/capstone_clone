import api from '../api/axios';
import { useState } from 'react';

function InitialInput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    console.log('Uploading file:', selectedFile.name);
    setStatusMessage('Uploading file...');

    api.post("/uploadfile", formData)
      .then((response) => {
        console.log('Upload response:', response.data);
        setStatusMessage(`Uploaded: ${response.data.filename}`);
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        setStatusMessage('Upload failed. Check the server logs.');
      });
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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
      <header className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">File Upload</h3>
        <p className="text-sm text-gray-500 mt-1">Upload files securely via React</p>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-200">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">
              {selectedFile ? 'Change file' : 'Select a file'}
            </span>
            <input 
              type="file" 
              className="hidden" 
              onChange={onFileChange} 
            />
          </label>
        </div>

        <button 
          onClick={onFileUpload}
          disabled={!selectedFile}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white shadow transition duration-200 
            ${selectedFile 
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Upload!
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
