import { app } from "./app";

app.listen(process.env.APP_API_PORT, () => console.log("Server running!"));
