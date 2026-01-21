import {z} from 'zod';


export const SignUpSchema = z.object({
    fullName : z.string().min(3, {error: 'Name must be atleast 3 characters long.'}).refine((val) =>
        val === val.toLowerCase()
    , {error: 'No uppercase'})
})