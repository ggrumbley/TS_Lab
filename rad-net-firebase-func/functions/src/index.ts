import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

const app = express();

const config = {
  apiKey: 'AIzaSyAhG_tcWTU2kGFFgKVLgNr5v11ikSM6m9k',
  authDomain: 'rad-net.firebaseapp.com',
  databaseURL: 'https://rad-net.firebaseio.com',
  projectId: 'rad-net',
  storageBucket: 'rad-net.appspot.com',
  messagingSenderId: '324902657536',
  appId: '1:324902657536:web:b96e114de628fa92cf82e5',
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

export const api = functions.https.onRequest(app);
