import {app} from "../../app";
import {firestore} from "../../firebase";

export const getData = ()=>{
    app.command(`/get`,async({payload,ack,context,client})=>{
        await ack();
        try{
            // firestoreのデータを取得
            const collection = firestore.collection(`kiyos-app`);
            const res = await collection.doc(payload.user_id).get()
            console.log(res)
            // Slack通知
            const msg ={
                token:context.botToken,
                text:"test",
                channel:payload.channel_id,
            }
            client.chat.postMessage(msg);
        }catch(err){
            console.warn(err)
        }
    })
}
