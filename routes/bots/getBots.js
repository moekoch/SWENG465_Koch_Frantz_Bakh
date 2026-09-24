//GET endpoint to retrieve all bots
const getBots = (req, res) => {
  res.status(200).json(bots);
};

module.exports = getBots;