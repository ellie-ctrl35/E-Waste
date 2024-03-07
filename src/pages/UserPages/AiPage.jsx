
import './Ai.css';
import upload from '../../resources/upload.svg';



export default function AiPage(){


    return(
        
            <div className="main">

<div className='aicontent'>
    <div className='aiheading'>
        <h1>Upload an image to our AI</h1>
        <p>Select an image from your gallary </p>
    </div>
   <form>
   <div className='aiupload'>
       <div className='aiupload-ctn'>
        <img src={upload} />
        <div className='aiupload-ctn1'>
        <p className='ctn1-p1'>Drag and drop your image here</p>
        <p  className='ctn1-p2'>OR</p>
        <button type='file'>Select from device</button>
        </div>
       </div>
    </div>
    <br></br>
    <div className='aibtn'>
       <button className='cancelbtn'>Cancel</button>
       <button className='uploadbtn'>Send Image</button>
    </div  >
   </form>
    <br></br>
    <br></br>
    <br></br>
       <h1 className='aiheadingg'>Prediction results from our AI</h1>
       <div className='results'>
        <div className="prediction">Waste/Gabage Type:rrrrrrr</div> 
        <p  className="redirect">redirecting </p>
        </div>
</div>   
            </div>
       
    )
}