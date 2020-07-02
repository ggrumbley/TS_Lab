"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
admin.initializeApp();
app.get('/doots', (req, res) => {
    admin
        .firestore()
        .collection('doots')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
        let doots = [];
        data.forEach((doc) => {
            doots.push(Object.assign(Object.assign({}, doc.data()), { dootId: doc.id }));
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
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map