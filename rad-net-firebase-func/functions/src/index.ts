import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

interface Doot {
  body: string;
  createdAt: Date;
  userName: string;
}

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello world!");
});

export const getDoots = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("doots")
    .get()
    .then((data) => {
      let doots: Doot[] = [];
      data.forEach((doc) => {
        doots.push(doc.data() as Doot);
      });

      return res.json(doots);
    })
    .catch((err) => console.error(err));
});
