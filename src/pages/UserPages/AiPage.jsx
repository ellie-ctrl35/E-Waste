import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './Ai.css';
import uploadIcon from '../../resources/upload.svg'; // Make sure the path is correct

export default function AiPage() {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("Error during image upload: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFile(null);
        setPrediction('');
    };

    return (
        <div className="main">
            <div className='aicontent'>
                <div className='aiheading'>
                    <h1>Upload an image to our AI</h1>
                    <p>Select an image from your gallery</p>
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='aiupload' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className='aiupload-ctn'>
                            <img src={uploadIcon} alt="Upload" />
                            {file ? <p>{file.name}</p> :
                                <div className='aiupload-ctn1'>
                                    <p className='ctn1-p1'>Drag and drop your image here</p>
                                    <p className='ctn1-p2'>OR</p>
                                    <button type='button'>Select from device</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='aibtn'>
                        <button type="button" className='cancelbtn' onClick={handleCancel}>Cancel</button>
                        <button type="submit" className='uploadbtn'>Send Image</button>
                    </div>
                </form>
                <h1 className='aiheadingg'>Prediction results from our AI</h1>
                <div className='results'>
                {prediction &&
                    
                    <div className="prediction">Waste/Garbage Type: {prediction}</div>
                }
                </div>
                {loading && <p>Loading...</p>}
               
            </div>
        </div>
    );
}
