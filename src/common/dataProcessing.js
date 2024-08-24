export const newsApiDataProcessing = async (articles)=> {
    return articles.filter(article =>
        article.urlToImage !== null &&
        article.url !== "[Removed]" &&
        article.description !== "[Removed]" &&
        article.title !== "[Removed]"
    ).map(article => {
        const dateStr = article.source?.publishedAt;
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