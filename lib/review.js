const { OpenAI } = require("openai");

const client = new OpenAI({
    apiKey: "sk-590FLVnsLoUlKCTRrpSPSC31eQMXkY4Y",
    baseURL: "https://api.proxyapi.ru/openai/v1",
});
function convertStringToObject(str) {
    const parts = str.match(/\d+%\s(\w+)/g);
    const obj = {};
    
    if (parts && parts.length === 2) {
      const [pos, neg] = parts;
      obj.pos = pos.replace(/\s\w+$/, '');
      obj.neg = neg.replace(/\s\w+$/, '');
    }
    
    return obj;
}
  
const review = async (comment) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Determine in percents how positive and how negative a given comment is. You have to give your answer in the format (40% pos 60% neg) do not say anything else: '  + comment}],
        model: 'gpt-4o',
      });
      const res = convertStringToObject(chatCompletion.choices[0].message.content);
      console.log(res.pos + " " + res.neg);
      return res
}

module.exports = {
    review,
};