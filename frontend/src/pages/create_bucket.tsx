import { memo, useState } from "react";




function CreateBucket() {
    const [bucket, setbucket] = useState({name:"", server:"Node"})
    console.log("Bucket: ",bucket);
    
    return (
        <div>
            <h1 className=" font-bold text-xl">Create Bucket</h1>
            <input type="text" placeholder="bucket name" onChange={(e)=>setbucket({...bucket, name:e.target.value})} className="border border-black"/>
            <select className="border border-black" onChange={(e)=>setbucket({...bucket, server:e.target.value})}>
                <option value="Node">Node</option>
                <option value="Python">Python</option>
                <option value="React">React</option>
            </select>
            <button type="button" className="border border-black">Create</button>
        </div>
    );
    
}


export default memo(CreateBucket);