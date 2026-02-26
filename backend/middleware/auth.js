const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");

const region = "us-east-1";
const userPoolId = "us-east-1_tKqAhDysX";
const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

let pems;

const getPems = async () => {
  if (!pems) {
    const url = `${issuer}/.well-known/jwks.json`;
    const { data } = await axios.get(url);
    pems = {};
    data.keys.forEach(key => {
      pems[key.kid] = jwkToPem(key);
    });
  }
  return pems;
};

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  const pems = await getPems();
  const pem = pems[decoded.header.kid];

  jwt.verify(token, pem, { issuer }, (err, payload) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });

    req.user = {
      sub: payload.sub,
      email: payload.email,
    };
    next();
  });
};

module.exports = authenticate;
