const MemberModel = require("../schema/member.model");
const Definer = require("../lib/ mistake");
const assert = require("assert");
const Member = require("../models/Member");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Restaurant {
  constructor() {
    this.memberModel = MemberModel;
  }

  async getAllRestaurantsData(member, data) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      let match = { mb_type: "RESTAURANT", mb_status: "ACTIVE" };
      let aggregateQuery = [];
      data.limit = data["limit"] * 1;
      data.page = data["page"] * 1;

      switch (data.order) {
        case "top":
          match["mb_top"] = "Y";
          aggregateQuery.push({ $match: match });
          aggregateQuery.push({ $sample: { size: data.limit } });
          break;
        case "random":
          aggregateQuery.push({ $match: match });
          aggregateQuery.push({ $sample: { size: data.limit } });
          break;
        default:
          aggregateQuery.push({ $match: match });
          const sort = { [data.order]: -1 };
          aggregateQuery.push({ $sort: sort });
          break;
      }

      aggregateQuery.push({ $skip: (data.page - 1) * data.limit });
      aggregateQuery.push({ $limit: data.limit });
      //todo: check auth member like the chosen target

      const result = await this.memberModel.aggregate(aggregateQuery).exec();
      assert.ok(result, Definer.general_err2);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async getChosenRestaurantData(member, id) {
    try {
      id = shapeIntoMongooseObjectId(id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "member");
      }

      const result = await this.memberModel
        .findOne({
          _id: id,
          mb_status: "ACTIVE",
        })
        .exec();
      assert(result, Definer.general_err2);
      return result;
    } catch (err) {
      throw err;
    }
  }

  /*******************************
   *                             *
   *     BSSR RELATED METHODS    *
   *                             *
   ******************************/

  async getAllRestaurantsData() {
    try {
      const result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();

      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateRestaurantByAdminData(update_data) {
    try {
      const id = shapeIntoMongooseObjectId(update_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Restaurant;
