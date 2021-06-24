import express, { Express } from "express";
import winston, { Logger } from "winston";
import "reflect-metadata";

/**
 * Configuration for server.
 */
interface ServerCFG {
  /**
   * API to access functionality of server.
   */
  api: {
    /**
     * HTTP server port.
     */
    httpPort: number,
  },

  /**
   * MongoDB.
   */
  db: {
    /**
     * Connection URI.
     */
    uri: string,
  },
}

interface DBCtx {
  /**
   * Database connection.
   */
  conn: mongoose.Mongoose,

  /**
   * Containers collection.
   */
  containers: mongoose.Model,

  /**
   * Items collection.
   */
  items: mongoose.Model,
}

/**
 * Server which provides all functionlity.
 */
class Server {
  /**
   * Configuration.
   */
  CFG: ServerCFG;

  /**
   * Logger.
   */
  log: Logger;

  /**
   * Database connection.
   */
  db: DBCtx;

  /**
   * Create and initialize server.
   */
  constructor() {
    // Configuration
    this.CFG = {
      api: {
        httpPort: Number(process.env.INVENTORY_APP_API_HTTP_PORT) || 8000,
      },
      mongo: {
        uri: process.env.INVENTORY_APP_MONGO_URI || "mongodb://devinventory:devinventory@mongo:27017/devinventory",
      },
    };

    // Logger
    this.log = winston.createLogger({
      level: "debug",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

    // Connect to database
    mongoose.connect(this.CFG.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    dbConn = mongoose.connection;
    
    dbConn.on("error", (e) => {
      this.log.error("mongoose error", { error: e });
    });
    await new Promise((resolve, reject) => {
      dbConn.once("open", resolve);
    });
    
    this.db = dbCtx(dbConn);
  }

  /**
   * Create a DBCtx.
   * @param dbConn Mongoose database connection.
   * @returns Database context.
   */
  dbCtx(dbConn: mongoose.Connection): DBCtx {
    const containersSchema = new mongoose.Schema({
      name: String,
      parent
    });
    
    return {
      conn: dbConn,
      containers: containersModel,
      items: itemsModel,
    };
  }
  
  /**
   * Create express HTTP API client.
   */
  expressApp(): Express {
    // HTTP API
    const app = express();
    
    app.use(express.static("dist/frontend"));
    app.get("/api/v0/health", this.epHealth.bind(this));

    return app;
  }

  /**
   * Return API health.
   * Request: GET
   * Response: { ok: bool }
   */
  epHealth(req, res) {
    res.json({
      ok: true,
    });
  }

  /**
   * Run server and block until exit.
   */
  async run() {
    const app = this.expressApp();

    await new Promise((resolve, reject) => {
      app.listen(this.CFG.api.httpPort, () => {
        this.log.info(`http server listening on :${this.CFG.api.httpPort}`);
      });
    });
  }
}

const server = new Server();
server.run().then(() => {
  server.log.info("done");
}).catch((e) => {
  server.log.error("fatal error", { error: e });
});
