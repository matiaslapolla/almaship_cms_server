import pgp from "pg-promise";

const urlConnect =
	"postgresql://" +
	process.env.API_HOSTNAME +
	":" +
	process.env.DB_PORT +
	"/" +
	process.env.DB_NAME;

const db = pgp()(urlConnect);

export default db;
