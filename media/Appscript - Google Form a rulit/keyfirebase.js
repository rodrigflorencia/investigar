const FIREBASE_URL = "https://investigar-webapp.firebaseio.com";
const PROJECT_ID = "investigar-webapp"; 
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIKCCrp7U=\n-----END PRIVATE KEY-----\n`; 
const CLIENT_EMAIL = "firebase-...@investigar-webapp.iam.gserviceaccount.com";


function getField(obj) {
  if (!obj) return "";
  const tipo = Object.keys(obj)[0];
  return obj[tipo];
}
function createJwtToken() {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const jwtHeader = { alg: "RS256", typ: "JWT" };
  const base64Encode = (o) => Utilities.base64EncodeWebSafe(JSON.stringify(o));
  const header = base64Encode(jwtHeader);
  const payload = base64Encode(claims);
  const signatureInput = `${header}.${payload}`;
  const signatureBytes = Utilities.computeRsaSha256Signature(signatureInput, PRIVATE_KEY);
  const signature = Utilities.base64EncodeWebSafe(signatureBytes);
  const jwt = `${signatureInput}.${signature}`;

  const tokenResponse = UrlFetchApp.fetch("https://oauth2.googleapis.com/token", {
    method: "post",
    payload: {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    }
  });

  const accessToken = JSON.parse(tokenResponse.getContentText()).access_token;
  return accessToken;
}