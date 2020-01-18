import baseURL from '../constants/apiURL';

const socialShare = _id => {
    const url = `${baseURL}/post/${_id}`;
    
    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/share?url=${url}`,
        linkedIn: `http://www.linkedin.com/shareArticle?mini=true&url=${url}`,
        whatsApp: `whatsapp://send?text=${url}`
    };
};

export default socialShare;
