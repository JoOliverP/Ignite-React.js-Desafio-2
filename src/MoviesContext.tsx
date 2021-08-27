import { ReactNode,createContext, useEffect, useState} from 'react';
import { api } from './services/api';

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface MovieProviderProps {
    children: ReactNode;
}

interface MoviesContextData {
    movies: MovieProps[];
    handleClickButton: (id: number) => void;
    selectedGenreId: number;
    selectedGenre:  GenreResponseProps;
    genres: GenreResponseProps[];
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

export const MoviesContext = createContext<MoviesContextData>(
    {} as MoviesContextData
);

export function MoviesProvider({children}: MovieProviderProps) {
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);
    
    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <MoviesContext.Provider value={{ movies, genres, selectedGenreId, selectedGenre ,handleClickButton}}>
            {children}
        </MoviesContext.Provider>
    )
}