import axios from "axios";

import { Request, Response } from "express";

const keyID = process.env.BLACKBLAZE_KEY_ID as string;
const applicationKey = process.env.BLACKBLAZE_APPLICATION_KEY as string;
const apiURL = "https://api005.backblazeb2.com";





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

export { handlegetBackblazeAuthorization };
