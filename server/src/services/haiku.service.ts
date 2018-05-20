import { Haiku } from "../models/haiku";

class HaikuService {
  public getAllHaikus() {
    return Haiku.aggregate([{ $sort: { date: -1 } }]).then(docs => {
      return docs;
    });
  }
}

export default HaikuService;
