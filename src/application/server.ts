import logger from "../infra/config/logger";
import app from "./app";

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`server starts at port ${process.env.SERVER_PORT}`);
});
