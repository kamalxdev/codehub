import axios from "axios";

class backblaze {
  authorizationToken: string='';
  apiURL: string;
  keyID: string = import.meta.env.VITE_BLACKBLAZE_KEY_ID;
  applicationKey: string = import.meta.env.VITE_BLACKBLAZE_APPLICATION_KEY;

  constructor() {
    this.apiURL = "https://api005.backblazeb2.com";
  }

  // To retrieve the authorization token
  async authorizeAccount() {
    axios
      .get(`${this.apiURL}/b2api/v2/b2_authorize_account`, {
        headers: {
          Authorization: `Basic ${btoa(`${this.keyID}:${this.applicationKey}`)}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let data = res.data;
        this.authorizationToken = data.authorizationToken;
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}

export default backblaze;
