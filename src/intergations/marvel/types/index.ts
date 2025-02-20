export type MarvelResponse<T> = {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: T[];
    };
};


export type MarvelCharacter = {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    resourceURI: string;
    comics: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
        returned: number;
    };
    series: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
        returned: number;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
        returned: number;
    };
    events: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
        returned: number;
    };
    urls: {
        type: string;
        url: string;
    }[];
}
