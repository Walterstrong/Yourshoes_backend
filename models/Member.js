const MemberModel = require("../schema/member.model");
const Definer = require("../lib/ mistake");
const assert = require("assert");
const bcrypt = require("bcryptjs");
const Like = require("../models/Like");

const {
  shapeIntoMongooseObjectId,
  look_up_member_following,
  look_up_member_liked,
  look_up_member_viewed,
} = require("../lib/config");
const View = require("../models/View");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  ///

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.mongo_validation_err1);
      }

      result.mb_password = "";
      // yuqoridagi amal nimani anglatadi?
      return result;
    } catch (err) {
      throw err;
    }
  }

  ///

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        //bu yerda 1 raqami nima uchun turibdi?
        .exec();
      assert.ok(member, Definer.auth_err3);

      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );
      // nima uchun bu yerda isMatch ichida bcryptdan foydalanilgan, hamda isMatch qanday javob qaytaradi?
      assert.ok(isMatch, Definer.auth_err4);

      const result = await this.memberModel
        .findOne({
          mb_nick: input.mb_nick,
        })
        .exec();
      // console.log("result", result);

      //nima uchun password qaytmayabdi?
      //javob: schema modulni ichidagi mb_password select:false bo'lgani uchun
      return result;
    } catch (err) {
      throw err;
    }
  }

  ///

  async getChosenMemberData(member, id) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      id = shapeIntoMongooseObjectId(id);

      let aggregateQuery = [
        { $match: { _id: id, mb_status: "ACTIVE" } },
        { $unset: "mb_password" },
      ];

      if (member) {
        await this.viewChosenItemByMember(member, id, "member");
        aggregateQuery.push(look_up_member_liked(auth_mb_id));
        aggregateQuery.push(look_up_member_viewed(auth_mb_id));
        aggregateQuery.push(look_up_member_following(auth_mb_id, "members"));
      }

      const result = await this.memberModel.aggregate(aggregateQuery).exec();

      assert.ok(result, Definer.general_err2);

      return result[0];
    } catch (err) {
      throw err;
    }
  }

  ///

  async viewChosenItemByMember(member, view_ref_id, group_type) {
    try {
      view_ref_id = shapeIntoMongooseObjectId(view_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const view = new View(mb_id);

      //validation needed
      const isValid = await view.validateChosenTarget(view_ref_id, group_type);
      assert.ok(isValid, Definer.general_err2);

      // logged user has seen target before
      const doesExist = await view.checkViewExistence(view_ref_id);
      if (!doesExist) {
        console.log("demak ushbu user tomonidan bu member oldin ko'rilmagan:");
      }
      if (!doesExist) {
        const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  ///

  async likeChosenItemByMember(member, like_ref_id, group_type) {
    try {
      like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const like = new Like(mb_id);
      const isValid = await like.validateTargetItem(like_ref_id, group_type);

      assert.ok(isValid, Definer.general_err2);

      const doesExist = await like.checkLikeExistence(like_ref_id);

      let data = doesExist
        ? await like.removeMemberLike(like_ref_id, group_type)
        : await like.insertMemberLike(like_ref_id, group_type);
      assert.ok(data, Definer.general_err1);

      const result = {
        like_group: data.like_group,
        like_ref_id: data.like_ref_id,
        like_status: doesExist ? 0 : 1,
      };
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateMemberData(id, data, image) {
    try {
      const mb_id = shapeIntoMongooseObjectId(id);

      let params = {
        mb_nick: data.mb_nick,
        mb_phone: data.mb_phone,
        mb_address: data.mb_address,
        mb_description: data.mb_description,
        mb_image: image ? image.path : null,
      };

      for (let prop in params) if (!params[prop]) delete params[prop];
      const result = await this.memberModel
        .findOneAndUpdate({ _id: mb_id }, params, {
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
module.exports = Member;
