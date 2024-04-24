import axios from "axios";

import { Request, Response } from "express";

import crypto from "crypto";

import { PrismaClient } from "@prisma/client";
import { ifileinfo } from "../types/fileInfo";

const prisma = new PrismaClient();

const keyID = process.env.BLACKBLAZE_KEY_ID as string;
const applicationKey = process.env.BLACKBLAZE_APPLICATION_KEY as string;
const apiURL = "https://api005.backblazeb2.com";
const backblazeContentBucketID = process.env
  .BLACKBLAZE_CONTENT_BUCKETID as string;
const backblazeDestinationBucketID = process.env
  .BLACKBLAZE_DESTINATION_BUCKETID as string;

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

async function handlegetBackblazeUploadFile(req: Request, res: Response) {
  const body = req.body;

  if (!body.fileName || !body.fileData || !body.accountAuthorizationToken) {
    return res.json({ message: "Please enter all fields", status: 400 });
  }
  // creating sha1 hash of the file data
  let hash = crypto.createHash("sha1");

  // to get the upload url from backblaze
  await axios
    .get(
      `${apiURL}/b2api/v2/b2_get_upload_url?bucketId=${backblazeContentBucketID}`,
      {
        headers: {
          Authorization: body?.accountAuthorizationToken,
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      let uploadURLData = response?.data;
      let contentsha1 = hash.update(body?.fileData).digest("hex");

      // to upload the file to backblaze
      await axios
        .post(uploadURLData?.uploadUrl, body?.fileData, {
          headers: {
            Authorization: uploadURLData?.authorizationToken,
            "Content-Type": "b2/x-auto",
            "X-Bz-File-Name": body.fileName,
            "X-Bz-Content-Sha1": contentsha1,
            "Content-Length": body?.fileData?.length,
          },
        })
        .then((response) => {
          let data = response.data;
          return res.json({
            message: "file uploaded successfully",
            data,
            status: 200,
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.json({ message: "Error on uploading file", status: 400 });
        });
    })
    .catch((err) => {
      console.log("error", err);
      return res.json({ message: "Error on getting upload url", status: 400 });
    });
}

// to create a folder in blacblaze which here we say bucket and copy base files of the server
async function handlegetBackblazeCreateServer(req: Request, res: Response) {
  const body = req.body;

  if (
    !body.server ||
    !body.bucketName ||
    !body.accountAuthorizationToken ||
    !body.user
  ) {
    return res.json({ message: "Please enter all fields", status: 400 });
  }

  // check if user exists

  let USER = await prisma.user.findUnique({
    where: {
      email: body?.user?.email,
    },
  });

  if (!USER)
    return res.json({
      message: "User not found. Please login to create a bucket",
      status: 400,
    });

  // check if bucket already exists

  let BUCKET = await prisma.bucket.findUnique({
    where: {
      name: body.bucketName,
    },
  });

  if (BUCKET)
    return res.json({ message: "Bucket already exists", status: 400 });

  // create the folder with the name of bucket name
  await axios
    .get(
      `${apiURL}/b2api/v3/b2_list_file_names?bucketId=${backblazeContentBucketID}&prefix=${body.server}`,
      {
        headers: {
          Authorization: body?.accountAuthorizationToken,
        },
      }
    )
    .then(async (response) => {
      let data = response.data;
      let files = data.files;

      // copying base file from content bucket to user_content bucket
      try {
        files.map(async (file: ifileinfo) => {
          let fileName = file?.fileName?.split("/")[1];
          if (fileName == ".bzEmpty") return;
          await axios.post(
            `${apiURL}/b2api/v3/b2_copy_file`,
            {
              sourceFileId: file?.fileId,
              fileName: body?.bucketName + "/" + fileName,
              destinationBucketId: backblazeDestinationBucketID,
            },
            {
              headers: {
                Authorization: body?.accountAuthorizationToken,
              },
            }
          );
        });
      } catch (error) {
        return res.json({ message: "Error on copying file", status: 400 });
      }

      await prisma.bucket.create({
        data: {
          name: body.bucketName,
          server: body.server,
          createdBy: USER?.id,
        },
      });

      return res.json({ data, message: "Server content created", status: 200 });
    })
    .catch((err) => {
      console.log("error", err);
      return res.json({
        message: "Error on getting server base files",
        status: 400,
      });
    });
}

async function handleGetAllBuckets(req: Request, res: Response) {
  const body = req.body;

  if (!body.accountAuthorizationToken) {
    return res.json({ message: "Please enter all fields", status: 400 });
  }
}

export {
  handlegetBackblazeAuthorization,
  handlegetBackblazeUploadFile,
  handlegetBackblazeCreateServer,
};
