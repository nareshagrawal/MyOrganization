import { OAuth2Client } from 'google-auth-library';
import 'babel-polyfill';
require('dotenv').config();


const clientId = process.env.CLIENTID;

const client = new OAuth2Client(clientId);

// calling google for geting user 
const gooleAuth = async (request, response, next) => {

    try {

        let token = request.headers.tokenid;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });

        // getting payload
        const payload = ticket.getPayload();
        console.log("payload --->", payload);
        const { sub, email, name, picture } = payload;
        // adding userpayload to request
        const userPayload = {
            googleID: sub,
            email: email,
            userName: name,
            picture: picture
        }
        request.userPayload = userPayload;
        next();

    } catch (error) {
        console.log("Verification failed");
        return response.status(401).json({
            message: 'Auth failed'
        });
    }

}

export default gooleAuth;