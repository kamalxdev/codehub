import axios from "axios";

import { Request, Response } from "express";


import crypto from "crypto";






const keyID = process.env.BLACKBLAZE_KEY_ID as string;
const applicationKey = process.env.BLACKBLAZE_APPLICATION_KEY as string;
const apiURL = "https://api005.backblazeb2.com";
const backblazeContentBucketID = process.env.BLACKBLAZE_CONTENT_BUCKETID as string;






// to authorize backblaze whic returns the accountAuthorizationToken


async function handlegetBackblazeAuthorization(req: Request, res: Response) {
  await axios
    .get(`${apiURL}/b2api/v2/b2_authorize_account`, {
      headers: {
        Authorization: `Basic ${btoa(`${keyID}:${applicationKey}`)}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      let data = response.data;
      return res.json({ message: "Authorized Backblaze", data, status: 200 });
    })
    .catch((err) => {
      console.log("error", err);
      return res.json({
        message: "Error on authorizing backblaze",
        status: 400,
      });
    });
}





// to upload file to backblaze which returns the file uploaded data


async function handlegetBackblazeUploadFile(req: Request, res: Response){
  const body = req.body;


  if (!body.fileName || !body.fileData || !body.accountAuthorizationToken) {
    return res.json({ message: "Please enter all fields", status: 400 });
  }

  // creating sha1 hash of the file data
  let hash = crypto.createHash("sha1");


  // to get the upload url from backblaze
  await axios.get(`${apiURL}/b2api/v2/b2_get_upload_url?bucketId=${backblazeContentBucketID}`, {
    headers: {
      Authorization: body?.accountAuthorizationToken,
      "Content-Type": "application/json",
    },
  }).then(async (response) => {


    let uploadURLData = response?.data;
    let contentsha1 = hash.update(body?.fileData).digest("hex");

    // to upload the file to backblaze
    await axios.post(uploadURLData?.uploadUrl,body?.fileData, {
      headers:{
        Authorization: uploadURLData?.authorizationToken,
        "Content-Type": "b2/x-auto",
        "X-Bz-File-Name": body.fileName,
        "X-Bz-Content-Sha1": contentsha1,
        "Content-Length":body?.fileData?.length
      }
    }).then((response) => {
      let data = response.data;
      return res.json({ message: "file uploaded successfully", data, status: 200 });
    }).catch((err) => {
      console.log("error", err);
      return res.json({ message: "Error on uploading file", status: 400 });
    });

  }).catch((err) => {
    console.log("error", err);
    return res.json({ message: "Error on getting upload url", status: 400 });
  });


}













export { handlegetBackblazeAuthorization,handlegetBackblazeUploadFile };
