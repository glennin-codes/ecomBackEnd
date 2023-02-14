const ProductSchema = require("../models/ProductSchema");

const getAllProducts = async (req, res, next) => {
  try {
    const { company, category, name, numericFilters } = req.query;
    const queryObject = {};
    if (name) {
      //the foreign expression below is for pattern matching where all strings matching with the name query are returned. options i is for ignoring thre caps or small

      queryObject.name = { $regex: name, $options: "i" };
    }
    if (company) {
      queryObject.company = company;
    }
    if (category) {
      queryObject.category = category;
    }

    //filtering by price

    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["price"];
      filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
    const { dataAmount } = req.params;
    let data;

    if (dataAmount) {
      data = await ProductSchema.find(queryObject).limit(Number(dataAmount));
    } else {
      data = await ProductSchema.find(queryObject);
    }

    // console.log(req.params)
    res.status(200).json(data);
  } catch (error) {
    next(error);
    return 1;
  }
};

module.exports=getAllProducts