import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;

if (clientID && clientSecret && callbackURL) {
  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("GitHub profile received:", profile.username);

        return done(null, {
          profile,
          accessToken
        });
      }
    )
  );

  console.log("GitHub OAuth configured successfully.");
} else {
  console.log(
    "GitHub OAuth is not configured. GitHub login is disabled."
  );
}

export default passport;