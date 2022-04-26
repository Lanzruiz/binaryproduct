build:
	cd server && docker build . -t lanzruiz/binaryproduct

run:
	docker run -d -p 5000:5000 lanzruiz/binaryproduct