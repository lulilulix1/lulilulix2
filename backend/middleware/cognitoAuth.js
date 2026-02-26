const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");

let pems;

const getPems = async () => {
  if (pems) return pems;

  const region = process.env.AWS_REGION;
  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  const { data } = await axios.get(url);

  pems = {};
  data.keys.forEach(key => {
    pems[key.kid] = jwkToPem(key);
  });

  return pems;
};

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token" });

    const token = auth.split(" ")[1];
    const decoded = jwt.decode(token, { complete: true });
    const pems = await getPems();

    const pem = pems[decoded.header.kid];
    if (!pem) return res.status(401).json({ error: "Invalid token" });

    jwt.verify(token, pem, (err, payload) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });

      req.user = {
        sub: payload.sub,
        email: payload.email
      };

      next();
    });
  } catch (err) {
    res.status(401).json({ error: "Auth failed" });
  }
};
