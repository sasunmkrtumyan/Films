import axios from 'axios'

const API = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQxZDU2MjczNmZmYTVmNTQyMzZiOTFlZmFhOWE3NiIsInN1YiI6IjYxMDZjZTU0N2FkMDhjMDA0NTUzMGMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AyolfPpM2gJg9swYLV02l9Vc-ClicxdUhzblmKUUB3s`,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
})

export { API }