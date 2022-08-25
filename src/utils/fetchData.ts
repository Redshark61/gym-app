export const exercisesOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY as string,
		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
	},
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY as string,
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
	}
};



export const fetchData = async<T>(url: string, options: typeof exercisesOptions | typeof youtubeOptions): Promise<T> => {
	const response = await fetch(url, options);
	const data = await response.json();
	return data;
};
