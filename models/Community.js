const BoArticleModel = require("../schema/bo_article.model");
const Definer = require("../lib/ mistake");
const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Community {
  constructor() {
    this.boArticleModel = BoArticleModel;
  }

  async createArticleData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);
      const new_article = await this.saveArticleData(data);
      console.log("new_article:::", new_article);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data) {
    try {
      const article = new this.boArticleModel(data);
      return await article.save();
    } catch (mongo_err) {
      console.login(mongo_err);
      throw new Error(Definer.auth_err1);
    }
  }
}

module.exports = Community;
