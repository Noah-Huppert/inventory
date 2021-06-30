import express, { Express } from "express";
import winston, { Logger } from "winston";
import "reflect-metadata";
import {
  createConnection,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

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
   * Postgres.
   */
  postgres: {
    /**
     * Server host.
     */
    host: string,

    /**
     * Server port.
     */
    port: number,

    /**
     * Login username.
     */
    username: string,
    
    /**
     * Login password.
     */
    password: string,

    /**
     * Name of database in which to operate.
     */
    db: string,
  },
}

/**
 * Represents an object which holds items.
 */
@Entity()
class Container {
  /**
   * Unique container identifier.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Human friendly name.
   */
  @Column({ type: "text", nullable: false })
  name: string;

  /**
   * Parent container.
   */
  @ManyToOne(() => Container, container => container.children)
  parent: Container;

  /**
   * Child containers.
   */
  @OneToMany(() => Container, container => container.parent)
  children: Container[];

  /**
   * Items being stored within the container.
   */
  @OneToMany(() => Item, item => item.container)
  items: Item[];
}

/**
 * Object which is stored.
 */
@Entity()
class Item {
  /**
   * Unique item identifier.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Human friendly name.
   */
  @Column({ type: "text", nullable: false })
  name: string;

  /**
   * Container in which item is stored.
   */
  @ManyToOne(() => Container, container => container.items, { nullable: true })
  container: Container;
}

/**
 * Server which provides all functionlity. The init() method must be called before this class can be used.
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
  db?: object;

  /**
   * Create and initialize server. The init() method must be called after.
   */
  constructor() {
    // Configuration
    this.CFG = {
      api: {
        httpPort: Number(process.env.INVENTORY_APP_API_HTTP_PORT) || 8000,
      },
      postgres: {
        host: process.env.INVENTORY_APP_POSTGRES_HOST || "localhost",
        port: Number(process.env.INVENTORY_APP_POSTGRES_PORT) || 5432,
        username: process.env.INVENTORY_APP_POSTGRES_USERNAME || "devinventory",
        password: process.env.INVENTORY_APP_POSTGRES_PASSWORD || "devinventory",
        db: process.env.INVENTORY_APP_POSTGRES_DB || "devinventory",
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
  }

  /**
   * Performs asynchronous initialization tasks which could not be completed in the constructor.
   */
  async init() {
    // Connect to database
    this.db = await createConnection({
      type: "postgres",
      host: this.CFG.postgres.host,
      port: this.CFG.postgres.port,
      username: this.CFG.postgres.username,
      password: this.CFG.postgres.password,
      database: this.CFG.postgres.db,
      entities: [
        Container,
        Item,
      ],
      synchronize: true,
      logging: false,
    });
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
server.init().then(() => server.run()).then(() => {
  server.log.info("done");
}).catch((e) => {
  server.log.error("fatal error", { error: e });
});
