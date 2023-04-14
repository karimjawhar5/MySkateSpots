import {createUser} from '../database.js'

import bcrypt from 'bcrypt'
import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(303, '../test/denny');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(303, '../test/approve');
      });
    })(req, res, next);
  }

export const register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await createUser(req.body.name, req.body.username, req.body.email, hashedPassword)
        res.redirect(303,'../test/approve') //change these
    }catch {
        res.redirect(303,'../test/denny')//change these
    }
}

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect(303,'../test/approve') //change these
    });
}

export function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect(303,'../test/denny') //change these
}

export function checkNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()){
        return next()
    }
    res.redirect(303,'../test/denny') //change these
}