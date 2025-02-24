export const uploadToCloudinary = async(pics:any)=>{
    const cloud_name="dlecshzrf"
    const upload_preset="multi-vendor"

    if(pics){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch("https://api.cloudinary.com/v1_1/dlecshzrf/upload",{
            method:"POST",
            body:data
        })

        const fileData = await res.json();
        console.log("Cloudinary respose:", fileData);
        
        return fileData.url;
    }
    else{
        console.log("error : pics not found");
        
    }
}