
import express from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// START GITHUB CONNECTION
// GET /api/github/login
// ======================================================
router.get("/login", protect, (req, res, next) => {
  try {
    // Only interns can connect GitHub
    if (req.user.role !== "intern") {
      return res.status(403).json({
        message: "Only interns can connect GitHub"
      });
    }

    // Create temporary state token
    const state = jwt.sign(
      {
        userId: req.user.userId,
        purpose: "github-connect"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m"
      }
    );

    // Generate GitHub authorization URL
    const clientID = process.env.GITHUB_CLIENT_ID;
    const callbackURL = process.env.GITHUB_CALLBACK_URL;

    if (!clientID || !callbackURL) {
      return res.status(500).json({
        message: "GitHub OAuth configuration is missing"
      });
    }

    const params = new URLSearchParams({
      client_id: clientID,
      redirect_uri: callbackURL,
      scope: "user:email repo",
      state: state
    });

    const githubUrl =
      `https://github.com/login/oauth/authorize?${params.toString()}`;

    return res.json({
      url: githubUrl
    });

  } catch (error) {
    console.error("GitHub login error:", error);

    return res.status(500).json({
      message: "Could not start GitHub connection"
    });
  }
});


// ======================================================
// GITHUB CALLBACK
// GET /api/github/callback
// ======================================================
router.get(
  "/callback",

  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/github/error"
  }),

  async (req, res) => {
    try {
      const { state } = req.query;

      if (!state) {
        return res.status(400).json({
          message: "Missing GitHub state"
        });
      }

      // Verify state token
      const decoded = jwt.verify(
        state,
        process.env.JWT_SECRET
      );

      if (decoded.purpose !== "github-connect") {
        return res.status(400).json({
          message: "Invalid GitHub state"
        });
      }

      // Find intern
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          message: "Intern not found"
        });
      }

      if (user.role !== "intern") {
        return res.status(403).json({
          message: "Only interns can connect GitHub"
        });
      }

      // GitHub profile
      const profile = req.user.profile;

      // GitHub access token
      const accessToken = req.user.accessToken;

      // Save GitHub information
      user.github = {
        id: profile.id,

        username:
          profile.username ||
          profile.displayName ||
          null,

        profileUrl:
          profile.profileUrl ||
          `https://github.com/${profile.username}`,

        avatarUrl:
          profile.photos &&
          profile.photos.length > 0
            ? profile.photos[0].value
            : null,

        accessToken: accessToken,

        connected: true
      };

      await user.save();

      console.log(
        `GitHub connected successfully for intern: ${user.email}`
      );

      // Send user back to React GitHub page
      return res.redirect(
        "http://localhost:5173/intern/github?connected=true"
      );

    } catch (error) {
      console.error("GitHub callback error:", error);

      return res.redirect(
        "http://localhost:5173/intern/github?connected=false"
      );
    }
  }
);


// ======================================================
// GITHUB ERROR
// GET /api/github/error
// ======================================================
router.get("/error", (req, res) => {
  return res.redirect(
    "http://localhost:5173/intern/github?connected=false"
  );
});


// ======================================================
// GITHUB STATUS
// GET /api/github/status
// ======================================================
router.get("/status", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.role !== "intern") {
      return res.status(403).json({
        message: "Only interns can check GitHub status"
      });
    }

    return res.json({
      connected: user.github?.connected || false,

      github: user.github?.connected
        ? {
            username: user.github.username,
            profileUrl: user.github.profileUrl,
            avatarUrl: user.github.avatarUrl
          }
        : null
    });

  } catch (error) {
    console.error("GitHub status error:", error);

    return res.status(500).json({
      message: "Could not check GitHub connection"
    });
  }
});


// ======================================================
// DISCONNECT GITHUB
// DELETE /api/github/disconnect
// ======================================================
router.delete("/disconnect", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.role !== "intern") {
      return res.status(403).json({
        message: "Only interns can disconnect GitHub"
      });
    }

    user.github = {
      id: null,
      username: null,
      profileUrl: null,
      avatarUrl: null,
      accessToken: null,
      connected: false
    };

    await user.save();

    return res.json({
      message: "GitHub disconnected successfully"
    });

  } catch (error) {
    console.error("GitHub disconnect error:", error);

    return res.status(500).json({
      message: "Could not disconnect GitHub"
    });
  }
});

export default router;
