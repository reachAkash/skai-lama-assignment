module.exports = {
  // global try catch
  asyncHandler: (func) => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      console.log(err);
    }
  },
};
