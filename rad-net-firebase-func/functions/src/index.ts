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

export const createDoot = functions.https.onRequest((req, res) => {
  const newDoot = {
    body: req.body.body,
    userName: req.body.userName,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  admin
    .firestore()
    .collection("doots")
    .add(newDoot)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something blew up" });
      console.error(err);
    });
});
