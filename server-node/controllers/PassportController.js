import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5555/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                const obj = await UserModel.findOne({ email: profile.emails[0].value })
                if (!obj) {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(profile.id, salt);
                    const newUser = await UserModel.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.name.familyName + ' ' + profile.name.givenName,
                        password: hashPassword,
                        isAdmin: false,
                    });
                    await newUser.save();
                    done(null, newUser, { message: "Auth successfull" });
                } else {
                    done(null, obj, { message: "Auth successfull" });
                }
            } catch (error) {
                console.error(error);
                done(error, false, { message: "Internal server error" });
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id)
        .then(user => {
            done(null, user);
        })
});

export default passport;
