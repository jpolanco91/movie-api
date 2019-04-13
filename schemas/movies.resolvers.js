const firebase = require('firebase');
const { firebaseConfig } = require('../config/config.json');

firebase.initializeApp(firebaseConfig);
const moviesDb = firebase.firestore().collection("movies");

const movies = async () => {
    
    let moviesArray = await moviesDb.get().then((querySnapshot) => {
        return querySnapshot.docs;
    });

    moviesArray = moviesArray.map((queryDocSnapshot) => {
        return { ...queryDocSnapshot.data(), ...{ id: queryDocSnapshot.id } };
    });

    return moviesArray;
};

const movie = async (_, args) => {
    const movieQuery = moviesDb.doc(args.movieId);
    let movie = await movieQuery.get();

    return { ...movie.data(), ...{ id: movie.id } };
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

    const newMovieRef = moviesDb.add(newMovie).then((docRef) => {
        return docRef;
    });

    return newMovieRef;
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
