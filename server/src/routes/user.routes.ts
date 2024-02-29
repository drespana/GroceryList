import * as express from "express";
import * as mongodb from "mongodb";
const { requiresAuth } = require('express-openid-connect');

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/', requiresAuth(), async (req, res) => {
    const userProfile = '<img src='+req.oidc.user.picture+'>'
    +'<h3>' + req.oidc.user.given_name+' '+ req.oidc.user.family_name +'</h3>'
    res.send(userProfile);
  })
