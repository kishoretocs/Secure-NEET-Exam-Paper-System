const User = require("../models/User")
const Request = require("../models/request")
const completeRequest = async (req, res) => {
    try {
      const { questionid, username } = req.body;
  
      // Validate input
      if (!questionid || !username) {
        return res.status(400).json({ message: 'Question ID and username are required.' });
      }
  
      // Step 1: Find the request
      const request = await Request.findOne({ questionid });
      if (!request) {
        return res.status(404).json({ message: 'Request not found.' });
      }
  
      // Step 2: Find the user
      const user = await User.findOne({ name: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Step 3: Check if user has the share for the given questionid
      const userShare = user.shares.get(questionid);
      if (!userShare) {
        return res.status(400).json({ message: 'User does not have a share for this question.' });
      }
  
      // Step 4: Add the share to the request's sharesReceived
      request.sharesReceived.set(username, userShare);
      await request.save();
  
    
      res.status(200).json({
        message: 'Share successfully added to the request.',
        request: {
          questionid: request.questionid,
          requester: request.requester,
          sharesReceived: request.sharesReceived,
        },
      });
    } catch (error) {
      console.error('Error completing request:', error);
      res.status(500).json({ message: 'Error completing request.' });
    }
  };
  

module.exports = { completeRequest };