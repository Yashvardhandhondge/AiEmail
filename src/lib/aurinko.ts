"use server"

import { auth } from "@clerk/nextjs/server"

export const getAurinkoAuthUrl = async (serviceType : 'Google' | 'Office365') => {
   const {userId} = await auth();
   if(!userId) throw new Error('User not authenticated');
   const params = new URLSearchParams({
    clientId : process.env.AURINKO_CLIENT_ID as string,
    serviceType ,
    scope : 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
    responseType : 'code',
    redirectUri : `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
    returnUrl : `${process.env.NEXT_PUBLIC_URL}`,
   })



   return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`
}