const FirebaseDataStore = require('../lib/FirebaseDataStore');
const dataStore = new FirebaseDataStore("movies");

const movies = async () => {
    return dataStore.findAll();
};

const movie = async (_, args) => {
    return dataStore.findOneById(args.movieId);
}

const newMovie = (_, args) => {
    let newMovie = {
        title: args.input.title,
        year: args.input.year,
        rating: args.input.rating,
        covertImage: args.input.covertImage,
        fullImage: args.input.fullImage,
        genres: args.input.genres,
        isFavorite: args.input.isFavorite,
        isNew: args.input.isNew,
        isRecent: args.input.isRecent,
        isViewed: args.input.isViewed,
        categories: args.input.categories,
    };

    return dataStore.addOne(newMovie);
}

module.exports = {
    Query: {
        movie,
        movies
    },
    Mutation: {
        newMovie
    },

    Movie: {
        __resolveType(movie) {},
    }
};
