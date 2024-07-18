import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'
import { UsersModelManager } from "../dao/mongo/users.mdb.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";
import { config } from "../config.js";
import { CartModelManager } from "../dao/mongo/carts.mdb.js";


const umm = new UsersModelManager();
const cmm = new CartModelManager();
const localStrategy = local.Strategy;

export const initAuthStrategies = () => {

    passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await umm.findOneByEmail(username);

                if (!user) {
                    return done(null, false, { message: 'No se encontro el usuario' });
                }

                if (user && await checkPassword(password, user.password)) {
                    return done(null, user, { message: 'Autenticacíon existosa' });
                } else {

                    return done(null,false, { message: 'Contraseña incorrecta' });
                }
            } catch (err) {
                return done(err,false, { message: err.message });
            }

        }));

    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const foundUser = await umm.findOneByEmail(username);

                if (!foundUser) {
                    const user = {
                        ...req.body,
                        password: await hashPassword(password)
                    }
                    return done(null, user, { message: 'Usuario registado' });
                } else {
                    return done(null, false, { message: 'El email ya esta registrado' });
                }
            } catch (err) {
                return done(err, false, { message: err.message });
            }

        }));

    passport.use('ghlogin', new GitHubStrategy(
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.GITHUB_CALLBACK_URL
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json?.email || null;

                if (email) {

                    const foundUser = await umm.findOneByEmail(email);

                    if (!foundUser) {
                        const user = {
                            firstName: profile._json.name.split(' ')[0],
                            lastName: profile._json.name.split(' ')[1],
                            email: email,
                            password: 'none',
                            age:0,
                        }
                        const newUser = await umm.createUser(user);
                        // creamos el cart
                        const cart = await cmm.createCart(newUser._id);
                        // actulizamos campo cart_id de user 
                        const updateUser = await umm.updateUser(user._id, cart._id);
                        
                        return done(null, updateUser);
                    } else {
                        return done(null, foundUser);
                    }
                } else {
                    return done(new Error('Faltan datos de perfil'), null);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export const passportCall = (stategy) => {
    return (req, res, next) => {
        passport.authenticate(stategy, function (err, user, info) {
            if (err) {
                return next(err);
            };
            if(!user){
                return res.status(401).send({ status: false, message: info.message , data: {} })
            }
            req.authInfo={message:info.message};
            req.user = user;
            next();
        })(req, res, next)
    }
}