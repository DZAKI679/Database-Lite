import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://tqkbzocqjsvpifwwnetl.supabase.co"

const SUPABASE_KEY = "sb_publishable_WfEffho7lr1dVtoQS4FLcQ_r5V-QCr8"

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



//==============================================================
const fileInput = document.getElementById("fileInput")
const uploadBtn = document.getElementById("uploadBtn")
const fileList = document.getElementById("fileList")
//==============================================================

uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    const { data, error } = await supabase
        .storage
        .from("files")
        .upload(file.name, file);
    

    console.log(data);
    console.log(error);
});

async function loadFiles() {
    const { data, error } = await supabase
        .storage
        .from("files")
        .list();
    console.log(data);
    console.log(error);

    data.forEach(file => {

        if (file.name === ".emptyFolderPlaceholder") {
            return;
        }

        const fileElement = document.createElement("a");

        const { data : urlData } = supabase
            .storage
            .from("files")
            .getPublicUrl(file.name);

        //==
        

        fileElement.textContent = file.name;
        fileElement.href = urlData.publicUrl;
        fileElement.target = "_blank";
        
        fileList.appendChild(fileElement);
    });

}

loadFiles();