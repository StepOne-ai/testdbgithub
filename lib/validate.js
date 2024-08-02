const axios = require('axios');
const cheerio = require('cheerio');

async function getHtml(url, params = null) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getContent(html) {
    const $ = cheerio.load(html);
    return $;
}

async function checkUsername(username) {
    const url = `https://t.me/${username}`;
    const html = await getHtml(url);
    if (html) {
        const $ = await getContent(html);
        if (!$('.tgme_page_additional').length) {
            return 'Does not exist';
        } else {
            return 'Exist';
        }
    } else {
        return 'Error';
    }
}

module.exports = {
    checkUsername,
}