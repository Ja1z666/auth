import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as bcrypt from 'bcryptjs';
import { prisma } from '../prismaConnect';
import { UserType } from '../types/types';

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await prisma.user.findFirst({
            where: { username }
        });
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) return err;
            if(result === true){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
    })
);

passport.serializeUser((user:UserType, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findFirst({
        where: { id }
    });
    done(null, user);
});