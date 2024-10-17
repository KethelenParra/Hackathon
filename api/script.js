document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value;
    buscarCoordenadas(cep);
});

let map; // Variável para o mapa
let service; // Serviço para a API Places
let infowindow; // Janela de informação do mapa

function initMap(lat, lng) {
    // Inicializando o mapa na coordenada recebida
    const location = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 14
    });
    
    // Inicializando a janela de informação para os marcadores
    infowindow = new google.maps.InfoWindow();
}

function buscarCoordenadas(cep) {
    // Fazendo a requisição para a API de Geocoding do Google
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyBo8036wimZvcfPCTkKxXTiFz1YLBbibZc`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const lat = location.lat;
                const lng = location.lng;

                // Inicia o mapa com a localização geocodificada
                initMap(lat, lng);

                // Busca UBS (hospitais) próximos usando a Places API
                buscarUbsProximas(lat, lng);
            } else {
                alert('CEP não encontrado!');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar coordenadas:', error);
        });
}

function buscarUbsProximas(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);
    
    // Inicializando o serviço de Places
    service = new google.maps.places.PlacesService(map);
    const request = {
        location: location,
        radius: '5000', // Raio de 5 km
        type: ['hospital'] // Buscando hospitais/UBS
    };

    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const ubsListDiv = document.getElementById('ubsList');
            ubsListDiv.innerHTML = ''; // Limpa a lista anterior

            // Limita para os 5 primeiros resultados
            const top5Results = results.slice(0, 5);

            // Adiciona marcadores e exibe apenas as 5 UBS mais próximas
            top5Results.forEach(function(place) {
                addMarker(place);
                
                // Adiciona as UBS na lista abaixo do mapa
                const ubsDiv = document.createElement('div');
                ubsDiv.innerHTML = `<h3>${place.name}</h3><p>${place.vicinity}</p>`;
                ubsListDiv.appendChild(ubsDiv);
            });
        } else {
            alert('Nenhuma UBS encontrada nas proximidades.');
        }
    });
}


function addMarker(place) {
    // Adiciona marcador para a UBS no mapa
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // Exibe janela de informação ao clicar no marcador
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
    });
}

