// Mock Spotify Service for fallback
export const searchMetalArtists = async () => {
    // Return empty to force fallback to local data
    return [];
};

export const getArtistAlbums = async (artistId) => {
    return [];
};

export const getAlbumTracks = async (albumId) => {
    return [];
};
