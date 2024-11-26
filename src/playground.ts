import { db } from "./server/db";

await db.user.create({
    data : {
        emailAddress: "yashvardhandhondge@gmail.com",
        firstname : "Yash",
        lastname : "Dhondge",
    }
})