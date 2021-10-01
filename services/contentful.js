const { createClient } = require("contentful");

class ContentfulService {
  getClient = () => {
    const config = {
      space: process.env.SPACE_ID,
      accessToken: process.env.API_KEY,
      environment: process.env.ENV || "master"
    };

    return createClient(config);
  };

  async getLocales(localesID = "en-CA") {
    const config = {
      locale: localesID,
      content_type: "localeString",
      include: 3,
      limit: 1000,
      order: "sys.createdAt"
    };
    const resp = await this.getClient().getEntries(config);
    const data = resp.items.map(i => i.fields);

    return data;
  }

  async getDomains(localesID = "en-CA") {
    const config = {
      locale: localesID,
      content_type: "domains",
      limit: 1000,
      order: "sys.createdAt"
    };
    const resp = await this.getClient().getEntries(config);
    const data = resp.items.map(i => i.fields);
    
    return data;
  }
}

const inst = new ContentfulService();
module.exports = inst;
