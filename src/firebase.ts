import * as admin from "firebase-admin";
import credentialObj from "./config/ki-production-firebase-adminsdk-a1o49-d7c6d4f359.json";

const service_account = credentialObj as admin.ServiceAccount;
const credential = admin.credential.cert(service_account);
admin.initializeApp({ credential });
admin.firestore().settings({ ignoreUndefinedProperties: true });

export const firestore = admin.firestore();
