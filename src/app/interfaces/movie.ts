export interface Movie {
    adult : boolean;
    backdrop_path : string;
    belongs_to_collection : null;
    budget : number;
    genres : Genre[];
    homepage : string;
    id : number;
    imdb_id : string;
    original_language : string;
    original_title : string;
    overview : string
    popularity : number;
    poster_path : string;
    production_companies : Object;
    production_countries : Array<Object>;
    release_date : string;
    revenue : number;
    runtime : number;
    spoken_languages : SpokenLanguages[];
    status : string;
    tagline : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface SpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieTrailer {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface MovieCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface MovieReviews {
    // author: string;
    // author_details: {
    //     name: string,
    //     username: string,
    //     avatar_path: string,
    //     rating: number
    // },
    // content: string;
    // created_at: string;
    // id: string;
    // updated_at: string;
    // url: string;
    id: string;
    updated_at: string;
    url: string;
    userui: string | null | undefined;
    author?: string | null | undefined; // Make author property optional
    author_details: {
      avatar_path: string | null | undefined;
      rating: number;
    };
    content: string;
    created_at: string;
}