import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as firebase from 'firebase';

const app = express();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

admin.initializeApp(config);

interface Doot {
  dootId: string;
  body: string;
  createdAt: string;
  userName: string;
}

app.get('/doots', (req, res) => {
  admin
    .firestore()
    .collection('doots')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let doots: Doot[] = [];
      data.forEach((doc) => {
        doots.push({
          ...(doc.data() as Doot),
          dootId: doc.id,
        });
      });

      return res.json(doots);
    })
    .catch((err) => console.error(err));
});

app.post('/doot', (req, res) => {
  const newDoot = {
    body: req.body.body,
    userName: req.body.userName,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection('doots')
    .add(newDoot)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something blew up' });
      console.error(err);
    });
});

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  // TODO: Validate Data

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
});
export const api = functions.https.onRequest(app);
