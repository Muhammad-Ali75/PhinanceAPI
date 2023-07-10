import 'dotenv/config'
import {connect} from"mongoose"

function dbConnect() {
  connectToDatabase()
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

const connectToDatabase = () => {
  return connect(process.env.DATABASE_URL, {
    autoIndex: true,
  });
};

export default dbConnect;
