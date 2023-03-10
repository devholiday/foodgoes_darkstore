import { withSessionRoute } from "../../../lib/withSession";
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default withSessionRoute(handler);

async function handler(req, res) {
  try {
    await dbConnect();

    const {id} = req.session.user;
    if (!id) {
      throw('Error, auth.');
    }

    const user = await User.findById(id);
    if (!user) {
      throw("not found user")
    }

    res.status(200).json({
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } catch(e) {
    res.status(200).json(null);
  }
}