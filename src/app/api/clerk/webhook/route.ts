//i have declared an npx untun@latest tunnel http:/localhost:3000
//so i can have an my app proxied running 
//and in the proxied request i am sending request to /api/clerk/webhook
//api/clerk/webhookimport { db } from "~/server/db";
import { db } from "~/server/db";
export const POST = async (req: Request) => {
    try {

        const { data } = await req.json();

        console.log("Clerk webhook received:", data);

        // Ensure the required fields exist
        if (!data.email_addresses || !Array.isArray(data.email_addresses) || data.email_addresses.length === 0) {
            return new Response("Invalid or missing email addresses", { status: 400 });
        }

        const emailAddress = data.email_addresses[0].email_address; // Access the correct field
        const firstname = data.first_name || "Unknown"; // Provide a fallback
        const lastname = data.last_name || "Unknown";   // Provide a fallback
        const imageUrl = data.image_url || data.profile_image_url; // Use profile image if image_url is unavailable
        const id = data.id;

        // Save the data to the database
        await db.user.create({
            data: {
                id,
                emailAddress,
                firstname,
                lastname,
                imageUrl,
            },
        });

        return new Response("Webhook received", { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
