'use server';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import prisma from "../prisma";

export async function isValidUsername(name: string): Promise<boolean> {
    try{
        const result = await prisma.user.findUnique({
            where : {
                username: name,
            }
        });
        if(result){
            return false;
        }
        return true;
    } catch (err: unknown) {
        if(err instanceof PrismaClientKnownRequestError){
            console.log(err.message)
        }
        console.log(err);
        return false;
    }

}