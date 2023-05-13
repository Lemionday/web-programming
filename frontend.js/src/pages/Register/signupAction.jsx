import { useAuth } from "../../components/hooks/useAuth";
import { config } from "../../conf/config";

export default async function signUpAction(auth, newUser) {
    try {
        const result = await fetch(`${config.baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`,
            },
            body: JSON.stringify(newUser),
        });

        if (!result.ok) {
            console.log(result);
            alert(result);
            return;
        }

        console.log(auth);
        const resJson = await result.json();
        return resJson;
    } catch (err) {
        console.log(err);
    }
}