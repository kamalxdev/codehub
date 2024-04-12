import { memo } from "react";




function CreateBucket() {
    return (
        <div>
            <h1 className=" font-bold text-xl">Create Bucket</h1>
            <input type="text" placeholder="bucket name" className="border border-black"/>
            <select className="border border-black">
                <option value="Node">Node</option>
                <option value="Python">Python</option>
            </select>
            <button type="button" className="border border-black">Create</button>
        </div>
    );
    
}


export default memo(CreateBucket);