import Server from "./server/server";
import router from "./router/router";
import MySQL from "./mysql/mysql";

const server = Server.init(3001);
server.app.use(router);

MySQL.instance;

server.start(() => {
  console.log("Server listening on port 3001");
});
