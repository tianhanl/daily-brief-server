var mongoose = require('mongoose');

var zhihuStorySchema = new mongoose.Schema({
  link: String,
  title: String,
  imageSrc: String,
  time: String
});

var ZhihuStory = mongoose.model('ZhihuStory', zhihuStorySchema);

module.exports = {
  ZhihuStory: ZhihuStory
};
