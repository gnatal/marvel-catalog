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
};


export type MarvelComics = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: [];
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: [];
  collections: [];
  collectedIssues: [];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: [];
  creators: {
    available: number;
    collectionURI: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: [];
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
    items: [];
    returned: number;
  };
};

export type MarvelSeries = {
  id: number;
  title: string;
  description: string | null;
  resourceURI: string;
  urls: Array<{
    type: string;
    url: string;
  }>;
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      role: string;
    }>;
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      type: string;
    }>;
    returned: number;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: unknown[];
    returned: number;
  };
  next: null;
  previous: null;
};

export type MarvelEvent = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Array<{
    type: string;
    url: string;
  }>;
  modified: string;
  start: string;
  end: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      role: string;
    }>;
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      type: string;
    }>;
    returned: number;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  next: {
    resourceURI: string;
    name: string;
  } | null;
  previous: {
    resourceURI: string;
    name: string;
  } | null;
};

export type MarvelStory = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  } | null;
  creators: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      role: string;
    }>;
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  originalIssue: {
    resourceURI: string;
    name: string;
  };
};

export type MarvelCreator =  {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      type?: string;
    }>;
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  urls: Array<{
    type: string;
    url: string;
  }>;
}
