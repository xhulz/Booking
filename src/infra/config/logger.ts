import pino from "pino";

export default pino({
  enabled: false,
  level: "debug",
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
});
