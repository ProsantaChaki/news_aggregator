export const newsApiDataProcessing = async (articles)=> {
    return articles.filter(article =>
        article.urlToImage !== null &&
        article.url !== "[Removed]" &&
        article.description !== "[Removed]" &&
        article.title !== "[Removed]"
    ).map(article => {
        const dateStr = article?.publishedAt;
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return {
            urlToImage: article.urlToImage,
            url: article.url ,
            description: article.description,
            author: article.author,
            title : article.title,
            source: article.source?.name,
            publishedAt: date.toLocaleDateString('en-GB', options),
        };
    });
}
export const newsYorkTimeDataProcessing = async (articles)=> {
    return articles.filter(article =>
        article.web_url !== null &&
        article.headline.main !== null &&
        article?.headline?.main !== null
    ).map(article => {
        const dateStr = article?.pub_date;
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return {
            urlToImage: 'https://www.nytimes.com/'+article.multimedia[0].url,
            url: article.web_url ,
            description: article.description??'',
            author: article?.byline?.original??'',
            title : article?.headline?.main,
            source: article.source?.name,
            publishedAt: date.toLocaleDateString('en-GB', options),
        };
    });
}
export const newsProcessing = async (articles)=> {
    return articles.filter(article =>
        article.url !== null &&
        article.title !== null &&
        article.image !== null
    ).map(article => {
        const dateStr = article?.dateTimePub;
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return {
            urlToImage: article.image,
            url: article.url ,
            description: article.body??'',
            author: '',
            title : article?.title,
            source: article.source?.title,
            publishedAt: date.toLocaleDateString('en-GB', options),
        };
    });
}

export const mergeAndShuffleArrays= async (...arrays) =>{
    let mergedArray = arrays.flat();

    for (let i = mergedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
    }

    return mergedArray;
}