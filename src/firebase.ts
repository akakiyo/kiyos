import * as admin from "firebase-admin";
import credentialObj from "./config/gcp-firebase-serviceaccount.json";

const service_account = credentialObj as admin.ServiceAccount;
const credential = admin.credential.cert(service_account);
admin.initializeApp({ credential });
admin.firestore().settings({ ignoreUndefinedProperties: true });

export const firestore = admin.firestore();
