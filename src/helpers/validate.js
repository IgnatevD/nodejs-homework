/** @format */

exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const validateResult = schema.validate(req[reqPart], {
      stripUnknown: true,
    });
    if (validateResult.eror) res.status(400).send(validateResult.eror);
    req.body = validateResult.value;
    next();
  };
};
