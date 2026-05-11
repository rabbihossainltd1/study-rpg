import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : undefined;

  admin.initializeApp(
    serviceAccount
      ? { credential: admin.credential.cert(serviceAccount) }
      : { credential: admin.credential.applicationDefault() }
  );
}

export default admin;
