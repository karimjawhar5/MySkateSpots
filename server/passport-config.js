import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import bcrypt from "bcrypt";

export function initialize(passport, getUserByEmail, getUserByUsername) {
  // Define the local authentication strategy
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "No user found with this email" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  // Configure passport to use the local authentication strategy
  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateUser)
  );

  // Serialize the user ID to the session
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  // Deserialize the user ID to a user object
  passport.deserializeUser(async (username, done) => {
    try {
      const user = await getUserByUsername(username);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
