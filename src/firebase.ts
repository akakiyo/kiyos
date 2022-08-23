import * as admin from "firebase-admin";
import credentialObj from "./config/gcp-firebase-serviceaccount.json";

console.log(credentialObj)
console.log(credentialObj.private_key)
console.log(credentialObj.private_key.replace(/\\n/g, '\n'))
credentialObj.private_key = credentialObj.private_key.replace(/\\n/g, '\n')
console.log(credentialObj);
const service_account = credentialObj as admin.ServiceAccount;
console.log(service_account);
const credential = admin.credential.cert(service_account);
admin.initializeApp({ credential });
admin.firestore().settings({ ignoreUndefinedProperties: true });

export const firestore = admin.firestore();
